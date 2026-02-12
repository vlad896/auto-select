import { ArrowRight, Phone, Shield, Clock } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// CtaBanner — reusable full-width conversion block
// Two variants for different page positions
// ============================================================

export function CtaBannerPrimary() {
  return (
    <section className="relative overflow-hidden bg-primary-600 py-12 sm:py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left lg:gap-10">
          {/* Text */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Нашли автомобиль на av.by?
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/80 sm:text-lg">
              Не рискуйте деньгами — закажите проверку эксперта.{" "}
              <strong className="text-white">Средний торг окупает услугу в 3 раза.</strong>
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
          </div>

          {/* CTA buttons */}
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              href="#quiz"
              variant="secondary"
              size="lg"
              className="border-white/30 bg-white text-primary-700 hover:bg-white/90 hover:text-primary-800 shadow-lg"
            >
              Заказать проверку
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              href={`tel:${SITE.phone}`}
              variant="secondary"
              size="lg"
              className="border-white/30 text-white hover:bg-white/15"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Позвонить
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CtaBannerSecondary() {
  return (
    <section className="relative overflow-hidden bg-surface-950 py-12 sm:py-16">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/bg-car-front.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/90 to-surface-950" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
            Бесплатная консультация
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Не уверены, какую услугу выбрать?
          </h2>
          <p className="mt-3 text-neutral-400 sm:text-lg">
            Позвоните или напишите — эксперт поможет определиться за 5 минут.
            Расскажем, на что обратить внимание именно в вашем бюджете.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button href={SITE.whatsapp} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              Написать в WhatsApp
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href={`tel:${SITE.phone}`} variant="secondary" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </Button>
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            Ответим в течение 15 минут в рабочее время
          </p>
        </div>
      </Container>
    </section>
  );
}
