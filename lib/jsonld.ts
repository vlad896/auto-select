import { SITE, FAQ_ITEMS } from "./constants";

// ============================================================
// JSON-LD Structured Data generators
// ============================================================

export function getOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description:
      "Профессиональный автоподбор и комплексная диагностика автомобилей в Минске с использованием Launch и толщиномера.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      availableLanguage: ["Russian", "Belarusian"],
    },
  };
}

export function getServiceJsonLd() {
  return {
    "@type": "Service",
    serviceType: "Автоподбор",
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: "Минск",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги автоподбора",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Разовая выездная диагностика",
          },
          price: "130",
          priceCurrency: "BYN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Автоподбор под ключ",
          },
          price: "900",
          priceCurrency: "BYN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Эксперт на день",
          },
          price: "380",
          priceCurrency: "BYN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Удалённая проверка",
          },
          price: "150",
          priceCurrency: "BYN",
        },
      ],
    },
  };
}

export function getFAQJsonLd() {
  return {
    "@type": "FAQPage",
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

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE.url}/#localbusiness`,
    name: "Автоподбор в Минске — Экспертная диагностика",
    image: `${SITE.url}/images/og-image.jpg`,
    telephone: SITE.phone,
    url: SITE.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Тимирязева, 23",
      addressLocality: "Минск",
      postalCode: "220000",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "53.9213",
      longitude: "27.5275",
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
    priceRange: "$$",
  };
}

export function getBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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

/**
 * Returns the combined @graph JSON-LD for the main page
 */
export function getMainPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationJsonLd(),
      getServiceJsonLd(),
      getFAQJsonLd(),
    ],
  };
}
