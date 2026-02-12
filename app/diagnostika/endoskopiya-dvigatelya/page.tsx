import {
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Shield,
  Search,
  Eye,
  Phone,
  Send,
  ExternalLink,
  CheckCircle,
  XCircle,
  Gauge,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L3: /diagnostika/endoskopiya-dvigatelya/
// Cocoon:  L1 (/) → L2 (/diagnostika/) → THIS L3
// Siblings: proverka-kuzova-lkp, kompyuternaya-diagnostika, proverka-probega
// ============================================================

const TOC = [
  { id: "process", label: "Технология процесса" },
  { id: "pathologies", label: "Атлас патологий" },
  { id: "risk-group", label: "Группа риска моторов" },
  { id: "catalyst", label: "Эндоскопия катализатора" },
  { id: "compression", label: "Замер компрессии" },
  { id: "why", label: "Почему нельзя экономить" },
  { id: "pricing", label: "Стоимость" },
] as const;

export default function EndoskopiyaPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/endoskop-hero.jpg"
            alt="Видеоэндоскопия двигателя — эндоскоп вводится в свечной колодец"
            fill
            priority
            className="object-cover object-center"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/85 to-surface-950" />
        </div>

        <Container className="relative z-10 py-14 sm:py-18 lg:py-22">
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 sm:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-primary-400">Главная</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link href="/diagnostika/" className="transition-colors hover:text-primary-400">Выездная диагностика</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-neutral-300">Эндоскопия двигателя</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Видеоэндоскопия двигателя в&nbsp;Минске:{" "}
            <span className="text-gradient">заглянем в сердце мотора</span>
          </h1>

          {/* Intro — link to parent L2 */}
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Визуальный осмотр подкапотного пространства — лишь «фасад», который
            скрывает критический износ ЦПГ. <strong className="text-neutral-200">Видеоэндоскопия</strong> —
            единственный метод прямой неинвазивной диагностики без разборки
            двигателя. Мы используем профессиональные артикуляционные зонды Full&nbsp;HD.
            Это ключевой элемент{" "}
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
              { icon: Eye, text: "Full HD зонд 180°" },
              { icon: Gauge, text: "Замер компрессии" },
              { icon: Shield, text: "Фото/видео отчёт" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 sm:text-sm">
                <Icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />
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
            {/* Sidebar */}
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
                  <p className="mb-2 text-sm font-semibold text-white">Нужна эндоскопия?</p>
                  <p className="mb-3 text-xs text-neutral-400">Записаться на осмотр ДВС</p>
                  <Button href={`tel:${SITE.phone}`} variant="primary" size="sm" className="w-full">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Позвонить
                  </Button>
                </div>
              </div>
            </aside>

            <article className="min-w-0">

              {/* ──── Технология процесса ──── */}
              <section id="process" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Технология процесса: как мы проводим осмотр
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  В отличие от дешевых USB-камер с фокусом 5–10 см, мы используем зонды
                  с управляемой дистальной частью (поворот на 180° в обе стороны).
                  Данные с камеры анализируются совместно с результатами{" "}
                  <Link href="/diagnostika/kompyuternaya-diagnostika/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                    компьютерной диагностики
                  </Link>.
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">Протокол эндоскопии ЦПГ</h3>
                <div className="mb-8 space-y-3">
                  {[
                    { title: "Подготовка", text: "Осмотр на остывшем двигателе (ГБЦ не выше 40-50°C) — защита оптики и отсутствие искажений от паров масла." },
                    { title: "Стенки цилиндров", text: "Ищем состояние хонинговки (заводской сетки). Её отсутствие или продольные полосы (задиры) — деградация смазки или перегрев." },
                    { title: "Поршни", text: "Оценка нагара и «мытых» зон. Идеально чистые края поршня — признак попадания антифриза или критического «масложора»." },
                    { title: "Клапанный механизм", text: "Камера разворачивается вверх: впускные клапаны на «шубу» из нагара (GDI/TSI), выпускные — на прогар." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/5 bg-surface-100 p-4">
                      <p className="mb-1 text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-neutral-400">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Inline image — endoscope screen */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/endoskop-cylinder.jpg"
                    alt="Монитор эндоскопа Full HD — осмотр внутренней поверхности цилиндра двигателя"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </section>

              <Div />

              {/* ──── Атлас патологий ──── */}
              <section id="pathologies" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Атлас патологий двигателя
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Типовые неисправности, которые невозможно выявить без эндоскопии:
                </p>

                <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Дефект</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Значение для владельца</th>
                        <th className="px-4 py-3 text-center font-semibold text-neutral-300">Вердикт</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        ["Задиры (Scuffing)", "Глубокие борозды на зеркале цилиндра. Потеря компрессии и стук мотора.", "reject", "Отказ"],
                        ["Масляный туман", "Свежее масло на стенках и клапанах. Износ маслосъёмных колпачков или колец.", "warn", "Торг от $500"],
                        ["Трещины ГБЦ", "Микротрещины между клапанами. Риск перегрева и смешивания жидкостей.", "reject", "Критично"],
                        ["Нагар (Carbon)", "Снижение пропускной способности впуска. Потеря мощности, детонация.", "warn", "Чистка"],
                      ] as const).map(([defect, desc, severity, verdict], i) => (
                        <tr key={defect} className={`border-b border-white/5 last:border-b-0 ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-4 py-3 font-medium text-neutral-200">{defect}</td>
                          <td className="px-4 py-3 text-neutral-400">{desc}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              severity === "reject"
                                ? "bg-red-500/15 text-red-400"
                                : "bg-amber-500/15 text-amber-400"
                            }`}>
                              {severity === "reject" ? (
                                <XCircle className="h-3 w-3" aria-hidden="true" />
                              ) : (
                                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                              )}
                              {verdict}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <Div />

              {/* ──── Группа риска ──── */}
              <section id="risk-group" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Группа риска: кому эндоскопия обязательна?
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Двигатели, конструктивно склонные к преждевременному износу ЦПГ.
                  Если вы покупаете авто с одним из этих моторов — эндоскопия не
                  рекомендация, а необходимость.
                </p>

                <div className="mb-8 space-y-3">
                  {[
                    { brand: "Hyundai / Kia", motors: "G4KD, G4NA, G4KJ", text: "Серии Theta II и Nu — задиры из-за разрушения катализатора и проблем со смазкой." },
                    { brand: "BMW", motors: "N20, N47, N63", text: "Трещины ГБЦ, износ цилиндров и контроль цепей ГРМ через заливную горловину." },
                    { brand: "VAG", motors: "1.8/2.0 TSI ранних серий", text: "Нагар на клапанах и состояние «зеркала» при высоком расходе масла." },
                    { brand: "Porsche", motors: "M48.00/50", text: "V8 — задиры в 7-м и 8-м цилиндрах, классическая проблема серии." },
                  ].map((item) => (
                    <div key={item.brand} className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400" aria-hidden="true" />
                        <p className="text-sm font-bold text-white">{item.brand} <span className="font-normal text-neutral-400">({item.motors})</span></p>
                      </div>
                      <p className="pl-6 text-sm text-neutral-400">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Inline CTA */}
                <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                  <div className="mb-4 flex-1 sm:mb-0">
                    <p className="text-base font-bold text-white">Ваш мотор в группе риска?</p>
                    <p className="mt-1 text-sm text-neutral-400">Запишитесь на эндоскопию — результат через 30 минут</p>
                  </div>
                  <Button href="/#quiz" variant="primary" size="md" className="shrink-0">
                    Записаться
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </section>

              <Div />

              {/* ──── Катализатор ──── */}
              <section id="catalyst" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Эндоскопия катализатора: предотвращаем «смерть» мотора
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Разрушение керамического элемента каталитического нейтрализатора —
                  главная причина капремонта. Керамическая пыль через EGR попадает
                  в камеру сгорания, действуя как абразив, «срезающий» хонинговку за
                  считанные часы.
                </p>

                <ul className="mb-8 space-y-2 text-sm text-neutral-400">
                  {[
                    { bold: "Метод:", text: "Выкручиваем верхний лямбда-зонд и вводим эндоскоп к сотам катализатора." },
                    { bold: "Признаки:", text: "Оплавление сот, «кратеры», крошение керамики, разрушение центральной части." },
                    { bold: "Актуально для РБ:", text: "Часто встречаются авто с «выбитыми» катами и обманками. Визуально подтверждаем наличие или отсутствие фильтрующего элемента." },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 shrink-0 text-primary-500">•</span>
                      <span><strong className="text-neutral-200">{item.bold}</strong> {item.text}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <Div />

              {/* ──── Компрессия ──── */}
              <section id="compression" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Замер компрессии: цифровое подтверждение
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Эндоскопия даёт картинку, а замер компрессии — оцифровывает
                  состояние поршневой. Проводим в связке с видеоосмотром при
                  подозрительных признаках.
                </p>

                <ol className="mb-8 space-y-3">
                  {[
                    { step: "01", title: "Прогрев до 80-90°C", text: "Строго на горячем двигателе — холодный замер не информативен." },
                    { step: "02", title: "«Сухой» и «мокрый» замер", text: "Если компрессия ниже нормы, добавляем 5-10 мл масла. Выросла — проблема в кольцах. Нет — в клапанах или прокладке ГБЦ." },
                    { step: "03", title: "Разброс между цилиндрами", text: "Норма — не более 1 бар. Больший разброс — скорое «троение» и нестабильная работа." },
                  ].map((s) => (
                    <li key={s.step} className="flex gap-4 rounded-xl border border-white/10 bg-surface-100 p-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">{s.step}</span>
                      <div>
                        <p className="font-semibold text-white">{s.title}</p>
                        <p className="mt-1 text-sm text-neutral-400">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <Div />

              {/* ──── Почему нельзя экономить ──── */}
              <section id="why" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Почему нельзя экономить на эндоскопии?
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Контрактный двигатель — от <strong className="text-neutral-200">$2 500</strong>,
                  капремонт с гильзовкой — <strong className="text-neutral-200">$4 000+</strong>.
                  Цена эндоскопии (80–120 BYN) — ничтожная инвестиция в спокойствие.
                </p>

                <p className="mb-3 text-sm font-semibold text-white">Эндоскопия обязательна:</p>
                <ul className="mb-8 space-y-2">
                  {[
                    "При покупке авто с пробегом более 100 000 км",
                    "При посторонних звуках (стук, цокот) на холодную",
                    "Если модель двигателя входит в «группу риска»",
                    "При расходе масла более 300 мл на 1000 км",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </section>

              <Div />

              {/* ──── Цены ──── */}
              <section id="pricing" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Стоимость эндоскопии в Минске
                </h2>

                <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Тип двигателя</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Что включено</th>
                        <th className="px-4 py-3 text-right font-semibold text-neutral-300">Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Рядный 4-цилиндровый", "Осмотр ЦПГ + отчёт фото/видео", "от 90 BYN"],
                        ["V-образный 6-цилиндровый", "6 цилиндров + клапаны", "от 150 BYN"],
                        ["V8 / Оппозитные", "Полный осмотр всех камер", "от 220 BYN"],
                        ["Проверка катализатора", "Через отверстие лямбда-зонда", "+30 BYN"],
                      ].map(([type, includes, price], i) => (
                        <tr key={type} className={`border-b border-white/5 last:border-b-0 ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-4 py-3 font-medium text-neutral-200">{type}</td>
                          <td className="px-4 py-3 text-neutral-400">{includes}</td>
                          <td className="px-4 py-3 text-right font-semibold text-primary-400">{price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary + CTA */}
                <div className="mb-8 rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5 sm:p-6">
                  <h3 className="mb-3 text-lg font-bold text-white">
                    Получите экспертное заключение
                  </h3>
                  <p className="mb-5 text-sm text-neutral-400 leading-relaxed">
                    По итогам — профессиональное резюме по каждому цилиндру и чёткий
                    ответ: стоит ли покупать или двигатель доживает последние тысячи
                    километров. Это часть нашего{" "}
                    <Link href="/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                      профессионального автоподбора в Минске
                    </Link>.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button href="/#quiz" variant="primary" size="lg">
                      Записаться на эндоскопию
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button href={SITE.whatsapp} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                      <Send className="h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </section>

              {/* ═══ SEMANTIC COCOON: siblings + parent ═══ */}
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

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { href: "/diagnostika/proverka-kuzova-lkp/", label: "Проверка кузова и ЛКП", desc: "Толщиномер, геометрия, скрытые ДТП" },
                    { href: "/diagnostika/kompyuternaya-diagnostika/", label: "Компьютерная диагностика", desc: "Launch X431, Live Data, ошибки DTC" },
                    { href: "/diagnostika/proverka-probega/", label: "Проверка пробега", desc: "Дубли в ЭБУ, моточасы, базы данных" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="group rounded-xl border border-white/10 bg-surface-100 p-4 transition-colors hover:border-primary-600/20">
                      <p className="mb-1 text-sm font-semibold text-neutral-200 transition-colors group-hover:text-primary-400">{link.label}</p>
                      <p className="text-xs text-neutral-500">{link.desc}</p>
                    </Link>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">С этой услугой заказывают</p>
                  <Link href="/#services" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300">
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
  return <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10" />;
}
