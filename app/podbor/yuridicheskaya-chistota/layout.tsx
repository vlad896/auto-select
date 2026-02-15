import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Юридическая проверка авто в Минске: базы залогов, арестов и розыска | АвтоПодбор",
  description:
    "Проверка юридической чистоты автомобиля перед покупкой. Реестр залогов РБ/РФ, проверка VIN, исполнительные производства. Экспертная сверка маркировок. Защита от «двойников».",
  alternates: { canonical: `${SITE.url}/podbor/yuridicheskaya-chistota/` },
  openGraph: {
    title: "Юридическая проверка автомобиля — защита от залогов и «двойников»",
    description:
      "Реестр залогов, ОПИ, ФССП, криминалистическая экспертиза VIN. Не дайте забрать ваш автомобиль через месяц после покупки.",
    url: `${SITE.url}/podbor/yuridicheskaya-chistota/`,
    siteName: SITE.name,
    locale: "ru_BY",
    type: "article",
    images: [
      {
        url: `${SITE.url}/images/legal-vin-check.jpg`,
        width: 1200,
        height: 630,
        alt: "Экспертная сверка VIN-номера ультрафиолетовым фонарём",
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
        name: "Юридическая проверка автомобиля",
        serviceType: "Legal Vehicle Verification",
        provider: { "@type": "Organization", name: SITE.name },
        areaServed: { "@type": "City", name: "Минск" },
        description:
          "Глубокий аудит юридической чистоты: реестр залогов РБ/РФ, проверка собственника по ОПИ/ФССП, криминалистическая экспертиза маркировок VIN.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Если я оформил машину в ГАИ и получил номера, я в безопасности?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Нет. ГАИ проверяет только базу угона. Если через месяц выяснится, что машина в залоге у банка, банк подаст в суд и изымет авто. ГАИ аннулирует учёт.",
            },
          },
          {
            "@type": "Question",
            name: "Можно ли купить авто по счёт-справке?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Мы не рекомендуем. Счёт-справки часто выписываются без присутствия реального владельца. Безопасный способ — ДКП при инспекторе ГАИ или нотариусе.",
            },
          },
          {
            "@type": "Question",
            name: "Проверяете ли вы авто из России?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да, это зона максимального риска. Проверяем ГИБДД РФ, Федеральную нотариальную палату (залоги) и статус ЭПТС.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Автоподбор", item: `${SITE.url}/podbor/` },
          { "@type": "ListItem", position: 3, name: "Юридическая проверка", item: `${SITE.url}/podbor/yuridicheskaya-chistota/` },
        ],
      },
    ],
  };
}

export default function YuridicheskayaChistotaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageJsonLd()) }} />
      {children}
    </>
  );
}
