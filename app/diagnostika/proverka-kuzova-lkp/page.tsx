import {
  ChevronRight,
  ArrowRight,
  Search,
  Phone,
  Send,
  ExternalLink,
  ShieldAlert,
  Eye,
  Ruler,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L3: /diagnostika/proverka-kuzova-lkp/
// Cocoon:  L1 (/) → L2 (/diagnostika/) → THIS L3
// Siblings: kompyuternaya-diagnostika, proverka-probega, endoskopiya-dvigatelya
// ============================================================

const TOC = [
  { id: "tech", label: "Технология осмотра" },
  { id: "hidden", label: "Скрытые улики" },
  { id: "srs", label: "Безопасность SRS" },
  { id: "table", label: "Таблица повреждений" },
  { id: "pricing", label: "Стоимость" },
] as const;

export default function ProverkaKuzovaPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/kuzov-hero.jpg"
            alt="Замер толщины ЛКП автомобиля толщиномером Etari ET-700"
            fill
            priority
            className="object-cover object-center"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/85 to-surface-950" />
        </div>

        <Container className="relative z-10 py-14 sm:py-18 lg:py-22">
          {/* Breadcrumbs */}
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 sm:text-sm"
          >
            <Link
              href="/"
              className="transition-colors hover:text-primary-400"
            >
              Главная
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link
              href="/diagnostika/"
              className="transition-colors hover:text-primary-400"
            >
              Выездная диагностика
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-neutral-300">Проверка кузова и ЛКП</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Проверка кузова и ЛКП автомобиля в&nbsp;Минске:{" "}
            <span className="text-gradient">детекция скрытых ДТП</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Кузов — единственный агрегат, который невозможно заменить без потери
            стоимости и снижения пассивной безопасности. На вторичном рынке
            Беларуси 2026&nbsp;года «перекупы» освоили окрас «под прибор» —
            стандартного замера ЛКП уже недостаточно. Комплексный аудит кузова —
            ключевой этап{" "}
            <Link
              href="/diagnostika/"
              className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
            >
              выездной диагностики автомобиля
            </Link>
            .
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Ruler, text: "Etari ET-700" },
              { icon: Eye, text: "5-10 точек / элемент" },
              { icon: ShieldAlert, text: "Проверка SRS" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 sm:text-sm"
              >
                <Icon
                  className="h-3.5 w-3.5 text-primary-500"
                  aria-hidden="true"
                />
                {text}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ ARTICLE ═══ */}
      <div className="bg-surface-950">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10 xl:grid-cols-[280px_1fr] xl:gap-14">
            {/* ── Sidebar ── */}
            <aside className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-[calc(5rem+var(--promo-h,0px))]">
                <nav
                  className="rounded-2xl border border-white/10 bg-surface-100 p-5"
                  aria-label="Содержание"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-500">
                    Содержание
                  </p>
                  <ol className="space-y-1">
                    {TOC.map(({ id, label }, i) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="flex items-baseline gap-2 rounded-lg px-2.5 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-neutral-200"
                        >
                          <span className="shrink-0 text-xs text-neutral-600 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-4 rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5">
                  <p className="mb-2 text-sm font-semibold text-white">
                    Подозрительный кузов?
                  </p>
                  <p className="mb-3 text-xs text-neutral-400">
                    Проверим за 40 минут — от&nbsp;40&nbsp;BYN
                  </p>
                  <Button
                    href={`tel:${SITE.phone}`}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Позвонить
                  </Button>
                </div>
              </div>
            </aside>

            {/* ── Article body ── */}
            <article className="min-w-0">
              {/* ──── Технология осмотра ──── */}
              <section id="tech" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Технология осмотра: комплексный подход к&nbsp;дефектовке
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Профессиональная проверка кузова занимает{" "}
                  <strong className="text-neutral-200">40–60 минут</strong> по
                  строгому регламенту. Мы используем толщиномеры{" "}
                  <strong className="text-neutral-200">Etari ET-700</strong>{" "}
                  (определение цветных металлов и оцинковки) и мощные
                  инспекционные фонари для выявления дефектов шагрени.
                </p>

                {/* H3: ЛКП */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  Замер лакокрасочного покрытия (ЛКП)
                </h3>
                <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                  5–10 точек на каждом элементе, включая крышу и стойки:
                </p>

                <div className="mb-6 space-y-2">
                  {[
                    {
                      range: "80–140 мкм",
                      label: "Заводской окрас",
                      color: "border-emerald-500/30 bg-emerald-500/5",
                      dot: "bg-emerald-500",
                    },
                    {
                      range: "160–250 мкм",
                      label: "Вторичный окрас — освежение детали",
                      color: "border-amber-500/30 bg-amber-500/5",
                      dot: "bg-amber-500",
                    },
                    {
                      range: "300–500+ мкм",
                      label: "Шпатлёвка — физический удар",
                      color: "border-red-500/30 bg-red-500/5",
                      dot: "bg-red-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.range}
                      className={`flex items-center gap-3 rounded-xl border p-4 ${item.color}`}
                    >
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dot}`}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-semibold text-neutral-200 tabular-nums">
                        {item.range}
                      </span>
                      <span className="text-sm text-neutral-400">
                        — {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* H3: Силовая структура */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  Анализ силовой структуры и скрытых полостей
                </h3>
                <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                  Самое важное скрыто под обшивками и уплотнителями:
                </p>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      title: "Лонжероны и брызговики",
                      text: "Складки металла, нештатные сварные швы, следы стапеля.",
                    },
                    {
                      title: "Центральные стойки и пороги",
                      text: "Замер проёмов. Толщина выше нормы — боковое ДТП или «перевёртыш».",
                    },
                    {
                      title: "Заводской герметик",
                      text: "Зернистость и твёрдость на чашках и в нише запасного колеса. Повторить заводское нанесение вручную невозможно.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/5 bg-surface-100 p-4"
                    >
                      <p className="mb-1 text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-neutral-400">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/kuzov-inspection.jpg"
                    alt="Эксперт осматривает силовую структуру кузова и заводские швы с инспекционным фонарём"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </section>

              <Div />

              {/* ──── Скрытые улики ──── */}
              <section id="hidden" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Чек-лист «Скрытые улики»: что ищет эксперт кроме микронов
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Иногда толщиномер показывает «завод», но машина побывала в ДТП.
                  Причина — детали «в цвет» с разборок. Для их выявления:
                </p>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: Eye,
                      title: "Маркировка стёкол",
                      text: "Все стёкла — один производитель и год выпуска (разбежка ≤ 1 год).",
                    },
                    {
                      icon: Wrench,
                      title: "Болты крепления",
                      text: "Грани на болтах капота, крыльев, дверей. Задиры — деталь снималась.",
                    },
                    {
                      icon: Search,
                      title: "Оптика и радиаторы",
                      text: "Даты на фарах и радиаторных кассетах. Фара 2023 г. на авто 2021 г. — удар в «перед».",
                    },
                    {
                      icon: Eye,
                      title: "Шагрень и «мусор» под лаком",
                      text: "При ярком свете — вкрапления пыли и несоответствие текстуры «апельсиновой корки» на разных деталях.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-xl border border-white/10 bg-surface-100 p-4"
                    >
                      <item.icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="mb-1 text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-neutral-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inline CTA */}
                <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                  <div className="mb-4 flex-1 sm:mb-0">
                    <p className="text-base font-bold text-white">
                      Нужна проверка перед покупкой?
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">
                      Etari ET-700 + инспекционный фонарь + проверка SRS
                    </p>
                  </div>
                  <Button
                    href="/#quiz"
                    variant="primary"
                    size="md"
                    className="shrink-0"
                  >
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </section>

              <Div />

              {/* ──── SRS ──── */}
              <section id="srs" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Проверка систем безопасности (SRS)
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Кузовной ремонт неразрывно связан с безопасностью. Мы
                  проверяем элементы, которые могут сохранить жизнь:
                </p>

                <div className="mb-6 space-y-3">
                  {[
                    {
                      title: "Ремни безопасности",
                      text: "Даты на бирках и плавность срабатывания преднатяжителей.",
                    },
                    {
                      title: "Торпедо и руль",
                      text: "Следы перетяжки или изменения текстуры пластика в местах выхода Airbag.",
                    },
                    {
                      title: "Заглушки и резисторы",
                      text: "Осмотр мест установки подушек фонариком и зеркалом на предмет «обманок».",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-xl border border-white/10 bg-surface-100 p-4"
                    >
                      <ShieldAlert
                        className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="mb-1 text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-neutral-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mb-6 text-sm text-neutral-500 leading-relaxed">
                  Данные осмотра SRS мы сопоставляем с результатами{" "}
                  <Link
                    href="/diagnostika/kompyuternaya-diagnostika/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    компьютерной диагностики
                  </Link>{" "}
                  блока Airbag — код B-серии в архиве часто подтверждает
                  стрельбу подушек.
                </p>
              </section>

              <Div />

              {/* ──── Таблица повреждений ──── */}
              <section id="table" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Таблица повреждений и рекомендации
                </h2>

                <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Тип повреждения
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Последствия
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Рекомендация
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        [
                          {
                            type: "Косметический окрас (180 мкм)",
                            consequence:
                              "Эстетика, защита от коррозии.",
                            rec: "Допустимо (торг)",
                            color: "text-emerald-400",
                          },
                          {
                            type: "Замена крыла (болты кручены)",
                            consequence:
                              "Снижение цены, риск коррозии швов.",
                            rec: "Допустимо (проверка лонжерона)",
                            color: "text-amber-400",
                          },
                          {
                            type: "Шпатлёвка на стойке (>500 мкм)",
                            consequence:
                              "Нарушение геометрии, риск трещин.",
                            rec: "Зона высокого риска",
                            color: "text-orange-400",
                          },
                          {
                            type: "Вваренная четверть / Стапель",
                            consequence:
                              "Потеря жёсткости кузова, опасность в ДТП.",
                            rec: "Категорический отказ",
                            color: "text-red-400",
                          },
                        ] as const
                      ).map((row, i) => (
                        <tr
                          key={row.type}
                          className={`border-b border-white/5 last:border-b-0 ${
                            i % 2 ? "bg-white/[0.02]" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-neutral-200">
                            {row.type}
                          </td>
                          <td className="px-4 py-3 text-neutral-400">
                            {row.consequence}
                          </td>
                          <td
                            className={`px-4 py-3 font-semibold ${row.color}`}
                          >
                            {row.rec}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <Div />

              {/* ──── Цены ──── */}
              <section id="pricing" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Стоимость проверки кузова
                </h2>

                <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Услуга
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Описание
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-neutral-300">
                          Цена
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Базовый замер ЛКП",
                          "Внешние панели + отчёт",
                          "40 BYN",
                        ],
                        [
                          "Комплексный аудит кузова",
                          "ЛКП + проёмы + силовая структура + стёкла",
                          "70 BYN",
                        ],
                        [
                          "Полная проверка (выездная)",
                          "Кузов + SRS + болты + оптика",
                          "от 100 BYN",
                        ],
                      ].map(([svc, desc, price], i) => (
                        <tr
                          key={svc}
                          className={`border-b border-white/5 last:border-b-0 ${
                            i % 2 ? "bg-white/[0.02]" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-neutral-200">
                            {svc}
                          </td>
                          <td className="px-4 py-3 text-neutral-400">
                            {desc}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-primary-400">
                            {price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Final CTA */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-surface-100 p-6 text-center sm:p-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
                    Не дайте себя обмануть
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    Закажите проверку кузова
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-sm text-neutral-400">
                    Будьте уверены в безопасности и ликвидности автомобиля.
                    Результат — в течение часа. Это неотъемлемая часть{" "}
                    <Link
                      href="/"
                      className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                    >
                      профессионального автоподбора
                    </Link>
                    .
                  </p>
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button href="/#quiz" variant="primary" size="lg">
                      Оставить заявку
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button
                      href={SITE.whatsapp}
                      variant="secondary"
                      size="lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </section>

              {/* ═══ SEMANTIC COCOON ═══ */}
              <Div />
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">
                  Смотрите также
                </h2>

                <Link
                  href="/diagnostika/"
                  className="mb-4 flex items-center gap-3 rounded-xl border border-primary-600/20 bg-primary-950/20 p-4 transition-colors hover:bg-primary-950/30"
                >
                  <Search
                    className="h-5 w-5 shrink-0 text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Выездная диагностика автомобиля
                    </p>
                    <p className="text-xs text-neutral-500">
                      Полный протокол: кузов, электроника, ходовая, юридика
                    </p>
                  </div>
                  <ArrowRight
                    className="ml-auto h-4 w-4 shrink-0 text-primary-500"
                    aria-hidden="true"
                  />
                </Link>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      href: "/diagnostika/kompyuternaya-diagnostika/",
                      label: "Компьютерная диагностика",
                      desc: "Launch X431 V+, Live Data, Freeze Frame",
                    },
                    {
                      href: "/diagnostika/proverka-probega/",
                      label: "Проверка пробега",
                      desc: "Дубли в ЭБУ, моточасы, базы данных",
                    },
                    {
                      href: "/diagnostika/endoskopiya-dvigatelya/",
                      label: "Эндоскопия двигателя",
                      desc: "Задиры ЦПГ, нагар, трещины ГБЦ",
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group rounded-xl border border-white/10 bg-surface-100 p-4 transition-colors hover:border-primary-600/20"
                    >
                      <p className="mb-1 text-sm font-semibold text-neutral-200 transition-colors group-hover:text-primary-400">
                        {link.label}
                      </p>
                      <p className="text-xs text-neutral-500">{link.desc}</p>
                    </Link>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">
                    С этой услугой заказывают
                  </p>
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                  >
                    Автоподбор «под ключ» — от 900 BYN
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </article>
          </div>
        </Container>
      </div>
    </main>
  );
}

function Div() {
  return (
    <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10" />
  );
}
