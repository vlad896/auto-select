import { getPricingPageJsonLd } from "@/lib/jsonld";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getPricingPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
