import { HeroSection } from "@/components/sections/HeroSection";
import { Quiz } from "@/components/sections/Quiz";
import { ToolsProof } from "@/components/sections/ToolsProof";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Methodology } from "@/components/sections/Methodology";
import { PricingTable } from "@/components/sections/PricingTable";
import { Calculator } from "@/components/sections/Calculator";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LegalCheck } from "@/components/sections/LegalCheck";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { FAQSection } from "@/components/sections/FAQSection";
import { OfficeMap } from "@/components/sections/OfficeMap";

export default function HomePage() {
  return (
    <main id="main-content" className="pt-16 lg:pt-18">
      <HeroSection />
      <Quiz />
      <ToolsProof />
      <ServicesGrid />
      <Methodology />
      <PricingTable />
      <Calculator />
      <ProcessSteps />
      <LegalCheck />
      <VideoShowcase />
      <CaseStudies />
      <FAQSection />
      <OfficeMap />
    </main>
  );
}
