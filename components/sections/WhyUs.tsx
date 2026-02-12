import { Check, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

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
          label="Сравнение"
          subtitle="Почему профессиональный автоподбор выгоднее, чем самостоятельная проверка или покупка в салоне."
        >
          <span id="whyus-heading">Почему выбирают нас</span>
        </SectionHeading>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-white/10 sm:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-5 py-4 text-left text-sm font-semibold text-neutral-400 lg:px-6">
                  Критерий
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-primary-400 lg:px-6">
                  АвтоПодбор
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-neutral-500 lg:px-6">
                  Сам по av.by
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-neutral-500 lg:px-6">
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
                  <td className="px-5 py-3.5 text-sm text-neutral-300 lg:px-6">
                    {item.feature}
                  </td>
                  <td className="px-4 py-3.5 text-center lg:px-6">
                    {item.us ? (
                      <Check className="mx-auto h-5 w-5 text-primary-500" aria-label="Да" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-neutral-600" aria-label="Нет" />
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center lg:px-6">
                    {item.diy ? (
                      <Check className="mx-auto h-5 w-5 text-neutral-500" aria-label="Да" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-neutral-700" aria-label="Нет" />
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center lg:px-6">
                    {item.dealer ? (
                      <Check className="mx-auto h-5 w-5 text-neutral-500" aria-label="Да" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-neutral-700" aria-label="Нет" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 sm:hidden">
          {COMPARISON_ITEMS.map((item) => (
            <div key={item.feature} className="rounded-xl border border-white/10 bg-surface-200/30 p-4">
              <p className="mb-2.5 text-sm font-medium text-neutral-300">{item.feature}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {item.us ? (
                    <Check className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  ) : (
                    <X className="h-4 w-4 text-neutral-700" aria-hidden="true" />
                  )}
                  <span className="text-xs text-primary-400 font-medium">Мы</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.diy ? (
                    <Check className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                  ) : (
                    <X className="h-4 w-4 text-neutral-700" aria-hidden="true" />
                  )}
                  <span className="text-xs text-neutral-500">Сам</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.dealer ? (
                    <Check className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                  ) : (
                    <X className="h-4 w-4 text-neutral-700" aria-hidden="true" />
                  )}
                  <span className="text-xs text-neutral-500">Салон</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center sm:mt-10">
          <Button href="#quiz" variant="primary" size="md">
            Заказать проверку от экспертов
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
