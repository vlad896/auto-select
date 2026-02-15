import {
  FileSignature,
  Search,
  ScanLine,
  HandCoins,
  CarFront,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";

// ============================================================
// Step icons (mapped to PROCESS_STEPS by index)
// ============================================================

const STEP_ICONS = [FileSignature, Search, ScanLine, HandCoins, CarFront];

// ============================================================
// ProcessSteps — dark theme with background image
// ============================================================

export function ProcessSteps() {
  return (
    <section
      id="process"
      className="relative section-padding bg-surface-100 overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Subtle background car image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/bg-car-dark.jpg"
          alt="" aria-hidden="true"
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-100 via-surface-100/95 to-surface-100" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          label="Этапы работы"
          subtitle="70% работы — это глубокая аналитика и «отсев» на этапе звонка. Мы придерживаемся строгой последовательности, чтобы минимизировать риск."
        >
          <span id="process-heading">
            От заключения договора до переоформления в МРО
          </span>
        </SectionHeading>

        {/* Desktop: horizontal timeline, Mobile: vertical */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div
            className="absolute left-0 right-0 top-[3.25rem] hidden h-0.5 bg-gradient-to-r from-primary-600/30 via-primary-500/50 to-primary-600/30 lg:block"
            aria-hidden="true"
          />

          {/* Connector line — mobile/tablet */}
          <div
            className="absolute bottom-0 left-[1.6875rem] top-0 w-0.5 bg-gradient-to-b from-primary-600/30 via-primary-500/50 to-primary-600/30 lg:hidden"
            aria-hidden="true"
          />

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? FileSignature;
              const isLast = i === PROCESS_STEPS.length - 1;

              return (
                <li key={step.step} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                  {/* Step circle */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface-200 shadow-sm transition-colors lg:mx-auto">
                    <Icon
                      className="h-6 w-6 text-primary-400"
                      aria-hidden="true"
                    />
                    {/* Step number badge */}
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`pb-2 ${isLast ? "" : ""} lg:mt-4 lg:pb-0`}>
                    <h3 className="text-base font-semibold text-white sm:text-lg lg:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 lg:text-xs xl:text-sm">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
