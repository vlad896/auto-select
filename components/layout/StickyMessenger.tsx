"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

export function StickyMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show after scrolling past the hero section
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Expanded messenger options */}
      {isOpen && (
        <div className="animate-slide-up mb-1 flex flex-col gap-2 rounded-2xl bg-surface-100 p-3 shadow-2xl border border-white/10">
          <p className="px-2 pb-1 text-sm font-semibold text-white">
            Напишите нам:
          </p>
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#229ED9]/15 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#229ED9] text-white">
              <Send className="h-4 w-4" aria-hidden="true" />
            </span>
            Telegram
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#25D366]/15 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366] text-white">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            WhatsApp
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-primary-600/15 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            Позвонить
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/30 transition-all duration-300 cursor-pointer ${
          isOpen
            ? "bg-surface-200 text-white rotate-0 hover:bg-surface-300"
            : "bg-primary-600 text-white hover:bg-primary-500 hover:scale-105"
        }`}
        aria-label={isOpen ? "Закрыть меню связи" : "Связаться с нами"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
