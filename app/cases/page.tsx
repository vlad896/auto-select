import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OpenLeadPopupButton } from "@/components/ui/OpenLeadPopupButton";
import { SITE, FAQ_PAGE_ITEMS } from "@/lib/constants";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { getPageMetadata } from "@/lib/metadata";

const VideoShowcase = dynamic(
  () => import("@/components/sections/VideoShowcase").then((m) => ({ default: m.VideoShowcase })),
  { ssr: true }
);
const Accordion = dynamic(
  () => import("@/components/ui/Accordion").then((m) => ({ default: m.Accordion })),
  { ssr: true }
);

const casesMeta = getPageMetadata({
  path: "/cases/",
  title: "Кейсы проверок автомобилей в Минске",
  description:
    "Реальные примеры проверенных автомобилей в Минске: отказ от утопленника при скрученном пробеге и шпатлёвке, покупка с дисконтом после аргументированного торга. Данные за последний квартал.",
});

export const metadata = {
  ...casesMeta,
  openGraph: {
    ...casesMeta.openGraph,
    type: "article" as const,
    publishedTime: "2025-01-01T00:00:00+03:00",
    modifiedTime: new Date().toISOString(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  other: {
    citation_title: "Кейсы проверок автомобилей в Минске",
    citation_author: SITE.name,
    citation_publication_date: "2025-01-01",
    citation_publisher: SITE.name,
    citation_language: "ru",
  },
};

export default function CasesPage() {
  const casesFaqItems = FAQ_PAGE_ITEMS.filter(
    (item) => item.category === "process" || item.category === "guarantees"
  ).slice(0, 6);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-surface-950"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* Hero с фото */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/case-bmw-real.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/75 to-surface-950" />
        </div>
        <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex items-center gap-1.5 text-xs text-neutral-500 sm:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-primary-400">
              Главная
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="text-neutral-300">Кейсы</span>
          </nav>
          <h1 className="mb-4 max-w-4xl text-balance text-3xl font-bold leading-tight text-white font-[family-name:var(--font-heading)] sm:text-4xl lg:text-5xl">
            Кейсы: примеры проверенных автомобилей
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Кейсы проверок автомобилей в Минске — реальные примеры из практики: отказ от покупки при скрученном пробеге и шпатлёвке, покупка с дисконтом после аргументированного торга. Данные за последний квартал.
          </p>
        </Container>
      </section>

      <Container className="section-padding">
        {/* CTA в начале */}
        <section className="mb-12 sm:mb-16" aria-labelledby="cta-top-heading">
          <div className="rounded-2xl border border-primary-600/20 bg-primary-950/30 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 id="cta-top-heading" className="text-lg font-bold text-white sm:text-xl">
                Заказать проверку
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Оставьте заявку или позвоните — перезвоним в течение 15 минут.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
              <OpenLeadPopupButton variant="primary" size="md">
                Оставить заявку
              </OpenLeadPopupButton>
              <Button href={`tel:${SITE.phone}`} variant="secondary" size="md">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phoneDisplay}
              </Button>
            </div>
          </div>
        </section>
      </Container>

      {/* Кейсы (первая область) — без нижнего CTA, карусель на всех экранах с точками */}
      <CaseStudies showBottomCta={false} alwaysCarousel />

      {/* Видео (вторая область) — карусель на всех экранах с точками, кнопка «На главную» */}
      <VideoShowcase bottomLink={{ href: "/", label: "На главную" }} alwaysCarousel />

      <Container className="section-padding">
        {/* FAQ */}
        {casesFaqItems.length > 0 && (
          <section className="mb-12 sm:mb-16" aria-labelledby="cases-faq-heading">
            <h2 id="cases-faq-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
              Частые вопросы о проверках и кейсах
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-neutral-400">
              Как проходит проверка, что делаем при отказе от покупки, как используются данные осмотра для торга. Подробнее — на странице <Link href="/faq/" className="text-primary-400 underline underline-offset-2 hover:text-primary-300">вопросов и ответов</Link>.
            </p>
            <div className="rounded-2xl border border-white/10 bg-surface-100 px-4 py-2 sm:px-6">
              <Accordion
                items={casesFaqItems.map((item) => ({
                  title: item.question,
                  content: item.answer,
                }))}
                defaultOpen={-1}
              />
            </div>
          </section>
        )}

        {/* CTA в середине */}
        <section className="mb-12 sm:mb-16" aria-labelledby="cta-mid-heading">
          <div className="rounded-2xl border border-white/10 bg-surface-100 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 id="cta-mid-heading" className="text-lg font-bold text-white sm:text-xl">
                Хотите такую же проверку?
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Оставьте заявку или позвоните — подберём дату выезда.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
              <OpenLeadPopupButton variant="primary" size="md">
                Заявка на проверку
              </OpenLeadPopupButton>
              <Button href={`tel:${SITE.phone}`} variant="secondary" size="md">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Позвонить
              </Button>
            </div>
          </div>
        </section>

        {/* CTA в конце + полезные ссылки */}
        <section
          className="rounded-2xl border border-white/10 bg-surface-100 p-8 text-center sm:p-10"
          aria-labelledby="cta-end-heading"
        >
          <h2 id="cta-end-heading" className="mb-2 text-lg font-bold text-white sm:text-xl">
            Заказать проверку
          </h2>
          <p className="mb-6 max-w-md mx-auto text-sm text-neutral-400">
            Оставьте заявку — перезвоним в течение 15 минут в рабочее время. Или свяжитесь по телефону {SITE.phoneDisplay} или в Telegram / Instagram / WhatsApp / Max.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <OpenLeadPopupButton variant="primary" size="lg">
              Оставить заявку
            </OpenLeadPopupButton>
            <Button href={`tel:${SITE.phone}`} variant="secondary" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </Button>
            <Button
              href={SITE.telegram}
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              Telegram
            </Button>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Полезные ссылки
          </p>
          <p className="mt-3 text-xs text-neutral-500">
            <Link href="/" className="underline underline-offset-2 hover:text-neutral-400">
              Главная
            </Link>
            {" · "}
            <Link href="/#cases" className="underline underline-offset-2 hover:text-neutral-400">
              Кейсы на главной
            </Link>
            {" · "}
            <Link href="/pricing/" className="underline underline-offset-2 hover:text-neutral-400">
              Цены
            </Link>
            {" · "}
            <Link href="/faq/" className="underline underline-offset-2 hover:text-neutral-400">
              FAQ
            </Link>
            {" · "}
            <Link href="/diagnostika/" className="underline underline-offset-2 hover:text-neutral-400">
              Диагностика
            </Link>
            {" · "}
            <Link href="/podbor/" className="underline underline-offset-2 hover:text-neutral-400">
              Автоподбор
            </Link>
            {" · "}
            <Link href="/privacy/" className="underline underline-offset-2 hover:text-neutral-400">
              Политика
            </Link>
          </p>
        </section>
      </Container>
    </main>
  );
}
