import { SITE, FAQ_ITEMS, FAQ_PAGE_ITEMS, SERVICES, CASE_STUDIES } from "./constants";

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
      url: `${SITE.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description:
      "Профессиональный автоподбор и комплексная диагностика автомобилей в Минске. Сканер Launch X431, толщиномер Etari ET-700, юридическая проверка.",
    telephone: [SITE.phone, SITE.phone2],
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
      {
        "@type": "ContactPoint",
        telephone: SITE.phone2,
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
    telephone: [SITE.phone, SITE.phone2],
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
    priceRange: "130-1200 BYN",
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
          price: "1200",
          priceCurrency: "BYN",
          description: "Поиск до результата, полное сопровождение, торг",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Эксперт на день" },
          price: "500",
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
    url: SITE.url,
    inLanguage: "ru",
    mainEntityOfPage: { "@id": `${SITE.url}/#webpage` },
    mainEntity: FAQ_ITEMS.map((item, i) => ({
      "@type": "Question",
      "@id": `${SITE.url}/#faq-q-${i + 1}`,
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

/* ── 8. FAQ Page (/faq) — WebPage + FAQPage + BreadcrumbList ── */
export function getFAQPageJsonLd() {
  const faqUrl = `${SITE.url}/faq/`;
  const webPageId = `${faqUrl}#webpage`;
  const faqId = `${faqUrl}#faq`;
  const breadcrumbId = `${faqUrl}#breadcrumb`;

  const webPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url: faqUrl,
    name: "Частые вопросы об автоподборе и диагностике в Минске | АвтоПодбор",
    description:
      "Ответы на частые вопросы: стоимость проверки, сроки подбора под ключ, гарантии, выезд по РБ. Автоподбор в Минске — профессиональная диагностика перед покупкой.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: "ru",
    breadcrumb: { "@id": breadcrumbId },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": faqId,
    url: faqUrl,
    inLanguage: "ru",
    mainEntityOfPage: { "@id": webPageId },
    mainEntity: FAQ_PAGE_ITEMS.map((item, i) => ({
      "@type": "Question",
      "@id": `${faqUrl}#faq-q-${i + 1}`,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Вопросы и ответы", item: faqUrl },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, faqPage, breadcrumb],
  };
}

/* ── 9. Pricing Page (/pricing) — WebPage + BreadcrumbList + OfferCatalog ── */
export function getPricingPageJsonLd() {
  const pricingUrl = `${SITE.url}/pricing/`;
  const webPageId = `${pricingUrl}#webpage`;
  const breadcrumbId = `${pricingUrl}#breadcrumb`;

  const webPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url: pricingUrl,
    name: "Цены на автоподбор и диагностику в Минске | АвтоПодбор",
    description:
      "Стоимость разовой диагностики от 130 BYN, эксперт на день 500 BYN, автоподбор под ключ от 1200 BYN. Фиксированные цены, выезд за МКАД 0,50 BYN/км.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: "ru",
    breadcrumb: { "@id": breadcrumbId },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Цены", item: pricingUrl },
    ],
  };

  const offerCatalog = {
    "@type": "OfferCatalog",
    "@id": `${pricingUrl}#offers`,
    name: "Цены на услуги автоподбора в Минске",
    url: pricingUrl,
    itemListElement: SERVICES.map((svc) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: svc.title,
        description: svc.description,
      },
      price: String(svc.price),
      priceCurrency: "BYN",
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb, offerCatalog],
  };
}

/* ── 10. Cases Page (/cases) — WebPage + BreadcrumbList + ItemList (AI citation–friendly) ── */
export function getCasesPageJsonLd() {
  const casesUrl = `${SITE.url}/cases/`;
  const webPageId = `${casesUrl}#webpage`;
  const breadcrumbId = `${casesUrl}#breadcrumb`;
  const itemListId = `${casesUrl}#cases-list`;

  const webPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url: casesUrl,
    name: "Кейсы проверок автомобилей в Минске | АвтоПодбор",
    description:
      "Реальные примеры проверенных автомобилей в Минске: отказ от покупки при скрученном пробеге и шпатлёвке, покупка с дисконтом после аргументированного торга. Данные за последний квартал.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: "ru",
    breadcrumb: { "@id": breadcrumbId },
    mainEntity: { "@id": itemListId },
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE.url}/images/case-bmw-real.jpg`,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Кейсы", item: casesUrl },
    ],
  };

  // Полные описания кейсов для краулеров и AI-цитирования
  const itemList = {
    "@type": "ItemList",
    "@id": itemListId,
    name: "Кейсы проверок автомобилей в Минске",
    description:
      "Реальные кейсы выездной диагностики автомобилей: отказ от покупки при скрученном пробеге и шпатлёвке, покупка с дисконтом после аргументированного торга. Минск, последний квартал.",
    url: casesUrl,
    numberOfItems: CASE_STUDIES.length,
    itemListElement: CASE_STUDIES.map((study, i) => {
      const fullText = [
        study.car,
        study.origin,
        `Заявлено: ${study.claimed}`,
        `Реальность: ${study.reality}`,
        ...study.findings.map((f) => `Обнаружено: ${f}`),
        study.resultText,
      ].join(". ");
      return {
        "@type": "ListItem",
        position: i + 1,
        name: study.car,
        description: fullText,
        url: `${casesUrl}#${study.id}`,
        item: {
          "@type": "CreativeWork",
          name: study.car,
          description: fullText,
          author: { "@id": `${SITE.url}/#organization` },
          publisher: { "@id": `${SITE.url}/#organization` },
          inLanguage: "ru",
          datePublished: "2025-01-01",
        },
      };
    }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb, itemList],
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
