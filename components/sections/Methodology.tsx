import {
  Cpu,
  Gauge,
  Search,
  Activity,
  ShieldCheck,
  Timer,
  CircuitBoard,
  ScanLine,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// ============================================================
// Methodology — REDESIGNED for readability and user-friendliness
// Card-based layout, visual hierarchy, scannable content
// ============================================================

function StepCard({
  icon: Icon,
  number,
  title,
  description,
  features,
  accentColor = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
  features: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }[];
  accentColor?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-100 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-4 border-b border-white/5 bg-surface-200/30 px-5 py-4 sm:px-6">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          accentColor === "primary"
            ? "bg-primary-600/20 text-primary-400"
            : "bg-primary-600/20 text-primary-400"
        }`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Этап {number}
          </p>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {title}
          </h3>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 sm:p-6">
        <p className="mb-6 text-sm leading-relaxed text-neutral-400 sm:text-base">
          {description}
        </p>

        {/* Feature grid — scannable cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {features.map((feat) => {
            const FeatIcon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
              >
                <FeatIcon
                  className="mb-2.5 h-5 w-5 text-primary-500"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-white">{feat.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {feat.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HighlightBox({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: { label: string; text: string }[];
}) {
  return (
    <div className="rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20">
          <Icon className="h-5 w-5 text-primary-400" aria-hidden="true" />
        </div>
        <h4 className="text-base font-bold text-white sm:text-lg">{title}</h4>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-neutral-400">
              <strong className="text-neutral-200">{item.label}:</strong>{" "}
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Methodology() {
  return (
    <section
      id="methodology"
      className="relative section-padding bg-surface-950 overflow-hidden"
      aria-labelledby="methodology-heading"
    >
      {/* Subtle background car image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/bg-car-dark.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-950/95 to-surface-950" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          label="Как мы проверяем"
          subtitle="Автоподбор — это не «потыкать прибором в капот». Это кропотливая работа с данными и оборудованием. Каждая проверка разделена на глубокие этапы."
        >
          <span id="methodology-heading">
            Техническая экспертиза автомобиля
          </span>
        </SectionHeading>

        {/* Diagnostic process hero image */}
        <div className="relative mb-10 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 sm:mb-12 lg:aspect-[21/9]">
          <Image
            src="/images/tools-diagnostic.jpg"
            alt="Эксперт измеряет толщину ЛКП автомобиля толщиномером Etari"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-surface-950/20" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <p className="rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
              Замер толщины ЛКП толщиномером Etari ET-700
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* === Step 1: Computer diagnostics === */}
          <StepCard
            icon={Cpu}
            number="01"
            title="Компьютерная диагностика"
            description="Современный автомобиль — это сервер на колёсах. Просто «прочитать ошибки» недостаточно. Мы используем мультимарочные сканеры Launch X431 V+, которые заглядывают в «мозги» глубже стандартных OBD-читалок."
            features={[
              {
                icon: Activity,
                title: "Live Data",
                text: "Параметры двигателя в реальном времени: коррекции форсунок, давление в рампе, работа турбины."
              },
              {
                icon: CircuitBoard,
                title: "Full System Scan",
                text: "Проверяем ECU, АКПП (TCM), систему SRS, ABS/ESP и блоки комфорта."
              },
              {
                icon: ScanLine,
                title: "Freeze Frame",
                text: "Стёртые ошибки сохраняются в архиве с пробегом и временем — золотая жила данных."
              },
            ]}
          />

          {/* Mileage verification highlight */}
          <HighlightBox
            icon={Timer}
            title="Верификация пробега по 15+ параметрам"
            items={[
              {
                label: "Активные дубли",
                text: "Данные из блоков управления светом (FRM/CAS), ABS и ключей зажигания."
              },
              {
                label: "Моточасы",
                text: "Если на одометре 100 000 км, а моточасов 6 000 — реальный пробег 250 000 км."
              },
              {
                label: "Логи регенерации",
                text: "Для дизелей — неопровержимое доказательство реального наката."
              },
            ]}
          />

          {/* === Step 2: Body/paint inspection === */}
          <StepCard
            icon={Gauge}
            number="02"
            title="Инструментальный контроль кузова"
            description="Толщиномер — лишь верхушка айсберга. Мы используем Etari ET-700 и фокусируемся на вещах, которые нельзя замерить просто прикладыванием прибора."
            features={[
              {
                icon: Gauge,
                title: "Замер в микронах",
                text: "Знаем заводские нормы: японцы 80–110 мкм, немцы 120–150 мкм. Любое отклонение — повод."
              },
              {
                icon: Search,
                title: "Поиск «вварок»",
                text: "Проверяем стойки и лонжероны. «Конструктор» или «четверть» — найдём следы."
              },
              {
                icon: ShieldCheck,
                title: "Безопасность SRS",
                text: "Физическая проверка подушек и сверка дат выпуска ремней с годом авто."
              },
            ]}
          />

          {/* Hidden damage highlight */}
          <HighlightBox
            icon={Search}
            title="Скрытые повреждения геометрии"
            items={[
              {
                label: "Зазоры и соосность",
                text: "Автомобили после страховых случаев часто имеют нарушенную геометрию кузова."
              },
              {
                label: "Следы на крепеже",
                text: "Если болт «крутился» — крыло или капот снимались. Наша задача — понять зачем."
              },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
