import {
  XCircle,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/constants";

// Case study — real car photos
const CASE_IMAGES: Record<string, string> = {
  "bmw-g30": "/images/case-bmw-real.jpg",
  "vw-tiguan": "/images/case-tiguan-real.jpg",
};

// ============================================================
// CaseStudies — dark theme with real car photos
// ============================================================

export function CaseStudies() {
  return (
    <section
      id="cases"
      className="section-padding bg-surface-100"
      aria-labelledby="cases-heading"
    >
      <Container>
        <SectionHeading
          label="Реальные кейсы"
          subtitle="Примеры из нашей практики в Минске за последний квартал. Эти данные подтверждают важность профессионального подхода."
        >
          <span id="cases-heading">
            Кейсы: примеры проверенных автомобилей
          </span>
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((study) => {
            const isRejected = study.result === "rejected";
            const imageUrl = CASE_IMAGES[study.id];

            return (
              <article
                key={study.id}
                className={`relative overflow-hidden rounded-2xl border-2 bg-surface-200/30 transition-shadow hover:shadow-lg hover:shadow-black/20 ${
                  isRejected
                    ? "border-danger-500/30"
                    : "border-success-500/30"
                }`}
              >
                {/* Real car photo */}
                {imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-200">
                    <Image
                      src={imageUrl}
                      alt={`${study.car} — реальное фото автомобиля`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-200/80 to-transparent" />
                  </div>
                )}

                {/* Status ribbon */}
                <div
                  className={`flex items-center gap-2 px-5 py-3 sm:px-6 ${
                    isRejected
                      ? "bg-danger-500/5"
                      : "bg-success-500/5"
                  }`}
                >
                  {isRejected ? (
                    <XCircle
                      className="h-5 w-5 text-danger-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <CheckCircle
                      className="h-5 w-5 text-success-500"
                      aria-hidden="true"
                    />
                  )}
                  <Badge
                    variant={isRejected ? "danger" : "success"}
                    size="md"
                  >
                    {isRejected ? "Отказ от покупки" : "Куплен с дисконтом"}
                  </Badge>
                  {study.savings && (
                    <Badge variant="success" size="md" className="ml-auto">
                      Экономия {study.savings}
                    </Badge>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  {/* Car info */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-white sm:text-xl">
                      {study.car}
                    </h4>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
                      <MapPin
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {study.origin}
                    </p>
                  </div>

                  {/* Claimed vs Reality */}
                  <div className="mb-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/5 p-3.5">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                        Заявлено
                      </p>
                      <p className="text-sm text-neutral-400">
                        {study.claimed}
                      </p>
                    </div>
                    <div
                      className={`rounded-xl p-3.5 ${
                        isRejected ? "bg-danger-500/10" : "bg-success-500/10"
                      }`}
                    >
                      <p
                        className={`mb-1 text-xs font-semibold uppercase tracking-wider ${
                          isRejected
                            ? "text-danger-500/60"
                            : "text-success-500/60"
                        }`}
                      >
                        Реальность
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          isRejected
                            ? "text-danger-400"
                            : "text-success-400"
                        }`}
                      >
                        {study.reality}
                      </p>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="mb-5">
                    <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                      Что обнаружено
                    </p>
                    <ul className="space-y-2">
                      {study.findings.map((finding) => (
                        <li
                          key={finding}
                          className="flex items-start gap-2.5 text-sm text-neutral-400"
                        >
                          <AlertTriangle
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                              isRejected
                                ? "text-danger-500"
                                : "text-amber-500"
                            }`}
                            aria-hidden="true"
                          />
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Result quote */}
                  <div
                    className={`flex items-start gap-2.5 rounded-xl p-3.5 ${
                      isRejected ? "bg-white/5" : "bg-success-500/10"
                    }`}
                  >
                    <Quote
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        isRejected
                          ? "text-neutral-600"
                          : "text-success-500"
                      }`}
                      aria-hidden="true"
                    />
                    <p
                      className={`text-sm font-medium ${
                        isRejected
                          ? "text-neutral-300"
                          : "text-success-400"
                      }`}
                    >
                      {study.resultText}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center sm:mt-10">
          <Button href="#quiz" variant="primary" size="md">
            Хочу такую же проверку
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
