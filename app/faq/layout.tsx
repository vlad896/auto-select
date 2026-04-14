import { getFAQPageJsonLd } from "@/lib/jsonld";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getFAQPageJsonLd();

  return (
    <>
      <JsonLdScripts schemas={jsonLd} idPrefix="faq-jsonld" />
      {children}
    </>
  );
}
