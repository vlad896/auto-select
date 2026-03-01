import { getCasesPageJsonLd } from "@/lib/jsonld";

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getCasesPageJsonLd();

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
