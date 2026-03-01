import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Send, Shield, Gauge, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import {
  SITE,
  FAQ_PAGE_ITEMS,
  FAQ_PAGE_CATEGORIES,
  FAQ_QUICK_ANSWERS,
  FAQ_GLOSSARY,
  SERVICES,
  type FAQPageCategoryId,
} from "@/lib/constants";
import { OpenLeadPopupButton } from "@/components/ui/OpenLeadPopupButton";

export const metadata = {
  title: "Частые вопросы об автоподборе и диагностике в Минске | АвтоПодбор",
  description:
    "Автоподбор в Минске: стоимость проверки от 130 BYN, срок подбора под ключ 5–14 дней, гарантии по договору, выезд по всей Беларуси. Ответы на частые вопросы.",
};

// Group FAQ items by category in display order
const CATEGORY_ORDER: FAQPageCategoryId[] = [
  "services",
  "process",
  "guarantees",
  "regions",
];

export default function FAQPage() {
  const byCategory = CATEGORY_ORDER.map((catId) => ({
    category: FAQ_PAGE_CATEGORIES[catId],
    items: FAQ_PAGE_ITEMS.filter((item) => item.category === catId),
  })).filter((g) => g.items.length > 0);

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
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
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
            <span className="text-neutral-300">Вопросы и ответы</span>
          </nav>
          <h1 className="mb-4 max-w-4xl text-balance text-3xl font-bold leading-tight text-white font-[family-name:var(--font-heading)] sm:text-4xl lg:text-5xl">
            Частые вопросы об автоподборе и диагностике в Минске
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Автоподбор в Минске — это профессиональная проверка автомобиля перед покупкой с выездом эксперта, толщиномером Etari ET-700 и сканером Launch X431. Ниже — ответы на частые вопросы об услугах, сроках, гарантиях и выезде по регионам. Стоимость разовой диагностики — от 130 BYN, подбор под ключ — от 1200 BYN.
          </p>
        </Container>
      </section>

      <Container className="section-padding">
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

        {/* Быстрые ответы (вариант C) — для сниппетов и голосового поиска */}
        <section className="mb-12 sm:mb-16" aria-labelledby="quick-heading">
          <h2 id="quick-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Быстрые ответы
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-neutral-400">
            Короткие формулировки для быстрого поиска: стоимость (от 130 BYN за разовую диагностику, 500 BYN — эксперт на день, от 1200 BYN — под ключ), сроки подбора (5–14 рабочих дней), выезд по всей Беларуси, гарантии по договору.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FAQ_QUICK_ANSWERS.map(({ question, answer }) => (
              <li
                key={question}
                className="rounded-xl border border-white/10 bg-surface-100 p-5"
              >
                <p className="text-sm font-semibold text-white">
                  {question}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {answer}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Почему важно проверять + цифры и факты */}
        <section className="mb-12 sm:mb-16" aria-labelledby="why-heading">
          <h2 id="why-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Почему важно проверять авто перед покупкой
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Скрытые дефекты в объявлениях
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                По нашим данным, у порядка 40% объявлений есть скрытые дефекты кузова или пробега, выявляемые только инструментальной проверкой (толщиномер, сканер, эндоскоп).
              </p>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Торг окупает услугу в 2–3 раза
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                В среднем сумма аргументированного торга в 2–3 раза превышает стоимость услуги «Под ключ» (1200 BYN) — проверка окупается или приносит прямую выгоду. По нашим данным за 2025–2026 гг., это характерно для большинства сегментов рынка подержанных авто в Минске.
              </p>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Юридические риски
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Залоги, аресты и несовпадение VIN в блоках — реальные риски при покупке без проверки по базам ГАИ и реестрам залогового имущества.
              </p>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Срок подбора под ключ
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Средний срок подбора «под ключ» составляет 5–14 рабочих дней в зависимости от критериев и бюджета клиента.
              </p>
            </li>
          </ul>
        </section>

        {/* FAQ по категориям */}
        <section className="mb-12 sm:mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-8 text-xl font-bold text-white sm:text-2xl">
            Ответы на вопросы
          </h2>
          <div className="space-y-10">
            {byCategory.map(({ category, items }) => (
              <div key={category.id}>
                <h3 className="mb-4 text-lg font-semibold text-neutral-200">
                  {category.label}
                </h3>
                <div className="rounded-2xl border border-white/10 bg-surface-100 px-4 py-2 sm:px-6">
                  <Accordion
                    items={items.map((item) => ({
                      title: item.question,
                      content: item.answer,
                    }))}
                    defaultOpen={-1}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA в середине */}
        <section className="mb-12 sm:mb-16" aria-labelledby="cta-mid-heading">
          <div className="rounded-2xl border border-white/10 bg-surface-100 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 id="cta-mid-heading" className="text-lg font-bold text-white sm:text-xl">
                Готовы заказать проверку?
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Выберите удобный способ связи — заявка через форму или звонок.
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

        {/* Как мы проверяем */}
        <section className="mb-12 sm:mb-16" aria-labelledby="how-heading">
          <h2 id="how-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Как мы проверяем автомобили
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-neutral-400">
            Протокол проверки включает компьютерную диагностику, замер ЛКП толщиномером, верификацию VIN и проверку по базам ГАИ и залогов. Оборудование: Launch X431 V+, Etari ET-700, при необходимости — эндоскоп.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <Gauge className="mb-3 h-8 w-8 text-primary-500" aria-hidden="true" />
              <p className="mb-2 text-sm font-semibold text-white">
                Компьютерная диагностика
              </p>
              <p className="mb-3 text-sm text-neutral-400">
                Сканер Launch X431 V+ — чтение блоков ЭБУ, пробег в дублях, ошибки и Freeze Frame.
              </p>
              <Link
                href="/diagnostika/kompyuternaya-diagnostika/"
                className="text-sm font-medium text-primary-400 underline underline-offset-2 hover:text-primary-300"
              >
                Подробнее
              </Link>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <FileCheck className="mb-3 h-8 w-8 text-primary-500" aria-hidden="true" />
              <p className="mb-2 text-sm font-semibold text-white">
                Проверка кузова и ЛКП
              </p>
              <p className="mb-3 text-sm text-neutral-400">
                Толщиномер Etari ET-700 — замер толщины ЛКП в микронах, выявление шпатлёвки и перекрасов.
              </p>
              <Link
                href="/diagnostika/proverka-kuzova-lkp/"
                className="text-sm font-medium text-primary-400 underline underline-offset-2 hover:text-primary-300"
              >
                Подробнее
              </Link>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <Shield className="mb-3 h-8 w-8 text-primary-500" aria-hidden="true" />
              <p className="mb-2 text-sm font-semibold text-white">
                VIN и юридическая чистота
              </p>
              <p className="mb-3 text-sm text-neutral-400">
                Сверка VIN по кузову и блокам; проверка по базам ГАИ, реестра залогов и исполнительных производств.
              </p>
              <Link
                href="/podbor/yuridicheskaya-chistota/"
                className="text-sm font-medium text-primary-400 underline underline-offset-2 hover:text-primary-300"
              >
                Подробнее
              </Link>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <FileCheck className="mb-3 h-8 w-8 text-primary-500" aria-hidden="true" />
              <p className="mb-2 text-sm font-semibold text-white">
                Отчёт и вердикт
              </p>
              <p className="text-sm text-neutral-400">
                В отчёт входят 100+ фото, скриншоты диагностики и вердикт: «Рекомендовано», «С торгом» или «Не рекомендовано». Отправка в мессенджер.
              </p>
            </li>
          </ul>
        </section>

        {/* Глоссарий (вариант C) — определения для AI и запросов «что такое…» */}
        <section className="mb-12 sm:mb-16" aria-labelledby="glossary-heading">
          <h2 id="glossary-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Глоссарий
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-neutral-400">
            Краткие определения терминов, связанных с автоподбором и диагностикой в Минске.
          </p>
          <dl className="space-y-5">
            {FAQ_GLOSSARY.map(({ term, definition }) => (
              <div key={term} className="rounded-xl border border-white/10 bg-surface-100 p-5">
                <dt className="text-sm font-semibold text-white">
                  {term}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Цены кратко */}
        <section className="mb-12 sm:mb-16" aria-labelledby="prices-heading">
          <h2 id="prices-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Стоимость услуг
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-neutral-400">
            Стоимость разовой диагностики — от 130 BYN. Эксперт на день — 500 BYN (фиксированная цена). Автоподбор «под ключ» — от 1200 BYN. Подробный прайс и калькулятор окупаемости — на странице «Цены».
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[SERVICES[0], SERVICES[2], SERVICES[1]].map((service) => (
              <Link
                key={service.id}
                href="/pricing/"
                className="group rounded-2xl border border-white/10 bg-surface-100 p-5 transition-colors hover:border-primary-600/30"
              >
                <p className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {service.shortTitle}
                </p>
                <p className="mt-1 text-2xl font-bold text-primary-400 sm:text-3xl">
                  {service.priceLabel}
                </p>
                <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA + Полезные ссылки */}
        <section
          className="rounded-2xl border border-white/10 bg-surface-100 p-8 text-center sm:p-10"
          aria-labelledby="cta-heading"
        >
          <h2 id="cta-heading" className="mb-2 text-lg font-bold text-white sm:text-xl">
            Не нашли ответ? Закажите проверку
          </h2>
          <p className="mb-6 max-w-md mx-auto text-sm text-neutral-400">
            Оставьте заявку — перезвоним в течение 15 минут в рабочее время. Или свяжитесь по телефону {SITE.phoneDisplay} или в Telegram / WhatsApp.
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
            <Link href="/pricing/" className="underline underline-offset-2 hover:text-neutral-400">
              Цены и калькулятор окупаемости
            </Link>
            {" · "}
            <Link href="/cases/" className="underline underline-offset-2 hover:text-neutral-400">
              Кейсы
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
              Политика конфиденциальности
            </Link>
          </p>
        </section>
      </Container>
    </main>
  );
}
