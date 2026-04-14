import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OpenLeadPopupButton } from "@/components/ui/OpenLeadPopupButton";
import { SITE, PRICING_TABLE, SERVICES, FAQ_PAGE_ITEMS } from "@/lib/constants";
import { getPageMetadata } from "@/lib/metadata";

const Calculator = dynamic(
  () => import("@/components/sections/Calculator").then((m) => ({ default: m.Calculator })),
  { ssr: true }
);
const Accordion = dynamic(
  () => import("@/components/ui/Accordion").then((m) => ({ default: m.Accordion })),
  { ssr: true }
);

export const metadata = getPageMetadata({
  path: "/pricing/",
  title: "Цены на автоподбор и диагностику в Минске",
  description:
    "Разовая диагностика от 130 BYN, эксперт на день 500 BYN, под ключ от 1200 BYN. Фиксированные цены. Закажите проверку — перезвоним за 15 минут.",
});

export default function PricingPage() {
  const pricingFaqItems = FAQ_PAGE_ITEMS.filter((item) => item.category === "services").slice(0, 5);

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
            src="/images/podbor-expert-report.jpg"
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
            <span className="text-neutral-300">Цены</span>
          </nav>
          <h1 className="mb-4 max-w-4xl text-balance text-3xl font-bold leading-tight text-white font-[family-name:var(--font-heading)] sm:text-4xl lg:text-5xl">
            Цены на автоподбор и диагностику в Минске
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Стоимость разовой выездной диагностики в Минске — от 130 BYN. Эксперт на день — 500 BYN, фиксированная цена. Автоподбор «под ключ» — от 1200 BYN. Цена фиксирована и не зависит от результата торга; по нашим данным за 2025–2026 гг. аргументированный торг в среднем окупает услугу в 2–3 раза.
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

        {/* Таблица цен */}
        <section className="mb-12 sm:mb-16" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Тарифы
          </h2>
          <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-surface-100 sm:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th scope="col" className="px-5 py-4 text-left text-sm font-semibold text-white lg:px-6">
                    Тип услуги
                  </th>
                  <th scope="col" className="px-5 py-4 text-left text-sm font-semibold text-white lg:px-6">
                    Что включено
                  </th>
                  <th scope="col" className="px-5 py-4 text-right text-sm font-semibold text-white lg:px-6">
                    Стоимость
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING_TABLE.map((row, i) => (
                  <tr
                    key={row.service}
                    className={`border-b border-white/5 last:border-b-0 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                  >
                    <td className="px-5 py-4 text-sm font-medium text-neutral-200 lg:px-6">
                      {row.service}
                    </td>
                    <td className="px-5 py-4 text-sm text-neutral-400 lg:px-6">
                      {row.includes}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-bold text-primary-400 lg:px-6">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 sm:hidden">
            {PRICING_TABLE.map((row) => (
              <div
                key={row.service}
                className="rounded-xl border border-white/10 bg-surface-100 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{row.service}</p>
                  <p className="text-sm font-bold text-primary-400 whitespace-nowrap">{row.price}</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{row.includes}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-neutral-400">
            Стоимость указана для Минска и Минского района. Выезд за МКАД оплачивается по тарифу 0,50 BYN/км.
          </p>
        </section>

        {/* Почему цена фиксирована */}
        <section className="mb-12 sm:mb-16" aria-labelledby="why-fixed-heading">
          <h2 id="why-fixed-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Почему цена фиксирована
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Объективность эксперта
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Фиксированная стоимость не зависит от результата торга. Эксперт заинтересован в точном заключении, а не в занижении цены сделки.
              </p>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Предсказуемость для вас
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Вы заранее знаете сумму за услугу. В среднем торг окупает проверку в 2–3 раза — выгода остаётся у клиента.
              </p>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Всё включено
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                В цену входят выезд, оборудование (Launch X431, Etari ET-700), проверка VIN и юридической чистоты, фото- и видеоотчёт с вердиктом.
              </p>
            </li>
          </ul>
        </section>

        {/* Что входит в стоимость */}
        <section className="mb-12 sm:mb-16" aria-labelledby="what-included-heading">
          <h2 id="what-included-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Что входит в стоимость
          </h2>
          <div className="space-y-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="rounded-xl border border-white/10 bg-surface-100 p-5"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{svc.shortTitle}</p>
                  <span className="text-lg font-bold text-primary-400">{svc.priceLabel}</span>
                </div>
                <p className="mb-3 text-sm text-neutral-400">{svc.description}</p>
                <ul className="space-y-1.5 text-sm text-neutral-400">
                  {svc.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {svc.id === "diagnostic" && (
                  <Link
                    href="/diagnostika/"
                    className="mt-3 inline-block text-sm font-medium text-primary-400 underline underline-offset-2 hover:text-primary-300"
                  >
                    Подробнее о диагностике
                  </Link>
                )}
                {svc.id === "turnkey" && (
                  <Link
                    href="/podbor/"
                    className="mt-3 inline-block text-sm font-medium text-primary-400 underline underline-offset-2 hover:text-primary-300"
                  >
                    Подробнее об автоподборе под ключ
                  </Link>
                )}
                {svc.id === "expert-day" && (
                  <Link
                    href="/podbor/expert-na-den/"
                    className="mt-3 inline-block text-sm font-medium text-primary-400 underline underline-offset-2 hover:text-primary-300"
                  >
                    Подробнее об услуге
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Калькулятор окупаемости */}
        <section className="mb-12 sm:mb-16" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Калькулятор окупаемости
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-neutral-400">
            Введите стоимость автомобиля — узнайте, сколько в среднем можно сэкономить за счёт аргументированного торга и как это соотносится со стоимостью нашей проверки. Расчёт по нашим данным за 2025–2026 гг.
          </p>
          <Calculator basePath="/" />
        </section>

        {/* Цифры и факты */}
        <section className="mb-12 sm:mb-16" aria-labelledby="facts-heading">
          <h2 id="facts-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Цифры и факты
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Торг окупает услугу в 2–3 раза
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                В среднем сумма аргументированного торга в 2–3 раза превышает стоимость услуги «Под ключ» (1200 BYN). По данным за 2025–2026 гг., типичная экономия клиента составляет от 300 до 800 USD в зависимости от сегмента автомобиля.
              </p>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                Фиксированная цена
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Стоимость не зависит от результата торга. Эксперт не заинтересован в занижении цены сделки — только в точном заключении.
              </p>
            </li>
            <li className="rounded-xl border border-white/10 bg-surface-100 p-5">
              <p className="text-sm font-semibold text-white">
                В 90% случаев — основания для торга
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                По нашим данным, в большинстве осмотров мы находим задокументированные основания для обоснованного снижения цены (несоответствие пробега, следы ремонта кузова, ошибки в блоках ЭБУ). В 90% случаев клиент получает аргументы для торга или веские причины отказаться от покупки.
              </p>
            </li>
          </ul>
        </section>

        {/* CTA в середине */}
        <section className="mb-12 sm:mb-16" aria-labelledby="cta-mid-heading">
          <div className="rounded-2xl border border-white/10 bg-surface-100 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 id="cta-mid-heading" className="text-lg font-bold text-white sm:text-xl">
                Готовы заказать?
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Выберите удобный способ — заявка через форму или звонок.
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

        {/* Дополнительные условия */}
        <section className="mb-12 sm:mb-16" aria-labelledby="terms-heading">
          <h2 id="terms-heading" className="mb-4 text-xl font-bold text-white sm:text-2xl">
            Дополнительные условия
          </h2>
          <div className="rounded-xl border border-white/10 bg-surface-100 p-5">
            <p className="text-sm leading-relaxed text-neutral-400">
              Выезд за МКАД оплачивается по тарифу 0,50 BYN/км. Удалённая проверка (осмотр авто в Минске для клиентов из регионов или РФ с отчётом в мессенджер) — от 150 BYN. Стоимость указана в белорусских рублях (BYN). Оплата по факту оказания услуг, по договору.
            </p>
          </div>
        </section>

        {/* FAQ о ценах и услугах */}
        {pricingFaqItems.length > 0 && (
          <section className="mb-12 sm:mb-16" aria-labelledby="pricing-faq-heading">
            <h2 id="pricing-faq-heading" className="mb-6 text-xl font-bold text-white sm:text-2xl">
              Частые вопросы о ценах и услугах
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-neutral-400">
              Ответы на типичные вопросы о стоимости проверки, форматах работы и том, что входит в цену. Подробнее — на странице <Link href="/faq/" className="text-primary-400 underline underline-offset-2 hover:text-primary-300">вопросов и ответов</Link>.
            </p>
            <div className="rounded-2xl border border-white/10 bg-surface-100 px-4 py-2 sm:px-6">
              <Accordion
                items={pricingFaqItems.map((item) => ({
                  title: item.question,
                  content: item.answer,
                }))}
                defaultOpen={-1}
              />
            </div>
          </section>
        )}

        {/* CTA в конце + ссылки */}
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
            <Link href="/#pricing" className="underline underline-offset-2 hover:text-neutral-400">
              Услуги
            </Link>
            {" · "}
            <Link href="/cases/" className="underline underline-offset-2 hover:text-neutral-400">
              Кейсы
            </Link>
            {" · "}
            <Link href="/faq/" className="underline underline-offset-2 hover:text-neutral-400">
              FAQ
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
