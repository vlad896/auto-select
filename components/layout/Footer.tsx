"use client";

import { useActionState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { submitContactForm, type FormState } from "@/app/actions";

// ============================================================
// Footer Contact Form
// ============================================================

function ContactForm() {
  const initialState: FormState = { success: false, message: "" };
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-success-600/10 p-6 text-center">
        <CheckCircle
          className="h-10 w-10 text-success-600"
          aria-hidden="true"
        />
        <p className="text-lg font-semibold text-success-700">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="footer-name" className="sr-only">
          Ваше имя
        </label>
        <input
          id="footer-name"
          name="name"
          type="text"
          placeholder="Ваше имя"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-surface-200/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 transition-colors focus:border-primary-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {state.errors.name[0]}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="footer-phone" className="sr-only">
          Номер телефона
        </label>
        <input
          id="footer-phone"
          name="phone"
          type="tel"
          placeholder="+375 (__) ___-__-__"
          required
          autoComplete="tel"
          className="w-full rounded-xl border border-surface-200/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 transition-colors focus:border-primary-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
        />
        {state.errors?.phone && (
          <p className="mt-1 text-sm text-red-400" role="alert">
            {state.errors.phone[0]}
          </p>
        )}
      </div>
      {state.message && !state.success && (
        <p className="text-sm text-red-400" role="alert">
          {state.message}
        </p>
      )}
      <Button
        type="submit"
        variant="accent"
        size="md"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          "Отправка..."
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Оставить заявку
          </>
        )}
      </Button>
      <p className="text-xs text-white/40 text-center">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
      </p>
    </form>
  );
}

// ============================================================
// Footer Component
// ============================================================

export function Footer() {
  return (
    <footer className="bg-surface-100 text-white border-t border-white/5" role="contentinfo">
      <Container className="section-padding">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Column 1: About + Contact Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <a href="#" className="mb-6 inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 16L10 4L16 16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="13" r="1.5" fill="white" />
                </svg>
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-heading)]">
                АвтоПодбор
              </span>
            </a>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/60">
              Профессиональная диагностика и подбор автомобилей в Минске.
              Работаем по договору с гарантией достоверности.
            </p>

            {/* Contact details */}
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center gap-2.5 text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-primary-400" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/80">
                <MapPin className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                {SITE.address}
              </li>
              <li className="flex items-center gap-2.5 text-white/80">
                <Clock className="h-4 w-4 text-primary-400" aria-hidden="true" />
                {SITE.workingHours}
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links + Messengers */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-base font-semibold text-white">
              Услуги
            </h3>
            <ul className="mb-8 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="#services"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Разовая диагностика
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Автоподбор «под ключ»
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Эксперт на день
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Цены на услуги
                </a>
              </li>
              <li>
                <a
                  href="#cases"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Примеры проверок
                </a>
              </li>
            </ul>

            <h3 className="mb-4 text-base font-semibold text-white">
              Мессенджеры
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-[#229ED9] hover:text-white"
                aria-label="Написать в Telegram"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-[#25D366] hover:text-white"
                aria-label="Написать в WhatsApp"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.viber}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-[#7360F2] hover:text-white"
                aria-label="Написать в Viber"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 3: Contact Form */}
          <div className="lg:col-span-1">
            <h3 className="mb-2 text-base font-semibold text-white">
              Оставить заявку
            </h3>
            <p className="mb-5 text-sm text-white/50">
              Перезвоним в течение 15 минут в рабочее время
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
          <p>Минск, Беларусь</p>
        </Container>
      </div>
    </footer>
  );
}
