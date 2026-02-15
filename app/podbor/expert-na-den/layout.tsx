import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Услуга Эксперт на день в Минске: подбор авто за 380 BYN | АвтоПодбор",
  description:
    "Проверка неограниченного количества авто за один день. Эксперт на машине с оборудованием (Launch, Etari, эндоскоп). Экономия на разовых выездах до 50%. Забронируйте дату!",
  alternates: { canonical: `${SITE.url}/podbor/expert-na-den/` },
  openGraph: {
    title: "Эксперт на день — мобильный осмотр авто в Минске",
    description:
      "8 часов, до 10 осмотров, Launch X431 + Etari + эндоскоп. Встречаем на вокзале, строим маршрут, торгуемся. 380 BYN.",
    url: `${SITE.url}/podbor/expert-na-den/`,
    siteName: SITE.name,
    locale: "ru_BY",
    type: "article",
    images: [
      {
        url: `${SITE.url}/images/expert-day-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Эксперт на день — мобильный осмотр автомобилей в Минске",
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
          price: "380.00",
          priceCurrency: "BYN",
          description:
            "Автоэксперт с полным оборудованием в вашем распоряжении на 8 часов. До 10 качественных осмотров.",
        },
      },
      {
        "@type": "FAQPage",
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
            name: "Автоподбор под ключ",
            item: `${SITE.url}/podbor/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Эксперт на день",
            item: `${SITE.url}/podbor/expert-na-den/`,
          },
        ],
      },
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
