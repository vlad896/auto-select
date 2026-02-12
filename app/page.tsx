import { HeroSection } from "@/components/sections/HeroSection";
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

export default function HomePage() {
  return (
    <main id="main-content" className="pt-16 lg:pt-18">
      {/* 1. Захват внимания — первый экран */}
      <HeroSection />

      {/* 2. Квиз — лидогенерация (пока пользователь "горячий") */}
      <Quiz />

      {/* 3. Доверие — оборудование и экспертиза */}
      <ToolsProof />

      {/* 4. Услуги — что предлагаем */}
      <ServicesGrid />

      {/* === CTA BREAK #1 — конверсионный баннер после услуг === */}
      <CtaBannerPrimary />

      {/* 5. Методология — как проверяем */}
      <Methodology />

      {/* 6. Цены — прозрачность */}
      <PricingTable />

      {/* 7. Калькулятор — интерактив + убиваем возражение "дорого" */}
      <Calculator />

      {/* 8. Почему мы — сравнение с конкурентами */}
      <WhyUs />

      {/* 9. Этапы работы — снимаем страх "а как это будет?" */}
      <ProcessSteps />

      {/* === CTA BREAK #2 — для тех кто сомневается === */}
      <CtaBannerSecondary />

      {/* 10. Гарантии — доверие и юридическая защита */}
      <Guarantees />

      {/* 11. Юридическая проверка — снимаем страх "не нарвусь ли на угон" */}
      <LegalCheck />

      {/* 12. Отзывы — социальное доказательство */}
      <Testimonials />

      {/* 13. Видео — визуальный контент */}
      <VideoShowcase />

      {/* 14. Кейсы — конкретные результаты */}
      <CaseStudies />

      {/* 15. FAQ — снимаем последние возражения */}
      <FAQSection />

      {/* 16. Карта — финальный штрих доверия */}
      <OfficeMap />
    </main>
  );
}
