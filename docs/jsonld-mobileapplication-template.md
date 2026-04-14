# `MobileApplication` JSON-LD Entity

Use `MobileApplication` JSON-LD entity for iOS and Android mobile apps. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": "https://example.com/#ios-app",
  "name": "APPLICATION_NAME",
  "applicationCategory": "APPLICATION_CATEGORY",
  "operatingSystem": "iOS",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "url": "https://example.com",
  "installUrl": "https://apps.apple.com/gb/app/application-name-slug/id0000000000",
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "mainEntityOfPage": {
    "@id": "https://example.com/#webpage"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "url": "https://apps.apple.com/gb/app/application-name-slug/id0000000000",
    "availability": "https://schema.org/InStock"
  },
  "sameAs": [
    "https://apps.apple.com/gb/app/application-name-slug/id0000000000"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": "https://example.com/#android-app",
  "name": "APPLICATION_NAME",
  "applicationCategory": "APPLICATION_CATEGORY",
  "operatingSystem": "Android",
  "isAccessibleForFree": true,
  "inLanguage": "en",
  "url": "https://example.com",
  "installUrl": "https://play.google.com/store/apps/details?id=example.app.id",
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "mainEntityOfPage": {
    "@id": "https://example.com/#webpage"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "url": "https://play.google.com/store/apps/details?id=example.app.id",
    "availability": "https://schema.org/InStock"
  },
  "sameAs": [
    "https://play.google.com/store/apps/details?id=example.app.id"
  ]
}
</script>
```
