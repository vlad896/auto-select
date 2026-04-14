import { getPrivacyPageJsonLd } from "@/lib/jsonld";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getPrivacyPageJsonLd();

  return (
    <>
      <JsonLdScripts schemas={jsonLd} idPrefix="privacy-jsonld" />
      {children}
    </>
  );
}
