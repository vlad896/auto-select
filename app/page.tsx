import { HeroSection } from "@/components/sections/HeroSection";
import { Marquee } from "@/components/ui/Marquee";
import { Quiz } from "@/components/sections/Quiz";
import { ToolsProof } from "@/components/sections/ToolsProof";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CtaBannerPrimary, CtaBannerSecondary } from "@/components/sections/CtaBanner";
import { Methodology } from "@/components/sections/Methodology";
import { PricingTable } from "@/components/sections/PricingTable";
import { Calculator } from "@/components/sections/Calculator";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Guarantees } from "@/components/sections/Guarantees";
import { LegalCheck } from "@/components/sections/LegalCheck";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { FAQSection } from "@/components/sections/FAQSection";
import { OfficeMap } from "@/components/sections/OfficeMap";

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
            <span key={item} className="whitespace-nowrap text-sm font-medium text-neutral-500">
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
