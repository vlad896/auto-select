import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  path: "/marki/",
  title:
    "Подбор авто по маркам в Минске: диагностика профильным сканером (BMW, VAG, Mercedes, Geely)",
  description:
    "Не ищите «просто подборщика». Выбирайте эксперта по вашей марке. Профильная диагностика дилерским оборудованием (ODIS, ISTA, Xentry). Глубокая проверка двигателей и КПП. Минск и выезд по РБ.",
  ogImage: "/images/marki-hero-diagnostic.jpg",
  openGraphType: "article",
});

function getPageJsonLd() {
  const pageUrl = `${SITE.url}/marki/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Подбор авто по маркам в Минске: диагностика профильным сканером (BMW, VAG, Mercedes, Geely) | АвтоПодбор",
        description:
          "Не ищите «просто подборщика». Выбирайте эксперта по вашей марке. Профильная диагностика дилерским оборудованием (ODIS, ISTA, Xentry). Глубокая проверка двигателей и КПП. Минск и выезд по РБ.",
        isPartOf: { "@id": `${SITE.url}/#website` },
        inLanguage: "ru",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/images/marki-hero-diagnostic.jpg`,
        },
      },
      {
        "@type": "Service",
        name: "Подбор автомобилей по маркам",
        serviceType: "Brand-Specific Vehicle Inspection",
        provider: { "@type": "Organization", name: SITE.name },
        areaServed: { "@type": "City", name: "Минск" },
        description:
          "Профильная диагностика автомобилей дилерским оборудованием: ISTA+ для BMW, ODIS для VAG, Xentry для Mercedes, Techstream для Toyota. Глубокая проверка двигателей, КПП и электроники.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги диагностики по маркам",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Разовый осмотр (Стандарт)",
              price: "130",
              priceCurrency: "BYN",
              description: "Выезд, кузов, Launch, тест-драйв, отчёт",
            },
            {
              "@type": "Offer",
              name: "Разовый осмотр (Премиум / Профиль)",
              price: "160",
              priceCurrency: "BYN",
              description: "Дилерская диагностика (BMW/VAG/MB) + детальный отчёт по блокам",
            },
            {
              "@type": "Offer",
              name: "Подбор под ключ",
              price: "1200",
              priceCurrency: "BYN",
              description: "Поиск до результата, полное сопровождение, торг",
            },
          ],
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
            name: "Нужно ли мне присутствовать на диагностике?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Нет. 80% клиентов получают отчёт удалённо: фото, видео (100+ файлов), скриншоты диагностики и голосовое резюме эксперта.",
            },
          },
          {
            "@type": "Question",
            name: "Вы торгуетесь с продавцом?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да, аргументированно. Оперируем фактами: «Здесь течёт сальник — замена $200, лысая резина — ещё $400». Торг часто покрывает стоимость наших услуг.",
            },
          },
          {
            "@type": "Question",
            name: "Можете проверить машину в автохаусе?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да, работаем со всеми площадками Минска (Малиновка, Ждановичи, Тимирязева). Знаем репутацию площадок.",
            },
          },
          {
            "@type": "Question",
            name: "Что если машина окажется в залоге?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Мы проверяем по Реестру залогов РБ и базам РФ. Это защищает от риска изъятия автомобиля банком.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Подбор по маркам", item: `${SITE.url}/marki/` },
        ],
      },
    ],
  };
}

export default function MarkiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageJsonLd()) }}
      />
      {children}
    </>
  );
}
