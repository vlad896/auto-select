"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Car } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";

// ============================================================
// Testimonial data
// ============================================================

const TESTIMONIALS = [
  {
    id: 1,
    name: "Алексей М.",
    car: "BMW 530d G30",
    avatar: "/images/case-bmw-g30.jpg",
    rating: 5,
    text: "Ребята спасли от покупки «утопленника» из Европы. Продавец клялся, что машина идеал, а эксперт за 20 минут нашёл следы воды в блоках и скрученный пробег. Сэкономил $18 000 — это цена машины!",
    result: "Отказ от проблемного авто",
    tag: "Подбор «под ключ»",
  },
  {
    id: 2,
    name: "Дмитрий К.",
    car: "VW Tiguan 2020",
    avatar: "/images/case-tiguan-real.jpg",
    rating: 5,
    text: "Подобрали Tiguan за 10 дней. Нашли задиры цилиндров — сторговали $1 200. Услуга окупилась в 3 раза. Отдельный респект за детальный отчёт с фотографиями каждой детали.",
    result: "Экономия $1 200 на торге",
    tag: "Разовая диагностика",
  },
  {
    id: 3,
    name: "Марина С.",
    car: "Kia Sportage 2021",
    avatar: "/images/tools-diagnostic.jpg",
    rating: 5,
    text: "Первый раз покупала авто сама и боялась попасть на мошенников. Эксперт приехал через час после звонка, проверил 3 варианта за день. Купила третий — в идеальном состоянии. Рекомендую всем девушкам!",
    result: "Найден идеальный вариант за 1 день",
    tag: "Эксперт на день",
  },
  {
    id: 4,
    name: "Сергей В.",
    car: "Audi A6 C8 2019",
    avatar: "/images/tools-equipment.jpg",
    rating: 5,
    text: "Приехал из Бреста, заказал эксперта на день. Осмотрели 7 машин — 5 отсеяли сразу (краска, пробег). Оставшиеся 2 были достойные, выбрал Audi. Торг составил $2 000. Всем советую!",
    result: "Экономия $2 000 + идеальное авто",
    tag: "Эксперт на день",
  },
] as const;

// ============================================================
// Testimonials — carousel with social proof
// ============================================================

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      id="reviews"
      className="section-padding bg-surface-100"
      aria-labelledby="reviews-heading"
    >
      <Container>
        <SectionHeading
          label="Отзывы клиентов"
          subtitle="Реальные истории людей, которые доверили нам проверку и подбор автомобиля."
        >
          <span id="reviews-heading">Что говорят наши клиенты</span>
        </SectionHeading>

        {/* Stats bar */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <CountUp end={5} decimals={1} suffix="" className="text-sm font-semibold text-white" />
            <span className="text-sm text-neutral-500">на Google Maps</span>
          </div>
          <div className="text-sm text-neutral-400">
            <CountUp end={500} suffix="+" className="font-bold text-white" /> проверенных авто
          </div>
          <div className="text-sm text-neutral-400">
            <CountUp end={98} suffix="%" className="font-bold text-white" /> рекомендуют нас друзьям
          </div>
        </div>

        {/* Desktop: 2-column grid, Mobile: carousel */}
        <div className="hidden gap-6 md:grid md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <TestimonialCard testimonial={TESTIMONIALS[currentIndex]} />

          {/* Carousel controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentIndex
                      ? "w-6 bg-primary-500"
                      : "w-2 bg-white/20"
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================
// Single testimonial card
// ============================================================

function TestimonialCard({
  testimonial: t,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-200/30 p-5 sm:p-6">
      {/* Header: avatar + info */}
      <div className="mb-4 flex items-center gap-3.5">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary-600/30">
          <Image
            src={t.avatar}
            alt={t.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p className="font-semibold text-white">{t.name}</p>
          <div className="flex items-center gap-2">
            <Car className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true" />
            <p className="text-sm text-neutral-500">{t.car}</p>
          </div>
        </div>
        <div className="ml-auto">
          <span className="rounded-full bg-primary-600/15 px-2.5 py-1 text-xs font-medium text-primary-400">
            {t.tag}
          </span>
        </div>
      </div>

      {/* Stars */}
      <div className="mb-3 flex gap-0.5">
        {[...Array(t.rating)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-4">
        <Quote
          className="absolute -left-1 -top-1 h-6 w-6 text-primary-600/20"
          aria-hidden="true"
        />
        <p className="pl-6 text-sm leading-relaxed text-neutral-300">
          {t.text}
        </p>
      </div>

      {/* Result highlight */}
      <div className="rounded-xl bg-primary-600/10 border border-primary-600/15 px-4 py-2.5">
        <p className="text-sm font-medium text-primary-400">
          Результат: {t.result}
        </p>
      </div>
    </div>
  );
}
