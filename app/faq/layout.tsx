import { getFAQPageJsonLd } from "@/lib/jsonld";

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getFAQPageJsonLd();

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
