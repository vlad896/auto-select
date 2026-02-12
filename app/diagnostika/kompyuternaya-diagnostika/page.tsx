import {
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Search,
  Phone,
  Send,
  ExternalLink,
  CheckCircle,
  XCircle,
  Cpu,
  MonitorSmartphone,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L3: /diagnostika/kompyuternaya-diagnostika/
// Cocoon:  L1 (/) → L2 (/diagnostika/) → THIS L3
// Siblings: proverka-kuzova-lkp, proverka-probega, endoskopiya-dvigatelya
// ============================================================

const TOC = [
  { id: "what", label: "Что мы проверяем" },
  { id: "brands", label: "Диагностика по маркам" },
  { id: "cheap", label: "Почему OBD-адаптер не поможет" },
  { id: "report", label: "Цифровой отчёт" },
  { id: "pricing", label: "Стоимость" },
] as const;

export default function KompDiagPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/comp-diag-hero.jpg"
            alt="Компьютерная диагностика автомобиля сканером Launch X431 V+ PRO"
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
            <span className="text-neutral-300">Компьютерная диагностика</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Компьютерная диагностика автомобиля в&nbsp;Минске:{" "}
            <span className="text-gradient">глубокий анализ систем</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Компьютерная диагностика в современном автоподборе — не просто поиск
            ошибок (<strong className="text-neutral-200">DTC</strong>) на панели.
            Это комплексное исследование «цифрового здоровья» автомобиля:
            история эксплуатации, износ агрегатов, попытки скрыть неисправности.
            Мы используем{" "}
            <strong className="text-neutral-200">Launch X431 V+ PRO</strong> и
            дилерское ПО — уровень кодирования и потоков данных, недоступный
            обычным сканерам. Это базовый этап{" "}
            <Link
              href="/diagnostika/"
              className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
            >
              выездной диагностики автомобиля
            </Link>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Cpu, text: "До 80 блоков ECU" },
              { icon: MonitorSmartphone, text: "Live Data + Freeze Frame" },
              { icon: FileText, text: "PDF-протокол" },
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
                  <p className="mb-2 text-sm font-semibold text-white">Горит чек?</p>
                  <p className="mb-3 text-xs text-neutral-400">Расшифруем все ошибки за 30 минут</p>
                  <Button href={`tel:${SITE.phone}`} variant="primary" size="sm" className="w-full">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Позвонить
                  </Button>
                </div>
              </div>
            </aside>

            <article className="min-w-0">

              {/* ──── Что мы проверяем ──── */}
              <section id="what" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Что мы проверяем: больше, чем просто коды ошибок
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Профессиональный сканер в руках эксперта — мощный аналитический
                  инструмент. Наш протокол включает три критических этапа.
                </p>

                {/* H3: ECU polling */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  Полный опрос всех электронных блоков (ECU)
                </h3>
                <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                  Премиум-авто содержит до <strong className="text-neutral-200">80 независимых контроллеров</strong>.
                  Мы опрашиваем все:
                </p>
                <div className="mb-6 space-y-3">
                  {[
                    { title: "Силовая установка и трансмиссия", text: "Двигатель, АКПП/DSG, системы полного привода (Haldex, xDrive)." },
                    { title: "Системы безопасности", text: "Блок SRS (подушки), ABS, ESP, датчики слепых зон." },
                    { title: "Блоки комфорта и мультимедиа", text: "Климат-контроль, пневмоподвеска, адаптивное освещение." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/5 bg-surface-100 p-4">
                      <p className="mb-1 text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-neutral-400">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* H3: Freeze Frame */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  Анализ «Стоп-кадров» (Freeze Frame)
                </h3>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Если продавец удалил ошибки перед показом, в памяти часто
                  сохраняются <strong className="text-neutral-200">«стоп-кадры»</strong> —
                  снимки параметров (температура, обороты, нагрузка) в момент
                  неисправности. Мы находим архивные данные, которые «не
                  успели» стереться. Эти же данные помогают{" "}
                  <Link
                    href="/diagnostika/proverka-probega/"
                    className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                  >
                    проверить реальный пробег
                  </Link>.
                </p>

                {/* H3: Live Data */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  Чтение параметров в реальном времени (Live&nbsp;Data)
                </h3>
                <p className="mb-3 text-sm text-neutral-400 leading-relaxed">
                  Анализ рабочих показателей заведённого двигателя и в движении:
                </p>
                <ul className="mb-8 space-y-2 text-sm text-neutral-400">
                  {[
                    { bold: "Топливные коррекции:", text: "Состояние форсунок и наличие подсосов воздуха." },
                    { bold: "Давление наддува:", text: "Эффективность турбины под нагрузкой." },
                    { bold: "Температурные режимы:", text: "Следы перегрева двигателя или масла в коробке." },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 shrink-0 text-primary-500">•</span>
                      <span><strong className="text-neutral-200">{item.bold}</strong> {item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/comp-diag-livedata.jpg"
                    alt="Экран сканера Launch X431 с потоковыми данными Live Data рядом с открытым капотом"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </section>

              <Div />

              {/* ──── Диагностика по маркам ──── */}
              <section id="brands" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Специфическая диагностика по маркам
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  У каждой марки — свои «секретные» группы данных, которые мы
                  проверяем в обязательном порядке.
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    {
                      brand: "VAG (VW, Audi, Skoda)",
                      items: [
                        "93-я группа — растяжение цепи ГРМ",
                        "Состояние сцеплений DSG (остаток дисков в мм)",
                        "Давление в мехатронике",
                      ],
                    },
                    {
                      brand: "BMW",
                      items: [
                        "Чтение сервисной истории из ключа",
                        "Системы Valvetronic и Vanos",
                        "Состояние сажевого фильтра (DPF)",
                      ],
                    },
                    {
                      brand: "Mercedes-Benz",
                      items: [
                        "Диагностика впрыска BlueTEC",
                        "Пневмоподвеска Airmatic",
                        "Действительные значения системы зажигания",
                      ],
                    },
                  ].map((group) => (
                    <div
                      key={group.brand}
                      className="rounded-2xl border border-white/10 bg-surface-100 p-5"
                    >
                      <p className="mb-3 text-base font-bold text-white">
                        {group.brand}
                      </p>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-neutral-400"
                          >
                            <CheckCircle
                              className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Inline CTA */}
                <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                  <div className="mb-4 flex-1 sm:mb-0">
                    <p className="text-base font-bold text-white">Нужна глубокая диагностика?</p>
                    <p className="mt-1 text-sm text-neutral-400">Launch X431 V+ PRO + дилерское ПО для вашей марки</p>
                  </div>
                  <Button href="/#quiz" variant="primary" size="md" className="shrink-0">
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </section>

              <Div />

              {/* ──── Китайский адаптер ──── */}
              <section id="cheap" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Почему «китайский адаптер» не поможет?
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Многие пытаются сэкономить, используя дешёвые OBD-сканеры и
                  приложения на смартфоне. Вот чем это опасно:
                </p>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: XCircle,
                      color: "text-red-400",
                      title: "Ограниченный доступ",
                      text: "Дешёвые сканеры видят только стандартные OBD-II ошибки (экология и впрыск), игнорируя 90% блоков: ABS, SRS, АКПП.",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-amber-400",
                      title: "Ложные выводы",
                      text: "Сканер покажет ошибку по датчику, а проблема — в проводке или блоке. Эксперт отличает «следствие» от «причины».",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-amber-400",
                      title: "Риск повреждения",
                      text: "Некачественные адаптеры могут вызвать замыкание в CAN-шине и «уронить» блоки управления.",
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
                        <p className="mb-1 text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-neutral-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Div />

              {/* ──── Цифровой отчёт ──── */}
              <section id="report" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Результат: цифровой отчёт
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Полный PDF-протокол сканирования. Не список кодов, а
                  расшифровка каждого с оценкой критичности:
                </p>

                <ul className="mb-8 space-y-2 text-sm text-neutral-300">
                  {[
                    "Какие ошибки критические (требуют немедленного ремонта)",
                    "Какие ошибки «фантомные» (из-за севшего аккумулятора)",
                    "Сколько будет стоить устранение выявленных дефектов",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>

                <p className="mb-6 text-sm text-neutral-500 leading-relaxed">
                  Данные компьютерной диагностики мы сопоставляем с результатами{" "}
                  <Link href="/diagnostika/endoskopiya-dvigatelya/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                    эндоскопии двигателя
                  </Link>{" "}
                  и{" "}
                  <Link href="/diagnostika/proverka-kuzova-lkp/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                    проверки кузова толщиномером
                  </Link>{" "}
                  для полной картины состояния автомобиля.
                </p>
              </section>

              <Div />

              {/* ──── Цены ──── */}
              <section id="pricing" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Стоимость компьютерной диагностики
                </h2>

                <div className="mb-8 overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Категория</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Описание</th>
                        <th className="px-4 py-3 text-right font-semibold text-neutral-300">Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Базовое сканирование", "Опрос всех блоков + удаление ошибок", "50 BYN"],
                        ["Глубокая диагностика", "Live Data + ГРМ + АКПП", "80 BYN"],
                        ["Выездная диагностика", "Полный комплекс с выездом к авто", "от 100 BYN"],
                      ].map(([cat, desc, price], i) => (
                        <tr key={cat} className={`border-b border-white/5 last:border-b-0 ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-4 py-3 font-medium text-neutral-200">{cat}</td>
                          <td className="px-4 py-3 text-neutral-400">{desc}</td>
                          <td className="px-4 py-3 text-right font-semibold text-primary-400">{price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Final CTA */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-surface-100 p-6 text-center sm:p-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
                    Не покупайте «кота в мешке»
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    Закажите компьютерную диагностику
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-sm text-neutral-400">
                    Узнайте правду о состоянии электроники вашего будущего авто.
                    Результат — в течение часа. Это неотъемлемая часть{" "}
                    <Link href="/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                      профессионального автоподбора
                    </Link>.
                  </p>
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button href="/#quiz" variant="primary" size="lg">
                      Оставить заявку
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

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { href: "/diagnostika/proverka-kuzova-lkp/", label: "Проверка кузова и ЛКП", desc: "Толщиномер Etari, геометрия, скрытые ДТП" },
                    { href: "/diagnostika/proverka-probega/", label: "Проверка пробега", desc: "Дубли в ЭБУ, моточасы, базы данных" },
                    { href: "/diagnostika/endoskopiya-dvigatelya/", label: "Эндоскопия двигателя", desc: "Задиры ЦПГ, нагар, трещины ГБЦ" },
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
