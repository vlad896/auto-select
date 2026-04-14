import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";
import { SITE } from "@/lib/constants";
import { createWebPageEntities } from "@/lib/jsonld";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  path: "/diagnostika/endoskopiya-dvigatelya/",
  title: "Видеоэндоскопия двигателя в Минске: задиры, нагар, трещины ГБЦ",
  description:
    "Эндоскопия цилиндров Full HD зондом: задиры ЦПГ, нагар на клапанах, трещины ГБЦ, разрушение катализатора. Проверка моторов G4KD, N20, TSI, M48. От 90 BYN.",
  openGraphType: "article",
});

function getPageJsonLd() {
  const pageUrl = `${SITE.url}/diagnostika/endoskopiya-dvigatelya/`;
  const faqId = `${pageUrl}#faq`;
  const { webPage, image, breadcrumb, webPageId } = createWebPageEntities({
    pageUrl,
    name: "Видеоэндоскопия двигателя в Минске: задиры, нагар, трещины ГБЦ | АвтоПодбор",
    description:
      "Эндоскопия цилиндров Full HD зондом: задиры ЦПГ, нагар на клапанах, трещины ГБЦ, разрушение катализатора. Проверка моторов G4KD, N20, TSI, M48. От 90 BYN.",
    imageUrl: `${SITE.url}/images/og-image.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Диагностика", item: `${SITE.url}/diagnostika/` },
      { name: "Эндоскопия двигателя", item: `${SITE.url}/diagnostika/endoskopiya-dvigatelya/` },
    ],
    mainEntityId: faqId,
  });
  return [
    webPage,
    image,
    {
        "@type": "Service",
        name: "Видеоэндоскопия двигателя",
        description:
          "Осмотр цилиндров двигателя на задиры с помощью артикуляционного Full HD эндоскопа.",
        provider: { "@type": "Organization", name: SITE.name },
        areaServed: { "@type": "City", name: "Минск" },
        offers: { "@type": "Offer", price: "90.00", priceCurrency: "BYN" },
        serviceOutput:
          "Фото и видео отчёт состояния хона, поршней и клапанов.",
    },
    {
        "@type": "FAQPage",
        "@id": faqId,
        url: pageUrl,
        inLanguage: "ru",
        mainEntityOfPage: { "@id": webPageId },
        mainEntity: [
          {
            "@type": "Question",
            name: "Сколько стоит эндоскопия двигателя в Минске?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "От 90 BYN для рядных 4-цилиндровых моторов. V6 — от 150 BYN, V8 — от 220 BYN.",
            },
          },
          {
            "@type": "Question",
            name: "Каким моторам эндоскопия обязательна?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hyundai/Kia G4KD/G4NA, BMW N20/N47/N63, VAG 1.8/2.0 TSI ранних серий, Porsche M48 — все склонны к задирам ЦПГ.",
            },
          },
        ],
    },
    breadcrumb,
  ];
}

export default function EndoskopiyaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLdScripts schemas={getPageJsonLd()} idPrefix="endoskopiya-jsonld" />
      {children}
    </>
  );
}
