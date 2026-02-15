import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Автоподбор под ключ в Минске — поиск авто с гарантией чистоты | АвтоПодбор",
  description:
    "Профессиональный подбор автомобиля в Минске: мониторинг рынка, проверка по VIN, выездная диагностика, юридическая экспертиза, торг и сопровождение сделки. Гарантия 2 месяца. От 900 BYN.",
  alternates: { canonical: `${SITE.url}/podbor/` },
  openGraph: {
    title: "Автоподбор под ключ — найдем лучший авто в ваш бюджет",
    description:
      "Полный цикл: от мониторинга объявлений до постановки на учет. 140+ пунктов проверки. Гарантия 2 мес. Договор.",
    url: `${SITE.url}/podbor/`,
    siteName: SITE.name,
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: `${SITE.url}/images/podbor-expert-report.jpg`,
        width: 1200,
        height: 630,
        alt: "Автоподбор в Минске — эксперт с диагностическим отчетом у автомобиля",
      },
    ],
  },
};

function getPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
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
            price: "900.00",
            priceCurrency: "BYN",
            description:
              "Полный цикл подбора: мониторинг, диагностика, юридическая проверка, торг, сопровождение сделки.",
          },
          {
            "@type": "Offer",
            name: "Эксперт на день",
            price: "380.00",
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: `${SITE.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Услуги",
            item: `${SITE.url}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Автоподбор под ключ",
            item: `${SITE.url}/podbor/`,
          },
        ],
      },
    ],
  };
}

export default function PodborLayout({
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
