"use server";

import { contactFormSchema, quizLeadSchema } from "@/lib/schemas";

// ============================================================
// Server Action: Contact Form Submission
// ============================================================

export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  // Validate with Zod
  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Проверьте правильность заполнения полей.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // In production, this would send to a CRM, email, or Telegram bot
  // For now, simulate a successful submission
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("[Lead captured]", {
      name: parsed.data.name,
      phone: parsed.data.phone,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Заявка отправлена! Мы перезвоним в течение 15 минут.",
    };
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
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("[Quiz lead captured]", {
      phone: parsed.data.phone,
      answers: parsed.data.answers,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message:
        "Отлично! Наши эксперты уже подобрали 3 похожих варианта. Мы свяжемся с вами в течение 15 минут.",
    };
  } catch {
    return {
      success: false,
      message: "Произошла ошибка. Попробуйте позвонить нам напрямую.",
    };
  }
}
