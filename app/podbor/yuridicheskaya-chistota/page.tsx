import {
  ChevronRight,
  ArrowRight,
  Phone,
  Send,
  ShieldAlert,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Scale,
  Fingerprint,
  Eye,
  Cpu,
  Globe,
  Users,
  Handshake,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L3: /podbor/yuridicheskaya-chistota/
// Cocoon:  L1 (/) → L2 (/podbor/) → THIS L3
// Siblings: /podbor/expert-na-den/
// Cross: /diagnostika/kompyuternaya-diagnostika/
// ============================================================

const TOC = [
  { id: "why-not-bots", label: "Почему ботов недостаточно" },
  { id: "report", label: "Что входит в отчёт" },
  { id: "forensics", label: "Криминалистическая проверка" },
  { id: "import", label: "Свежепригнанные авто" },
  { id: "case", label: "Кейс: «двойник» RAV4" },
  { id: "faq", label: "FAQ" },
] as const;

export default function YuridicheskayaChistotaPage() {
  return (
    <main id="main-content" style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src="/images/legal-vin-check.jpg" alt="Криминалистическая сверка VIN-номера автомобиля ультрафиолетом" fill priority className="object-cover object-center" quality={75} />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/80 to-surface-950" />
        </div>

        <Container className="relative z-10 py-14 sm:py-18 lg:py-22">
          <nav aria-label="Хлебные крошки" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-primary-400">Главная</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link href="/podbor/" className="transition-colors hover:text-primary-400">Автоподбор</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-neutral-300">Юридическая проверка</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Юридическая проверка автомобиля перед покупкой:{" "}
            <span className="text-gradient">защита от залогов, арестов и&nbsp;криминального прошлого</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            «Уставший» мотор можно отремонтировать. Автомобиль с банковским
            обременением или криминальным прошлым — просто изымут. Без компенсации.
            Глубокий юридический аудит — критический этап{" "}
            <Link href="/podbor/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
              услуги автоподбора под ключ
            </Link>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Scale, text: "Реестр залогов РБ/РФ" },
              { icon: Fingerprint, text: "Сверка маркировок VIN" },
              { icon: ShieldCheck, text: "Проверка собственника" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 sm:text-sm">
                <Icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#quiz" variant="primary" size="lg">
              Проверить авто по базам
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
                  <p className="mb-2 text-sm font-semibold text-white">Сомневаетесь в документах?</p>
                  <p className="mb-3 text-xs text-neutral-400">Закажите юридическую проверку</p>
                  <Button href="/#quiz" variant="primary" size="sm" className="w-full">
                    Проверить авто
                    <Scale className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </aside>

            {/* Article */}
            <article className="min-w-0">

              {/* intro */}
              <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 sm:p-6">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    <strong className="text-white">Миф:</strong> Успешная перерегистрация в МРО ГАИ —
                    гарантия чистоты. <strong className="text-white">Факт:</strong> Инспектор
                    проверяет только базу угона. Он не видит залог у ломбарда,
                    бракоразводный процесс или запрет от судебных исполнителей.
                  </p>
                </div>
              </div>

              {/* ──── Почему ботов недостаточно ──── */}
              <section id="why-not-bots" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Почему бесплатных ботов и онлайн-отчётов недостаточно?
                </h2>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: AlertTriangle, color: "text-amber-400",
                      title: "Временной лаг баз данных",
                      text: "Информация об аресте может появиться в базе ОПИ через 2 недели. Бот скажет «чисто», а машину нельзя снять с учёта.",
                    },
                    {
                      icon: ShieldAlert, color: "text-red-400",
                      title: "Проблема «Двойников»",
                      text: "Мошенники переваривают VIN от чистого авто на угнанное. По базам — идеальная история. По факту — уголовное дело. Онлайн-проверка не увидит вварку.",
                    },
                    {
                      icon: Users, color: "text-amber-400",
                      title: "Человеческий фактор",
                      text: "Продавец может показать фото техпаспорта от одной машины, а продавать другую (того же цвета и года).",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-xl border border-white/10 bg-surface-100 p-4">
                      <item.icon className={`mt-0.5 h-5 w-5 shrink-0 ${item.color}`} aria-hidden="true" />
                      <div>
                        <p className="mb-1 text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-neutral-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mb-8 text-sm font-medium text-neutral-300">
                  Мы работаем иначе: сверяем данные из баз с физическим автомобилем, стоящим перед нами.
                </p>
              </section>

              <Div />

              {/* ──── Что входит в отчёт ──── */}
              <section id="report" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Что входит в отчёт по юридической чистоте?
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Перекрёстная проверка по реестрам Беларуси и России.
                </p>

                <div className="mb-6 space-y-4">
                  {[
                    {
                      num: "01", icon: Scale, title: "Реестр залогов (РБ и РФ)",
                      text: "Если авто в кредите или лизинге — оно принадлежит банку. Мы делаем официальную выписку: ваш аргумент в суде как добросовестного приобретателя.",
                    },
                    {
                      num: "02", icon: Users, title: "Проверка собственника",
                      text: "Базы ОПИ (РБ) и ФССП (РФ): долги, алименты, запреты на отчуждение. Вы узнаете проблему до передачи денег, а не в окошке ГАИ.",
                    },
                    {
                      num: "03", icon: BookOpen, title: "История владения",
                      text: "3 собственника за год — маркер проблемного авто. Проверяем лицензии на такси: «из-под такси» — приговор для ресурса ДВС и КПП.",
                    },
                    {
                      num: "04", icon: FileText, title: "Статус ЭПТС (авто из РФ)",
                      text: "«Действующий» или «Незавершённый» (не уплачен утильсбор). Без статуса «Действующий» поставить на учёт в РБ невозможно.",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 rounded-2xl border border-white/5 bg-surface-100 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600/15 text-sm font-bold text-primary-400">{step.num}</div>
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <step.icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                          <h3 className="text-sm font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image: documents */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image src="/images/legal-documents.jpg" alt="Юридическая проверка автомобиля — документы, отчёт и база данных" width={900} height={500} className="w-full object-cover" />
                </div>
              </section>

              <Div />

              {/* ──── Криминалистическая проверка ──── */}
              <section id="forensics" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Криминалистическая проверка: сверка «железа» и документов
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Физическая верификация маркировок на выезде — то, что отличает нас
                  от «диванных аналитиков».
                </p>

                <div className="mb-6 space-y-3">
                  {[
                    {
                      icon: Fingerprint, title: "Основной VIN-номер",
                      items: [
                        "Рельеф и шрифт: заводское кернение / лазер имеет уникальные характеристики",
                        "Окружение: толщиномер вокруг номера — если 300 мкм вместо 100, это вварка",
                        "Изнанка: эндоскоп на обратную сторону панели — сварные швы",
                      ],
                    },
                    {
                      icon: Eye, title: "Дублирующие таблички и наклейки",
                      items: [
                        "Полицейские шильды на стойках, под стеклом, в багажнике",
                        "УФ-фонарь: заводские наклейки имеют защиту",
                        "Проверка на переклеивание: повреждение клеевого слоя, «задиры» краёв",
                      ],
                    },
                    {
                      icon: Cpu, title: "Цифровая сверка (Computer ID)",
                      items: [
                        "Launch X431: VIN в блоках DME, TCM, SRS",
                        "Если VIN в «мозгах» отличается от кузова — конструктор или криминал",
                      ],
                      link: { href: "/diagnostika/kompyuternaya-diagnostika/", label: "Компьютерная сверка VIN" },
                    },
                  ].map((block) => (
                    <div key={block.title} className="rounded-xl border border-white/10 bg-surface-100 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <block.icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                        <p className="text-sm font-semibold text-white">{block.title}</p>
                      </div>
                      <ul className="space-y-1 text-sm text-neutral-400">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {"link" in block && block.link && (
                        <Link href={block.link.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-400 transition-colors hover:text-primary-300">
                          {block.link.label}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <Div />

              {/* ──── Свежепригнанные ──── */}
              <section id="import" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Особенности проверки свежепригнанных авто
                </h2>

                <div className="mb-8 space-y-2">
                  {[
                    { bold: "Удостоверение таможни и ТПО:", text: "Сверяем дату ввоза и факт уплаты пошлин." },
                    { bold: "Занижение инвойса:", text: "Если стоимость занижена, таможня может потребовать доплату даже через год." },
                    { bold: "Льготный ввоз (140-й указ):", text: "Проверяем ограничения на отчуждение — льготные авто нельзя продавать определённый срок." },
                  ].map((item) => (
                    <div key={item.bold} className="flex items-start gap-2 rounded-lg border border-white/5 bg-surface-100 p-3 text-sm">
                      <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                      <p className="text-neutral-400"><strong className="text-neutral-200">{item.bold}</strong> {item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Inline CTA */}
                <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                  <div className="mb-4 flex-1 sm:mb-0">
                    <p className="text-base font-bold text-white">Нужна проверка нескольких авто?</p>
                    <p className="mt-1 text-sm text-neutral-400">Забронируйте{" "}
                      <Link href="/podbor/expert-na-den/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">эксперта на день</Link> — проверим юридику каждого
                    </p>
                  </div>
                  <Button href="/#quiz" variant="primary" size="md" className="shrink-0">
                    Рассчитать маршрут
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </section>

              <Div />

              {/* ──── Кейс ──── */}
              <section id="case" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Кейс: как мы спасли клиента от «двойника» Toyota RAV4
                </h2>

                <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 sm:p-6">
                  <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                    Клиент нашёл отличную <strong className="text-neutral-200">Toyota RAV4</strong> чуть ниже рынка. Приятный продавец, документы на руках. Онлайн-отчёты — чистые.
                  </p>

                  <div className="mb-4 space-y-2">
                    {[
                      { ok: true, text: "Кузов в родной краске" },
                      { ok: true, text: "Технически исправна" },
                      { ok: false, text: "Шрифт дублирующей наклейки отличается от заводского на 1 мм + микропузыри воздуха" },
                      { ok: false, text: "VIN в блоке мультимедиа отличается на одну цифру" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className={`mt-0.5 text-xs ${item.ok ? "text-emerald-400" : "text-red-400"}`}>{item.ok ? "✓" : "✗"}</span>
                        <span className={item.ok ? "text-neutral-400" : "text-red-300 font-medium"}>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                    <p className="text-sm font-semibold text-red-300">
                      Вердикт: Угнанный автомобиль-«двойник» с перебитым VIN.
                      Клиент сохранил <strong className="text-white">$28 000</strong>.
                    </p>
                  </div>
                </div>
              </section>

              <Div />

              {/* ──── FAQ ──── */}
              <section id="faq" className="scroll-mt-24">
                <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
                  FAQ: юридическая чистота
                </h2>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: ShieldAlert, q: "Оформил в ГАИ и получил номера — я в безопасности?",
                      a: "К сожалению, нет. Регистрация — административная процедура. Если через месяц банк заявит о залоге, суд изымет авто. ГАИ аннулирует учёт.",
                    },
                    {
                      icon: FileText, q: "Можно ли купить авто по счёт-справке?",
                      a: "Настоятельно не рекомендуем. Счёт-справки часто выписываются «на коленке» без реального владельца. Безопасный способ — ДКП, подписанный при инспекторе ГАИ или нотариусе, где продавец предъявляет паспорт.",
                    },
                    {
                      icon: Globe, q: "Проверяете ли вы авто из России?",
                      a: "Да, это зона максимального риска. Проверяем ГИБДД РФ (запреты), Федеральную нотариальную палату (залоги) и статус ЭПТС. Без этих проверок покупать машину на российских номерах категорически нельзя.",
                    },
                  ].map((item) => (
                    <details key={item.q} className="group rounded-xl border border-white/10 bg-surface-100">
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
              <section>
                <div className="rounded-2xl border border-white/10 bg-surface-100 p-6 text-center sm:p-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">Не рискуйте своими деньгами</p>
                  <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">Закажите проверку юридической чистоты</h2>
                  <p className="mx-auto mb-6 max-w-lg text-sm text-neutral-400">
                    Отдельно или в составе{" "}
                    <Link href="/podbor/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                      комплексного автоподбора
                    </Link>.
                    Мы выдадим заключение — вашу страховку.
                  </p>
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button href="/#quiz" variant="primary" size="lg">
                      Проверить авто по базам
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

                <Link href="/podbor/" className="mb-4 flex items-center gap-3 rounded-xl border border-primary-600/20 bg-primary-950/20 p-4 transition-colors hover:bg-primary-950/30">
                  <Handshake className="h-5 w-5 shrink-0 text-primary-400" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Автоподбор под ключ</p>
                    <p className="text-xs text-neutral-500">Полный цикл от мониторинга до оформления. 900 BYN.</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                </Link>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { href: "/podbor/expert-na-den/", label: "Эксперт на день", desc: "Проверить несколько авто за день. 380 BYN." },
                    { href: "/diagnostika/kompyuternaya-diagnostika/", label: "Компьютерная диагностика", desc: "Launch X431 V+, сверка VIN в блоках" },
                    { href: "/diagnostika/", label: "Выездная диагностика", desc: "Полный протокол: кузов, электроника, ходовая" },
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
