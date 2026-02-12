"use client";

import { useState, useEffect, useCallback } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// Navigation links
// ============================================================

const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#methodology", label: "Как проверяем" },
  { href: "#pricing", label: "Цены" },
  { href: "#process", label: "Этапы работы" },
  { href: "#cases", label: "Кейсы" },
  { href: "#faq", label: "FAQ" },
] as const;

// ============================================================
// Header Component — dark theme
// ============================================================

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface-950/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5"
          : "bg-surface-950/80 backdrop-blur-sm"
      }`}
      style={{ top: "var(--promo-h, 0px)" }}
      role="banner"
    >
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white transition-opacity hover:opacity-80"
            aria-label="Автоподбор в Минске — на главную"
            onClick={closeMenu}
          >
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

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex lg:items-center lg:gap-1"
            aria-label="Основная навигация"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary-400"
              aria-label={`Позвонить: ${SITE.phoneDisplay}`}
            >
              <Phone className="h-4 w-4 text-primary-500" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <Button href="#quiz" size="sm" variant="primary">
              Оставить заявку
            </Button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${SITE.phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20 text-primary-400 transition-colors hover:bg-primary-600/30"
              aria-label="Позвонить"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-300 transition-colors hover:bg-white/10 cursor-pointer"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          style={{ top: "calc(4rem + var(--promo-h, 0px))" }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <nav
        id="mobile-menu"
        className={`fixed right-0 z-50 w-72 transform bg-surface-950 border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: "calc(4rem + var(--promo-h, 0px))",
          height: "calc(100dvh - 4rem - var(--promo-h, 0px))",
        }}
        aria-label="Мобильная навигация"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col px-4 py-6">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-base font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-primary-400 transition-colors hover:bg-primary-600/10"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <Button
              href="#quiz"
              variant="primary"
              size="md"
              className="w-full"
              onClick={closeMenu}
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
