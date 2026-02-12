import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Видеоэндоскопия двигателя в Минске: задиры, нагар, трещины ГБЦ | АвтоПодбор",
  description:
    "Эндоскопия цилиндров Full HD зондом: задиры ЦПГ, нагар на клапанах, трещины ГБЦ, разрушение катализатора. Проверка моторов G4KD, N20, TSI, M48. От 90 BYN.",
  alternates: { canonical: `${SITE.url}/diagnostika/endoskopiya-dvigatelya/` },
  openGraph: {
    title: "Эндоскопия двигателя — заглянем в сердце мотора",
    description:
      "Full HD зонд с артикуляцией 180°. Задиры, масложор, прогар клапанов — видим всё без разборки. От 90 BYN в Минске.",
    url: `${SITE.url}/diagnostika/endoskopiya-dvigatelya/`,
    siteName: SITE.name,
    locale: "ru_BY",
    type: "article",
  },
};

function getPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Диагностика", item: `${SITE.url}/diagnostika/` },
          { "@type": "ListItem", position: 3, name: "Эндоскопия двигателя", item: `${SITE.url}/diagnostika/endoskopiya-dvigatelya/` },
        ],
      },
    ],
  };
}

export default function EndoskopiyaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageJsonLd()) }}
      />
      {children}
    </>
  );
}
