"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Phone, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// Data
// ============================================================

const DIAG_CHILDREN = [
  {
    href: "/diagnostika/proverka-kuzova-lkp/",
    label: "Проверка кузова и ЛКП",
    desc: "Толщиномер Etari ET-700",
  },
  {
    href: "/diagnostika/kompyuternaya-diagnostika/",
    label: "Компьютерная диагностика",
    desc: "Launch X431 V+ PRO",
  },
  {
    href: "/diagnostika/proverka-probega/",
    label: "Проверка пробега",
    desc: "Дубли в ЭБУ, моточасы",
  },
  {
    href: "/diagnostika/endoskopiya-dvigatelya/",
    label: "Эндоскопия двигателя",
    desc: "Задиры ЦПГ, нагар, ГБЦ",
  },
] as const;

type NavLink =
  | { href: string; label: string; children?: undefined }
  | { href: string; label: string; children: typeof DIAG_CHILDREN };

const NAV_LINKS: readonly NavLink[] = [
  { href: "#services", label: "Услуги" },
  { href: "/diagnostika/", label: "Диагностика", children: DIAG_CHILDREN },
  { href: "#pricing", label: "Цены" },
  { href: "#process", label: "Этапы работы" },
  { href: "#cases", label: "Кейсы" },
  { href: "#faq", label: "FAQ" },
];

// ============================================================
// Header
// ============================================================

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── Scroll tracker ──
  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // ── Resize → close mobile menu ──
  useEffect(() => {
    const h = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setMobileSubOpen(false);
  }, []);

  // ── Desktop dropdown helpers ──
  const openDropdown = useCallback(() => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDesktopDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(
      () => setDesktopDropdownOpen(false),
      150
    );
  }, []);

  // ── Close dropdown on outside click ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Render helpers ──
  const renderDesktopLink = (link: NavLink) => {
    // With dropdown
    if (link.children) {
      return (
        <div
          key={link.href}
          ref={dropdownRef}
          className="relative"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <Link
            href={link.href}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            {link.label}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                desktopDropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </Link>

          {/* Dropdown panel */}
          <div
            className={`absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 transition-all duration-200 ${
              desktopDropdownOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-950/98 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {/* Link to parent page */}
              <Link
                href={link.href}
                className="flex items-center gap-2 border-b border-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Все услуги диагностики
                <ChevronRight
                  className="ml-auto h-3.5 w-3.5 text-primary-500"
                  aria-hidden="true"
                />
              </Link>

              {/* Children */}
              <div className="py-1">
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex flex-col gap-0.5 px-4 py-2.5 transition-colors hover:bg-white/5"
                  >
                    <span className="text-sm font-medium text-neutral-200">
                      {child.label}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {child.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Simple link
    return link.href.startsWith("/") ? (
      <Link
        key={link.href}
        href={link.href}
        className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        {link.label}
      </Link>
    ) : (
      <a
        key={link.href}
        href={link.href}
        className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        {link.label}
      </a>
    );
  };

  const renderMobileLink = (link: NavLink) => {
    // With sub-items
    if (link.children) {
      return (
        <div key={link.href}>
          <button
            type="button"
            onClick={() => setMobileSubOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
            aria-expanded={mobileSubOpen}
          >
            {link.label}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                mobileSubOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Sub-items */}
          <div
            className={`overflow-hidden transition-all duration-200 ${
              mobileSubOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Link
              href={link.href}
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold text-primary-400 transition-colors hover:bg-white/5"
            >
              Все услуги
              <ChevronRight
                className="h-3 w-3"
                aria-hidden="true"
              />
            </Link>
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={closeMenu}
                className="flex flex-col gap-0.5 rounded-lg px-6 py-2 transition-colors hover:bg-white/5"
              >
                <span className="text-sm font-medium text-neutral-300">
                  {child.label}
                </span>
                <span className="text-xs text-neutral-500">{child.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    // Simple link
    return link.href.startsWith("/") ? (
      <Link
        key={link.href}
        href={link.href}
        onClick={closeMenu}
        className="rounded-xl px-4 py-3 text-base font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        {link.label}
      </Link>
    ) : (
      <a
        key={link.href}
        href={link.href}
        onClick={closeMenu}
        className="rounded-xl px-4 py-3 text-base font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        {link.label}
      </a>
    );
  };

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
          <Link
            href="/"
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
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex lg:items-center lg:gap-1"
            aria-label="Основная навигация"
          >
            {NAV_LINKS.map(renderDesktopLink)}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary-400"
              aria-label={`Позвонить: ${SITE.phoneDisplay}`}
            >
              <Phone
                className="h-4 w-4 text-primary-500"
                aria-hidden="true"
              />
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
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(renderMobileLink)}
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
