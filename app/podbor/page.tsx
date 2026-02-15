import {
  ChevronRight,
  ArrowRight,
  Search,
  Phone,
  Send,
  ShieldCheck,
  FileText,
  Clock,
  Car,
  Users,
  AlertTriangle,
  TrendingDown,
  Scale,
  Filter,
  Target,
  Handshake,
  BadgeCheck,
  CircleDollarSign,
  HelpCircle,
  Wrench,
  Eye,
  Cpu,
  Gauge,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L2: /podbor/
// Semantic cocoon:  L1 (/) → THIS L2
// Siblings: /diagnostika/
// ============================================================

const TOC = [
  { id: "difference", label: "Подбор vs Диагностика" },
  { id: "formats", label: "Форматы работы" },
  { id: "funnel", label: "Этапы подбора" },
  { id: "sources", label: "Где мы ищем" },
  { id: "checklist", label: "Что проверяем" },
  { id: "comparison", label: "Сравнение вариантов" },
  { id: "economics", label: "Экономика подбора" },
  { id: "guarantees", label: "Гарантии и Договор" },
  { id: "faq", label: "FAQ" },
] as const;

export default function PodborPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/podbor-expert-report.jpg"
            alt="Автоподбор в Минске — эксперт с диагностическим отчётом у проверенного автомобиля"
            fill
            priority
            className="object-cover object-center"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/80 to-surface-950" />
        </div>

        <Container className="relative z-10 py-14 sm:py-18 lg:py-22">
          {/* Breadcrumbs */}
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 sm:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-primary-400">Главная</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link href="/#services" className="transition-colors hover:text-primary-400">Услуги</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-neutral-300">Автоподбор под ключ</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Автоподбор под ключ в&nbsp;Минске:{" "}
            <span className="text-gradient">поиск автомобиля с&nbsp;гарантией чистоты</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Покупка авто — вторая по значимости трата после недвижимости.
            Автоподбор под ключ — это делегирование всего цикла профессионалам:
            от мониторинга рынка до оформления в МРО ГАИ. Вы платите за
            результат: технически исправный автомобиль с прозрачной историей
            строго в рамках бюджета.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: ShieldCheck, text: "Гарантия 2 месяца" },
              { icon: FileText, text: "Работаем по договору" },
              { icon: Target, text: "140+ пунктов проверки" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 sm:text-sm">
                <Icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#quiz" variant="primary" size="lg">
              Получить расчёт стоимости
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.phone}`} variant="secondary" size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Позвонить
            </Button>
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
                <nav className="rounded-2xl border border-white/10 bg-surface-100 p-5" aria-label="Содержание">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-500">Содержание</p>
                  <ol className="space-y-1">
                    {TOC.map(({ id, label }, i) => (
                      <li key={id}>
                        <a href={`#${id}`} className="flex items-baseline gap-2 rounded-lg px-2.5 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-neutral-200">
                          <span className="shrink-0 text-xs text-neutral-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                <div className="mt-4 rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5">
                  <p className="mb-1 text-sm font-semibold text-white">900 BYN — фикс</p>
                  <p className="mb-3 text-xs text-neutral-400">Подбор под ключ с гарантией 2 месяца</p>
                  <Button href="/#quiz" variant="primary" size="sm" className="w-full">
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </aside>

            {/* ── Article body ── */}
            <article className="min-w-0">

              {/* intro */}
              <div className="mb-8 rounded-2xl border border-white/5 bg-surface-100 p-5 sm:p-6">
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Рынок подержанных авто Беларуси в 2026 году — минное поле.
                  Огромный выбор из Европы и США, но засилье перекупщиков,
                  маскирующих критические дефекты. Мы работаем официально, по
                  договору: ответственность за каждый проверенный узел
                  зафиксирована юридически. Подробнее о нашем инструментарии —
                  на странице{" "}
                  <Link href="/diagnostika/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                    выездной диагностики автомобиля
                  </Link>.
                </p>
              </div>

              {/* ──── H2: Подбор vs Диагностика ──── */}
              <section id="difference" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Чем подбор отличается от разовой диагностики?
                </h2>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                      <Search className="h-3.5 w-3.5" aria-hidden="true" />
                      Разовая диагностика
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Проверка <strong className="text-neutral-200">одного</strong> авто, которое
                      вы нашли сами. Вы скидываете ссылку — мы выезжаем. Часто
                      правда горькая, и деньги потрачены, чтобы не купить хлам.
                      Поиски, звонки, переговоры — на вас.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-primary-600/20 bg-primary-950/20 p-5">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-400">
                      <Target className="h-3.5 w-3.5" aria-hidden="true" />
                      Подбор под ключ
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      <strong className="text-neutral-200">Системный поиск</strong> лучшего
                      предложения на рынке. Вы утверждаете бюджет и модель. Мы
                      отсеиваем 90% мусора и показываем 2–3 финалистов, достойных
                      внимания.
                    </p>
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Доступ к закрытой информации
                </h3>
                <p className="mb-8 text-sm text-neutral-400 leading-relaxed">
                  В рамках подбора мы мониторим не только <strong className="text-neutral-200">av.by</strong> и{" "}
                  <strong className="text-neutral-200">bamper.by</strong>, но и закрытые чаты профессионального
                  сообщества и внутренние базы trade-in центров дилеров.
                  Лучшие машины выкупаются за 2 часа или до публикации. У нас есть
                  ресурсы перехватить такой вариант для вас.
                </p>
              </section>

              <Div />

              {/* ──── H2: Форматы работы ──── */}
              <section id="formats" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Форматы работы: выберите сценарий
                </h2>

                {/* Под ключ */}
                <div className="mb-5 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/30 to-surface-950 p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-primary-600 px-2.5 py-0.5 text-xs font-bold text-white">Флагман</span>
                    <h3 className="text-lg font-bold text-white">Пакет «Под ключ»</h3>
                  </div>
                  <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                    Для тех, кто ценит время. Не хотите разбираться в моторах VAG,
                    слушать сказки перекупщиков и тратить выходные на авторынках.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { icon: Search, label: "Осмотры", value: "Не ограничены" },
                      { icon: Users, label: "Ваше участие", value: "Минимальное" },
                      { icon: ShieldCheck, label: "Гарантия", value: "2 месяца (ДВС, КПП)" },
                      { icon: CircleDollarSign, label: "Цена", value: "900 BYN (фикс)" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                        <div>
                          <p className="text-xs text-neutral-500">{label}</p>
                          <p className="text-sm font-semibold text-neutral-200">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Эксперт на день */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    Услуга «Эксперт на день»
                  </h3>
                  <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                    Приехали из региона на 1–2 дня? Эксперт с полным оборудованием
                    (Launch, Etari, эндоскоп) в вашем распоряжении с 10:00 до 18:00.
                    До <strong className="text-neutral-200">10 осмотров</strong> за день.
                    Стоимость — <strong className="text-neutral-200">380 BYN</strong>{" "}
                    (экономия vs 7 разовых выездов &gt; 900 BYN).
                  </p>
                  <Link href="/podbor/expert-na-den/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300">
                    Подробнее об услуге «Эксперт на день»
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>

                {/* Image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/podbor-monitoring.jpg"
                    alt="Мониторинг рынка автомобилей — рабочее место эксперта по автоподбору в Минске"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </section>

              <Div />

              {/* ──── H2: Воронка ──── */}
              <section id="funnel" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Этапы подбора: воронка отсева
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Сотни машин входят в воронку — до вас доходят единицы.
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Заявка, консультация и Договор",
                      text: "Обсуждаем бюджет и желания честно. Фиксируем в договоре: марку, модель, год, пробег, допустимые дефекты.",
                      icon: FileText,
                    },
                    {
                      num: "02",
                      title: "Глубокий мониторинг рынка",
                      text: "Автоматические уведомления + анализ архивов продаж. Если авто уже продавалось со скрученным пробегом — чёрный список.",
                      icon: Search,
                    },
                    {
                      num: "03",
                      title: "Первичный отсев (Скрининг)",
                      text: "Проверка VIN (Carfax, BidFax), анализ фото (разнотон, оптика), звонок продавцу со специфическими вопросами. Экономия 70% времени.",
                      icon: Filter,
                    },
                    {
                      num: "04",
                      title: "Выездная диагностика",
                      text: "Кузов (силовые элементы), компьютерная диагностика (поток данных), тест-драйв. Подробности — на странице диагностики.",
                      icon: Wrench,
                      link: { href: "/diagnostika/", label: "Подробнее о диагностике" },
                    },
                    {
                      num: "05",
                      title: "Юридическая проверка",
                      text: "Реестр залогов, базы исполнительных производств, история регистраций. Критический этап перед задатком.",
                      icon: Scale,
                      link: { href: "/podbor/yuridicheskaya-chistota/", label: "Подробнее о юридической проверке" },
                    },
                    {
                      num: "06",
                      title: "Торг и сопровождение сделки",
                      text: "Аргументированный торг: «скиньте $500 — задние диски под замену, резина 2018 г.». Сопровождение при ДКП и в МРО ГАИ.",
                      icon: Handshake,
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 rounded-2xl border border-white/5 bg-surface-100 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600/15 text-sm font-bold text-primary-400">
                        {step.num}
                      </div>
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <step.icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                          <h3 className="text-sm font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">{step.text}</p>
                        {step.link && (
                          <Link href={step.link.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-400 transition-colors hover:text-primary-300">
                            {step.link.label}
                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Div />

              {/* ──── H2: Источники ──── */}
              <section id="sources" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Где мы ищем автомобили
                </h2>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: Users,
                      color: "text-emerald-400",
                      bg: "bg-emerald-500/10",
                      title: "Частные владельцы",
                      text: "Самый желанный сегмент: прозрачная история, «родное» обслуживание, честный пробег. Таких мало — наша задача быть первыми.",
                    },
                    {
                      icon: Car,
                      color: "text-amber-400",
                      bg: "bg-amber-500/10",
                      title: "Автохаусы и trade-in площадки",
                      text: "Неоднозначная категория. Есть честные площадки дилеров, есть «стоянки» с неликвидом. Мы знаем репутацию большинства площадок Минска.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-red-400",
                      bg: "bg-red-500/10",
                      title: "Перекупщики",
                      text: "Машина сияет, салон после химчистки, мотор помыт. Под блеском — часто «тотал». Мы отличаем «губы» от реального состояния.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-xl border border-white/10 bg-surface-100 p-4">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-neutral-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Div />

              {/* ──── H2: Что проверяем ──── */}
              <section id="checklist" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Что проверяем: инженерный подход
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Чек-лист из <strong className="text-neutral-200">140+ параметров</strong>.
                  Мы не полагаемся на интуицию — только показания приборов.
                </p>

                <div className="mb-6 space-y-3">
                  {[
                    {
                      icon: Eye,
                      title: "Кузов и ЛКП",
                      text: "Толщиномер Etari ET-700: магнитная шпатлёвка, оцинковка, заводские точки сварки, герметик, маркировка стёкол.",
                      link: { href: "/diagnostika/proverka-kuzova-lkp/", label: "Проверка кузова" },
                    },
                    {
                      icon: Cpu,
                      title: "Двигатель и электроника",
                      text: "Launch X431 V+: все блоки, коррекции форсунок, давление наддува, цепь ГРМ, температурные режимы АКПП.",
                      link: { href: "/diagnostika/kompyuternaya-diagnostika/", label: "Компьютерная диагностика" },
                    },
                    {
                      icon: Gauge,
                      title: "Реальный пробег",
                      text: "Скрутить приборку — $20. Вычистить все блоки (ABS, коробка, ключ, фары) — $500. Перекупы экономят. Мы — находим.",
                      link: { href: "/diagnostika/proverka-probega/", label: "Проверка пробега" },
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/5 bg-surface-100 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                      </div>
                      <p className="mb-2 text-sm text-neutral-400">{item.text}</p>
                      <Link href={item.link.href} className="inline-flex items-center gap-1 text-xs font-medium text-primary-400 transition-colors hover:text-primary-300">
                        {item.link.label}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Inline CTA */}
                <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                  <div className="mb-4 flex-1 sm:mb-0">
                    <p className="text-base font-bold text-white">Нужен подбор?</p>
                    <p className="mt-1 text-sm text-neutral-400">Бесплатная консультация по реальным ценам на вашу «хотелку»</p>
                  </div>
                  <Button href="/#quiz" variant="primary" size="md" className="shrink-0">
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </section>

              <Div />

              {/* ──── H2: Сравнение ──── */}
              <section id="comparison" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Сравнение вариантов работы
                </h2>

                <div className="mb-8 overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Параметр</th>
                        <th className="px-4 py-3 text-center font-semibold text-neutral-400">Разовая диагностика</th>
                        <th className="px-4 py-3 text-center font-semibold text-neutral-400">Эксперт на день</th>
                        <th className="px-4 py-3 text-center font-semibold text-primary-400">Подбор под ключ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Поиск объявлений", "Вы сами", "Вы + Эксперт", "Полностью мы"],
                        ["Предварительный прозвон", "Нет", "Да", "Да (глубокий фильтр)"],
                        ["Количество авто", "1", "5–10", "Не ограничено"],
                        ["Логистика", "Вы сами", "Возим вас", "Мы ездим сами"],
                        ["Фильтрация «хлама»", "Риск впустую", "Частично", "Полная"],
                        ["Торг с продавцом", "Да", "Да", "Да (максимальный)"],
                        ["Гарантия", "На момент осмотра", "На момент осмотра", "2 месяца (тех.)"],
                      ].map(([param, diag, expert, podbor], i) => (
                        <tr key={param} className={`border-b border-white/5 last:border-b-0 ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-4 py-2.5 font-medium text-neutral-200">{param}</td>
                          <td className="px-4 py-2.5 text-center text-neutral-500">{diag}</td>
                          <td className="px-4 py-2.5 text-center text-neutral-400">{expert}</td>
                          <td className="px-4 py-2.5 text-center font-semibold text-primary-400">{podbor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <Div />

              {/* ──── H2: Экономика ──── */}
              <section id="economics" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Экономика подбора: почему это выгодно?
                </h2>

                <div className="mb-6 rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary-400">$300–800</p>
                      <p className="mt-1 text-xs text-neutral-500">Средний торг для клиента</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">95%</p>
                      <p className="mt-1 text-xs text-neutral-500">Сделок окупают услугу</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-400">+$300</p>
                      <p className="mt-1 text-xs text-neutral-500">Средняя чистая экономия</p>
                    </div>
                  </div>
                </div>

                <p className="mb-8 text-sm text-neutral-400 leading-relaxed">
                  Пример: находим авто за $15 000, торгуемся до $14 400. Вы платите
                  нам ~$280, а экономите $600. Итог: проверенная машина, экономия
                  времени и нервов, и ещё в плюсе по деньгам.
                </p>

                {/* Deal image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/podbor-deal.jpg"
                    alt="Успешная сделка — эксперт передаёт документы клиенту у подобранного автомобиля"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </section>

              <Div />

              {/* ──── H2: Гарантии ──── */}
              <section id="guarantees" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Гарантии и Договор
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Работаем в правовом поле РБ. В договоре прописаны критерии
                  качества:
                </p>

                <div className="mb-6 space-y-2">
                  {[
                    { title: "Геометрия кузова", text: "Отсутствие нарушений силовой структуры и срабатывания Airbag." },
                    { title: "Юридическая чистота", text: "Отсутствие залогов, запретов и нахождения в розыске.", href: "/podbor/yuridicheskaya-chistota/" },
                    { title: "Техническая исправность", text: "Прозрачная история обслуживания и соответствие пробега." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-xl border border-white/5 bg-surface-100 p-4">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-neutral-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                    <p className="text-sm text-neutral-300">
                      Если после покупки выяснится, что эксперт пропустил дефект,
                      который можно было выявить нашим оборудованием, — мы несём{" "}
                      <strong className="text-white">материальную ответственность</strong>{" "}
                      вплоть до возврата стоимости услуг.
                    </p>
                  </div>
                </div>
              </section>

              <Div />

              {/* ──── H2: FAQ ──── */}
              <section id="faq" className="scroll-mt-24">
                <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
                  Часто задаваемые вопросы
                </h2>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      q: "Сколько времени занимает подбор авто?",
                      a: "В среднем — 7–14 дней. Популярные модели (VW Polo, Geely Coolray, Kia Rio) — за 3–5 дней. Редкие экземпляры (живой BMW X5 E70) — до месяца. Мы не торопим покупать первый попавшийся вариант.",
                      icon: Clock,
                    },
                    {
                      q: "Можно ли найти живую машину «по низу рынка»?",
                      a: "Чудес не бывает. «Низ рынка» — это всегда компромисс: ДТП, космический пробег или проблемы с документами. Если бюджет занижен — предложим скорректировать параметры, чтобы купить достойный автомобиль.",
                      icon: TrendingDown,
                    },
                    {
                      q: "Что если машина сломается после покупки?",
                      a: "Б/у авто — механизм с естественным износом. Мы гарантируем отсутствие критических скрытых дефектов на момент покупки. Плюс выдаём лист рекомендаций: что заменить в первую очередь (ГРМ, масла, диски).",
                      icon: HelpCircle,
                    },
                  ].map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl border border-white/10 bg-surface-100"
                    >
                      <summary className="flex cursor-pointer items-center gap-3 px-5 py-4 text-sm font-semibold text-white transition-colors hover:text-primary-400 [&::-webkit-details-marker]:hidden">
                        <item.icon className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                        <span className="flex-1">{item.q}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-open:rotate-90" aria-hidden="true" />
                      </summary>
                      <div className="border-t border-white/5 px-5 py-4">
                        <p className="text-sm text-neutral-400 leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <Div />

              {/* ──── Final CTA ──── */}
              <section className="scroll-mt-24">
                <div className="rounded-2xl border border-white/10 bg-surface-100 p-6 text-center sm:p-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
                    Не тратьте время на «автохлам»
                  </p>
                  <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    Доверьте поиск профессионалам
                  </h2>
                  <p className="mx-auto mb-6 max-w-lg text-sm text-neutral-400">
                    Рынок не прощает ошибок. Оставьте заявку — бесплатно
                    проконсультируем по реальным ценам и оценим шансы найти живой
                    экземпляр в ваш бюджет.
                  </p>
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button href="/#quiz" variant="primary" size="lg">
                      Получить консультацию
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button href={SITE.whatsapp} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                      <Send className="h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </section>

              {/* ═══ SEMANTIC COCOON ═══ */}
              <Div />
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">Смотрите также</h2>

                <Link href="/diagnostika/" className="mb-4 flex items-center gap-3 rounded-xl border border-primary-600/20 bg-primary-950/20 p-4 transition-colors hover:bg-primary-950/30">
                  <Search className="h-5 w-5 shrink-0 text-primary-400" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Выездная диагностика автомобиля</p>
                    <p className="text-xs text-neutral-500">Полный протокол: кузов, электроника, ходовая, юридика</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                </Link>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { href: "/podbor/expert-na-den/", label: "Эксперт на день", desc: "8 часов, до 10 осмотров, 380 BYN" },
                    { href: "/podbor/yuridicheskaya-chistota/", label: "Юридическая проверка", desc: "Залоги, аресты, VIN-сверка" },
                    { href: "/marki/", label: "Подбор по маркам", desc: "BMW, VAG, Mercedes, Geely — профильным ПО" },
                    { href: "/diagnostika/proverka-kuzova-lkp/", label: "Проверка кузова и ЛКП", desc: "Толщиномер Etari ET-700" },
                    { href: "/diagnostika/kompyuternaya-diagnostika/", label: "Компьютерная диагностика", desc: "Launch X431 V+ PRO" },
                    { href: "/diagnostika/endoskopiya-dvigatelya/", label: "Эндоскопия двигателя", desc: "Задиры ЦПГ, нагар, ГБЦ" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="group rounded-xl border border-white/10 bg-surface-100 p-4 transition-colors hover:border-primary-600/20">
                      <p className="mb-1 text-sm font-semibold text-neutral-200 transition-colors group-hover:text-primary-400">{link.label}</p>
                      <p className="text-xs text-neutral-500">{link.desc}</p>
                    </Link>
                  ))}
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
  return <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10" />;
}
