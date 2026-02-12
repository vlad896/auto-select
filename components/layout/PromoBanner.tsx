"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";

// ============================================================
// PromoBanner — urgency/promo sticky bar above header
// ============================================================

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-[60] bg-primary-600 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:gap-3 sm:text-sm">
        <Zap className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden="true" />
        <p>
          <strong className="font-semibold">Февраль:</strong>{" "}
          Бесплатная проверка VIN при заказе диагностики.{" "}
          <a
            href="#quiz"
            className="underline underline-offset-2 transition-colors hover:text-white/80"
          >
            Забронировать →
          </a>
        </p>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded text-white/70 transition-colors hover:text-white cursor-pointer sm:right-4"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
