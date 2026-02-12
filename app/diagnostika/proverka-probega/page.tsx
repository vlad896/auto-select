import {
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Shield,
  Cpu,
  Search,
  Database,
  Phone,
  Send,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L3 Page: /diagnostika/proverka-probega/
// Semantic cocoon:
//   Grandparent (L1): / (Homepage)
//   Parent (L2):      /diagnostika/
//   THIS (L3):        /diagnostika/proverka-probega/
//   Siblings (L3):
//     /diagnostika/proverka-kuzova-lkp/
//     /diagnostika/kompyuternaya-diagnostika/
//     /diagnostika/endoskopiya-dvigatelya/
// ============================================================

// TOC items for this article
const TOC = [
  { id: "digital", label: "Цифровой поиск пробега" },
  { id: "physical", label: "Физические маркеры износа" },
  { id: "databases", label: "Проверка по базам данных" },
  { id: "forensics", label: "Криминалистический анализ" },
  { id: "consequences", label: "Последствия скрутки" },
  { id: "summary", label: "Как защитить себя" },
] as const;

export default function ProverkaProbegaPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ HERO + BREADCRUMBS ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/probeg-hero.jpg"
            alt="Проверка пробега автомобиля — одометр на приборной панели"
            fill
            priority
            className="object-cover object-center"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/85 to-surface-950" />
        </div>

        <Container className="relative z-10 py-14 sm:py-18 lg:py-22">
          {/* Breadcrumbs (3 levels) */}
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 sm:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-primary-400">
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
            <span className="text-neutral-300">Проверка пробега</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Как проверить реальный пробег автомобиля:{" "}
            <span className="text-gradient">методы детекции скруток</span>
          </h1>

          {/* Intro — link to parent L2 (semantic cocoon) */}
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            До <strong className="text-neutral-200">40% подержанных автомобилей</strong> на
            рынках Беларуси имеют «омоложенную» историю. Однако современный
            автомобиль — сложная сеть контроллеров, и стереть данные изо всех
            точек практически невозможно без замены блоков управления. В рамках{" "}
            <Link
              href="/diagnostika/"
              className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
            >
              выездной диагностики автомобиля
            </Link>{" "}
            мы проводим комплексную верификацию пробега, сопоставляя цифровые
            отпечатки в памяти ЭБУ с физическим износом узлов.
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Cpu, text: "10+ блоков проверки" },
              { icon: Database, text: "Базы РБ, РФ, ЕС" },
              { icon: Shield, text: "Доказательный отчёт" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ ARTICLE BODY ═══ */}
      <div className="bg-surface-950">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10 xl:grid-cols-[280px_1fr] xl:gap-14">
            {/* Sidebar */}
            <aside className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-[calc(5rem+var(--promo-h,0px))]">
                {/* TOC */}
                <nav
                  className="rounded-2xl border border-white/10 bg-surface-100 p-5"
                  aria-label="Содержание статьи"
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

                {/* Sidebar CTA */}
                <div className="mt-4 rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5">
                  <p className="mb-2 text-sm font-semibold text-white">
                    Подозреваете скрутку?
                  </p>
                  <p className="mb-3 text-xs text-neutral-400">
                    Эксперт проверит пробег за 30 минут
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

            {/* Article */}
            <article className="min-w-0">

              {/* ──── H2: Цифровой поиск ──── */}
              <section id="digital" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Технология цифрового поиска: где прячется настоящий пробег?
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Профессиональная проверка пробега сканером{" "}
                  <strong className="text-neutral-200">Launch X431 V+</strong> или
                  дилерским софтом (ISTA, ODIS) заключается не в чтении цифр на
                  одометре, а в поиске «активных дублей» и временных меток в
                  периферийных блоках. Подробнее о сканере:{" "}
                  <Link
                    href="/diagnostika/kompyuternaya-diagnostika/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    компьютерная диагностика автомобиля
                  </Link>
                  .
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Анализ сервисных данных в блоках управления
                </h3>
                <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                  Большинство современных марок (VAG, BMW, Mercedes, Volvo)
                  дублируют пробег в нескольких независимых точках:
                </p>

                <div className="mb-6 space-y-3">
                  {[
                    {
                      title: "Блок АКПП/DSG",
                      text: "В памяти трансмиссии фиксируется пробег адаптаций сцеплений. «Скрутчики» часто забывают почистить этот блок — видим разницу в 50–70 тыс. км.",
                    },
                    {
                      title: "Блок ABS/ESP",
                      text: "Колесные датчики постоянно передают пройденный путь. Данные хранятся в энергонезависимой памяти блока стабилизации.",
                    },
                    {
                      title: "Система SRS (Airbag)",
                      text: "При срабатывании или записи ошибки блок фиксирует точный пробег события. Если SRS помнит 180 000, а одометр показывает 90 000 — скрутка.",
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

                <h3 className="mb-3 text-xl font-bold text-white">
                  Расчёт по моточасам и средней скорости
                </h3>
                <p className="mb-3 text-sm text-neutral-400 leading-relaxed">
                  Для авто, где электронные дубли стёрты, — математический метод:
                </p>
                <ol className="mb-6 space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600/15 text-xs font-bold text-primary-400">
                      1
                    </span>
                    Из ЭБУ двигателя извлекаем показатель «Общее время работы» (моточасы).
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600/15 text-xs font-bold text-primary-400">
                      2
                    </span>
                    Пробег на одометре делим на моточасы = средняя скорость.
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600/15 text-xs font-bold text-primary-400">
                      3
                    </span>
                    <span>
                      Норма для Минска: <strong className="text-neutral-200">25–35 км/ч</strong>.
                      Менее 20 или более 60 — повод для подозрений.
                    </span>
                  </li>
                </ol>

                {/* Inline image — scanner data */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/probeg-scanner-data.jpg"
                    alt="Сканер показывает расхождение пробега в блоках ECU — обнаружена скрутка одометра"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </section>

              <Divider />

              {/* ──── H2: Физический износ ──── */}
              <section id="physical" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Физические маркеры износа: когда металл не врёт
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Цифры можно изменить, но износ материалов подчиняется законам
                  физики. Мы сопоставляем программные данные с физическим
                  состоянием интерьера и агрегатов. Это часть комплексной{" "}
                  <Link
                    href="/diagnostika/proverka-kuzova-lkp/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    проверки кузова и ЛКП
                  </Link>
                  .
                </p>

                {/* Wear reference table */}
                <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Пробег
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Визуальные и технические индикаторы
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "0–50 тыс.",
                          "Заводская резина (DOT совпадает с годом выпуска), нет блеска на руле, износ дисков до 0.5 мм",
                        ],
                        [
                          "50–100 тыс.",
                          "Лёгкий глянец на коже руля, замена передних колодок, сколы на капоте",
                        ],
                        [
                          "100–150 тыс.",
                          "Износ боковины водительского сиденья, помутнение фар, износ дисков > 1.5 мм, 2-я замена ГРМ",
                        ],
                        [
                          "200 тыс.+",
                          "Затёртость педалей, просиженная подушка сиденья, люфты петель, критическая выработка дисков",
                        ],
                      ].map(([km, desc], i) => (
                        <tr
                          key={km}
                          className={`border-b border-white/5 last:border-b-0 ${
                            i % 2 ? "bg-white/[0.02]" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-primary-400 whitespace-nowrap">
                            {km}
                          </td>
                          <td className="px-4 py-3 text-neutral-400">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <Divider />

              {/* ──── H2: Базы данных ──── */}
              <section id="databases" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Документальный и сетевой аудит: проверка по базам
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Цифровые следы остаются не только в блоках автомобиля, но и на
                  серверах сервисных центров, страховых и аукционов. В 2026 году
                  интеграция баз позволяет нам выявить несоответствие даже после
                  «зачистки» на дилерском уровне.
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Сервисная история дилерских центров
                </h3>
                <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                  Для авто из Европы (Германия, Бельгия, Нидерланды) мы
                  используем доступ к официальным историям: <strong className="text-neutral-200">AOS
                  для BMW</strong>, <strong className="text-neutral-200">erWin для VAG</strong>. Если
                  в 2024 в Мюнхене было 180 000 км, а в 2026 в Минске продаётся
                  с 120 000 — факт мошенничества доказуем. Современные ключи BMW
                  и Mercedes хранят пробег и сервисные данные.
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Закрытые базы техосмотров и страховых
                </h3>
                <div className="mb-6 space-y-3">
                  {[
                    {
                      title: "Базы Белтехосмотра",
                      text: "Фиксация пробега при прохождении ежегодного ТО.",
                    },
                    {
                      title: "Страховые расчёты (Audatex/Eurotax)",
                      text: "При оценке ущерба после ДТП комиссар фиксирует одометр. Мы находим записи, где на 200к км случай произошёл за год до продажи «сотки».",
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

                {/* Inline CTA */}
                <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                  <div className="mb-4 flex-1 sm:mb-0">
                    <p className="text-base font-bold text-white">
                      Проверим пробег вашего авто
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">
                      Сканирование 10+ блоков + пробив по базам РБ, РФ и ЕС
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

              <Divider />

              {/* ──── H2: Криминалистика ──── */}
              <section id="forensics" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Криминалистический анализ: следы вмешательства
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Когда программные методы не дают 100% уверенности, мы переходим
                  к физическому осмотру узлов, которые демонтируются для
                  подключения к микросхемам памяти (EEPROM/Flash).
                </p>

                <ul className="mb-6 space-y-2 text-sm text-neutral-400">
                  {[
                    {
                      bold: "Следы на приборной панели:",
                      text: "Целостность крепежных винтов и задиры на пластике вокруг «приборки». Если панель снималась — максимально глубокий поиск.",
                    },
                    {
                      bold: "Следы пайки на платах:",
                      text: "При подозрении на «кан-фильтр» (устройство, останавливающее пробег в реальном времени) ищем нештатную проводку за щитком или в районе OBD-II.",
                    },
                    {
                      bold: "DOT-код шин:",
                      text: "Косвенный, но точный метод. Если на одометре 40 000, а шины 5-летние с износом 80% — пробег гарантированно выше 80-90 тысяч.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 shrink-0 text-primary-500">•</span>
                      <span>
                        <strong className="text-neutral-200">{item.bold}</strong>{" "}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <Divider />

              {/* ──── H2: Последствия ──── */}
              <section id="consequences" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Последствия покупки авто со скрученным пробегом
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  «Омоложенный» одометр — прямая угроза бюджету и безопасности:
                </p>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: AlertTriangle,
                      color: "text-red-400",
                      title: "Нарушение регламента ГРМ",
                      text: "Рассчитываете проехать 20к до замены ремня, но по факту он прошёл ресурс. Обрыв = капремонт двигателя.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-amber-400",
                      title: "Одновременный отказ агрегатов",
                      text: "Турбины, форсунки и DPF/EGR имеют дедлайн. Скрутка маскирует его — все сыпется разом.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-amber-400",
                      title: "Проблемы при перепродаже",
                      text: "Современные покупатели легко выявляют скрутку. Продать можно будет только со значительным дисконтом.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded-xl border border-white/10 bg-red-500/5 p-4"
                    >
                      <item.icon
                        className={`mt-0.5 h-5 w-5 shrink-0 ${item.color}`}
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
              </section>

              <Divider />

              {/* ──── H2: Резюме ──── */}
              <section id="summary" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Резюме: как защитить себя?
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Проверка пробега — не одна операция, а синтез данных из{" "}
                  <strong className="text-neutral-200">10+ источников</strong>.
                  Наша команда в Минске предоставляет комплексный отчёт, в
                  котором каждое утверждение подкреплено скриншотом из ЭБУ или
                  выпиской из базы данных. Это неотъемлемая часть нашего{" "}
                  <Link
                    href="/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    профессионального автоподбора в Минске
                  </Link>
                  .
                </p>

                {/* Final CTA */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-surface-100 p-6 text-center sm:p-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
                    Подозреваете скрутку?
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    Закажите проверку пробега
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-sm text-neutral-400">
                    Сканируем все блоки управления, сверяем моточасы, проверяем
                    базы РБ и ЕС. Результат — через 30 минут.
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

              {/* ══════════════════════════════════════════════
                  SEMANTIC COCOON: sibling L3 pages
                  ══════════════════════════════════════════════ */}
              <Divider />

              <section>
                <h2 className="mb-4 text-xl font-bold text-white">
                  Смотрите также
                </h2>

                {/* Parent L2 page */}
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
                      Полный протокол проверки: кузов, электроника, ходовая,
                      юридика
                    </p>
                  </div>
                  <ArrowRight
                    className="ml-auto h-4 w-4 shrink-0 text-primary-500"
                    aria-hidden="true"
                  />
                </Link>

                {/* Sibling L3 pages */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      href: "/diagnostika/proverka-kuzova-lkp/",
                      label: "Проверка кузова и ЛКП",
                      desc: "Толщиномер, геометрия, скрытые ДТП",
                    },
                    {
                      href: "/diagnostika/kompyuternaya-diagnostika/",
                      label: "Компьютерная диагностика",
                      desc: "Launch X431, чтение блоков, Live Data",
                    },
                    {
                      href: "/diagnostika/endoskopiya-dvigatelya/",
                      label: "Эндоскопия двигателя",
                      desc: "Задиры, нагар, износ ЦПГ",
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

                {/* Link to service */}
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

// ============================================================
// Sub-components
// ============================================================

function Divider() {
  return (
    <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10" />
  );
}
