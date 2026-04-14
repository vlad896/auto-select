"use server";

import { contactFormSchema, quizLeadSchema } from "@/lib/schemas";
import { saveLead, type LeadSource } from "@/lib/db";
import { checkLeadRateLimit } from "@/lib/lead-rate-limit";
import { getLeadRequestMeta } from "@/lib/lead-request-meta";
import { notifyLead } from "@/lib/lead-notify";

// ============================================================
// Server Action: Contact Form Submission
// ============================================================

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
  source: LeadSource;
  name: string | null;
  phone: string;
  answers?: Record<string, string> | null;
}): Promise<PersistOutcome> {
  const meta = await getLeadRequestMeta();

  if (!(await checkLeadRateLimit(meta.clientIp))) {
    return "rate_limited";
  }

  const saved = await saveLead({
    source: input.source,
    name: input.name,
    phone: input.phone,
    answers: input.answers ?? null,
    userAgent: meta.userAgent,
    pageUrl: meta.pageUrl,
  });

  if (saved.ok) {
    await notifyLead({
      source: input.source,
      name: input.name,
      phone: input.phone,
      pageUrl: meta.pageUrl,
    });
    return "saved";
  }

  if (saved.reason === "db_error") {
    return "db_error";
  }

  if (process.env.NODE_ENV === "production") {
    return "prod_missing_db";
  }

  console.warn("[leads] DATABASE_* не заданы — заявка не записана в MySQL", {
    source: input.source,
    phone: input.phone,
  });
  return "dev_skipped_db";
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Проверьте правильность заполнения полей.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const outcome = await persistLead({
      source: "contact",
      name: parsed.data.name,
      phone: parsed.data.phone,
    });

    switch (outcome) {
      case "saved":
      case "dev_skipped_db":
        return {
          success: true,
          message: "Заявка отправлена! Мы перезвоним в течение 15 минут.",
        };
      case "rate_limited":
        return {
          success: false,
          message:
            "Слишком много заявок с вашего адреса. Попробуйте позже.",
        };
      case "prod_missing_db":
        return {
          success: false,
          message:
            "Сервис временно недоступен. Попробуйте позвонить нам напрямую.",
        };
      case "db_error":
        return {
          success: false,
          message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
        };
    }
  } catch {
    return {
      success: false,
      message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
    };
  }
}

// ============================================================
// Server Action: Quiz Lead Submission
// ============================================================

export async function submitQuizLead(data: {
  phone: string;
  answers: Record<string, string>;
}): Promise<FormState> {
  const parsed = quizLeadSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Проверьте правильность номера телефона.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const outcome = await persistLead({
      source: "quiz",
      name: null,
      phone: parsed.data.phone,
      answers: parsed.data.answers,
    });

    switch (outcome) {
      case "saved":
      case "dev_skipped_db":
        return {
          success: true,
          message:
            "Отлично! Наши эксперты уже подобрали 3 похожих варианта. Мы свяжемся с вами в течение 15 минут.",
        };
      case "rate_limited":
        return {
          success: false,
          message:
            "Слишком много заявок с вашего адреса. Попробуйте позже.",
        };
      case "prod_missing_db":
        return {
          success: false,
          message:
            "Сервис временно недоступен. Попробуйте позвонить нам напрямую.",
        };
      case "db_error":
        return {
          success: false,
          message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
        };
    }
  } catch {
    return {
      success: false,
      message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
    };
  }
}
