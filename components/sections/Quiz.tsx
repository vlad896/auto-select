"use client";

import { useState, useCallback, useTransition } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Send,
  Loader2,
  ClipboardCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QUIZ_STEPS } from "@/lib/constants";
import { submitQuizLead } from "@/app/actions";

// ============================================================
// Quiz Section — dark theme
// ============================================================

type QuizPhase = "questions" | "lead-form" | "success";

export function Quiz() {
  const totalSteps = QUIZ_STEPS.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<QuizPhase>("questions");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const currentQuestion = QUIZ_STEPS[currentStep];
  const selectedAnswer = answers[currentQuestion?.id];
  const progress = phase === "questions"
    ? ((currentStep + (selectedAnswer ? 1 : 0)) / totalSteps) * 100
    : 100;

  const handleSelect = useCallback(
    (optionId: string) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }));
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep((s) => s + 1);
        } else {
          setPhase("lead-form");
        }
      }, 300);
    },
    [currentQuestion?.id, currentStep, totalSteps]
  );

  const handleBack = useCallback(() => {
    if (phase === "lead-form") {
      setPhase("questions");
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [phase, currentStep, totalSteps]);

  const handleSubmit = useCallback(() => {
    const trimmed = phone.trim();
    if (trimmed.length < 9) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }
    if (!/^[\d\s\-+()]+$/.test(trimmed)) {
      setPhoneError("Номер может содержать только цифры, пробелы и дефисы");
      return;
    }
    setPhoneError("");

    startTransition(async () => {
      const result = await submitQuizLead({ phone: trimmed, answers });
      if (result.success) {
        setSuccessMessage(result.message);
        setPhase("success");
      } else {
        setPhoneError(result.message);
      }
    });
  }, [phone, answers]);

  return (
    <section
      id="quiz"
      className="section-padding bg-surface-100"
      aria-labelledby="quiz-heading"
    >
      <Container className="max-w-2xl">
        {/* Section label */}
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-500">
            Быстрый расчёт
          </p>
          <h2 id="quiz-heading" className="text-balance">
            Узнайте стоимость подбора за 1 минуту
          </h2>
          <p className="mt-3 text-neutral-400">
            Ответьте на 5 вопросов — и получите персональный расчёт
          </p>
        </div>

        {/* Quiz card */}
        <div className="rounded-3xl border border-white/10 bg-surface-200/50 p-5 shadow-lg shadow-black/20 sm:p-8">
          {/* Progress bar */}
          <div className="mb-6 sm:mb-8">
            <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
              <span>
                {phase === "success"
                  ? "Готово!"
                  : phase === "lead-form"
                  ? "Последний шаг"
                  : `Вопрос ${currentStep + 1} из ${totalSteps}`}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-white/5"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Прогресс квиза"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* === Phase: Questions === */}
          {phase === "questions" && currentQuestion && (
            <div className="animate-fade-in" key={currentQuestion.id}>
              <h3 className="mb-5 text-lg font-semibold text-white sm:mb-6 sm:text-xl">
                {currentQuestion.question}
              </h3>
              <div className="flex flex-col gap-2.5 sm:gap-3" role="radiogroup" aria-label={currentQuestion.question}>
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect(option.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 cursor-pointer sm:px-5 sm:py-4 sm:text-base ${
                        isSelected
                          ? "border-primary-600 bg-primary-600/15 text-white shadow-sm"
                          : "border-white/10 bg-white/5 text-neutral-300 hover:border-primary-600/50 hover:bg-white/8"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected
                            ? "border-primary-500 bg-primary-500"
                            : "border-neutral-600"
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {currentStep > 0 && (
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Назад
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === Phase: Lead Form === */}
          {phase === "lead-form" && (
            <div className="animate-fade-in">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600/20">
                  <ClipboardCheck
                    className="h-7 w-7 text-primary-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Результат готов!
                </h3>
                <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                  Наши эксперты уже подобрали{" "}
                  <strong className="text-primary-400">3 похожих варианта</strong>{" "}
                  за последнюю неделю
                </p>
              </div>

              <div className="mx-auto max-w-sm">
                <label
                  htmlFor="quiz-phone"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  Введите ваш номер (WhatsApp / Telegram / Viber)
                </label>
                <input
                  id="quiz-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                  placeholder="+375 (__) ___-__-__"
                  autoComplete="tel"
                  className={`w-full rounded-xl border-2 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 ${
                    phoneError
                      ? "border-danger-500 focus:border-danger-500"
                      : "border-white/10 focus:border-primary-500"
                  }`}
                />
                {phoneError && (
                  <p className="mt-1.5 text-sm text-danger-500" role="alert">
                    {phoneError}
                  </p>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  className="mt-4 w-full"
                  onClick={handleSubmit}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2
                        className="h-5 w-5 animate-spin"
                        aria-hidden="true"
                      />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Получить расчёт стоимости и примеры отчётов
                    </>
                  )}
                </Button>

                <p className="mt-3 text-center text-xs text-neutral-600">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки
                  персональных данных
                </p>
              </div>

              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Изменить ответы
                </button>
              </div>
            </div>
          )}

          {/* === Phase: Success === */}
          {phase === "success" && (
            <div className="animate-fade-in py-4 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-500/10">
                <CheckCircle
                  className="h-9 w-9 text-success-500"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                Заявка отправлена!
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base text-neutral-400">
                {successMessage}
              </p>
              <div className="mt-6">
                <Button href="#services" variant="ghost" size="md">
                  Посмотреть услуги
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
