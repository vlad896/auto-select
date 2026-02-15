import { SITE, FAQ_ITEMS } from "./constants";

// ============================================================
// JSON-LD Structured Data generators (Schema.org)
//
// Strategy:  Single @graph array with entity IDs for cross-referencing.
// Entities:  WebSite, WebPage, Organization, LocalBusiness (AutoRepair),
//            Service (OfferCatalog), FAQPage, BreadcrumbList
// ============================================================

/* ── 1. WebSite ── */
function getWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description:
      "Профессиональный автоподбор и диагностика автомобилей перед покупкой в Минске. Договор, отчёт, аргументированный торг.",
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "ru",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ── 2. WebPage (homepage) ── */
function getWebPageJsonLd() {
  return {
    "@type": "WebPage",
    "@id": `${SITE.url}/#webpage`,
    url: SITE.url,
    name: "Автоподбор в Минске — профессиональная диагностика и выездная проверка авто",
    description:
      "Комплексная проверка авто перед покупкой в Минске. Launch X431, толщиномер Etari, VIN-аудит, юридическая чистота. Договор, отчёт за 2 часа. От 130 BYN.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE.url}/images/og-image.jpg`,
    },
    inLanguage: "ru",
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

/* ── 3. Organization ── */
function getOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/logo.png`,
      width: 180,
      height: 180,
    },
    description:
      "Профессиональный автоподбор и комплексная диагностика автомобилей в Минске. Сканер Launch X431, толщиномер Etari ET-700, юридическая проверка.",
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Тимирязева, 23",
      addressLocality: "Минск",
      postalCode: "220000",
      addressCountry: "BY",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        availableLanguage: ["Russian", "Belarusian"],
        areaServed: { "@type": "Country", name: "BY" },
      },
    ],
    sameAs: [
      SITE.telegram,
      SITE.whatsapp,
    ],
  };
}

/* ── 4. LocalBusiness (AutoRepair) ── */
export function getLocalBusinessJsonLd() {
  return {
    "@type": "AutoRepair",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    image: `${SITE.url}/images/og-image.jpg`,
    telephone: SITE.phone,
    email: SITE.email,
    url: SITE.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Тимирязева, 23",
      addressLocality: "Минск",
      addressRegion: "Минская область",
      postalCode: "220000",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.9213,
      longitude: 27.5275,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    priceRange: "130-900 BYN",
    currenciesAccepted: "BYN",
    paymentAccepted: "Cash, Card",
    areaServed: {
      "@type": "City",
      name: "Минск",
    },
    sameAs: [SITE.telegram, SITE.whatsapp],
  };
}

/* ── 5. Service + OfferCatalog ── */
function getServiceJsonLd() {
  return {
    "@type": "Service",
    "@id": `${SITE.url}/#service`,
    serviceType: "Автоподбор и диагностика автомобилей",
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "City", name: "Минск" },
    description:
      "Профессиональная проверка автомобилей перед покупкой: компьютерная диагностика, осмотр кузова, юридическая проверка, аргументированный торг.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги автоподбора в Минске",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Разовая выездная диагностика" },
          price: "130",
          priceCurrency: "BYN",
          description: "Выезд, кузов, Launch X431, тест-драйв, фотоотчёт",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Автоподбор под ключ" },
          price: "900",
          priceCurrency: "BYN",
          description: "Поиск до результата, полное сопровождение, торг",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Эксперт на день" },
          price: "380",
          priceCurrency: "BYN",
          description: "Неограниченное число осмотров с 10:00 до 18:00",
        },
      ],
    },
  };
}

/* ── 6. FAQPage ── */
function getFAQJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/* ── 7. BreadcrumbList (homepage = single item) ── */
export function getBreadcrumbJsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${SITE.url}/`,
      },
    ],
  };
}

// ============================================================
// Combined @graph — all entities in ONE script tag
// ============================================================

export function getMainPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getWebSiteJsonLd(),
      getWebPageJsonLd(),
      getOrganizationJsonLd(),
      getLocalBusinessJsonLd(),
      getServiceJsonLd(),
      getFAQJsonLd(),
      getBreadcrumbJsonLd(),
    ],
  };
}
