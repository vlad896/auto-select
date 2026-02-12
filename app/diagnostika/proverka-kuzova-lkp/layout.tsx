import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Проверка кузова и ЛКП автомобиля в Минске — толщиномер Etari ET-700 | АвтоПодбор",
  description:
    "Комплексный аудит кузова: замер ЛКП в 5-10 точках на элемент, силовая структура, заводские швы, маркировка стёкол, системы SRS. Детекция скрытых ДТП. От 40 BYN.",
  alternates: {
    canonical: `${SITE.url}/diagnostika/proverka-kuzova-lkp/`,
  },
  openGraph: {
    title: "Проверка кузова и ЛКП — детекция скрытых ДТП",
    description:
      "Толщиномер Etari ET-700, инспекционные фонари, анализ силовых элементов и герметика. Отличаем косметику от стапельного ремонта.",
    url: `${SITE.url}/diagnostika/proverka-kuzova-lkp/`,
    siteName: SITE.name,
    locale: "ru_BY",
    type: "article",
    images: [
      {
        url: `${SITE.url}/images/diag-paint-thickness.jpg`,
        width: 1200,
        height: 630,
        alt: "Замер толщины ЛКП толщиномером Etari ET-700",
      },
    ],
  },
};

function getPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline:
          "Экспертиза лакокрасочного покрытия и геометрии кузова",
        description:
          "Проверка автомобиля толщиномером, поиск скрытых швов, анализ безопасности SRS и маркировки остекления.",
        author: { "@type": "Organization", name: SITE.name },
      },
      {
        "@type": "Service",
        name: "Проверка кузова и ЛКП автомобиля",
        provider: { "@type": "Organization", name: SITE.name },
        areaServed: { "@type": "City", name: "Минск" },
        offers: {
          "@type": "Offer",
          price: "40.00",
          priceCurrency: "BYN",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Какая толщина ЛКП считается заводской?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Заводской окрас обычно находится в диапазоне 80–140 микрон. Значения 160–250 мкм указывают на вторичный окрас, а свыше 300–500 мкм — на наличие шпатлёвки и физического удара.",
            },
          },
          {
            "@type": "Question",
            name: "Можно ли скрыть ДТП от толщиномера?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да, используя детали «в цвет» с разборок. Поэтому помимо толщиномера мы проверяем маркировку стёкол, болты крепления, шагрень, герметик и оптику.",
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
            name: "Диагностика",
            item: `${SITE.url}/diagnostika/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Проверка кузова и ЛКП",
            item: `${SITE.url}/diagnostika/proverka-kuzova-lkp/`,
          },
        ],
      },
    ],
  };
}

export default function ProverkaKuzovaLayout({
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
