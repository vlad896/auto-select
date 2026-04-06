import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { createWebPageEntities } from "@/lib/jsonld";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  path: "/podbor/expert-na-den/",
  title: "Услуга Эксперт на день в Минске: подбор авто за 500 BYN",
  description:
    "Проверка неограниченного количества авто за один день. Эксперт на машине с оборудованием (Launch, Etari, эндоскоп). Экономия на разовых выездах до 50%. Забронируйте дату!",
  ogImage: "/images/expert-day-hero.jpg",
  openGraphType: "article",
});

function getPageJsonLd() {
  const pageUrl = `${SITE.url}/podbor/expert-na-den/`;
  const faqId = `${pageUrl}#faq`;
  const { webPage, image, breadcrumb, webPageId } = createWebPageEntities({
    pageUrl,
    name: "Услуга Эксперт на день в Минске: подбор авто за 500 BYN | АвтоПодбор",
    description:
      "Проверка неограниченного количества авто за один день. Эксперт на машине с оборудованием (Launch, Etari, эндоскоп). Экономия на разовых выездах до 50%. Забронируйте дату!",
    imageUrl: `${SITE.url}/images/expert-day-hero.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Автоподбор под ключ", item: `${SITE.url}/podbor/` },
      { name: "Эксперт на день", item: `${SITE.url}/podbor/expert-na-den/` },
    ],
    mainEntityId: faqId,
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage,
      image,
      {
        "@type": "Service",
        name: "Эксперт на день — интенсивный подбор авто",
        serviceType: "Mobile Car Inspection",
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
          price: "500.00",
          priceCurrency: "BYN",
          description:
            "Автоэксперт с полным оборудованием в вашем распоряжении на 8 часов. До 10 качественных осмотров.",
        },
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
            name: "Вы забираете меня из дома или с вокзала?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да. Эксперт встретит вас на вокзале или заберёт от подъезда (в пределах МКАД). Вы передвигаетесь на комфортном автомобиле специалиста.",
            },
          },
          {
            "@type": "Question",
            name: "Сколько машин реально успеть посмотреть?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Качественно с тест-драйвом — 5–8 вариантов. В режиме экспресс-осмотра на рынке — до 15–20. Зависит от разброса локаций.",
            },
          },
          {
            "@type": "Question",
            name: "Входит ли подъёмник в стоимость?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Аренда подъёмника на СТО оплачивается отдельно (30–40 BYN). Эксперт присутствует при осмотре днища и подвески.",
            },
          },
          {
            "@type": "Question",
            name: "Что если мы ничего не купим за день?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Это тоже результат: вы не купили «хлам» и получили полное представление о рынке. Вы получите диагностические листы на каждую осмотренную машину.",
            },
          },
        ],
      },
      breadcrumb,
    ],
  };
}

export default function ExpertNaDenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()),
        }}
      />
      {children}
    </>
  );
}
