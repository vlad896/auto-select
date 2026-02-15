import { Cpu, Gauge, Eye, Zap } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TOOLS } from "@/lib/constants";
import { StaggerChildren } from "@/components/ui/StaggerChildren";

// ============================================================
// Map icon string names to Lucide components
// ============================================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Gauge,
  Eye,
  Zap,
};

// ============================================================
// ToolsProof — Equipment showcase (dark theme)
// ============================================================

export function ToolsProof() {
  return (
    <section className="section-padding bg-surface-950" aria-labelledby="tools-heading">
      <Container>
        <SectionHeading
          label="Наше оборудование"
          subtitle="Мы используем только профессиональное оборудование для объективной диагностики. Никаких бытовых приборов и догадок — только данные."
        >
          <span id="tools-heading">Чем мы проверяем автомобили</span>
        </SectionHeading>

        {/* Tools showcase image */}
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/5 sm:mb-10 lg:aspect-[21/9]">
          <Image
            src="/images/tools-equipment.jpg"
            alt="Профессиональное диагностическое оборудование Launch X431 и Etari"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 to-transparent" />
        </div>

        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {TOOLS.map((tool) => {
            const Icon = ICON_MAP[tool.icon] ?? Cpu;
            return (
              <article
                key={tool.model}
                className="card-hover group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface-100 p-5 transition-all duration-300 hover:border-primary-600/30 hover:bg-surface-200/50 sm:p-6"
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/15 text-primary-400 transition-colors group-hover:bg-primary-600/25">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                {/* Tool name & model */}
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {tool.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-primary-400">
                  {tool.model}
                </p>

                {/* Description */}
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">
                  {tool.description}
                </p>

                {/* Decorative corner accent */}
                <div
                  className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
