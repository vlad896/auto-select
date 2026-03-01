"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ============================================================
// Cookie consent — storage key and event (shared with YandexMetrika)
// ============================================================

export const COOKIE_CONSENT_KEY = "cookie_consent";
export type CookieConsentValue = "accepted" | "rejected";
export const COOKIE_CONSENT_ACCEPTED_EVENT = "cookie-consent-accepted";

function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (v === "accepted" || v === "rejected") return v;
  return null;
}

// ============================================================
// CookieConsentBanner — баннер согласия на cookies
// ============================================================

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const consent = getStoredConsent();
    setVisible(consent === null);
  }, [mounted]);

  const saveAndHide = (value: CookieConsentValue) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_ACCEPTED_EVENT));
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[55] border-t border-white/10 bg-surface-900/98 shadow-2xl backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h2 id="cookie-consent-title" className="text-sm font-semibold text-neutral-300">
              Использование cookies
            </h2>
            <p id="cookie-consent-desc" className="mt-1 text-sm leading-relaxed text-neutral-400">
              Мы используем файлы cookie и аналитику (Яндекс.Метрика), чтобы улучшать работу сайта и понимать, как им пользуются. Нажимая «Принять», вы соглашаетесь на использование cookies.{" "}
              <Link
                href="/privacy/"
                className="font-medium text-primary-400 underline underline-offset-2 hover:text-primary-300"
              >
                Подробнее
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => saveAndHide("rejected")}
              className="rounded-xl border border-black bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900 hover:border-neutral-800"
            >
              Отклонить
            </button>
            <button
              type="button"
              onClick={() => saveAndHide("accepted")}
              className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
            >
              Принять
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
