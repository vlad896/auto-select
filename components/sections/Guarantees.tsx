import {
  ShieldCheck,
  FileText,
  RefreshCw,
  BadgeCheck,
  Banknote,
  HeadphonesIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerChildren } from "@/components/ui/StaggerChildren";

// ============================================================
// Guarantee items
// ============================================================

const GUARANTEES = [
  {
    icon: FileText,
    title: "Официальный договор",
    text: "Работаем по договору оказания услуг. Все обязательства зафиксированы и защищены законом РБ.",
  },
  {
    icon: ShieldCheck,
    title: "Материальная ответственность",
    text: "Если эксперт пропустил критический дефект — несём финансовую ответственность согласно договору.",
  },
  {
    icon: RefreshCw,
    title: "Бесплатная повторная проверка",
    text: "Если у вас остались сомнения после осмотра — проведём повторную проверку спорных моментов бесплатно.",
  },
  {
    icon: Banknote,
    title: "Фиксированная цена",
    text: "Стоимость оговаривается до начала работ. Никаких скрытых доплат, процентов от торга или «сюрпризов».",
  },
  {
    icon: BadgeCheck,
    title: "Независимая экспертиза",
    text: "Мы не связаны с продавцами и автосалонами. Наш доход — услуга проверки, а не процент от сделки.",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка после покупки",
    text: "Консультируем по обслуживанию купленного авто в течение 30 дней. Рекомендуем проверенные СТО.",
  },
] as const;

// ============================================================
// Guarantees — trust block
// ============================================================

export function Guarantees() {
  return (
    <section
      id="guarantees"
      className="section-padding bg-surface-950"
      aria-labelledby="guarantees-heading"
    >
      <Container>
        <SectionHeading
          label="Гарантии"
          subtitle="Мы работаем по договору и несём ответственность за каждую проверку. Вот конкретные обязательства."
        >
          <span id="guarantees-heading">Почему нам доверяют</span>
        </SectionHeading>

        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {GUARANTEES.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="card-hover group h-full rounded-2xl border border-white/10 bg-surface-100 p-5 transition-all duration-300 hover:border-primary-600/20 sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/15 text-primary-400 transition-colors group-hover:bg-primary-600/25">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {g.text}
                </p>
              </div>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
