# `SoftwareApplication` JSON-LD Entity

Use `SoftwareApplication` JSON-LD entity for SaaS and "cloud" type of services. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project.

1. Request reviews and details for `aggregateRating` and `review` fields from user or fetch from existing page; Drop `aggregateRating` and `review` fields if no data is available
2. Request details for `offers` fields from user; Suggest default sub-object when no details is available

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://example.com/#app",
  "name": "APPLICATION_TITLE",
  "description": "APPLICATION_DESCRIPTION",
  "url": "https://example.com",
  "applicationCategory": "APPLICATION_CATEGORY",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "description": "OFFER_DESCRIPTION"
  },
  "featureList": [
    "FEATURE_1",
    "FEATURE_2",
    "FEATURE_3",
    "FEATURE_4",
    "FEATURE_5"
  ],
  "inLanguage": "en",
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "mainEntityOfPage": {
    "@id": "https://example.com/#webpage"
  },
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
