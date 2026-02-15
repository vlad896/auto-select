import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { SITE } from "@/lib/constants";
import { Home, Phone, ArrowLeft, MapPin, Car } from "lucide-react";

// ============================================================
// Metadata (handled via parent layout for not-found)
// ============================================================

// ============================================================
// 404 Page — Тематическая страница «Автомобиль не найден»
// ============================================================

const POPULAR_PAGES = [
  { href: "/", label: "Главная страница" },
  { href: "/podbor/", label: "Автоподбор под ключ" },
  { href: "/diagnostika/", label: "Диагностика авто" },
  { href: "/marki/", label: "Подбор по маркам" },
  { href: "/diagnostika/proverka-kuzova-lkp/", label: "Проверка кузова и ЛКП" },
  { href: "/podbor/expert-na-den/", label: "Эксперт на день" },
];

export default function NotFound() {
  return (
    <main id="main-content" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large faded 404 text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[20rem] sm:text-[28rem] lg:text-[36rem] font-heading font-black text-white/[0.02] leading-none select-none">
            404
          </span>
        </div>
        {/* Gradient overlays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-600/3 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated car icon */}
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary-600/10 border border-primary-600/20">
            <Car className="w-12 h-12 text-primary-500" strokeWidth={1.5} />
          </div>

          {/* Error code */}
          <p className="text-primary-500 font-heading font-bold text-lg tracking-wider uppercase mb-4">
            Ошибка 404
          </p>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Страница не найдена
          </h1>

          {/* Description — thematic */}
          <p className="text-neutral-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Похоже, эта страница уехала на техосмотр и пока не вернулась.
            Но мы поможем вам найти то, что нужно.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button href="/" variant="primary" size="lg" fullWidthMobile>
              <Home className="w-5 h-5" />
              На главную
            </Button>
            <Button href={`tel:${SITE.phone}`} variant="secondary" size="lg" fullWidthMobile>
              <Phone className="w-5 h-5" />
              {SITE.phoneDisplay}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">
              Популярные разделы
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Popular pages grid */}
          <nav aria-label="Популярные страницы">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POPULAR_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="group flex items-center gap-3 rounded-xl bg-surface-100 border border-white/5 px-5 py-4 transition-all duration-200 hover:bg-surface-200 hover:border-primary-600/30 hover:shadow-lg hover:shadow-primary-600/5"
                  >
                    <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:text-primary-500 transition-colors rotate-180 shrink-0" />
                    <span className="text-neutral-300 group-hover:text-white transition-colors text-sm font-medium text-left">
                      {page.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact hint */}
          <div className="mt-12 flex items-center justify-center gap-2 text-neutral-500 text-sm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>
              Или приезжайте к нам:{" "}
              <span className="text-neutral-300">{SITE.address}</span>
            </span>
          </div>
        </div>
      </Container>
    </main>
  );
}
