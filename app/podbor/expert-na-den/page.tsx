import {
  ChevronRight,
  ArrowRight,
  Search,
  Phone,
  Send,
  Clock,
  Car,
  Users,
  MapPin,
  Calculator,
  Route,
  Wrench,
  ShieldCheck,
  CircleDollarSign,
  HelpCircle,
  CalendarCheck,
  Handshake,
  Filter,
  Eye,
  Scale,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// L3: /podbor/expert-na-den/
// Cocoon:  L1 (/) → L2 (/podbor/) → THIS L3
// Siblings: /podbor/yuridicheskaya-chistota/
// Cross-links: /diagnostika/*, /podbor/
// ============================================================

const TOC = [
  { id: "who", label: "Кому выгоден формат" },
  { id: "anatomy", label: "Анатомия рабочего дня" },
  { id: "locations", label: "Где мы ищем" },
  { id: "bargain", label: "Аргументированный торг" },
  { id: "early", label: "Нашли рано — что дальше?" },
  { id: "faq", label: "FAQ" },
] as const;

export default function ExpertNaDenPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-surface-950">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/expert-day-hero.jpg"
            alt="Эксперт на день — мобильный осмотр автомобилей в Минске с клиентом"
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
            <Link href="/podbor/" className="transition-colors hover:text-primary-400">Автоподбор</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-neutral-300">Эксперт на день</span>
          </nav>

          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Услуга «Эксперт на&nbsp;день» в&nbsp;Минске:{" "}
            <span className="text-gradient">проверка неограниченного количества авто за&nbsp;8&nbsp;часов</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Аренда профессиональных компетенций, оборудования и транспорта
            на полный рабочий день. Мобильный офис на колёсах, работающий
            исключительно в ваших интересах. Это один из форматов{" "}
            <Link
              href="/podbor/"
              className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
            >
              автоподбора под ключ
            </Link>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Clock, text: "8 часов" },
              { icon: Car, text: "До 10 осмотров" },
              { icon: CircleDollarSign, text: "380 BYN" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 sm:text-sm">
                <Icon className="h-3.5 w-3.5 text-primary-500" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#quiz" variant="primary" size="lg">
              Забронировать дату
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
                  <p className="mb-1 text-sm font-semibold text-white">380 BYN / день</p>
                  <p className="mb-3 text-xs text-neutral-400">Эксперт + авто + оборудование</p>
                  <Button href="/#quiz" variant="primary" size="sm" className="w-full">
                    Забронировать
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </aside>

            {/* ── Article body ── */}
            <article className="min-w-0">

              {/* intro context */}
              <div className="mb-8 rounded-2xl border border-white/5 bg-surface-100 p-5 sm:p-6">
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Покупка б/у автомобиля для жителя региона часто превращается в
                  логистический кошмар: город незнаком, продавцы разбросаны от
                  Уручья до Каменной Горки, а времени — один-два дня. Попытка
                  осмотреть 5–7 вариантов на такси заканчивается усталостью и
                  покупкой проблемной машины «от безысходности».
                </p>
              </div>

              {/* ──── H2: Кому выгоден ──── */}
              <section id="who" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Кому и когда выгоден этот формат?
                </h2>

                <div className="mb-5 space-y-3">
                  {[
                    {
                      icon: MapPin,
                      title: "Покупатели из регионов",
                      subtitle: "Гомель, Брест, Витебск, Гродно, Могилёв",
                      text: "Нет права на ошибку и времени «подумать неделю». Встречаем на вокзале, возим по маршруту, сопровождаем до техпаспорта.",
                    },
                    {
                      icon: Search,
                      title: "Клиенты с «широким» запросом",
                      subtitle: "BMW X5 или Audi Q7? Kia Rio или VW Polo?",
                      text: "Нужно посидеть в каждой, проехать и услышать мнение профи о стоимости содержания. Разовые выезды — разоритесь.",
                    },
                    {
                      icon: Calculator,
                      title: "Прагматики, умеющие считать",
                      subtitle: "Математика выгоды",
                      text: "5 разовых × 130 BYN = 650 BYN. «Эксперт на день» = 380 BYN. Выгода очевидна уже на 3-м осмотре.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-surface-100 p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="mb-1 text-xs font-medium text-primary-400">{item.subtitle}</p>
                      <p className="text-sm text-neutral-400 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Comparison table */}
                <h3 className="mb-3 text-lg font-bold text-white">Математика выгоды</h3>
                <div className="mb-8 overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full min-w-[400px] text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03]">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-300">Сценарий</th>
                        <th className="px-4 py-3 text-center font-semibold text-neutral-300">Кол-во авто</th>
                        <th className="px-4 py-3 text-right font-semibold text-neutral-300">Стоимость</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="px-4 py-3 text-neutral-400">5 разовых выездов × 130 BYN</td>
                        <td className="px-4 py-3 text-center text-neutral-400">5</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-400">650 BYN</td>
                      </tr>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                        <td className="px-4 py-3 text-neutral-400">7 разовых выездов × 130 BYN</td>
                        <td className="px-4 py-3 text-center text-neutral-400">7</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-400">910 BYN</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-primary-400">Эксперт на день</td>
                        <td className="px-4 py-3 text-center font-semibold text-white">5–10</td>
                        <td className="px-4 py-3 text-right font-bold text-emerald-400">380 BYN</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <Div />

              {/* ──── H2: Анатомия дня ──── */}
              <section id="anatomy" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Анатомия рабочего дня: как мы успеваем всё
                </h2>
                <p className="mb-6 text-neutral-400 leading-relaxed">
                  Осмотреть 7 машин за день нереально, если действовать хаотично.
                  Мы работаем по алгоритму, исключающему простои.
                </p>

                <div className="mb-6 space-y-4">
                  {[
                    {
                      num: "01",
                      icon: Phone,
                      title: "Вечерняя подготовка (Pre-check)",
                      items: [
                        "Вы присылаете 10–15 ссылок на объявления",
                        "Прозвон: контрольные вопросы, вскрывающие перекупов",
                        "VIN-проверка по открытым базам",
                        "К утру список → 5–7 реальных «живых» вариантов",
                      ],
                    },
                    {
                      num: "02",
                      icon: Route,
                      title: "Логистика и маршрут",
                      items: [
                        "Последовательное движение по районам",
                        "Площадки Тимирязева → Фрунзенский → Малиновка",
                        "Минимум холостых перегонов",
                      ],
                    },
                    {
                      num: "03",
                      icon: Filter,
                      title: "Экспресс-диагностика на месте",
                      items: [
                        "Кузов + документы: вварка / Airbag → разворот за 10 минут",
                        "Компьютер: если кузов цел — подключаем Launch",
                        "Тест-драйв + подъёмник: только для финалистов",
                      ],
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 rounded-2xl border border-white/5 bg-surface-100 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600/15 text-sm font-bold text-primary-400">
                        {step.num}
                      </div>
                      <div className="min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                          <step.icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                          <h3 className="text-sm font-bold text-white">{step.title}</h3>
                        </div>
                        <ul className="space-y-1">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mb-6 text-sm text-neutral-500">
                  Подробнее об оборудовании и параметрах —{" "}
                  <Link href="/diagnostika/kompyuternaya-diagnostika/" className="font-medium text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300">
                    компьютерная диагностика автомобиля
                  </Link>.
                </p>

                {/* Image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5">
                  <Image
                    src="/images/expert-day-mobile-office.jpg"
                    alt="Мобильный офис эксперта — сканер, толщиномер и блокнот в автомобиле"
                    width={900}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </section>

              <Div />

              {/* ──── H2: Где мы ищем ──── */}
              <section id="locations" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Где мы ищем: специфика минских локаций
                </h2>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: Car,
                      title: "Авторынок «Малиновка» и «Ждановичи»",
                      text: "Высочайшая концентрация машин, но 80% — свежий пригон с «корректированным» пробегом. Здесь опыт эксперта критически важен.",
                    },
                    {
                      icon: Users,
                      title: "Комиссионные площадки (Автохаусы)",
                      text: "Мы знаем репутацию каждой крупной площадки Минска. Где дадут гарантию юридической чистоты, а где — кабальный договор.",
                    },
                    {
                      icon: MapPin,
                      title: "Частные продавцы",
                      text: "Самый перспективный сегмент. Лучшие машины — во дворах спальных районов. Добраться без машины эксперта проблематично.",
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

                {/* Inline CTA */}
                <div className="my-8 rounded-2xl border border-primary-600/20 bg-gradient-to-br from-primary-950/40 to-surface-950 p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
                  <div className="mb-4 flex-1 sm:mb-0">
                    <p className="text-base font-bold text-white">Планируете покупку в выходные?</p>
                    <p className="mt-1 text-sm text-neutral-400">График расписан на 2–3 дня вперёд</p>
                  </div>
                  <Button href="/#quiz" variant="primary" size="md" className="shrink-0">
                    Забронировать дату
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </section>

              <Div />

              {/* ──── H2: Торг ──── */}
              <section id="bargain" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Аргументированный торг — наша суперсила
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  Мы не просто ищем дефекты — мы их монетизируем. Каждый скол,
                  ошибка в блоке климата или запотевание на стыке ДВС/КПП —
                  аргумент для снижения цены. Эксперт говорит профессиональным
                  языком: не «скиньте на дорогу», а «скиньте $300 — задние
                  тормозные диски под замену, резина 2018 года».
                </p>

                <div className="mb-8 rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary-400">95%</p>
                      <p className="mt-1 text-xs text-neutral-500">Сделок — скидка перекрывает стоимость услуги</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-400">380 BYN</p>
                      <p className="mt-1 text-xs text-neutral-500">Окупается на первом же автомобиле</p>
                    </div>
                  </div>
                </div>
              </section>

              <Div />

              {/* ──── H2: Нашли рано ──── */}
              <section id="early" className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  Нашли машину в 12:00 — что дальше?
                </h2>
                <p className="mb-5 text-neutral-400 leading-relaxed">
                  «Оплатил день, нашли на втором осмотре. Деньги сгорели?» — Нет.
                  Если цель достигнута раньше, мы переключаемся на углублённую
                  проверку и сопровождение:
                </p>

                <div className="mb-8 space-y-3">
                  {[
                    {
                      icon: Eye,
                      title: "Эндоскопия двигателя",
                      text: "Если условия позволяют (мотор остыл) — заглянем в цилиндры на задиры.",
                      link: { href: "/diagnostika/endoskopiya-dvigatelya/", label: "Подробнее" },
                    },
                    {
                      icon: Scale,
                      title: "Расширенная юридическая проверка",
                      text: "Платные реестры залогов РФ и РБ, нотариальная проверка продавца.",
                      link: { href: "/podbor/yuridicheskaya-chistota/", label: "Юридическая чистота" },
                    },
                    {
                      icon: ShieldCheck,
                      title: "Сопровождение в ГАИ",
                      text: "Заявление, сверка VIN с инспектором, контроль получения документов.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/5 bg-surface-100 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                      </div>
                      <p className="text-sm text-neutral-400">{item.text}</p>
                      {"link" in item && item.link && (
                        <Link href={item.link.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-400 transition-colors hover:text-primary-300">
                          {item.link.label}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  ))}
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
                      icon: Car,
                      q: "Вы забираете меня из дома / с вокзала?",
                      a: "Да. Приезжаете на поезде — встретим на вокзале. Живёте в Минске — заберём от подъезда (в пределах МКАД). Вы передвигаетесь на комфортном автомобиле специалиста.",
                    },
                    {
                      icon: Search,
                      q: "Сколько машин реально успеть посмотреть?",
                      a: "Качественно с тест-драйвом — 5–8 вариантов. В режиме экспресс-осмотра на рынке (подошли, «стрельнули» кузов, пошли дальше) — 15–20. Зависит от разброса локаций и качества предложений.",
                    },
                    {
                      icon: Wrench,
                      q: "Входит ли подъёмник в стоимость?",
                      a: "Аренда подъёмника на СТО оплачивается отдельно (обычно 30–40 BYN) — это услуга стороннего сервиса. Эксперт присутствует при осмотре днища и подвески, комментирует всё увиденное.",
                    },
                    {
                      icon: HelpCircle,
                      q: "Что если мы ничего не купим за день?",
                      a: "Такое бывает, если рынок «пустой» или бюджет занижен. Но это тоже результат: вы не купили «хлам», сэкономили тысячи долларов на потенциальном ремонте и получили полное представление о реальной ситуации. Вы получите диагностические листы на каждую осмотренную машину.",
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
                  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
                    Покупка в эти выходные?
                  </p>
                  <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                    Забронируйте эксперта заранее
                  </h2>
                  <p className="mx-auto mb-6 max-w-lg text-sm text-neutral-400">
                    График хороших специалистов расписан на 2–3 дня вперёд.
                    Оставьте заявку — проанализируем рынок и составим маршрут
                    к вашему приезду.
                  </p>
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button href="/#quiz" variant="primary" size="lg">
                      Забронировать дату
                      <CalendarCheck className="h-5 w-5" aria-hidden="true" />
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
                    { href: "/podbor/yuridicheskaya-chistota/", label: "Юридическая проверка", desc: "Залоги, аресты, VIN-сверка" },
                    { href: "/diagnostika/", label: "Выездная диагностика", desc: "Полный протокол: кузов, электроника, ходовая" },
                    { href: "/diagnostika/kompyuternaya-diagnostika/", label: "Компьютерная диагностика", desc: "Launch X431 V+ PRO, Live Data" },
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
