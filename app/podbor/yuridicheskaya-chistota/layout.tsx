import type { Metadata } from "next";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";
import { SITE } from "@/lib/constants";
import { createWebPageEntities } from "@/lib/jsonld";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  path: "/podbor/yuridicheskaya-chistota/",
  title: "Юридическая проверка авто в Минске: базы залогов, арестов и розыска",
  description:
    "Проверка юридической чистоты автомобиля перед покупкой. Реестр залогов РБ/РФ, проверка VIN, исполнительные производства. Экспертная сверка маркировок. Защита от «двойников».",
  ogImage: "/images/legal-vin-check.jpg",
  openGraphType: "article",
});

function getPageJsonLd() {
  const pageUrl = `${SITE.url}/podbor/yuridicheskaya-chistota/`;
  const faqId = `${pageUrl}#faq`;
  const { webPage, image, breadcrumb, webPageId } = createWebPageEntities({
    pageUrl,
    name: "Юридическая проверка авто в Минске: базы залогов, арестов и розыска | АвтоПодбор",
    description:
      "Проверка юридической чистоты автомобиля перед покупкой. Реестр залогов РБ/РФ, проверка VIN, исполнительные производства. Экспертная сверка маркировок. Защита от «двойников».",
    imageUrl: `${SITE.url}/images/legal-vin-check.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Автоподбор", item: `${SITE.url}/podbor/` },
      { name: "Юридическая проверка", item: `${SITE.url}/podbor/yuridicheskaya-chistota/` },
    ],
    mainEntityId: faqId,
  });
  return [
    webPage,
    image,
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
        "@id": faqId,
        url: pageUrl,
        inLanguage: "ru",
        mainEntityOfPage: { "@id": webPageId },
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
    breadcrumb,
  ];
}

export default function YuridicheskayaChistotaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLdScripts schemas={getPageJsonLd()} idPrefix="legal-jsonld" />
      {children}
    </>
  );
}
