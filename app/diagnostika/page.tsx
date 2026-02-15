import {
  ChevronRight,
  ArrowRight,
  Phone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  MapPin,
  Clock,
  FileText,
  Shield,
  Send,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { DiagTableOfContents } from "@/components/diagnostika/DiagTableOfContents";

// ============================================================
// L2 Page: /diagnostika/
// Semantic cocoon structure:
//   Mother (L1): / (Homepage — "Автоподбор в Минске")
//   This page (L2): /diagnostika/
//   Children (L3):
//     /diagnostika/proverka-kuzova-lkp/
//     /diagnostika/kompyuternaya-diagnostika/
//     /diagnostika/proverka-probega/
//     /diagnostika/endoskopiya-dvigatelya/
//   Siblings (L2): /podbor-pod-klyuch/, /yuridicheskaya-proverka/
// ============================================================

export default function DiagnostikaPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ HERO + BREADCRUMBS ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/diag-hero-bg.jpg"
            alt="Выездная диагностика автомобиля — осмотр на подъёмнике"
            fill
            priority
            className="object-cover object-center"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/80 to-surface-950" />
        </div>

        <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
          {/* Breadcrumbs */}
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex items-center gap-1.5 text-xs text-neutral-500 sm:text-sm"
          >
            <Link
              href="/"
              className="transition-colors hover:text-primary-400"
            >
              Главная
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-neutral-300">Выездная диагностика</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Выездная диагностика автомобиля перед покупкой в&nbsp;Минске:{" "}
            <span className="text-gradient">инженерный аудит</span>
          </h1>

          {/* Intro with link to mother page (semantic cocoon) */}
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Покупка подержанного транспорта в Беларуси в 2026 году окончательно
            превратилась в игру с отрицательной суммой для неподготовленного
            покупателя. Средний слой «косметики» скрывает критическую усталость
            металла, а софт для корректировки одометров позволяет «омолодить»
            машину прямо перед показом. Выездная диагностика сегодня — это
            полноценный аудит, где первичным является не блеск лака, а лог-файлы
            из блоков управления и показания приборов в микронах. Это ключевой
            этап{" "}
            <Link
              href="/"
              className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
            >
              профессионального автоподбора в&nbsp;Минске
            </Link>
            .
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-500 sm:text-base">
            Мы работаем по методологии <strong className="text-neutral-300">доказательного осмотра</strong>.
            Каждый вывод эксперта подтверждается фотофиксацией замера или
            скриншотом диагностического протокола. Наша задача — составить карту
            дефектов, которая позволит вам либо отказаться от неликвида, либо
            обоснованно сбросить цену.
          </p>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: Shield, text: "140+ пунктов проверки" },
              { icon: Clock, text: "Выезд за 60 минут" },
              { icon: FileText, text: "Отчёт 100+ фото" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-300 sm:text-sm"
              >
                <Icon
                  className="h-4 w-4 text-primary-500"
                  aria-hidden="true"
                />
                {text}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ ARTICLE BODY ═══ */}
      <div className="bg-surface-950">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 xl:grid-cols-[300px_1fr] xl:gap-14">
            {/* Sidebar: Table of Contents (sticky on desktop) */}
            <aside className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-[calc(5rem+var(--promo-h,0px))]">
                <DiagTableOfContents />

                {/* Sidebar CTA */}
                <div className="mt-5 rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5">
                  <p className="mb-3 text-sm font-semibold text-white">
                    Нужна проверка?
                  </p>
                  <p className="mb-4 text-xs text-neutral-400">
                    Эксперт выедет на осмотр в течение 60 минут
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

            {/* Article content */}
            <article className="min-w-0">
              {/* ──── H2: Техническая экспертиза ──── */}
              <section id="protocol" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Техническая экспертиза: протокол глубокой проверки
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Инженерный подход к диагностике исключает интуицию. Мы
                  используем стандартизированный протокол, разделенный на
                  аппаратно-программную проверку и физический контроль геометрии.
                  Это единственный способ верифицировать состояние агрегата, когда
                  продавец намеренно стёр ошибки (<strong className="text-neutral-200">DTC</strong>) перед
                  вашим приездом.
                </p>

                {/* CTA: Download diagnostic sheet */}
                <div className="mb-8 rounded-xl border border-white/10 bg-surface-100 p-4 sm:flex sm:items-center sm:gap-4 sm:p-5">
                  <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600/15 text-primary-400 sm:mb-0">
                    <Download className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      Скачать пример диагностического листа
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      PDF, 2.4 МБ — протокол на 140+ пунктов проверки
                    </p>
                  </div>
                  <Button variant="primary" size="sm" className="mt-3 sm:mt-0">
                    Скачать
                  </Button>
                </div>

                {/* Image: scanner */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/diag-scanner-launch.jpg"
                    alt="Проверка BMW G30 сканером Launch X431 в Минске — чтение блоков управления"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>

                {/* H3: Компьютерное сканирование */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  Компьютерное сканирование систем сканером Launch&nbsp;X431&nbsp;V+
                </h3>
                <p className="mb-4 text-neutral-400 leading-relaxed">
                  Для работы мы используем мультимарочные сканеры{" "}
                  <strong className="text-neutral-200">Launch X431 V+</strong> с актуальными базами
                  2026 года. В отличие от дешевых ELM-адаптеров, профессиональный
                  софт позволяет не просто «потереть чеки», а заглянуть в
                  глубокие потоки данных (Data Stream). Подробнее об аппаратной
                  части:{" "}
                  <Link
                    href="/diagnostika/kompyuternaya-diagnostika/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    компьютерная диагностика автомобиля
                  </Link>
                  .
                </p>

                <ul className="mb-6 space-y-3">
                  {[
                    {
                      title: "Анализ «стоп-кадров» (Freeze Frame)",
                      text: "Даже если активных ошибок нет, мы ищем записи в архивах. Перегрев масла в АКПП или пропуск зажигания — повод для эндоскопирования.",
                    },
                    {
                      title: "Сверка пробега в дублях",
                      text: "Мы лезем в блок управления светом (FRM), систему ABS, блок комфорта и память ключа. Несоответствие часов наработки в блоке SRS и общего пробега — прямой признак «скрутки».",
                    },
                    {
                      title: "Тесты исполнительных механизмов",
                      text: "Принудительный запуск вентиляторов, проверка фазовращателей и работа актуатора турбины — выявляем износ без тест-драйва.",
                    },
                  ].map((item) => (
                    <li
                      key={item.title}
                      className="rounded-xl border border-white/5 bg-surface-100 p-4"
                    >
                      <p className="mb-1 text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-neutral-400">{item.text}</p>
                    </li>
                  ))}
                </ul>

                {/* H4: Live Data */}
                <h4 className="mb-2 text-lg font-semibold text-neutral-200">
                  Работа с параметрами в реальном времени (Live&nbsp;Data)
                </h4>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  При осмотре моторов с прямым впрыском (TSI/GDI) мы в
                  обязательном порядке смотрим{" "}
                  <strong className="text-neutral-200">коррекции топливных форсунок</strong>. Выход за
                  пределы ±1.5 мг/цикл — сигнал к замене дорогостоящего узла.
                  Для дизелей проверяем наполнение{" "}
                  <strong className="text-neutral-200">сажевого фильтра (DPF)</strong> и давление
                  дифференциального датчика.
                </p>

                <ArticleDivider />

                {/* H3: Инструментальный контроль кузова */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  Инструментальный контроль кузова: физика против маскировки
                </h3>
                <p className="mb-4 text-neutral-400 leading-relaxed">
                  Работа с толщиномером{" "}
                  <strong className="text-neutral-200">Etari ET-700</strong>{" "}
                  (флагман с определением цветных металлов и оцинковки) — это не
                  хаотичное прикладывание к деталям. Мы идём по «спирали»: от
                  крыши к порогам. Полный обзор методики:{" "}
                  <Link
                    href="/diagnostika/proverka-kuzova-lkp/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    детальная проверка кузова и ЛКП
                  </Link>
                  .
                </p>

                {/* Image: paint thickness */}
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/diag-paint-thickness.jpg"
                    alt="Замер толщины ЛКП толщиномером Etari на стойке авто — 152 микрона"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>

                {/* LKP reference table */}
                <p className="mb-3 text-sm font-semibold text-white">
                  Эталонные значения ЛКП (популярные бренды в РБ):
                </p>
                <div className="mb-6 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Марка
                        </th>
                        <th className="px-4 py-3 text-center font-semibold text-neutral-300">
                          Заводской (мкм)
                        </th>
                        <th className="px-4 py-3 text-center font-semibold text-neutral-300">
                          Вторичка (мкм)
                        </th>
                        <th className="px-4 py-3 text-center font-semibold text-neutral-300">
                          Шпатлёвка (мкм)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Toyota / Lexus", "80–110", "> 150", "> 300"],
                        ["VAG (VW, Audi)", "110–145", "> 190", "> 350"],
                        ["BMW / Mercedes", "120–160", "> 210", "> 400"],
                        ["Geely / BelGee", "90–125", "> 160", "> 300"],
                      ].map(([brand, factory, secondary, filler], i) => (
                        <tr
                          key={brand}
                          className={`border-b border-white/5 last:border-b-0 ${
                            i % 2 ? "bg-white/[0.02]" : ""
                          }`}
                        >
                          <td className="px-4 py-2.5 text-neutral-300">
                            {brand}
                          </td>
                          <td className="px-4 py-2.5 text-center text-neutral-400">
                            {factory}
                          </td>
                          <td className="px-4 py-2.5 text-center text-amber-400">
                            {secondary}
                          </td>
                          <td className="px-4 py-2.5 text-center text-red-400">
                            {filler}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* H4: hidden damage detection */}
                <h4 className="mb-2 text-lg font-semibold text-neutral-200">
                  Детекция скрытых повреждений геометрии
                </h4>
                <p className="mb-3 text-neutral-400 leading-relaxed">
                  Толщиномер бессилен, если деталь заменена на «тайвань» в цвет
                  или если стойку вварили по заводским точкам. Мы смотрим глубже:
                </p>
                <ul className="mb-8 space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Снятие уплотнителей:</strong> Проверка
                      заводской точки сварки на центральных стойках.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Анализ герметика:</strong> Заводской
                      герметик имеет специфическую зернистость, которую
                      невозможно повторить вручную.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Крепёж:</strong> Состояние граней на
                      болтах капота, крыльев и дверей — если задиры, деталь
                      снималась.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ──── H2: Агрегатная экспертиза ──── */}
              <section id="agregat" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Агрегатная экспертиза: ДВС, трансмиссия и&nbsp;навесное
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Силовая установка — это <strong className="text-neutral-200">60% остаточной стоимости</strong>{" "}
                  автомобиля. Наша задача — оценить «усталость» железа без
                  разборки. Мы используем косвенные методы измерения и
                  эндоскопический контроль, чтобы выявить критический износ ЦПГ
                  и масляное голодание турбин.
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Проверка двигателя: от эндоскопии до анализа картерных газов
                </h3>
                <p className="mb-4 text-neutral-400 leading-relaxed">
                  Малообъемные турбомоторы (EA211, BMW B-серии) требуют особого
                  протокола. Для моторов с высоким риском задиров (G4KD/G4NA,
                  Porsche) мы используем гибкие артикуляционные эндоскопы с
                  HD-камерой. Подробности:{" "}
                  <Link
                    href="/diagnostika/endoskopiya-dvigatelya/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    эндоскопия цилиндров видеоэндоскопом
                  </Link>
                  .
                </p>

                <ul className="mb-6 space-y-3">
                  {[
                    {
                      title: "Видеоэндоскопия цилиндров",
                      text: "Ищем задиры на стенках, оцениваем состояние хона, нагар на клапанах и масляные капли на турбине.",
                    },
                    {
                      title: "Анализ ГРМ",
                      text: "Через углы отклонения фазовращателей определяем степень растяжения цепи. В моторах VAG отклонение > -4° в 93-й группе — сигнал к замене.",
                    },
                    {
                      title: "Тест CO₂ в системе охлаждения",
                      text: "При подозрении на пробой прокладки ГБЦ — химический тестер. Изменение цвета реагента — факт попадания газов в антифриз.",
                    },
                  ].map((item) => (
                    <li
                      key={item.title}
                      className="rounded-xl border border-white/5 bg-surface-100 p-4"
                    >
                      <p className="mb-1 text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-neutral-400">{item.text}</p>
                    </li>
                  ))}
                </ul>

                <h4 className="mb-2 text-lg font-semibold text-neutral-200">
                  Диагностика трансмиссии: DSG, АКПП и вариаторы
                </h4>
                <p className="mb-3 text-neutral-400 leading-relaxed">
                  Проверка коробки в движении — лишь 20% информации. Мы
                  анализируем паспортные данные из ЭБУ трансмиссии:
                </p>
                <ul className="mb-8 space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Сцепления (DSG):</strong> Остаток дисков
                      в мм и количество адаптаций. Зазор ≤ 0.5 мм — замена
                      через 5-10 тыс. км.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Температурные режимы:</strong> Счётчик
                      перегревов масла. 120°C+ = деградация фрикционов.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Давление в пакетах:</strong> Анализ
                      наполнения муфт выявляет скрытые «пинки» до тест-драйва.
                    </span>
                  </li>
                </ul>

                {/* Inline CTA */}
                <InlineCTA />
              </section>

              {/* ──── H2: Юридический аудит ──── */}
              <section id="legal" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Юридический и документальный аудит
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Технически исправный автомобиль может стать пассивом, если он
                  обременен долговыми обязательствами или имеет криминальное
                  прошлое. Риск покупки залогового авто или «двойника» остается
                  актуальным из-за тесной интеграции рынков РБ и РФ.
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Сверка маркировок и VIN-номера
                </h3>
                <p className="mb-4 text-neutral-400 leading-relaxed">
                  Экспертный осмотр всех идентификационных площадок: поиск следов
                  вварки «панели-донора», проверка ЛКП вокруг номера рамы, сверка{" "}
                  <strong className="text-neutral-200">VIN</strong> в мозгах двигателя, приборной
                  панели и блоке SRS. Несоответствие хотя бы в одном блоке — 100%
                  признак криминала. Подробнее о верификации:{" "}
                  <Link
                    href="/diagnostika/proverka-probega/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    как мы проверяем реальный пробег
                  </Link>
                  .
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Проверка по закрытым и открытым базам данных
                </h3>
                <ul className="mb-8 space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Реестр залогов РБ и РФ</strong> — авто
                      как обеспечение по кредиту.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">База исполнительных производств</strong>{" "}
                      — долги перед ФСЗН и налоговой. ГАИ откажет в
                      регистрации ДКП.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">История страховых выплат</strong> — факт
                      ДТП + расчётная стоимость ремонта. $5 000 на «бампер» =
                      замена усилителя и радиаторов.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ──── H2: Ходовая ──── */}
              <section id="hodovaya" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Ходовая часть и тормозная система
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Стоимость восстановления многорычажных систем или
                  пневмостоек может достигать{" "}
                  <strong className="text-neutral-200">15-20% от цены машины</strong>. Мы проводим
                  детальный осмотр на подъёмнике или эстакаде.
                </p>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Пневмоподвеска и активные амортизаторы
                </h3>
                <ul className="mb-6 space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Герметичность:</strong> Анализ времени
                      срабатывания компрессора и поиск утечек в баллонах.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Демпфирование (EDC):</strong> Если
                      электромагнитный клапан «завис» — амортизатор
                      превращается в болванку.
                    </span>
                  </li>
                </ul>

                <h4 className="mb-2 text-lg font-semibold text-neutral-200">
                  Оценка тормозных механизмов
                </h4>
                <p className="mb-8 text-neutral-400 leading-relaxed text-sm">
                  Замер остаточной толщины дисков штангенциркулем. Выработка
                  более 2 мм от номинала — замена. Особое внимание тормозным
                  трубкам на коррозию: в авто из ЕС старше 7 лет это частая
                  причина отказа на техосмотре.
                </p>
              </section>

              {/* ──── H2: Электрооборудование ──── */}
              <section id="electro" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Электрооборудование и мультимедиа
                </h2>
                <p className="mb-4 text-neutral-400 leading-relaxed">
                  Современный автомобиль — сеть CAN-шин. Ошибки по питанию часто
                  являются признаком залития блоков управления или
                  неквалифицированного вмешательства в проводку.
                </p>
                <ul className="mb-6 space-y-2 text-sm text-neutral-400">
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">АКБ (SOH):</strong> Остаточный ресурс и
                      пусковой ток (CCA). Ток утечки в спящем режиме не должен
                      превышать 0.05А.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Климат-контроль:</strong> Давление в
                      системе кондиционирования + температура на выходе (норма
                      4-8°C).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 shrink-0 text-primary-500">•</span>
                    <span>
                      <strong className="text-neutral-200">Панорамная крыша/люки:</strong> Проверка
                      дренажей. Забитые дренажи VAG — частая причина выхода из
                      строя блоков под ногами водителя.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ──── H2: Кейсы ──── */}
              <section id="cases" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Реальные кейсы: цена ошибки
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Примеры из практики в Минске за последний месяц. Как приборы
                  выявляют то, что скрыто за идеальным внешним видом.
                </p>

                <div className="space-y-5 mb-8">
                  {/* Case 1 */}
                  <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-400">
                        Торг −$800
                      </span>
                      <span className="text-sm font-semibold text-white">
                        Geely Atlas Pro, 2022
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-neutral-500">
                      <strong className="text-neutral-300">Легенда:</strong>{" "}
                      «Машина на гарантии, один владелец, как новая»
                    </p>
                    <p className="mb-2 text-sm text-neutral-400">
                      <strong className="text-neutral-200">Вердикт:</strong> 12 ошибок
                      по BCM в Launch. Толщиномер: вторичный окрас заднего
                      правого крыла (180-200 мкм). Притирка, оформлена без
                      дилера.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle
                        className="h-4 w-4 text-green-400"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-green-400">
                        Куплен со скидкой $800
                      </span>
                    </div>
                  </div>

                  {/* Case 2 */}
                  <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400">
                        Отказ
                      </span>
                      <span className="text-sm font-semibold text-white">
                        Audi A6 C8, 3.0 TDI из Европы
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-neutral-500">
                      <strong className="text-neutral-300">Легенда:</strong>{" "}
                      «Пробег 140 000 км, вся история у дилера»
                    </p>
                    <p className="mb-2 text-sm text-neutral-400">
                      <strong className="text-neutral-200">Вердикт:</strong> В блоке
                      АКПП — запись об ошибке по давлению на пробеге 215 000 км.
                      Эндоскопия: запотевание у сальника коленвала.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle
                        className="h-4 w-4 text-red-400"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-red-400">
                        Отказ. Ремонт АКПП + течь: более $3 000
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ──── H2: Чек-лист 5 признаков (Featured Snippet target) ──── */}
              <section id="checklist" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Чек-лист: 5&nbsp;признаков, что от покупки стоит отказаться
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Если в ходе осмотра выявляется хотя бы один из этих пунктов —
                  вложения в восстановление экономически нецелесообразны.
                </p>

                {/* Structured as <ul><li> for SGE/Featured Snippets */}
                <ul className="mb-8 space-y-3">
                  {[
                    {
                      icon: AlertTriangle,
                      color: "text-red-400",
                      text: "Нарушение силовой структуры (лонжероны, стойки) — складки на металле, нештатные сварные швы, следы стапеля.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-red-400",
                      text: "Несоответствие пробега в электронных блоках > 50 000 км — профессиональная «скрутка».",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-red-400",
                      text: "Задиры в цилиндрах и критический нагар на клапанах — неминуемый капитальный ремонт.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-amber-400",
                      text: "Ошибки SRS (Airbag): резисторы-заглушки вместо подушек или программное отключение блока безопасности.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-amber-400",
                      text: "Юридические запреты: реестр залогов или исполнительные листы на владельце в базе ФСЗН.",
                    },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-xl border border-white/10 bg-red-500/5 p-4"
                    >
                      <item.icon
                        className={`mt-0.5 h-5 w-5 shrink-0 ${item.color}`}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-neutral-300">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ──── H2: Как заказать ──── */}
              <section id="order" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Как заказать выездную диагностику
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Процесс максимально упрощен. Вам не обязательно
                  присутствовать — 70% клиентов получают отчёты удалённо через
                  мессенджеры.
                </p>

                {/* Steps */}
                <ol className="mb-6 space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Первичный отсев",
                      text: "Присылаете ссылку на объявление (av.by, bamper.by). Мы анализируем фото и прозваниваем продавца.",
                    },
                    {
                      step: "02",
                      title: "Выезд эксперта",
                      text: "Специалист прибывает с полным комплектом: Launch, Etari, эндоскоп, стетоскоп.",
                    },
                    {
                      step: "03",
                      title: "Осмотр 60-120 минут",
                      text: "Полная проверка по протоколу 140+ пунктов с фотофиксацией каждого узла.",
                    },
                    {
                      step: "04",
                      title: "Отчёт в облаке",
                      text: "100+ фотографий, видео работы двигателя, скриншоты диагностики и резюме: «Рекомендовано», «С торгом» или «Не рекомендовано».",
                    },
                  ].map((s) => (
                    <li
                      key={s.step}
                      className="flex gap-4 rounded-xl border border-white/10 bg-surface-100 p-4 sm:p-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
                        {s.step}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{s.title}</p>
                        <p className="mt-1 text-sm text-neutral-400">
                          {s.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <h3 className="mb-3 text-xl font-bold text-white">
                  Территория обслуживания
                </h3>
                <p className="mb-8 text-neutral-400 leading-relaxed text-sm">
                  <MapPin
                    className="mr-1 inline h-4 w-4 text-primary-500"
                    aria-hidden="true"
                  />
                  Весь Минск (Малиновка, Ждановичи, автохаусы на Тимирязева),
                  Минская область и вся Беларусь по предварительной
                  договорённости.
                </p>
              </section>

              {/* ──── H2: Стоимость ──── */}
              <section id="pricing" className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Стоимость выездного осмотра в&nbsp;2026&nbsp;году
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Средняя стоимость составляет менее 1% от цены автомобиля. В
                  90% случаев эксперт находит недостатки, позволяющие снизить
                  цену в <strong className="text-neutral-200">3-5 раз</strong> от стоимости услуги.
                </p>

                {/* Pricing table */}
                <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Услуга
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">
                          Что включено
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-neutral-300">
                          Цена (BYN)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Разовый осмотр",
                          "Кузов, компьютер, тест-драйв, отчёт",
                          "от 130",
                        ],
                        [
                          "Эндоскопия ДВС",
                          "Осмотр цилиндров HD-камерой",
                          "от 80",
                        ],
                        [
                          "Юридический пробив",
                          "Базы залогов, ГАИ, страховые",
                          "30",
                        ],
                        [
                          "Эксперт на день",
                          "Неограниченно осмотров 9:00–18:00",
                          "380",
                        ],
                      ].map(([service, includes, price], i) => (
                        <tr
                          key={service}
                          className={`border-b border-white/5 last:border-b-0 ${
                            i % 2 ? "bg-white/[0.02]" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-neutral-200">
                            {service}
                          </td>
                          <td className="px-4 py-3 text-neutral-400">
                            {includes}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-primary-400">
                            {price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="mb-8 rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5 sm:p-6">
                  <h3 className="mb-3 text-lg font-bold text-white">
                    Почему профессиональная проверка окупается?
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex gap-2">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                        aria-hidden="true"
                      />
                      Страховка от «тотального» авто после тяжелого ДТП
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                        aria-hidden="true"
                      />
                      Защита от капремонта двигателя в первый месяц
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                        aria-hidden="true"
                      />
                      Гарантия постановки на учёт в ГАИ без проблем
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                        aria-hidden="true"
                      />
                      Сохранение рыночной стоимости при продаже
                    </li>
                  </ul>
                </div>

                {/* Final CTA */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-surface-100 p-6 text-center sm:p-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
                    Готовы проверить?
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    Записаться на выездную диагностику
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-sm text-neutral-400">
                    Выезжаем на осмотр в течение 2 часов. Оставьте заявку или
                    свяжитесь напрямую.
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
                      WhatsApp / Telegram
                    </Button>
                  </div>
                </div>
              </section>

              {/* ══════════════════════════════════════════════
                  SEMANTIC COCOON: Sibling pages block
                  ("Смотрите также" — links to sister L2 pages)
                  ══════════════════════════════════════════════ */}
              <section className="scroll-mt-24">
                <ArticleDivider />
                <h2 className="mb-4 text-xl font-bold text-white">
                  С этой услугой также заказывают
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      href: "/podbor/",
                      title: "Автоподбор «под ключ»",
                      text: "Полный цикл от поиска до переоформления. Звонки, отсев, осмотры и торг.",
                      price: "от 900 BYN",
                    },
                    {
                      href: "/podbor/expert-na-den/",
                      title: "Эксперт на день",
                      text: "Осмотр 5-10 авто за рабочий день. Для приехавших из регионов.",
                      price: "от 380 BYN",
                    },
                    {
                      href: "/marki/",
                      title: "Подбор по маркам",
                      text: "Профильная диагностика дилерским ПО: BMW, VAG, Mercedes, Geely.",
                      price: "от 160 BYN",
                    },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group rounded-xl border border-white/10 bg-surface-100 p-5 transition-colors hover:border-primary-600/20"
                    >
                      <p className="mb-1 font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="mb-3 text-sm text-neutral-400">
                        {item.text}
                      </p>
                      <span className="text-sm font-bold text-primary-400">
                        {item.price}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Links to L3 child pages */}
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">
                    Подробнее о диагностике
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        href: "/diagnostika/proverka-kuzova-lkp/",
                        label: "Проверка кузова и ЛКП",
                      },
                      {
                        href: "/diagnostika/kompyuternaya-diagnostika/",
                        label: "Компьютерная диагностика",
                      },
                      {
                        href: "/diagnostika/proverka-probega/",
                        label: "Проверка пробега",
                      },
                      {
                        href: "/diagnostika/endoskopiya-dvigatelya/",
                        label: "Эндоскопия двигателя",
                      },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-primary-600/20 hover:text-primary-400 sm:text-sm"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
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

function ArticleDivider() {
  return (
    <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10" />
  );
}

function InlineCTA() {
  return (
    <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
      <div className="flex-1 mb-4 sm:mb-0">
        <p className="text-base font-bold text-white">
          Записаться на осмотр
        </p>
        <p className="mt-1 text-sm text-neutral-400">
          Эксперт выедет с полным комплектом Launch + Etari + эндоскоп
        </p>
      </div>
      <Button href="/#quiz" variant="primary" size="md" className="shrink-0">
        Оставить заявку
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
