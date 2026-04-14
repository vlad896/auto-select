import { getCasesPageJsonLd } from "@/lib/jsonld";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getCasesPageJsonLd();

  return (
    <>
      <JsonLdScripts schemas={jsonLd} idPrefix="cases-jsonld" />
      {children}
    </>
  );
}
