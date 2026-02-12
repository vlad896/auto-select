import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Компьютерная диагностика автомобиля в Минске — Launch X431 V+ | АвтоПодбор",
  description: "Глубокая компьютерная диагностика: опрос 80+ блоков, Live Data, Freeze Frame, проверка ГРМ и АКПП/DSG. Профессиональный сканер Launch X431 V+ PRO. От 50 BYN.",
  alternates: { canonical: `${SITE.url}/diagnostika/kompyuternaya-diagnostika/` },
  openGraph: {
    title: "Компьютерная диагностика автомобиля — глубокий анализ систем",
    description: "Launch X431 V+ PRO + дилерское ПО. Опрос всех ECU, Live Data, Freeze Frame. VAG, BMW, Mercedes — специфическая диагностика.",
    url: `${SITE.url}/diagnostika/kompyuternaya-diagnostika/`,
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
        "@type": "TechArticle",
        headline: "Глубокая компьютерная диагностика электроники авто",
        description: "Чтение потоковых данных (Live Data), анализ Freeze Frame и проверка состояния систем ГРМ и АКПП через диагностический интерфейс.",
        articleSection: "Электроника и софт",
        author: { "@type": "Organization", name: SITE.name },
      },
      {
        "@type": "Service",
        name: "Компьютерная диагностика автомобиля",
        provider: { "@type": "Organization", name: SITE.name },
        areaServed: { "@type": "City", name: "Минск" },
        offers: { "@type": "Offer", price: "50.00", priceCurrency: "BYN" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Чем профессиональный сканер отличается от дешёвого OBD-адаптера?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Дешёвые сканеры видят только стандартные ошибки OBD-II, игнорируя 90% блоков (ABS, SRS, АКПП). Launch X431 V+ опрашивает до 80 блоков, читает Live Data и Freeze Frame.",
            },
          },
          {
            "@type": "Question",
            name: "Сколько стоит компьютерная диагностика?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Базовое сканирование — от 50 BYN. Глубокая диагностика с Live Data — от 80 BYN. Полный выездной комплекс — от 100 BYN.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Диагностика", item: `${SITE.url}/diagnostika/` },
          { "@type": "ListItem", position: 3, name: "Компьютерная диагностика", item: `${SITE.url}/diagnostika/kompyuternaya-diagnostika/` },
        ],
      },
    ],
  };
}

export default function KompDiagLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageJsonLd()) }} />
      {children}
    </>
  );
}
