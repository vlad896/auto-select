import { Download, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PRICING_TABLE } from "@/lib/constants";

// ============================================================
// PricingTable — dark theme
// ============================================================

export function PricingTable() {
  return (
    <section
      id="pricing"
      className="section-padding bg-surface-100"
      aria-labelledby="pricing-heading"
    >
      <Container>
        <SectionHeading
          label="Тарифы 2026"
          subtitle="Стоимость фиксирована и не зависит от результата торга. Эксперт должен быть объективен, а не заинтересован в занижении цены сделки."
        >
          <span id="pricing-heading">
            Цены на услуги автоподбора в Минске
          </span>
        </SectionHeading>

        {/* ===== Desktop table ===== */}
        <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-surface-200/30 sm:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-sm font-semibold text-white lg:px-6"
                >
                  Тип услуги
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-left text-sm font-semibold text-white lg:px-6"
                >
                  Что включено
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-right text-sm font-semibold text-white lg:px-6"
                >
                  Стоимость
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_TABLE.map((row, i) => (
                <tr
                  key={row.service}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] last:border-b-0 ${
                    i % 2 === 0 ? "" : "bg-white/[0.02]"
                  }`}
                >
                  <td className="px-5 py-4 text-sm font-medium text-neutral-200 lg:px-6">
                    {row.service}
                  </td>
                  <td className="px-5 py-4 text-sm text-neutral-400 lg:px-6">
                    {row.includes}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-bold text-primary-400 lg:px-6">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== Mobile cards ===== */}
        <div className="flex flex-col gap-3 sm:hidden">
          {PRICING_TABLE.map((row) => (
            <div
              key={row.service}
              className="rounded-xl border border-white/10 bg-surface-200/30 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">
                  {row.service}
                </p>
                <p className="text-sm font-bold text-primary-400 whitespace-nowrap">
                  {row.price}
                </p>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {row.includes}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs below table */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <Button href="#quiz" variant="primary" size="md">
            Забронировать дату
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            href="/report-sample.pdf"
            variant="secondary"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Скачать образец отчёта (PDF)
          </Button>
        </div>

        <p className="mt-5 text-center text-xs text-neutral-600">
          Стоимость указана для Минска и минского района. Выезд за МКАД — +0,50 BYN/км.
        </p>
      </Container>
    </section>
  );
}
