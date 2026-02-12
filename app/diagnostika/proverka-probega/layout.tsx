import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

// ============================================================
// L3 Page: Проверка пробега
// Cocoon: L1 (/) → L2 (/diagnostika/) → THIS L3
// Siblings: proverka-kuzova-lkp, kompyuternaya-diagnostika, endoskopiya-dvigatelya
// ============================================================

export const metadata: Metadata = {
  title:
    "Как проверить реальный пробег автомобиля: методы детекции скруток | АвтоПодбор",
  description:
    "Профессиональная проверка пробега сканером Launch X431: дубли в ABS, АКПП, SRS, моточасы, базы Белтехосмотра. Выявляем скрученный одометр в Минске.",
  alternates: {
    canonical: `${SITE.url}/diagnostika/proverka-probega/`,
  },
  openGraph: {
    title: "Проверка реального пробега автомобиля — методика экспертов",
    description:
      "Цифровые дубли в 10+ блоках управления, моточасы, физический износ, базы техосмотров. Как мы находим скрученный пробег.",
    url: `${SITE.url}/diagnostika/proverka-probega/`,
    siteName: SITE.name,
    locale: "ru_BY",
    type: "article",
    images: [
      {
        url: `${SITE.url}/images/diag-scanner-launch.jpg`,
        width: 1200,
        height: 630,
        alt: "Проверка пробега сканером Launch X431 — чтение блоков управления",
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
