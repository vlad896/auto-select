import {
  ChevronRight,
  ArrowRight,
  Phone,
  Send,
  Shield,
  Cpu,
  Eye,
  Gauge,
  Fingerprint,
  AlertTriangle,
  HelpCircle,
  Car,
  Settings,
  Target,
  BadgeCheck,
  Search,
  Scale,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L2: /marki/
// Cocoon: L1 (/) → THIS L2
// Children (future L3): /marki/bmw/, /marki/vag/, /marki/mercedes/, etc.
// Cross-links: /diagnostika/*, /podbor/*
// ============================================================

const TOC = [
  { id: "multibrand-vs-deep", label: "Мультибренд vs Экспертиза" },
  { id: "brands", label: "Выберите марку" },
  { id: "other-brands", label: "Другие марки" },
  { id: "audit-standard", label: "Стандарт проверки" },
  { id: "pricing", label: "Стоимость" },
  { id: "faq", label: "FAQ" },
] as const;

/* ── Brand data ── */
const BRANDS = [
  {
    id: "bmw",
    name: "BMW и Mini",
    tagline: "Хирургическая точность. Не «на глаз».",
    color: "from-blue-600/20 to-blue-900/10 border-blue-500/20",
    equipment: "Дилерский комплекс ISTA+ (Rheingold) и инженерное меню E-Sys",
    focus: [
      "Системы Vanos и Valvetronic",
      "Цепи ГРМ (N20/B48)",
      "Коррекции АКПП ZF 8HP",
      "Раздатка xDrive",
    ],
    mileage: "Вычитываем из ключа, блока FEM/BDC и истории сервисных интервалов",
    linkLabel: "Подробнее о диагностике BMW",
  },
  {
    id: "vag",
    name: "VAG (VW, Audi, Skoda, Seat, Porsche)",
    tagline: "Конструктор, который можно собрать неправильно.",
    color: "from-emerald-600/20 to-emerald-900/10 border-emerald-500/20",
    equipment: "Дилерские сканеры ODIS Service / Engineering и VCDS",
    focus: [
      "Ресурс сцеплений DSG (DQ200/DQ250/DQ500)",
      "Растяжение цепи TSI (фазы распредвалов)",
      "Турбина и муфта Haldex",
    ],
    mileage: "Моточасы в блоке двигателя, «стоп-кадры» в архиве ошибок",
    linkLabel: "Подробнее о подборе VAG",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    tagline: "Электроника дороже «железа».",
    color: "from-slate-600/20 to-slate-900/10 border-slate-400/20",
    equipment: "Диагностический комплекс Xentry (Star Diagnosis)",
    focus: [
      "Пневмоподвеска Airmatic (баллоны, компрессор)",
      "Дизели OM651/OM654 (форсунки Delphi/Bosch)",
      "Система AdBlue (BlueTEC)",
    ],
    mileage: "Замок зажигания (EZS) и блок Assyst Plus",
    linkLabel: "Подробнее о диагностике Mercedes",
  },
  {
    id: "geely",
    name: "Geely и Китай",
    tagline: "Новая реальность. Специфика, о которой молчат дилеры.",
    color: "from-red-600/20 to-red-900/10 border-red-500/20",
    equipment: "Launch X431 с последними пакетами для Geely/Volvo",
    focus: [
      "Коррозия: Coolray, Atlas (уплотнители, днище)",
      "Роботизированные КПП и муфты 4WD",
      "Перегрев раздатки",
    ],
    mileage: "Моточасы и журналы работы трансмиссии",
    linkLabel: "Подробнее о подборе Geely",
  },
  {
    id: "toyota",
    name: "Toyota и Lexus",
    tagline: "Миф «Тойоты не ломаются» дорого обходится.",
    color: "from-rose-600/20 to-rose-900/10 border-rose-500/20",
    equipment: "Toyota Techstream",
    focus: [
      "Коррекции форсунок (дизели 4.5 / 2.8)",
      "Состояние рамы (VIN — зона коррозии)",
      "Гибриды: ёмкость ВВБ, разбаланс ячеек",
    ],
    mileage: "Моточасы, Freeze Frame Data",
    linkLabel: "Подробнее о Toyota / Lexus",
  },
  {
    id: "kia-hyundai",
    name: "Kia и Hyundai",
    tagline: "Машины, требующие эндоскопии.",
    color: "from-amber-600/20 to-amber-900/10 border-amber-500/20",
    equipment: "GDS Mobile, видеоэндоскоп HD",
    focus: [
      "Задиры цилиндров (G4KD, G4NA)",
      "Катализатор: разрушение керамики → крошка в мотор",
      "Полный привод: срезание шлицов раздатки",
    ],
    mileage: "Моточасы двигателя, журнал АКПП",
    linkLabel: "Подробнее о Kia / Hyundai",
  },
] as const;

const PRICING = [
  { service: "Разовый осмотр (Стандарт)", desc: "Выезд, кузов, Launch, тест-драйв, отчёт", price: "от 130 BYN" },
  { service: "Разовый осмотр (Премиум/Профиль)", desc: "Дилерская диагностика (BMW/VAG/MB) + детальный отчёт по блокам", price: "от 160 BYN" },
  { service: "Эндоскопия двигателя", desc: "Осмотр цилиндров камерой (задиры, нагар, хон)", price: "от 80 BYN" },
  { service: "Эксперт на день", desc: "Неограниченное число осмотров 10:00 — 18:00", price: "380 BYN" },
  { service: "Подбор под ключ", desc: "Поиск до результата, сопровождение, торг", price: "900 BYN" },
] as const;

export default function MarkiPage() {
  return (
    <main id="main-content" style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/marki-hero-diagnostic.jpg"
            alt="Профильная диагностика автомобиля дилерским сканером в профессиональном гараже"
            fill
            priority
            className="object-cover object-center"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/80 to-surface-950" />
        </div>

        <Container className="relative z-10 py-14 sm:py-18 lg:py-22">
          {/* breadcrumbs */}
          <nav aria-label="Хлебные крошки" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-primary-400">Главная</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-neutral-300">Подбор по маркам</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Подбор автомобилей по маркам в&nbsp;Минске:{" "}
            <span className="text-gradient">почему специализация эксперта важнее «универсального» взгляда</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Невозможно одинаково хорошо знать специфику оппозитного двигателя
            Subaru и капризы пневмоподвески Range&nbsp;Rover. Наша команда разделена
            на профильные направления: каждый эксперт вооружён{" "}
            <strong className="text-neutral-200">дилерским программным обеспечением</strong>{" "}
            своей марки.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Cpu, text: "ISTA+, ODIS, Xentry" },
              { icon: Eye, text: "Видеоэндоскопия" },
              { icon: Fingerprint, text: "Криминалистика VIN" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 sm:text-sm">
                <Icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#brands" variant="primary" size="lg">
              Выбрать марку
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.phone}`} variant="secondary" size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Позвонить
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══ ARTICLE BODY ═══ */}
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
                  <p className="mb-2 text-sm font-semibold text-white">Нужна проверка?</p>
                  <p className="mb-3 text-xs text-neutral-400">Выберите марку и закажите профильную диагностику</p>
                  <Button href="/#quiz" variant="primary" size="sm" className="w-full">
                    Оставить заявку
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </aside>

            {/* ── Article ── */}
            <article className="min-w-0">

              {/* Intro box */}
              <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 sm:p-6">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                  <div className="text-sm text-neutral-300 leading-relaxed">
                    <strong className="text-white">Конец эпохи «универсальных солдат»:</strong>{" "}
                    Рынок разделился — масс-маркет с дешёвым ELM-адаптером и
                    профессиональный инженерный аудит по технологической карте
                    завода-изготовителя. Если вы ищете конкретную марку, вам
                    нужен узкопрофильный специалист с дилерским ПО.
                  </div>
                </div>
              </div>

              {/* ──── H2: Мультибренд vs Экспертиза ──── */}
              <section id="multibrand-vs-deep" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Мультибрендовый подход vs Глубокая экспертиза
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  «Какая разница, кто смотрит машину, если у него есть сканер?»
                  Разница — в глубине доступа к данным и интерпретации параметров.
                  Универсальный мультимарочный сканер работает по протоколам
                  OBD-II. Он читает Check&nbsp;Engine. Но он бессилен там, где
                  скрыты реальные проблемы:
                </p>

                <div className="mb-6 space-y-3">
                  {[
                    {
                      icon: Settings,
                      title: "Логика коробки передач",
                      text: "Универсальный сканер покажет ошибку, когда коробка «упала в аварию». Профильный (ODIS для VAG) покажет счётчики перегревов и время адаптации сцеплений — за 20 000 км до поломки.",
                    },
                    {
                      icon: Gauge,
                      title: "Реальный пробег",
                      text: "Скрутить одометр — $30. Вычистить пробег из всех дублирующих блоков (ABS, раздатка, фары, ключ) — от $500. Дилерское ПО даёт доступ к Freeze Frame Data: историческая ошибка на 240 000 км, хотя на табло 120 000.",
                    },
                    {
                      icon: Target,
                      title: "Специфические параметры",
                      text: "Для BMW — коррекции по цилиндрам. Для дизельных Mercedes — уровень золы в сажевом фильтре и дифференциальное давление. Эти данные невидимы для универсального сканера.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-xl border border-white/10 bg-surface-100 p-4">
                      <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" aria-hidden="true" />
                      <div>
                        <p className="mb-1 text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-neutral-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mb-6 rounded-xl border border-primary-600/20 bg-primary-950/20 p-4 text-sm font-medium text-neutral-300">
                  Мы не просто ищем ошибки. Мы ищем <strong className="text-white">отклонения от нормы</strong>,
                  которые ещё не стали ошибками, но уже требуют вложений.
                </p>
              </section>

              <Div />

              {/* ──── H2: Выберите марку ──── */}
              <section id="brands" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Выберите марку для детальной проверки
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Компетенции по ключевым автопроизводителям, популярным на
                  вторичном рынке Беларуси. Выберите бренд, чтобы узнать, какие
                  узлы мы проверяем и какое оборудование используем.
                </p>

                {/* Brands image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/marki-brands-grid.jpg"
                    alt="Логотипы автомобильных марок: BMW, Mercedes, Volkswagen, Audi, Toyota, Hyundai, Kia, Geely"
                    width={900}
                    height={470}
                    className="w-full object-cover"
                  />
                </div>

                {/* Brand cards */}
                <div className="space-y-4">
                  {BRANDS.map((brand) => (
                    <div
                      key={brand.id}
                      id={brand.id}
                      className={`scroll-mt-24 rounded-2xl border bg-gradient-to-br p-5 sm:p-6 ${brand.color}`}
                    >
                      <h3 className="mb-1 text-lg font-bold text-white sm:text-xl">{brand.name}</h3>
                      <p className="mb-4 text-sm italic text-neutral-400">{brand.tagline}</p>

                      <div className="mb-3 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl bg-black/20 p-3">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-primary-500">Оборудование</p>
                          <p className="text-sm text-neutral-300">{brand.equipment}</p>
                        </div>
                        <div className="rounded-xl bg-black/20 p-3">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-primary-500">Фокус проверки</p>
                          <ul className="space-y-0.5 text-sm text-neutral-300">
                            {brand.focus.map((f) => (
                              <li key={f} className="flex items-start gap-1.5">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl bg-black/20 p-3">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-primary-500">Пробег</p>
                          <p className="text-sm text-neutral-300">{brand.mileage}</p>
                        </div>
                      </div>

                      <a
                        href={`#${brand.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                      >
                        {brand.linkLabel}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              <Div />

              {/* ──── H2: Другие марки ──── */}
              <section id="other-brands" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  А если моей марки нет в списке?
                </h2>
                <p className="mb-4 text-neutral-400 leading-relaxed">
                  Мы работаем со всем спектром автомобилей, представленных на рынке
                  Беларуси: Ford, Mazda, Volvo, Land&nbsp;Rover, Peugeot, Renault и
                  другие. Технический арсенал включает мультимарочные комплексы{" "}
                  <strong className="text-neutral-200">Launch&nbsp;X431&nbsp;PRO</strong> и{" "}
                  <strong className="text-neutral-200">Autel&nbsp;MaxiSys</strong>,
                  перекрывающие 99% функционала по чтению блоков масс-маркета.
                </p>
                <p className="mb-4 text-neutral-400 leading-relaxed">
                  Для редких брендов (Tesla, Jaguar) привлекаем узкопрофильных
                  партнёров или специализированное ПО по запросу.
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {["Кузов", "Электроника", "Подъёмник", "Юридическая чистота"].map((step, i) => (
                    <span key={step} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
                      <span className="text-primary-500">{i + 1}</span>
                      {step}
                      {i < 3 && <ArrowRight className="ml-1 h-3 w-3 text-neutral-600" aria-hidden="true" />}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-neutral-500">
                  Мы не берём в работу только те автомобили, на которые невозможно
                  найти техническую документацию или запчасти.
                </p>
              </section>

              <Div />

              {/* ──── H2: Стандарт проверки ──── */}
              <section id="audit-standard" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Технический стандарт проверки: что входит в&nbsp;аудит любой марки
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Независимо от эмблемы на решётке радиатора — каждый автомобиль
                  проходит наш внутренний фильтр качества.
                </p>

                <div className="mb-6 space-y-4">
                  {/* 1. Кузов */}
                  <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600/15 text-sm font-bold text-primary-400">01</div>
                      <h3 className="text-base font-bold text-white">Инструментальный контроль кузова</h3>
                    </div>
                    <p className="mb-3 text-sm text-neutral-400">
                      <strong className="text-neutral-200">Etari ET-700 Max</strong>: шпатлёвка,
                      цинковый слой, магнитная шпатлёвка. Но прибор — это лишь 30% успеха.
                    </p>
                    <ul className="space-y-1 text-sm text-neutral-400">
                      {[
                        "Нарушение заводской шагрени и «мусор» под лаком",
                        "Следы съёма кузовных элементов (сорванные грани болтов, вторичный окрас петель)",
                        "Нарушение герметика на стыках панелей и в нише запасного колеса",
                        "Даты выпуска стёкол, оптики и ремней безопасности (сверка с годом выпуска)",
                      ].map((text) => (
                        <li key={text} className="flex items-start gap-2">
                          <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                          {text}
                        </li>
                      ))}
                    </ul>
                    <Link href="/diagnostika/proverka-kuzova-lkp/" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary-400 transition-colors hover:text-primary-300">
                      Подробнее о проверке кузова
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* 2. VIN */}
                  <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600/15 text-sm font-bold text-primary-400">02</div>
                      <h3 className="text-base font-bold text-white">Юридическая экспертиза VIN-номера</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-neutral-400">
                      {[
                        "Осмотр площадки VIN на предмет вварки, шлифовки или изменения шрифта",
                        "Сверка дублирующих табличек (стойки, под стеклом) + УФ-защита",
                        "Компьютерная сверка VIN в электронных блоках управления",
                      ].map((text) => (
                        <li key={text} className="flex items-start gap-2">
                          <Fingerprint className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
                          {text}
                        </li>
                      ))}
                    </ul>
                    <Link href="/podbor/yuridicheskaya-chistota/" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary-400 transition-colors hover:text-primary-300">
                      Юридическая проверка авто
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* 3. Тест-драйв */}
                  <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600/15 text-sm font-bold text-primary-400">03</div>
                      <h3 className="text-base font-bold text-white">Тест-драйв и проверка «на холодную»</h3>
                    </div>
                    <p className="text-sm text-neutral-400">
                      Стук гидрокомпенсаторов, лязг цепи ГРМ, пинки коробки
                      проявляются при холодном пуске или после полного прогрева.
                      Тест-драйв в разных режимах: плавный разгон, резкое
                      ускорение, торможение, проезд неровностей.
                    </p>
                  </div>
                </div>
              </section>

              {/* Inline CTA */}
              <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                <div className="mb-4 flex-1 sm:mb-0">
                  <p className="text-base font-bold text-white">Нужна полная диагностика перед покупкой?</p>
                  <p className="mt-1 text-sm text-neutral-400">
                    Узнайте, как устроена наша{" "}
                    <Link href="/diagnostika/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">выездная диагностика</Link>{" "}
                    — протокол, оборудование, отчёт
                  </p>
                </div>
                <Button href="/#quiz" variant="primary" size="md" className="shrink-0">
                  Оставить заявку
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              <Div />

              {/* ──── H2: Pricing ──── */}
              <section id="pricing" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Стоимость профильного автоподбора в&nbsp;Минске
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Качественная диагностика требует дорогого оборудования и
                  времени эксперта. Стоимость окупается на этапе торга в 95%
                  случаев.
                </p>

                <div className="mb-4 overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-surface-100">
                        <th className="px-4 py-3 font-semibold text-neutral-200">Услуга</th>
                        <th className="px-4 py-3 font-semibold text-neutral-200">Описание</th>
                        <th className="px-4 py-3 text-right font-semibold text-neutral-200">Стоимость</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {PRICING.map((row) => (
                        <tr key={row.service} className="transition-colors hover:bg-white/[0.02]">
                          <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{row.service}</td>
                          <td className="px-4 py-3 text-neutral-400">{row.desc}</td>
                          <td className="px-4 py-3 text-right font-semibold text-primary-400 whitespace-nowrap">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-neutral-500">
                  Цены актуальны на 2026 г. Для выезда за МКАД — доплата за км.
                </p>
              </section>

              <Div />

              {/* ──── H2: FAQ ──── */}
              <section id="faq" className="scroll-mt-24">
                <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
                  FAQ: ответы на частые вопросы
                </h2>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: HelpCircle,
                      q: "Нужно ли мне присутствовать на диагностике?",
                      a: "Нет. 80% клиентов получают отчёт удалённо: подробный фото- и видеоотчёт (100+ файлов) в Telegram или WhatsApp, скриншоты диагностики и голосовое резюме эксперта с рекомендацией — брать, торговаться или бежать.",
                    },
                    {
                      icon: Scale,
                      q: "Вы торгуетесь с продавцом?",
                      a: "Да, профессионально. Оперируем фактами: «Течёт сальник — замена $200, лысая резина — ещё $400». Аргументированный торг часто снижает цену на сумму, превышающую стоимость наших услуг.",
                    },
                    {
                      icon: Car,
                      q: "Можете проверить машину в автохаусе?",
                      a: "Да, работаем со всеми площадками Минска (Малиновка, Ждановичи, Тимирязева). Знаем репутацию площадок — сразу скажем, если продавец известен продажей «автохлама».",
                    },
                    {
                      icon: Shield,
                      q: "Что если машина окажется в залоге?",
                      a: "Мы проверяем по Реестру движимого имущества РБ и базам РФ (если авто ввезено оттуда). Это защищает от риска изъятия банком.",
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
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">Готовы проверить автомобиль?</p>
                  <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    Закажите профильную диагностику у экспертов
                  </h2>
                  <p className="mx-auto mb-6 max-w-lg text-sm text-neutral-400">
                    Не рискуйте своими деньгами. Наши эксперты знают вашу будущую
                    машину лучше, чем её продавец.
                  </p>
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button href="/#quiz" variant="primary" size="lg">
                      Оставить заявку на подбор
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button href={SITE.telegram} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Написать в Telegram
                    </Button>
                  </div>
                </div>
              </section>

              {/* ═══ SEMANTIC COCOON ═══ */}
              <Div />
              <section>
                <h2 className="mb-4 text-xl font-bold text-white">Смотрите также</h2>

                <Link href="/podbor/" className="mb-4 flex items-center gap-3 rounded-xl border border-primary-600/20 bg-primary-950/20 p-4 transition-colors hover:bg-primary-950/30">
                  <Search className="h-5 w-5 shrink-0 text-primary-400" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Автоподбор под ключ</p>
                    <p className="text-xs text-neutral-500">Полный цикл от мониторинга до оформления. 900 BYN.</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                </Link>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { href: "/diagnostika/", label: "Выездная диагностика", desc: "Полный протокол: кузов, электроника, ходовая" },
                    { href: "/podbor/yuridicheskaya-chistota/", label: "Юридическая проверка", desc: "Залоги, аресты, VIN-сверка" },
                    { href: "/podbor/expert-na-den/", label: "Эксперт на день", desc: "8 часов, до 10 осмотров, 380 BYN" },
                    { href: "/diagnostika/kompyuternaya-diagnostika/", label: "Компьютерная диагностика", desc: "Launch X431 V+ PRO, Live Data" },
                    { href: "/diagnostika/proverka-kuzova-lkp/", label: "Проверка кузова и ЛКП", desc: "Толщиномер Etari ET-700" },
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
