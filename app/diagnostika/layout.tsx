import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

// ============================================================
// L2 Page: Выездная диагностика автомобиля
// Semantic cocoon: Mother = / (homepage), Children = L3 pages
// ============================================================

export const metadata: Metadata = {
  title:
    "Выездная диагностика автомобиля перед покупкой в Минске — от 130 BYN | АвтоПодбор",
  description:
    "Комплексная проверка авто перед покупкой: кузов толщиномером Etari, компьютерная диагностика Launch X431, верификация пробега, эндоскопия двигателя. Выезд за 60 минут. Отчёт на 100+ фото.",
  alternates: {
    canonical: `${SITE.url}/diagnostika/`,
  },
  openGraph: {
    title: "Выездная диагностика автомобиля в Минске — Экспертный осмотр",
    description:
      "140+ пунктов проверки. Сканер Launch X431 V+, толщиномер Etari ET-700. Доказательный осмотр с фотофиксацией. Выезд за 60 минут.",
    url: `${SITE.url}/diagnostika/`,
    siteName: SITE.name,
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: `${SITE.url}/images/diag-hero-bg.jpg`,
        width: 1200,
        height: 630,
        alt: "Выездная диагностика автомобиля — осмотр на подъёмнике в Минске",
      },
    ],
  },
};

// ============================================================
// JSON-LD structured data for the diagnostics page
// ============================================================

function getDiagnosticsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Выездная диагностика автомобиля перед покупкой",
        serviceType: "Auto Inspection",
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
          price: "130.00",
          priceCurrency: "BYN",
          url: `${SITE.url}/diagnostika/`,
        },
        description:
          "Комплексная проверка авто: кузов, электроника сканером Launch, проверка пробега и эндоскопия двигателя.",
      },
      {
        "@type": "HowTo",
        name: "Как проходит диагностика автомобиля",
        step: [
          {
            "@type": "HowToStep",
            text: "Проверка кузова толщиномером на предмет ДТП и окрасов.",
          },
          {
            "@type": "HowToStep",
            text: "Компьютерная диагностика всех блоков управления сканером Launch.",
          },
          {
            "@type": "HowToStep",
            text: "Верификация реального пробега по дублям в ЭБУ.",
          },
          {
            "@type": "HowToStep",
            text: "Тест-драйв и проверка ходовой части.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Сколько стоит выездная диагностика в Минске?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Стоимость разового выезда специалиста начинается от 130 BYN и зависит от сложности автомобиля и удаленности осмотра.",
            },
          },
          {
            "@type": "Question",
            name: "Можно ли заказать диагностику удаленно?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да, более 70% наших клиентов заказывают осмотр удаленно. Мы высылаем подробный фото- и видеоотчет в мессенджеры.",
            },
          },
          {
            "@type": "Question",
            name: "Сколько времени занимает осмотр?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "От 60 до 120 минут в зависимости от сложности автомобиля и доступа к узлам.",
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
        ],
      },
    ],
  };
}

// ============================================================
// Layout wrapper
// ============================================================

export default function DiagnostikaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getDiagnosticsJsonLd()),
        }}
      />
      {children}
    </>
  );
}
