"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Calculator as CalcIcon,
  TrendingUp,
  DollarSign,
  Percent,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CALCULATOR_DEFAULTS } from "@/lib/constants";

// ============================================================
// Helper: determine bargain rate by car price segment
// ============================================================

function getBargainRate(priceUsd: number): number {
  const { bargainRates } = CALCULATOR_DEFAULTS;
  if (priceUsd <= 7000) return bargainRates.economy;
  if (priceUsd <= 15000) return bargainRates.middle;
  if (priceUsd <= 30000) return bargainRates.premium;
  return bargainRates.luxury;
}

function getSegmentLabel(priceUsd: number): string {
  if (priceUsd <= 7000) return "эконом-сегмент";
  if (priceUsd <= 15000) return "средний сегмент";
  if (priceUsd <= 30000) return "премиум-сегмент";
  return "люкс-сегмент";
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatByn(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(value) + " BYN";
}

const PRICE_PRESETS = [5000, 10000, 15000, 20000, 30000] as const;

// ============================================================
// Calculator — dark theme
// ============================================================

export function Calculator() {
  const [priceInput, setPriceInput] = useState("12000");
  const { bynToUsd, serviceCost } = CALCULATOR_DEFAULTS;

  const priceUsd = useMemo(() => {
    const val = parseInt(priceInput.replace(/\D/g, ""), 10);
    return isNaN(val) ? 0 : Math.min(val, 500000);
  }, [priceInput]);

  const results = useMemo(() => {
    if (priceUsd < 1000) return null;

    const rate = getBargainRate(priceUsd);
    const bargainUsd = Math.round(priceUsd * rate);
    const serviceCostUsd = Math.round(serviceCost / bynToUsd);
    const netSavingsUsd = bargainUsd - serviceCostUsd;
    const roi = serviceCostUsd > 0 ? bargainUsd / serviceCostUsd : 0;

    return {
      bargainUsd,
      serviceCostUsd,
      serviceCostByn: serviceCost,
      netSavingsUsd,
      roi,
      rate,
      segment: getSegmentLabel(priceUsd),
    };
  }, [priceUsd, serviceCost, bynToUsd]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "");
      setPriceInput(raw);
    },
    []
  );

  const handlePreset = useCallback((value: number) => {
    setPriceInput(String(value));
  }, []);

  return (
    <section
      id="calculator"
      className="section-padding bg-surface-950"
      aria-labelledby="calculator-heading"
    >
      <Container className="max-w-4xl">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-500">
            Калькулятор
          </p>
          <h2 id="calculator-heading" className="text-balance">
            Рассчитайте окупаемость подбора
          </h2>
          <p className="mt-3 text-neutral-400">
            Введите стоимость автомобиля — и узнайте, сколько вы сэкономите
            благодаря аргументированному торгу
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* === Left: Input === */}
          <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-7">
            <label
              htmlFor="car-price"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Стоимость автомобиля (USD)
            </label>

            <div className="relative mb-4">
              <DollarSign
                className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-600"
                aria-hidden="true"
              />
              <input
                id="car-price"
                type="text"
                inputMode="numeric"
                value={priceInput}
                onChange={handleInputChange}
                placeholder="12000"
                className="w-full rounded-xl border-2 border-white/10 bg-white/5 py-3.5 pl-10 pr-4 text-lg font-semibold text-white transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 placeholder:text-neutral-600"
                aria-describedby="price-hint"
              />
            </div>
            <p id="price-hint" className="mb-4 text-xs text-neutral-600">
              Введите примерную цену авто, которое планируете покупать
            </p>

            <div className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    priceUsd === preset
                      ? "border-primary-500 bg-primary-600/15 text-primary-400"
                      : "border-white/10 bg-white/5 text-neutral-500 hover:border-primary-600/30 hover:text-primary-400"
                  }`}
                >
                  {formatUsd(preset)}
                </button>
              ))}
            </div>

            {results && (
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary-600/10 border border-primary-600/20 px-3.5 py-2.5">
                <TrendingUp
                  className="h-4 w-4 text-primary-400"
                  aria-hidden="true"
                />
                <p className="text-xs text-neutral-300">
                  <span className="font-semibold text-primary-400">{results.segment}</span> —
                  средний торг составляет{" "}
                  <span className="font-semibold text-primary-400">
                    {Math.round(results.rate * 100)}%
                  </span>{" "}
                  от цены
                </p>
              </div>
            )}
          </div>

          {/* === Right: Results === */}
          <div className="rounded-2xl border-2 border-primary-600 bg-gradient-to-br from-primary-950/80 to-surface-950 p-5 text-white shadow-lg shadow-primary-600/10 sm:p-7">
            <div className="mb-5 flex items-center gap-2">
              <CalcIcon className="h-5 w-5 text-primary-400" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">
                Ваш результат
              </h3>
            </div>

            {results ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3">
                  <span className="text-sm text-neutral-400">
                    Средний торг
                  </span>
                  <span className="text-xl font-bold text-white sm:text-2xl">
                    {formatUsd(results.bargainUsd)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-neutral-400">
                    Стоимость услуги
                  </span>
                  <span className="text-sm font-medium text-neutral-300">
                    {formatUsd(results.serviceCostUsd)}{" "}
                    <span className="text-neutral-500">
                      ({formatByn(results.serviceCostByn)})
                    </span>
                  </span>
                </div>

                <div className="border-t border-white/10" />

                <div className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3.5">
                  <span className="text-sm font-medium text-primary-400">
                    Ваша выгода
                  </span>
                  <span
                    className={`text-2xl font-bold sm:text-3xl ${
                      results.netSavingsUsd > 0
                        ? "text-primary-400"
                        : "text-white"
                    }`}
                  >
                    {results.netSavingsUsd > 0 ? "+" : ""}
                    {formatUsd(results.netSavingsUsd)}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <Percent
                    className="h-4 w-4 text-primary-400"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-neutral-400">
                    Окупаемость:{" "}
                    <span className="font-bold text-primary-400">
                      x{results.roi.toFixed(1)}
                    </span>{" "}
                    от стоимости услуги
                  </p>
                </div>

                <Button
                  href="#quiz"
                  variant="primary"
                  size="md"
                  className="mt-2 w-full"
                >
                  Заказать подбор
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <DollarSign
                  className="mb-3 h-10 w-10 text-neutral-600"
                  aria-hidden="true"
                />
                <p className="text-sm text-neutral-500">
                  Введите стоимость авто от $1 000,
                  <br />
                  чтобы увидеть расчёт
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-600">
          * Расчёт основан на средних данных за 2025–2026 гг. по рынку
          подержанных авто в Минске.
        </p>
      </Container>
    </section>
  );
}
