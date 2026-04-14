import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";
import { SITE } from "@/lib/constants";
import { createWebPageEntities } from "@/lib/jsonld";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  path: "/podbor/",
  title: "Автоподбор под ключ в Минске — поиск авто с гарантией чистоты",
  description:
    "Профессиональный подбор автомобиля в Минске: мониторинг рынка, проверка по VIN, выездная диагностика, юридическая экспертиза, торг и сопровождение сделки. Гарантия 2 месяца. От 1200 BYN.",
  ogImage: "/images/podbor-expert-report.jpg",
});

function getPageJsonLd() {
  const pageUrl = `${SITE.url}/podbor/`;
  const faqId = `${pageUrl}#faq`;
  const { webPage, image, breadcrumb, webPageId } = createWebPageEntities({
    pageUrl,
    name: "Автоподбор под ключ в Минске — поиск авто с гарантией чистоты | АвтоПодбор",
    description:
      "Профессиональный подбор автомобиля в Минске: мониторинг рынка, проверка по VIN, выездная диагностика, юридическая экспертиза, торг и сопровождение сделки. Гарантия 2 месяца. От 1200 BYN.",
    imageUrl: `${SITE.url}/images/podbor-expert-report.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Услуги", item: `${SITE.url}/#services` },
      { name: "Автоподбор под ключ", item: `${SITE.url}/podbor/` },
    ],
    mainEntityId: faqId,
  });
  return [
    webPage,
    image,
    {
        "@type": "Service",
        name: "Автоподбор автомобиля под ключ",
        serviceType: "Car Selection Service",
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
        offers: [
          {
            "@type": "Offer",
            name: "Подбор под ключ",
            price: "1200.00",
            priceCurrency: "BYN",
            description:
              "Полный цикл подбора: мониторинг, диагностика, юридическая проверка, торг, сопровождение сделки.",
          },
          {
            "@type": "Offer",
            name: "Эксперт на день",
            price: "500.00",
            priceCurrency: "BYN",
            description:
              "Автоэксперт с полным оборудованием в вашем распоряжении на весь день. До 10 осмотров.",
          },
        ],
        description:
          "Профессиональный подбор авто с пробегом: мониторинг рынка, проверка VIN, выездная диагностика, юридическая экспертиза, сопровождение сделки.",
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
            name: "Сколько времени занимает подбор авто?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "В среднем — от 7 до 14 дней. Популярные модели (VW Polo, Geely Coolray, Kia Rio) можно найти за 3-5 дней. Редкие экземпляры — до месяца.",
            },
          },
          {
            "@type": "Question",
            name: "Можно ли найти живую машину «по низу рынка»?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "«Низ рынка» — это всегда компромисс: ДТП, большой пробег или проблемы с документами. Мы работаем с реальным бюджетом и предложим оптимальные параметры.",
            },
          },
          {
            "@type": "Question",
            name: "Что если машина сломается после покупки?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Мы гарантируем отсутствие критических скрытых дефектов на момент покупки. Дополнительно выдаём лист рекомендаций по первоочередному обслуживанию.",
            },
          },
        ],
    },
    breadcrumb,
  ];
}

export default function PodborLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdScripts schemas={getPageJsonLd()} idPrefix="podbor-jsonld" />
      {children}
    </>
  );
}
