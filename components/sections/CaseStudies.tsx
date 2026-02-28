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
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/constants";

// Case study — real car photos
const CASE_IMAGES: Record<string, string> = {
  "bmw-g30": "/images/case-bmw-real.jpg",
  "vw-tiguan": "/images/case-tiguan-real.jpg",
  "audi-a6": "/images/case-audi-a6.jpg",
  "kia-sportage": "/images/case-kia-sportage.jpg",
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

        {/* Карточка кейса: фото сверху, бейджи на фото, под ним контент. На мобильной — карусель в обёртке без выхода за экран. */}
        <div className="w-full overflow-x-hidden">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible md:snap-none scrollbar-hide">
          {CASE_STUDIES.map((study) => {
            const isRejected = study.result === "rejected";
            const imageUrl = CASE_IMAGES[study.id];

            return (
              <article
                key={study.id}
                className={`card-hover relative flex h-full min-w-[85vw] max-w-md flex-shrink-0 snap-center flex-col overflow-hidden rounded-2xl border-2 bg-surface-200/30 transition-shadow hover:shadow-lg hover:shadow-black/20 md:min-w-0 md:max-w-none md:snap-align-none ${
                  isRejected
                    ? "border-danger-500/30"
                    : "border-success-500/30"
                }`}
              >
                {/* Верх карточки: крупное фото авто (~40–50% высоты) */}
                {imageUrl && (
                  <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden bg-surface-200 sm:aspect-[16/9]">
                    <Image
                      src={imageUrl}
                      alt={`${study.car} — реальное фото автомобиля`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 85vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Бейджи поверх нижней части фото */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                      {isRejected ? (
                        <span className="inline-flex items-center gap-2 rounded-lg bg-danger-500/95 px-3 py-1.5 text-sm font-semibold text-white">
                          <XCircle className="h-4 w-4" aria-hidden="true" />
                          Отказ от покупки
                        </span>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-2 rounded-lg bg-success-500/95 px-3 py-1.5 text-sm font-semibold text-white">
                            <CheckCircle className="h-4 w-4" aria-hidden="true" />
                            Куплен с дисконтом
                          </span>
                          {study.savings && (
                            <span className="rounded-lg bg-success-500/95 px-3 py-1.5 text-sm font-semibold text-white">
                              Экономия {study.savings}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Контент под фото */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {/* Авто + происхождение */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {study.car}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-400">
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {study.origin}
                    </p>
                  </div>

                  {/* Заявлено | Реальность */}
                  <div className="mb-4 grid gap-2 sm:grid-cols-2 sm:gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Заявлено
                      </p>
                      <p className="text-sm leading-snug text-neutral-400">
                        {study.claimed}
                      </p>
                    </div>
                    <div
                      className={`rounded-xl p-3 ${
                        isRejected ? "bg-danger-500/10" : "bg-success-500/10"
                      }`}
                    >
                      <p
                        className={`mb-1 text-xs font-semibold uppercase tracking-wider ${
                          isRejected
                            ? "text-danger-500/80"
                            : "text-success-500/80"
                        }`}
                      >
                        Реальность
                      </p>
                      <p
                        className={`text-sm font-medium leading-snug ${
                          isRejected
                            ? "text-danger-400"
                            : "text-success-400"
                        }`}
                      >
                        {study.reality}
                      </p>
                    </div>
                  </div>

                  {/* Что обнаружено */}
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Что обнаружено
                    </p>
                    <ul className="space-y-1.5">
                      {study.findings.map((finding) => (
                        <li
                          key={finding}
                          className="flex items-start gap-2 text-sm text-neutral-400"
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

                  {/* Итоговая плашка на всю ширину (как в примере) */}
                  <div
                    className={`mt-auto flex items-start gap-2 rounded-xl p-3.5 ${
                      isRejected
                        ? "bg-white/5"
                        : "bg-success-500/15"
                    }`}
                  >
                    <Quote
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        isRejected
                          ? "text-neutral-400"
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
        </div>

        {/* CTA + ссылка на страницу кейсов */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <Button href="#quiz" variant="primary" size="md">
            Хочу такую же проверку
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            href="/cases/"
            variant="secondary"
            size="md"
          >
            Посмотреть больше кейсов
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
