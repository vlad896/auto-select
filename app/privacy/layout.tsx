import { getPrivacyPageJsonLd } from "@/lib/jsonld";

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getPrivacyPageJsonLd();

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
