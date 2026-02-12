import { z } from "zod";

// ============================================================
// Contact / Lead form schema
// ============================================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя слишком длинное"),
  phone: z
    .string()
    .min(9, "Введите корректный номер телефона")
    .max(20, "Номер слишком длинный")
    .regex(
      /^[\d\s\-+()]+$/,
      "Номер может содержать только цифры, пробелы, дефисы и скобки"
    ),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================
// Quiz lead form schema
// ============================================================

export const quizLeadSchema = z.object({
  phone: z
    .string()
    .min(9, "Введите корректный номер телефона")
    .max(20, "Номер слишком длинный")
    .regex(
      /^[\d\s\-+()]+$/,
      "Номер может содержать только цифры, пробелы и дефисы"
    ),
  answers: z.record(z.string(), z.string()),
});

export type QuizLeadData = z.infer<typeof quizLeadSchema>;

// ============================================================
// Calculator schema
// ============================================================

export const calculatorSchema = z.object({
  carPrice: z.number().min(1000).max(500000),
  carType: z.enum(["sedan", "suv", "minivan", "electric"]),
});

export type CalculatorData = z.infer<typeof calculatorSchema>;
