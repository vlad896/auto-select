# `WebApplication` JSON-LD Entity

Use `WebApplication` JSON-LD entity for digital subscriptions-based products and SaaS services. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project and its product.

1. Create `Offer` and `WebApplication` combined with `SoftwareApplication` linked via `offers` property
2. Link `WebApplication` to `WebPage` via `mainEntity` property
3. Link `WebPage` to `WebApplication` via `mainEntityOfPage` property
4. Create `ImageObject` to link product's image(s) via `image` to `Product` and `primaryImageOfPage` to `WebPage`
5. Set `availability` to `https://schema.org/InStock`
6. Set `itemCondition` to `https://schema.org/NewCondition`
7. Request reviews and details for `aggregateRating` and `review` fields from user or fetch from existing page; Drop `aggregateRating` and `review` fields if no data is available

Use the next JSON-LD as template for SaaS or subscription-based product

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "https://example.com/pricing/#offer-plan-1",
  "url": "https://example.com/pricing/#plan-1",
  "name": "Monthly Plan 1",
  "price": "19.00",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@id": "https://example.com/#organization"
  },
  "priceSpecification": {
    "@type": "UnitPriceSpecification",
    "price": "19.00",
    "priceCurrency": "USD",
    "unitCode": "MON"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "https://example.com/pricing/#offer-plan-2",
  "url": "https://example.com/pricing/#plan-2",
  "name": "Monthly Plan 2",
  "price": "49.00",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@id": "https://example.com/#organization"
  },
  "priceSpecification": {
    "@type": "UnitPriceSpecification",
    "price": "49.00",
    "priceCurrency": "USD",
    "unitCode": "MON"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "https://example.com/pricing/#offer-plan-3",
  "url": "https://example.com/pricing/#plan-3",
  "name": "Monthly Plan 3",
  "price": "99.00",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@id": "https://example.com/#organization"
  },
  "priceSpecification": {
    "@type": "UnitPriceSpecification",
    "price": "99.00",
    "priceCurrency": "USD",
    "unitCode": "MON"
  }
}
</script>
```

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  "@id": "https://example.com/#app",
  "name": "SERVICE_NAME",
  "operatingSystem": "All",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "SaaS",
  "description": "SERVICE_DESCRIPTION",
  "inLanguage": "en",
  "url": "https://example.com/",
  "image": [{
    "@id": "https://example.com/app/#primaryimage"
  }],
  "mainEntityOfPage": {
    "@id": "https://example.com/#webpage"
  },
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "offers": [{
    "@id": "https://example.com/pricing/#offer-plan-1"
  }, {
    "@id": "https://example.com/pricing/#offer-plan-2"
  }, {
    "@id": "https://example.com/pricing/#offer-plan-3"
  }],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "NUMBER",
    "bestRating": "NUMBER",
    "ratingCount": "REVIEWS_COUNT"
  },
  "review": [{
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "REVIEWER_NAME_OR_USERNAME"
    },
    "reviewBody": "REVIEW_BODY"
  }]
}
</script>
```
