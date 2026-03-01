import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getPageMetadata } from "@/lib/metadata";

// ============================================================
// L3 Page: Проверка пробега
// ============================================================

export const metadata: Metadata = getPageMetadata({
  path: "/diagnostika/proverka-probega/",
  title: "Как проверить реальный пробег автомобиля: методы детекции скруток",
  description:
    "Профессиональная проверка пробега сканером Launch X431: дубли в ABS, АКПП, SRS, моточасы, базы Белтехосмотра. Выявляем скрученный одометр в Минске.",
  ogImage: "/images/diag-scanner-launch.jpg",
  openGraphType: "article",
});

function getPageJsonLd() {
  const pageUrl = `${SITE.url}/diagnostika/proverka-probega/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Как проверить реальный пробег автомобиля: методы детекции скруток | АвтоПодбор",
        description:
          "Профессиональная проверка пробега сканером Launch X431: дубли в ABS, АКПП, SRS, моточасы, базы Белтехосмотра. Выявляем скрученный одометр в Минске.",
        isPartOf: { "@id": `${SITE.url}/#website` },
        inLanguage: "ru",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/images/diag-scanner-launch.jpg`,
        },
      },
      {
        "@type": "TechArticle",
        headline:
          "Методика проверки реального пробега автомобиля в Минске",
        description:
          "Профессиональный анализ цифровых дублей пробега в блоках ABS, АКПП и SRS. Как выявить скрученный одометр сканером Launch.",
        proficiencyLevel: "Expert",
        author: {
          "@type": "Organization",
          name: SITE.name,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        inLanguage: "ru",
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        mainEntity: [
          {
            "@type": "Question",
            name: "Можно ли скрутить пробег бесследно?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "В современных авто (BMW, VAG) пробег дублируется в 5-10 блоках. Полная очистка стоит дорого и редко выполняется перекупщиками, что позволяет нам найти следы в истории ошибок или моточасах.",
            },
          },
          {
            "@type": "Question",
            name: "Как рассчитать пробег по моточасам?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Общий пробег делится на моточасы из ЭБУ двигателя. Для городского авто в Минске норма средней скорости — 25-35 км/ч. Отклонение означает скрутку.",
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
            name: "Выездная диагностика",
            item: `${SITE.url}/diagnostika/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Проверка пробега",
            item: `${SITE.url}/diagnostika/proverka-probega/`,
          },
        ],
      },
    ],
  };
}

export default function ProverkaProbegaLayout({
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
