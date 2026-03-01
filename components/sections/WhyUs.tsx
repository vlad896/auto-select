import { Check, X, AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OpenLeadPopupButton } from "@/components/ui/OpenLeadPopupButton";
import { CountUp } from "@/components/ui/CountUp";
import { TextHighlight } from "@/components/ui/TextHighlight";
import { StaggerChildren } from "@/components/ui/StaggerChildren";

// ============================================================
// Comparison data
// ============================================================

const COMPARISON_ITEMS = [
  {
    feature: "Профессиональный сканер Launch X431",
    us: true,
    diy: false,
    dealer: false,
  },
  {
    feature: "Проверка пробега по 15+ параметрам",
    us: true,
    diy: false,
    dealer: false,
  },
  {
    feature: "Юридическая проверка VIN + базы залогов",
    us: true,
    diy: false,
    dealer: true,
  },
  {
    feature: "Независимость от продавца",
    us: true,
    diy: true,
    dealer: false,
  },
  {
    feature: "Аргументированный торг с фактами",
    us: true,
    diy: false,
    dealer: false,
  },
  {
    feature: "Договор с гарантией",
    us: true,
    diy: false,
    dealer: true,
  },
  {
    feature: "Детальный фото/видео отчёт",
    us: true,
    diy: false,
    dealer: false,
  },
  {
    feature: "Экономия через торг > стоимости услуги",
    us: true,
    diy: false,
    dealer: false,
  },
] as const;

// ============================================================
// WhyUs — comparison table
// ============================================================

export function WhyUs() {
  return (
    <section
      className="section-padding bg-surface-100"
      aria-labelledby="whyus-heading"
    >
      <Container className="max-w-4xl">
        <SectionHeading
          id="whyus-heading"
          label="Зачем нужен эксперт"
          subtitle="По нашей статистике, 3 из 5 автомобилей на av.by имеют скрытые дефекты: скрученный пробег, скрытый окрас, юридические проблемы."
        >
          Проверяете авто сами? Сравните
        </SectionHeading>

        {/* Problem awareness */}
        <StaggerChildren className="mb-8 grid gap-3 sm:grid-cols-3 sm:mb-10">
          {[
            { num: 60, suffix: "%", text: "авто со скрученным пробегом" },
            { num: 35, suffix: "%", text: "с повторным окрасом или шпатлёвкой" },
            { num: 12, suffix: "%", text: "с юридическими проблемами" },
          ].map((item) => (
            <div
              key={`${item.num}-${item.text}`}
              className="flex items-center gap-3 rounded-xl border border-amber-500/15 bg-amber-500/5 px-4 py-3"
            >
              <AlertTriangle
                className="h-5 w-5 shrink-0 text-amber-500"
                aria-hidden="true"
              />
              <p className="text-sm text-neutral-300">
                <TextHighlight color="amber" variant="glow">
                  <CountUp end={item.num} suffix={item.suffix} duration={1.8} />
                </TextHighlight>{" "}
                {item.text}
              </p>
            </div>
          ))}
        </StaggerChildren>

        {/* Table — на мобильных горизонтальный скролл при необходимости */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 sm:overflow-hidden">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-400 lg:px-6">
                  Критерий
                </th>
                <th className="px-3 py-4 text-center text-sm font-bold text-primary-400 lg:px-6">
                  АвтоПодбор
                </th>
                <th className="px-3 py-4 text-center text-sm font-semibold text-neutral-400 lg:px-6">
                  Сам по av.by
                </th>
                <th className="px-3 py-4 text-center text-sm font-semibold text-neutral-400 lg:px-6">
                  Автосалон
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ITEMS.map((item, i) => (
                <tr
                  key={item.feature}
                  className={`border-b border-white/5 last:border-b-0 ${
                    i % 2 === 0 ? "" : "bg-white/[0.02]"
                  }`}
                >
                  <td className="px-4 py-3.5 text-sm text-neutral-300 lg:px-6">
                    {item.feature}
                  </td>
                  <td className="px-3 py-3.5 text-center lg:px-6">
                    {item.us ? (
                      <Check className="mx-auto h-5 w-5 text-primary-500" aria-label="Да" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-neutral-500" aria-label="Нет" />
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-center lg:px-6">
                    {item.diy ? (
                      <Check className="mx-auto h-5 w-5 text-neutral-400" aria-label="Да" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-neutral-500" aria-label="Нет" />
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-center lg:px-6">
                    {item.dealer ? (
                      <Check className="mx-auto h-5 w-5 text-neutral-400" aria-label="Да" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-neutral-500" aria-label="Нет" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center sm:mt-10">
          <OpenLeadPopupButton variant="primary" size="md" />
        </div>
      </Container>
    </section>
  );
}
