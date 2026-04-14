import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";
import { SITE } from "@/lib/constants";
import { createWebPageEntities } from "@/lib/jsonld";
import { getPageMetadata } from "@/lib/metadata";

// ============================================================
// L2 Page: Выездная диагностика автомобиля
// ============================================================

export const metadata: Metadata = getPageMetadata({
  path: "/diagnostika/",
  title: "Выездная диагностика автомобиля перед покупкой в Минске — от 130 BYN",
  description:
    "Комплексная проверка авто перед покупкой: кузов толщиномером Etari, компьютерная диагностика Launch X431, верификация пробега, эндоскопия двигателя. Выезд за 60 минут. Отчёт на 100+ фото.",
  ogImage: "/images/diag-hero-bg.jpg",
});

// ============================================================
// JSON-LD structured data for the diagnostics page
// ============================================================

function getDiagnosticsJsonLd() {
  const pageUrl = `${SITE.url}/diagnostika/`;
  const faqId = `${pageUrl}#faq`;
  const { webPage, image, breadcrumb, webPageId } = createWebPageEntities({
    pageUrl,
    name: "Выездная диагностика автомобиля перед покупкой в Минске — от 130 BYN | АвтоПодбор",
    description:
      "Комплексная проверка авто перед покупкой: кузов толщиномером Etari, компьютерная диагностика Launch X431, верификация пробега, эндоскопия двигателя. Выезд за 60 минут. Отчёт на 100+ фото.",
    imageUrl: `${SITE.url}/images/diag-hero-bg.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Выездная диагностика", item: `${SITE.url}/diagnostika/` },
    ],
    mainEntityId: faqId,
  });
  return [
    webPage,
    image,
    {
        "@type": "Service",
        name: "Выездная диагностика автомобиля перед покупкой",
        serviceType: "Auto Inspection",
        provider: {
          "@type": "LocalBusiness",
          name: SITE.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Минск",
            addressCountry: "BY",
          },
        },
        areaServed: { "@type": "City", name: "Минск" },
        offers: {
          "@type": "Offer",
          price: "130.00",
          priceCurrency: "BYN",
          url: `${SITE.url}/diagnostika/`,
        },
        description:
          "Комплексная проверка авто: кузов, электроника сканером Launch, проверка пробега и эндоскопия двигателя.",
    },
    {
        "@type": "HowTo",
        name: "Как проходит диагностика автомобиля",
        step: [
          {
            "@type": "HowToStep",
            text: "Проверка кузова толщиномером на предмет ДТП и окрасов.",
          },
          {
            "@type": "HowToStep",
            text: "Компьютерная диагностика всех блоков управления сканером Launch.",
          },
          {
            "@type": "HowToStep",
            text: "Верификация реального пробега по дублям в ЭБУ.",
          },
          {
            "@type": "HowToStep",
            text: "Тест-драйв и проверка ходовой части.",
          },
        ],
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
            name: "Сколько стоит выездная диагностика в Минске?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Стоимость разового выезда специалиста начинается от 130 BYN и зависит от сложности автомобиля и удаленности осмотра.",
            },
          },
          {
            "@type": "Question",
            name: "Можно ли заказать диагностику удаленно?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да, более 70% наших клиентов заказывают осмотр удаленно. Мы высылаем подробный фото- и видеоотчет в мессенджеры.",
            },
          },
          {
            "@type": "Question",
            name: "Сколько времени занимает осмотр?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "От 60 до 120 минут в зависимости от сложности автомобиля и доступа к узлам.",
            },
          },
        ],
    },
    breadcrumb,
  ];
}

// ============================================================
// Layout wrapper
// ============================================================

export default function DiagnostikaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdScripts schemas={getDiagnosticsJsonLd()} idPrefix="diagnostika-jsonld" />
      {children}
    </>
  );
}
