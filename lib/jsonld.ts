import { SITE, getFAQItemsForHome, FAQ_PAGE_ITEMS, SERVICES, CASE_STUDIES } from "./constants";

type BreadcrumbItem = { name: string; item: string };

type WebPageEntityOptions = {
  pageUrl: string;
  name: string;
  description: string;
  imageUrl: string;
  breadcrumbItems: BreadcrumbItem[];
  mainEntityId?: string;
  hasPartIds?: string[];
  pageType?: string | string[];
};

type FAQQuestionItem = {
  question: string;
  answer: string;
};

export function createWebPageEntities({
  pageUrl,
  name,
  description,
  imageUrl,
  breadcrumbItems,
  mainEntityId,
  hasPartIds,
  pageType = "WebPage",
}: WebPageEntityOptions) {
  const webPageId = `${pageUrl}#webpage`;
  const imageId = `${pageUrl}#primaryimage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const webPage = {
    "@type": pageType,
    "@id": webPageId,
    url: pageUrl,
    name,
    description,
    inLanguage: "ru",
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: { "@id": `${SITE.url}/#organization` },
    breadcrumb: { "@id": breadcrumbId },
    primaryImageOfPage: { "@id": imageId },
    image: { "@id": imageId },
    potentialAction: {
      "@type": "ReadAction",
      target: [pageUrl],
    },
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    ...(hasPartIds && hasPartIds.length > 0
      ? {
          hasPart: hasPartIds.map((id) => ({ "@id": id })),
        }
      : {}),
  };

  const image = {
    "@type": "ImageObject",
    "@id": imageId,
    url: imageUrl,
    contentUrl: imageUrl,
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return { webPage, image, breadcrumb, webPageId, breadcrumbId, imageId };
}

export function createFAQPageEntity(input: {
  pageUrl: string;
  webPageId: string;
  faqId?: string;
  questions: FAQQuestionItem[];
}) {
  const faqId = input.faqId ?? `${input.pageUrl}#faq`;

  return {
    "@type": "FAQPage",
    "@id": faqId,
    url: input.pageUrl,
    inLanguage: "ru",
    mainEntityOfPage: { "@id": input.webPageId },
    mainEntity: input.questions.map((item, index) => ({
      "@type": "Question",
      "@id": `${faqId}-q-${index + 1}`,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createOfferEntity(input: {
  offerId: string;
  url: string;
  price: string;
  priceCurrency?: string;
  description?: string;
}) {
  return {
    "@type": "Offer",
    "@id": input.offerId,
    url: input.url,
    price: input.price,
    priceCurrency: input.priceCurrency ?? "BYN",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${SITE.url}/#organization` },
    ...(input.description ? { description: input.description } : {}),
  };
}

export function createServiceEntity(input: {
  serviceId: string;
  pageUrl: string;
  name: string;
  description: string;
  serviceType: string;
  offerId?: string;
}) {
  return {
    "@type": "Service",
    "@id": input.serviceId,
    url: input.pageUrl,
    name: input.name,
    serviceType: input.serviceType,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "City", name: "Минск" },
    description: input.description,
    ...(input.offerId ? { offers: { "@id": input.offerId } } : {}),
  };
}

// ============================================================
// JSON-LD Structured Data generators (Schema.org)
//
// Strategy: Separate JSON-LD entities in individual script tags, linked via @id.
// Entities:  WebSite, WebPage, Organization, LocalBusiness (AutoRepair),
//            Service (OfferCatalog), FAQPage, BreadcrumbList
// Note:      WebApplication/SoftwareApplication intentionally omitted:
//            current product is service-based (not SaaS/subscription).
// ============================================================

/* ── Shared ImageObject entities ── */
function getLogoImageObjectJsonLd() {
  const logoUrl = `${SITE.url}/icon-512.png`;
  return {
    "@type": "ImageObject",
    "@id": `${SITE.url}/#logo`,
    url: logoUrl,
    contentUrl: logoUrl,
    width: 512,
    height: 512,
    caption: `${SITE.name} Logo`,
    inLanguage: "ru",
  };
}

function getWebsiteImageObjectJsonLd() {
  const imageUrl = `${SITE.url}/images/og-image.jpg`;
  return {
    "@type": "ImageObject",
    "@id": `${SITE.url}/#website-image`,
    url: imageUrl,
    contentUrl: imageUrl,
    width: 1200,
    height: 630,
    caption: `${SITE.name} Website`,
    inLanguage: "ru",
  };
}

/* ── 1. WebSite ── */
function getWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description:
      "Профессиональный автоподбор и диагностика автомобилей перед покупкой в Минске. Договор, отчёт, аргументированный торг.",
    image: { "@id": `${SITE.url}/#website-image` },
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "ru",
    isAccessibleForFree: true,
    keywords: [
      "автоподбор в Минске",
      "диагностика авто перед покупкой",
      "проверка авто по VIN",
      "подбор автомобиля под ключ",
      "выездная проверка автомобиля",
    ],
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
  const pageUrl = `${SITE.url}/`;
  return createWebPageEntities({
    pageUrl,
    name: "Автоподбор в Минске — профессиональная диагностика и выездная проверка авто",
    description:
      "Комплексная проверка авто перед покупкой в Минске. Launch X431, толщиномер Etari, VIN-аудит, юридическая чистота. Договор, отчёт за 2 часа. От 130 BYN.",
    imageUrl: `${SITE.url}/images/og-image.jpg`,
    breadcrumbItems: [{ name: "Главная", item: pageUrl }],
    mainEntityId: `${SITE.url}/#service`,
  });
}

/* ── 3. Organization ── */
function getOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: { "@id": `${SITE.url}/#logo` },
    image: { "@id": `${SITE.url}/#website-image` },
    description:
      "Профессиональный автоподбор и комплексная диагностика автомобилей в Минске. Сканер Launch X431, толщиномер Etari ET-700, юридическая проверка.",
    telephone: [SITE.phone],
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
        email: SITE.email,
        name: "Контакты",
        description:
          "Консультации по услугам, запись на выездную диагностику, поддержка по заявкам и отчётам.",
        availableLanguage: ["Russian", "Belarusian"],
        areaServed: { "@type": "Country", name: "BY" },
      },
    ],
    makesOffer: {
      "@type": "Offer",
      name: "Комплексный автоподбор и диагностика автомобилей в Минске",
      description:
        "Разовая выездная диагностика, автоподбор под ключ, эксперт на день и юридическая проверка автомобиля перед покупкой.",
      category: "AutomotiveInspectionService",
    },
    sameAs: [
      SITE.telegram,
      SITE.instagram,
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
    telephone: [SITE.phone],
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
    sameAs: [SITE.telegram, SITE.instagram, SITE.whatsapp],
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
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE.url}/#organization` },
          description: "Выезд, кузов, Launch X431, тест-драйв, фотоотчёт",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Автоподбор под ключ" },
          price: "1200",
          priceCurrency: "BYN",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE.url}/#organization` },
          description: "Поиск до результата, полное сопровождение, торг",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Эксперт на день" },
          price: "500",
          priceCurrency: "BYN",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE.url}/#organization` },
          description: "Неограниченное число осмотров с 10:00 до 18:00",
        },
      ],
    },
  };
}

/* ── 6. FAQPage (главная: подмножество showOnHome) ── */
function getFAQJsonLd() {
  const homeItems = getFAQItemsForHome();
  return createFAQPageEntity({
    pageUrl: SITE.url,
    webPageId: `${SITE.url}/#webpage`,
    faqId: `${SITE.url}/#faq`,
    questions: homeItems.map((item, i) => ({
      id: `${SITE.url}/#faq-q-${i + 1}`,
      question: item.question,
      answer: item.answer,
    })),
  });
}

/* ── 7. BreadcrumbList (homepage = single item) ── */
export function getBreadcrumbJsonLd() {
  return createWebPageEntities({
    pageUrl: `${SITE.url}/`,
    name: "Автоподбор в Минске — профессиональная диагностика и выездная проверка авто",
    description:
      "Комплексная проверка авто перед покупкой в Минске. Launch X431, толщиномер Etari, VIN-аудит, юридическая чистота. Договор, отчёт за 2 часа. От 130 BYN.",
    imageUrl: `${SITE.url}/images/og-image.jpg`,
    breadcrumbItems: [{ name: "Главная", item: `${SITE.url}/` }],
    mainEntityId: `${SITE.url}/#service`,
  }).breadcrumb;
}

/* ── 8. FAQ Page (/faq) — WebPage + FAQPage + BreadcrumbList ── */
export function getFAQPageJsonLd() {
  const faqUrl = `${SITE.url}/faq/`;
  const faqId = `${faqUrl}#faq`;
  const { webPage, image, breadcrumb, webPageId } = createWebPageEntities({
    pageUrl: faqUrl,
    name: "Частые вопросы об автоподборе и диагностике в Минске | АвтоПодбор",
    description:
      "Ответы на частые вопросы: стоимость проверки, сроки подбора под ключ, гарантии, выезд по РБ. Автоподбор в Минске — профессиональная диагностика перед покупкой.",
    imageUrl: `${SITE.url}/images/og-image.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Вопросы и ответы", item: faqUrl },
    ],
    mainEntityId: faqId,
  });

  const faqPage = createFAQPageEntity({
    pageUrl: faqUrl,
    webPageId,
    faqId,
    questions: FAQ_PAGE_ITEMS.map((item, i) => ({
      id: `${faqUrl}#faq-q-${i + 1}`,
      question: item.question,
      answer: item.answer,
    })),
  });

  return [webPage, image, faqPage, breadcrumb];
}

/* ── 9. Pricing Page (/pricing) — WebPage + BreadcrumbList + OfferCatalog ── */
export function getPricingPageJsonLd() {
  const pricingUrl = `${SITE.url}/pricing/`;
  const offersId = `${pricingUrl}#offers`;
  const faqId = `${pricingUrl}#faq`;
  const pricingFaqItems = FAQ_PAGE_ITEMS
    .filter((item) => item.category === "services")
    .slice(0, 5);
  const { webPage, image, breadcrumb } = createWebPageEntities({
    pageUrl: pricingUrl,
    name: "Цены на автоподбор и диагностику в Минске | АвтоПодбор",
    description:
      "Стоимость разовой диагностики от 130 BYN, эксперт на день 500 BYN, автоподбор под ключ от 1200 BYN. Фиксированные цены, выезд за МКАД 0,50 BYN/км.",
    imageUrl: `${SITE.url}/images/og-image.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Цены", item: pricingUrl },
    ],
    mainEntityId: offersId,
    hasPartIds: [faqId],
  });

  const offerCatalog = {
    "@type": "OfferCatalog",
    "@id": offersId,
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
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE.url}/#organization` },
    })),
  };

  const faqPage = createFAQPageEntity({
    pageUrl: pricingUrl,
    webPageId: `${pricingUrl}#webpage`,
    faqId,
    questions: pricingFaqItems.map((item, index) => ({
      id: `${pricingUrl}#faq-q-${index + 1}`,
      question: item.question,
      answer: item.answer,
    })),
  });

  return [webPage, image, breadcrumb, offerCatalog, faqPage];
}

/* ── 10. Cases Page (/cases) — WebPage + BreadcrumbList + ItemList (AI citation–friendly) ── */
export function getCasesPageJsonLd() {
  const casesUrl = `${SITE.url}/cases/`;
  const itemListId = `${casesUrl}#cases-list`;
  const { webPage, image, breadcrumb } = createWebPageEntities({
    pageUrl: casesUrl,
    name: "Кейсы проверок автомобилей в Минске | АвтоПодбор",
    description:
      "Реальные примеры проверенных автомобилей в Минске: отказ от покупки при скрученном пробеге и шпатлёвке, покупка с дисконтом после аргументированного торга. Данные за последний квартал.",
    imageUrl: `${SITE.url}/images/case-bmw-real.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Кейсы", item: casesUrl },
    ],
    mainEntityId: itemListId,
    pageType: ["WebPage", "CollectionPage"],
  });

  // Полные описания кейсов для краулеров и AI-цитирования
  const itemList = {
    "@type": "ItemList",
    "@id": itemListId,
    name: "Кейсы проверок автомобилей в Минске",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
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
        },
      };
    }),
  };

  return [webPage, image, breadcrumb, itemList];
}

/* ── 11. Privacy Page (/privacy) — WebPage + BreadcrumbList ── */
export function getPrivacyPageJsonLd() {
  const privacyUrl = `${SITE.url}/privacy/`;
  const { webPage, image, breadcrumb } = createWebPageEntities({
    pageUrl: privacyUrl,
    name: "Политика конфиденциальности | АвтоПодбор",
    description:
      "Обработка персональных данных, cookies и аналитика на сайте. Узнайте, как мы храним данные и используем Яндекс.Метрику на сайте.",
    imageUrl: `${SITE.url}/images/og-image.jpg`,
    breadcrumbItems: [
      { name: "Главная", item: `${SITE.url}/` },
      { name: "Политика конфиденциальности", item: privacyUrl },
    ],
  });

  return [webPage, image, breadcrumb];
}

// ============================================================
// Main page JSON-LD entities rendered as separate script tags
// ============================================================

export function getMainPageJsonLd() {
  const homepageEntities = getWebPageJsonLd();
  const homeWebPage = {
    ...homepageEntities.webPage,
    hasPart: [{ "@id": `${SITE.url}/#faq` }],
  };
  return [
    getLogoImageObjectJsonLd(),
    getWebsiteImageObjectJsonLd(),
    getWebSiteJsonLd(),
    homeWebPage,
    homepageEntities.image,
    getOrganizationJsonLd(),
    getLocalBusinessJsonLd(),
    getServiceJsonLd(),
    getFAQJsonLd(),
    homepageEntities.breadcrumb,
  ];
}
