import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { createWebPageEntities } from "@/lib/jsonld";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  path: "/diagnostika/kompyuternaya-diagnostika/",
  title: "Компьютерная диагностика автомобиля в Минске — Launch X431 V+",
  description:
    "Глубокая компьютерная диагностика: опрос 80+ блоков, Live Data, Freeze Frame, проверка ГРМ и АКПП/DSG. Профессиональный сканер Launch X431 V+ PRO. От 50 BYN.",
  ogImage: "/images/comp-diag-hero.jpg",
  openGraphType: "article",
});

function getPageJsonLd() {
  const pageUrl = `${SITE.url}/diagnostika/kompyuternaya-diagnostika/`;
  const faqId = `${pageUrl}#faq`;
  const { webPage, image, breadcrumb, webPageId } = createWebPageEntities({
    pageUrl,
    name: "Компьютерная диагностика автомобиля в Минске — Launch X431 V+ | АвтоПодбор",
    description:
      "Глубокая компьютерная диагностика: опрос 80+ блоков, Live Data, Freeze Frame, проверка ГРМ и АКПП/DSG. Профессиональный сканер Launch X431 V+ PRO. От 50 BYN.",
    imageUrl: `${SITE.url}/images/comp-diag-hero.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Диагностика", item: `${SITE.url}/diagnostika/` },
      { name: "Компьютерная диагностика", item: `${SITE.url}/diagnostika/kompyuternaya-diagnostika/` },
    ],
    mainEntityId: faqId,
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage,
      image,
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
        "@id": faqId,
        url: pageUrl,
        inLanguage: "ru",
        mainEntityOfPage: { "@id": webPageId },
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
      breadcrumb,
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
