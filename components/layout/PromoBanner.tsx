"use client";

import { useState, useEffect, useRef } from "react";
import { X, Zap, Clock } from "lucide-react";

// ============================================================
// Countdown target — end of February 2026
// ============================================================

const PROMO_END = new Date("2026-02-28T23:59:59").getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, PROMO_END - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: diff === 0 };
}

// ============================================================
// PromoBanner — urgency bar with countdown timer
// Sets --promo-h CSS variable on :root for Header/main offset
// ============================================================

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });
  const bannerRef = useRef<HTMLDivElement>(null);

  // Only start the timer after client mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
  }, []);

  // Sync CSS variable with banner height via ResizeObserver (no forced reflow)
  useEffect(() => {
    const el = bannerRef.current;
    if (!isVisible || !el) {
      document.documentElement.style.setProperty("--promo-h", "0px");
      return;
    }

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        document.documentElement.style.setProperty("--promo-h", `${Math.round(h)}px`);
      }
    });

    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.setProperty("--promo-h", "0px");
    };
  }, [isVisible]);

  // Countdown timer — tick every second (only after mount)
  useEffect(() => {
    if (!isVisible || !mounted) return;
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [isVisible, mounted]);

  const handleClose = () => {
    setIsVisible(false);
    document.documentElement.style.setProperty("--promo-h", "0px");
  };

  if (!isVisible || timeLeft.expired) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white shadow-lg shadow-primary-950/30"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-10 py-2.5 text-center text-xs sm:gap-3 sm:text-sm">
        <Zap
          className="hidden h-4 w-4 shrink-0 fill-amber-300 text-amber-300 sm:block"
          aria-hidden="true"
        />

        {/* Promo text */}
        <p className="leading-snug">
          <strong className="font-bold">Акция:</strong>{" "}
          <span className="hidden sm:inline">
            Бесплатная проверка VIN при заказе диагностики.{" "}
          </span>
          <span className="sm:hidden">
            Бесплатная проверка VIN!{" "}
          </span>
        </p>

        {/* Countdown */}
        <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm" aria-label="До конца акции">
          <Clock className="h-3 w-3 text-amber-300" aria-hidden="true" />
          <div className="flex items-center gap-0.5 text-xs font-mono font-bold tabular-nums">
            <CountdownUnit value={timeLeft.days} label="д" />
            <span className="text-white/50">:</span>
            <CountdownUnit value={timeLeft.hours} label="ч" />
            <span className="text-white/50">:</span>
            <CountdownUnit value={timeLeft.minutes} label="м" />
            <span className="text-white/50 hidden xs:inline">:</span>
            <span className="hidden xs:inline">
              <CountdownUnit value={timeLeft.seconds} label="с" />
            </span>
          </div>
        </div>

        {/* CTA link */}
        <a
          href="#quiz"
          className="hidden font-semibold underline underline-offset-2 transition-colors hover:text-white/80 sm:inline"
        >
          Забронировать →
        </a>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/15 hover:text-white cursor-pointer sm:right-3"
          aria-label="Закрыть промо-баннер"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Single countdown unit
// ============================================================

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-px">
      <span className="text-white" suppressHydrationWarning>
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] text-white/60">{label}</span>
    </span>
  );
}
