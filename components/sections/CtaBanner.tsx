import { ArrowRight, Phone, Shield, Clock } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Parallax } from "@/components/ui/Parallax";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SITE } from "@/lib/constants";

// ============================================================
// CtaBanner — reusable full-width conversion block
// Two variants for different page positions
// ============================================================

export function CtaBannerPrimary() {
  return (
    <section className="relative overflow-hidden bg-primary-600 py-12 sm:py-16" aria-label="Призыв к действию: заказать диагностику автомобиля">
      {/* Background pattern */}
      <Parallax offset={30} className="absolute inset-0 opacity-10" aria-hidden="true">
        <Image
          src="/images/hero-bg.jpg"
          alt="" aria-hidden="true"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left lg:gap-10">
          {/* Text */}
          <AnimateOnScroll variant="fadeUp" className="flex-1">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Уже нашли автомобиль?
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/80 sm:text-lg">
              Не покупайте, пока эксперт не проверит.{" "}
              <strong className="text-white">
                3 из 5 авто на av.by имеют скрытые дефекты.
              </strong>{" "}
              Мы найдём их за 2 часа — и поможем сторговать.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <span className="flex items-center gap-1.5 text-sm text-white/70">
                <Shield className="h-4 w-4" aria-hidden="true" />
                Гарантия по договору
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/70">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Выезд за 60 минут
              </span>
            </div>
          </AnimateOnScroll>

          {/* CTA buttons */}
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              href="#quiz"
              variant="secondary"
              size="lg"
              className="border-white/30 bg-white text-primary-700 hover:bg-white/90 hover:text-primary-800 shadow-lg"
            >
              Оставить заявку
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              href={`tel:${SITE.phone}`}
              variant="secondary"
              size="lg"
              className="border-white/30 text-white hover:bg-white/15"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Позвонить сейчас
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CtaBannerSecondary() {
  return (
    <section className="relative overflow-hidden bg-surface-950 py-12 sm:py-16" aria-label="Призыв к действию: рассчитать стоимость подбора автомобиля">
      <div className="absolute inset-0" aria-hidden="true">
        <Parallax offset={30} className="absolute inset-0">
          <Image
            src="/images/bg-car-front.jpg"
            alt="" aria-hidden="true"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/90 to-surface-950" />
      </div>

      <Container className="relative z-10">
        <AnimateOnScroll variant="fadeUp" className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
            Вы уже посчитали выгоду
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Средний торг окупает нашу работу в&nbsp;3&nbsp;раза
          </h2>
          <p className="mt-3 text-neutral-400 sm:text-lg">
            Осталось только оставить заявку. Позвоните или напишите — эксперт
            свяжется за&nbsp;15&nbsp;минут и ответит на все вопросы.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button href="#quiz" variant="primary" size="lg">
              Рассчитать стоимость подбора
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href={SITE.whatsapp} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Написать в WhatsApp
            </Button>
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            Бесплатная консультация · Без обязательств
          </p>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
