"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Phone, ShieldCheck, Clock, Gift } from "lucide-react";
import { SITE } from "@/lib/constants";

// ============================================================
// Config
// ============================================================

/** Задержка перед показом попапа (мс) — 25 секунд на странице */
const SHOW_DELAY_MS = 25_000;
/** Ключ localStorage — не показывать повторно */
const STORAGE_KEY = "lead_popup_dismissed";
/** Сколько дней не показывать после закрытия */
const DISMISS_DAYS = 3;

// ============================================================
// LeadPopup — маркетинговый pop-up с крючком
// ============================================================

export function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /** Ref-флаг: попап уже был показан в этой сессии (показан или закрыт) */
  const shownRef = useRef(false);

  // ── Показать попап по таймеру или при exit intent ──
  useEffect(() => {
    // Проверяем localStorage — был ли уже закрыт
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) {
        shownRef.current = true; // Не показывать вообще
        return;
      }
    }

    // Таймер: показать через SHOW_DELAY_MS
    const timer = setTimeout(() => {
      if (!shownRef.current) {
        shownRef.current = true;
        setIsVisible(true);
      }
    }, SHOW_DELAY_MS);

    // Exit intent: мышь покидает viewport сверху (десктоп)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !shownRef.current) {
        shownRef.current = true;
        setIsVisible(true);
        clearTimeout(timer);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Focus trap + Escape close ──
  useEffect(() => {
    if (!isVisible) return;

    // Focus input when popup appears
    setTimeout(() => inputRef.current?.focus(), 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    // Block body scroll
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Закрыть и запомнить ──
  const handleClose = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    document.body.style.overflow = "";
  }, []);

  // ── Backdrop click ──
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose]
  );

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Простая валидация телефона
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 9) {
      setError("Введите корректный номер телефона");
      return;
    }

    setIsSubmitting(true);

    try {
      // Отправка через Server Action или API
      const { submitContactForm } = await import("@/app/actions");
      const formData = new FormData();
      formData.append("name", "Popup Lead");
      formData.append("phone", phone);

      const result = await submitContactForm(
        { success: false, message: "" },
        formData
      );

      if (result.success) {
        setIsSuccess(true);
        // Закрыть через 3 секунды после успеха
        setTimeout(() => handleClose(), 3000);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Ошибка отправки. Позвоните нам напрямую.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md animate-slide-up rounded-2xl bg-surface-100 border border-white/10 shadow-2xl shadow-primary-600/10 overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Red accent top bar */}
        <div className="h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700" />

        <div className="p-6 sm:p-8">
          {!isSuccess ? (
            <>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-600/15 border border-primary-600/30 px-4 py-1.5 mb-5">
                <Gift className="w-4 h-4 text-primary-400" />
                <span className="text-primary-400 text-sm font-semibold">
                  Только сейчас
                </span>
              </div>

              {/* Heading */}
              <h2
                id="lead-popup-title"
                className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight"
              >
                Бесплатная проверка VIN
                <br />
                <span className="text-primary-500">
                  + скидка 20% на диагностику
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Оставьте номер — мы перезвоним за{" "}
                <span className="text-white font-medium">15 минут</span>,
                проверим VIN вашего авто бесплатно и предложим лучшие условия.
              </p>

              {/* Trust signals */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary-500 shrink-0" />
                  <span className="text-neutral-300 text-xs sm:text-sm">
                    Работаем по договору
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-500 shrink-0" />
                  <span className="text-neutral-300 text-xs sm:text-sm">
                    Ответ за 15 минут
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    ref={inputRef}
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError("");
                    }}
                    placeholder="+375 (__) ___-__-__"
                    className="w-full rounded-xl bg-surface-200 border border-white/10 px-4 py-3.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-label="Номер телефона"
                    aria-invalid={!!error}
                    aria-describedby={error ? "popup-error" : undefined}
                  />
                  {error && (
                    <p
                      id="popup-error"
                      className="text-danger-500 text-sm mt-1.5"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3.5 px-6 transition-all duration-200 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-500/30 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      Получить бесплатную консультацию
                    </>
                  )}
                </button>
              </form>

              {/* Or call directly */}
              <div className="mt-4 text-center">
                <span className="text-neutral-500 text-sm">или позвоните: </span>
                <a
                  href={`tel:${SITE.phone}`}
                  className="text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>

              {/* Privacy note */}
              <p className="text-neutral-600 text-xs text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </>
          ) : (
            /* ── Success state ── */
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/15 mb-5">
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Заявка принята!
              </h3>
              <p className="text-neutral-400">
                Наш эксперт перезвонит вам
                <br />в течение <span className="text-white font-medium">15 минут</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
