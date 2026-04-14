import { getPricingPageJsonLd } from "@/lib/jsonld";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getPricingPageJsonLd();

  return (
    <>
      <JsonLdScripts schemas={jsonLd} idPrefix="pricing-jsonld" />
      {children}
    </>
  );
}
