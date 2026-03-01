import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { Marquee } from "@/components/ui/Marquee";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { SITE } from "@/lib/constants";

const loading = () => <SectionSkeleton />;

// Секции с framer-motion подгружаем динамически — чанк 370 не блокирует FCP/LCP (Lighthouse)
const Quiz = dynamic(
  () => import("@/components/sections/Quiz").then((m) => ({ default: m.Quiz })),
  { ssr: true, loading }
);
const ToolsProof = dynamic(
  () => import("@/components/sections/ToolsProof").then((m) => ({ default: m.ToolsProof })),
  { ssr: true, loading }
);
const ServicesGrid = dynamic(
  () => import("@/components/sections/ServicesGrid").then((m) => ({ default: m.ServicesGrid })),
  { ssr: true, loading }
);
const CtaBannerPrimary = dynamic(
  () => import("@/components/sections/CtaBanner").then((m) => ({ default: m.CtaBannerPrimary })),
  { ssr: true, loading }
);
const CtaBannerSecondary = dynamic(
  () => import("@/components/sections/CtaBanner").then((m) => ({ default: m.CtaBannerSecondary })),
  { ssr: true, loading }
);
const Methodology = dynamic(
  () => import("@/components/sections/Methodology").then((m) => ({ default: m.Methodology })),
  { ssr: true, loading }
);
const PricingTable = dynamic(
  () => import("@/components/sections/PricingTable").then((m) => ({ default: m.PricingTable })),
  { ssr: true, loading }
);
const Calculator = dynamic(
  () => import("@/components/sections/Calculator").then((m) => ({ default: m.Calculator })),
  { ssr: true, loading }
);
const WhyUs = dynamic(
  () => import("@/components/sections/WhyUs").then((m) => ({ default: m.WhyUs })),
  { ssr: true, loading }
);
const ProcessSteps = dynamic(
  () => import("@/components/sections/ProcessSteps").then((m) => ({ default: m.ProcessSteps })),
  { ssr: true, loading }
);
const Guarantees = dynamic(
  () => import("@/components/sections/Guarantees").then((m) => ({ default: m.Guarantees })),
  { ssr: true, loading }
);
const LegalCheck = dynamic(
  () => import("@/components/sections/LegalCheck").then((m) => ({ default: m.LegalCheck })),
  { ssr: true, loading }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: true, loading }
);
const VideoShowcase = dynamic(
  () => import("@/components/sections/VideoShowcase").then((m) => ({ default: m.VideoShowcase })),
  { ssr: true, loading }
);
const CaseStudies = dynamic(
  () => import("@/components/sections/CaseStudies").then((m) => ({ default: m.CaseStudies })),
  { ssr: true, loading }
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection").then((m) => ({ default: m.FAQSection })),
  { ssr: true, loading }
);
const OfficeMap = dynamic(
  () => import("@/components/sections/OfficeMap").then((m) => ({ default: m.OfficeMap })),
  { ssr: true, loading }
);

// ============================================================
// Metadata — только для главной: alternate для LLM-документации
// ============================================================

export const metadata = {
  alternates: {
    canonical: `${SITE.url}/`,
    types: {
      "text/plain": "/llms.txt",
    },
  },
};

// ============================================================
// Marketing funnel structure — AIDA model
//
// PHASE 1: ATTENTION — захват внимания
//   Hero → первый экран, УТП, CTA
//
// PHASE 2: INTEREST — "зачем мне это?"
//   WhyUs → таблица "мы vs сам vs салон" (отвечает на главный вопрос)
//   CaseStudies → реальные примеры (скрученный пробег, экономия $2000)
//   ServicesGrid → конкретные услуги и цены
//
// PHASE 3: DESIRE — "хочу, но нужны детали"
//   CTA #1 → горячий конверсионный блок для тех кто уже готов
//   ProcessSteps → 5 шагов от заявки до покупки (снимаем "а что будет?")
//   Methodology → глубина проверки 140+ пунктов
//   ToolsProof → оборудование (для скептиков)
//   VideoShowcase → видео работы
//
// PHASE 4: EVALUATION — "стоит ли своих денег?"
//   PricingTable → прозрачные цены
//   Calculator → ROI "торг окупает в 3 раза"
//   CTA #2 → для сомневающихся, бесплатная консультация
//
// PHASE 5: TRUST — "можно ли доверять?"
//   Guarantees → договор, ответственность
//   LegalCheck → VIN, угон, залоги
//   Testimonials → эмоции клиентов
//
// PHASE 6: ACTION — конверсия
//   Quiz → квиз-лидогенерация (клиент уже образован и мотивирован)
//   FAQ → снимаем последние возражения
//   OfficeMap → физический адрес = финальное доверие
// ============================================================

export default function HomePage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      {/* ═══ PHASE 1: ATTENTION ═══ */}
      <HeroSection />

      {/* Brand trust marquee */}
      <section className="border-y border-white/5 bg-surface-100/50 py-4" aria-label="Марки автомобилей">
        <Marquee speed={35} pauseOnHover>
          {["BMW (ISTA+)", "Volkswagen / Audi (ODIS)", "Mercedes (Xentry)", "Geely (профиль)", "Toyota (Techstream)", "Kia / Hyundai", "Škoda / SEAT", "Volvo (VIDA)", "140+ пунктов проверки", "500+ проверенных авто", "95% успешный торг"].map((item) => (
            <span key={item} className="whitespace-nowrap text-sm font-medium text-neutral-400">
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ═══ PHASE 2: INTEREST — создаём потребность ═══ */}
      <WhyUs />
      <CaseStudies />
      <ServicesGrid />

      {/* ═══ PHASE 3: DESIRE — детали и экспертиза ═══ */}
      <CtaBannerPrimary />
      <ProcessSteps />
      <Methodology />
      <ToolsProof />
      <VideoShowcase />

      {/* ═══ PHASE 4: EVALUATION — цена и окупаемость ═══ */}
      <PricingTable />
      <Calculator />
      <CtaBannerSecondary />

      {/* ═══ PHASE 5: TRUST — доверие и снятие страхов ═══ */}
      <Guarantees />
      <LegalCheck />
      <Testimonials />

      {/* ═══ PHASE 6: ACTION — конверсия ═══ */}
      <Quiz />
      <FAQSection />
      <OfficeMap />
    </main>
  );
}
