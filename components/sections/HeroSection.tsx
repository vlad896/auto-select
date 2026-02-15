import {
  Shield,
  Clock,
  FileCheck,
  ArrowRight,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Odometer } from "@/components/ui/Odometer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Parallax } from "@/components/ui/Parallax";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SITE } from "@/lib/constants";

// ============================================================
// Trust stats shown below the CTAs
// ============================================================

const TRUST_STATS = [
  { num: 140, suffix: "+", label: "пунктов проверки", icon: Shield },
  { num: 2, suffix: " ч", label: "готовность отчёта", icon: Clock },
  { num: 500, suffix: "+", label: "проверенных авто", icon: FileCheck },
  { num: 95, suffix: "%", label: "успешный торг", icon: CheckCircle },
] as const;

// ============================================================
// Hero Section — dark theme with background car image
// ============================================================

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-surface-950"
      aria-labelledby="hero-heading"
    >
      {/* Hero background image with dark overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Parallax offset={40} className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="" aria-hidden="true"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
            quality={75}
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950/90 via-surface-950/85 to-surface-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/20 via-transparent to-transparent" />
      </div>

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative gradient orbs */}
      <div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-600/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-20 sm:py-24 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Small label above heading */}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-400 backdrop-blur-sm border border-white/10 sm:text-sm">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            Профессиональная диагностика в Минске
          </p>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Автоподбор в Минске:{" "}
            <span className="bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">
              профессиональная диагностика
            </span>{" "}
            и выездная проверка авто
          </h1>

          {/* USP subtitle */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 sm:mt-6 sm:text-lg md:text-xl">
            Проверка по 140+ пунктам. Сканер Launch&nbsp;X431, толщиномер
            Etari, проверка VIN. Экспертный отчёт через 2&nbsp;часа. Работаем
            по договору с гарантией.
          </p>

          {/* Dual CTA buttons */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <MagneticButton>
              <Button
                href="#quiz"
                variant="primary"
                size="lg"
                fullWidthMobile
                className="pulse-glow"
              >
                Рассчитать стоимость подбора
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                href={SITE.whatsapp}
                variant="secondary"
                size="lg"
                fullWidthMobile
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Срочный выезд на осмотр
              </Button>
            </MagneticButton>
          </div>

          {/* Trust micro-copy */}
          <p className="mt-4 text-xs text-neutral-500 sm:text-sm">
            Бесплатная консультация · Ответ в течение 15 минут
          </p>
        </div>

        {/* Trust stats bar */}
        <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {TRUST_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <AnimateOnScroll key={stat.label} variant="fadeUp" delay={i * 0.12}>
                  <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.04] px-4 py-5 backdrop-blur-sm border border-white/[0.06] transition-colors hover:bg-white/[0.07] card-hover">
                    <Icon
                      className="h-5 w-5 text-primary-500"
                      aria-hidden="true"
                    />
                    <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      <Odometer value={stat.num} suffix={stat.suffix} duration={1.5} />
                    </p>
                    <p className="text-center text-xs text-neutral-500 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 56h1440V28c-120 10-240 18-360 18S840 30 720 20 480 8 360 8 120 18 0 28v28z"
            fill="#0a0a0a"
          />
        </svg>
      </div>
    </section>
  );
}
