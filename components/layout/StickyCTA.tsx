"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Context-aware sticky CTA bar.
 * Appears after user scrolls past the hero section.
 * Changes text based on scroll position through key sections.
 */

interface CTAVariant {
  text: string;
  href: string;
}

const CTA_VARIANTS: CTAVariant[] = [
  { text: "Узнать стоимость проверки", href: "#quiz" },
  { text: "Получить бесплатную консультацию", href: "#quiz" },
  { text: "Забронировать выезд эксперта", href: "#quiz" },
];

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Show bar after scrolling 600px (past hero)
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    // Change CTA text based on which section is visible
    const sectionIds = ["whyus", "methodology", "case-studies"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVariantIndex(i);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    observersRef.current = observers;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const variant = CTA_VARIANTS[variantIndex] ?? CTA_VARIANTS[0];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-surface-950/90 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Быстрая заявка"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <p className="hidden text-sm text-neutral-400 sm:block">
          Бесплатная консультация · Ответ за 15 минут
        </p>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <a
            href={variant.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-500 sm:flex-initial"
          >
            {variant.text}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10 sm:hidden"
            aria-label="Позвонить"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
