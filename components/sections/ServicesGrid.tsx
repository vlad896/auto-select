import { Check, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES } from "@/lib/constants";

const SERVICE_LINKS: Record<string, string> = {
  diagnostic: "/diagnostika/",
  turnkey: "/podbor/",
  "expert-day": "/podbor/expert-na-den/",
};

// ============================================================
// ServicesGrid — dark theme with background car image
// ============================================================

export function ServicesGrid() {
  return (
    <section
      id="services"
      className="relative section-padding bg-surface-100 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Subtle background car image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/bg-car-dark.jpg"
          alt="" aria-hidden="true"
          fill
          className="object-cover opacity-8"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-100 via-surface-100/95 to-surface-100" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          label="Услуги"
          subtitle="Фиксированная стоимость без скрытых доплат. Мы сознательно отказались от «процента от торга» — эксперт должен быть объективен."
        >
          <span id="services-heading">Выберите подходящий формат</span>
        </SectionHeading>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className={`relative flex flex-col overflow-hidden rounded-2xl border-2 bg-surface-200/30 p-5 transition-all duration-300 sm:p-7 ${
                service.popular
                  ? "border-primary-600 shadow-lg shadow-primary-600/10"
                  : "border-white/10 hover:border-primary-600/30"
              }`}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -right-0 -top-0">
                  <div className="flex items-center gap-1 rounded-bl-xl bg-primary-600 px-3 py-1.5">
                    <Star
                      className="h-3.5 w-3.5 fill-white text-white"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold text-white">
                      Популярное
                    </span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {service.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {service.priceLabel.replace("от ", "")}
                  </span>
                </div>
                <Badge variant="primary" size="sm" className="mt-2">
                  Фиксированная цена
                </Badge>
              </div>

              {/* Features list */}
              <ul className="mb-6 flex flex-grow flex-col gap-2.5">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-neutral-300"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto flex flex-col gap-2.5">
                <Button
                  href="#quiz"
                  variant={service.popular ? "primary" : "secondary"}
                  size="md"
                  className="w-full"
                >
                  Заказать
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Link
                  href={SERVICE_LINKS[service.id] ?? "#pricing"}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Подробнее об услуге
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
