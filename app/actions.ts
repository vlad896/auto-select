"use server";

import { contactFormSchema, quizLeadSchema } from "@/lib/schemas";
import { saveLead, type LeadSource } from "@/lib/db";
import { checkLeadRateLimit } from "@/lib/lead-rate-limit";
import { getLeadRequestMeta } from "@/lib/lead-request-meta";
import { notifyLead } from "@/lib/lead-notify";
import { createRequestId, logError, logInfo, logWarn, maskPhone } from "@/lib/logger";

export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

type PersistOutcome =
  | "saved"
  | "rate_limited"
  | "db_error"
  | "prod_missing_db"
  | "dev_skipped_db";

async function persistLead(input: {
  requestId: string;
  source: LeadSource;
  name: string | null;
  phone: string;
  answers?: Record<string, string> | null;
}): Promise<PersistOutcome> {
  const meta = await getLeadRequestMeta();

  logInfo("lead.persist_started", {
    requestId: input.requestId,
    source: input.source,
    phone: maskPhone(input.phone),
    clientIp: meta.clientIp,
    pageUrl: meta.pageUrl,
    hasAnswers: Boolean(input.answers && Object.keys(input.answers).length > 0),
  });

  if (!(await checkLeadRateLimit(meta.clientIp))) {
    logWarn("lead.rate_limited", {
      requestId: input.requestId,
      source: input.source,
      phone: maskPhone(input.phone),
      clientIp: meta.clientIp,
    });
    return "rate_limited";
  }

  const saved = await saveLead({
    requestId: input.requestId,
    source: input.source,
    name: input.name,
    phone: input.phone,
    answers: input.answers ?? null,
    userAgent: meta.userAgent,
    pageUrl: meta.pageUrl,
  });

  if (saved.ok) {
    await notifyLead({
      requestId: input.requestId,
      source: input.source,
      name: input.name,
      phone: input.phone,
      pageUrl: meta.pageUrl,
    });
    logInfo("lead.persist_succeeded", {
      requestId: input.requestId,
      source: input.source,
      phone: maskPhone(input.phone),
      clientIp: meta.clientIp,
    });
    return "saved";
  }

  if (saved.reason === "db_error") {
    logWarn("lead.persist_db_error", {
      requestId: input.requestId,
      source: input.source,
      phone: maskPhone(input.phone),
      clientIp: meta.clientIp,
    });
    return "db_error";
  }

  if (process.env.NODE_ENV === "production") {
    logWarn("lead.persist_missing_db_in_production", {
      requestId: input.requestId,
      source: input.source,
      phone: maskPhone(input.phone),
      clientIp: meta.clientIp,
    });
    return "prod_missing_db";
  }

  logWarn("lead.persist_skipped_db_in_dev", {
    requestId: input.requestId,
    source: input.source,
    phone: maskPhone(input.phone),
    clientIp: meta.clientIp,
  });
  return "dev_skipped_db";
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const requestId = createRequestId();
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    logWarn("lead.contact.validation_failed", {
      requestId,
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
    return {
      success: false,
      message: "Проверьте правильность заполнения полей.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const outcome = await persistLead({
      requestId,
      source: "contact",
      name: parsed.data.name,
      phone: parsed.data.phone,
    });

    switch (outcome) {
      case "saved":
      case "dev_skipped_db":
        logInfo("lead.contact.completed", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: true,
          message: "Заявка отправлена! Мы перезвоним в течение 15 минут.",
        };
      case "rate_limited":
        logWarn("lead.contact.rejected", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: false,
          message: "Слишком много заявок с вашего адреса. Попробуйте позже.",
        };
      case "prod_missing_db":
        logWarn("lead.contact.failed", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: false,
          message: "Сервис временно недоступен. Попробуйте позвонить нам напрямую.",
        };
      case "db_error":
        logWarn("lead.contact.failed", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: false,
          message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
        };
    }
  } catch (error) {
    logError("lead.contact.unexpected_error", error, {
      requestId,
      phone: typeof raw.phone === "string" ? maskPhone(raw.phone) : null,
    });
    return {
      success: false,
      message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
    };
  }
}

export async function submitQuizLead(data: {
  phone: string;
  answers: Record<string, string>;
}): Promise<FormState> {
  const requestId = createRequestId();
  const parsed = quizLeadSchema.safeParse(data);

  if (!parsed.success) {
    logWarn("lead.quiz.validation_failed", {
      requestId,
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
    return {
      success: false,
      message: "Проверьте правильность номера телефона.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const outcome = await persistLead({
      requestId,
      source: "quiz",
      name: null,
      phone: parsed.data.phone,
      answers: parsed.data.answers,
    });

    switch (outcome) {
      case "saved":
      case "dev_skipped_db":
        logInfo("lead.quiz.completed", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: true,
          message:
            "Отлично! Наши эксперты уже подобрали 3 похожих варианта. Мы свяжемся с вами в течение 15 минут.",
        };
      case "rate_limited":
        logWarn("lead.quiz.rejected", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: false,
          message: "Слишком много заявок с вашего адреса. Попробуйте позже.",
        };
      case "prod_missing_db":
        logWarn("lead.quiz.failed", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: false,
          message: "Сервис временно недоступен. Попробуйте позвонить нам напрямую.",
        };
      case "db_error":
        logWarn("lead.quiz.failed", {
          requestId,
          outcome,
          phone: maskPhone(parsed.data.phone),
        });
        return {
          success: false,
          message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
        };
    }
  } catch (error) {
    logError("lead.quiz.unexpected_error", error, {
      requestId,
      phone: maskPhone(data.phone),
    });
    return {
      success: false,
      message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
    };
  }
}
