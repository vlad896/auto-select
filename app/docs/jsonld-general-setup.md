# General JSON-LD Setup

Follow the next guideline to create JSON-LD setup that re-used on all pages of the website. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project.

In this setup we create:

1. Logo: `ImageObject`
2. Main image: `ImageObject`
3. Organization definition: `Organization`. Include `sameAs`, `contactPoint`, `makesOffer` fields only when applicable
4. Website definition: `WebSite`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://example.com/#logo",
  "url": "https://example.com/logo_512x512.png",
  "contentUrl": "https://example.com/logo_512x512.png",
  "width": 512,
  "height": 512,
  "caption": "BRAND_NAME Logo"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://example.com/#website-image",
  "url": "https://example.com/image_1200x630.png",
  "contentUrl": "https://example.com/image_1200x630.png",
  "width": 1200,
  "height": 630,
  "caption": "BRAND_NAME Website"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://example.com/#organization",
  "legalName": "LEGAL_NAME",
  "name": "WEBSITE_NAME",
  "brand": "BRAND_NAME",
  "slogan": "SERVICE_OR_COMPANY_SLOGAN_OR_MOTTO",
  "url": "https://example.com",
  "logo": {
    "@id": "https://example.com/#logo"
  },
  "image": {
    "@id": "https://example.com/#website-image"
  },
  "sameAs": [
    "https://www.linkedin.com/company/example-com/",
    "https://twitter.com/example_com",
    "https://www.facebook.com/example-com"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "sales@example.com",
    "name": "Contact Sales",
    "description": "Get in contact with our sales team to learn more about our product and services"
  }, {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@example.com",
    "name": "Help & Support",
    "description": "Get help and assistance using our services and products"
  }],
  "makesOffer": {
    "@type": "Offer",
    "name": "OFFER_TITLE",
    "description": "OFFER_DESCRIPTION",
    "category": "OFFER_CATEGORY"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://example.com/#website",
  "url": "https://example.com",
  "name": "WEBSITE_NAME",
  "alternateName": "SERVICE_OR_COMPANY_SHORT_MOTTO",
  "description": "SERVICE_OR_COMPANY_SHORT_DESCRIPTION",
  "image": {
    "@id": "https://example.com/#website-image"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "keywords": ["TAG1", "TAG2", "TAG3", "TAG4", "TAG5"]
}
</script>
```
