# `WebPage` JSON-LD Entity

Use unique `WebPage` JSON-LD entity for every page of the website. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project.

1. Always compliment `WebPage` with `BreadcrumbList` object
2. Always link link `WebPage` with `Website` via `isPartOf` property
3. Always create unique image and its `ImageObject` and link it to WebPage via `primaryImageOfPage` and `image` properties, take image URL from `og:image` meta-tag
4. When available add `datePublished` and `dateModified` in `YYYY-MM-DDThh:mm:ss+00:00` or `YYYY-MM-DD` format
5. Only when there's subsequent JSON-LD entity is present on the same page, link it via `mainEntity` property
6. Ensure rich content (if exists on the same page) linked to `WebPage` via `mainEntity` (like `Organization`, `MobileApplication`, `WebApplication`, `SoftwareApplication`, `Product`, `FAQPage`, etc.)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://example.com/path/to/page/#webpage",
  "url": "https://example.com/path/to/page",
  "name": "PAGE_TITLE - BRAND_NAME",
  "description": "PAGE_DESCRIPTION",
  "inLanguage": "en",
  "breadcrumb": {
    "@id": "https://example.com/path/to/page/#breadcrumb"
  },
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "primaryImageOfPage": {
    "@id": "https://example.com/path/to/page/#article-image"
  },
  "image": {
    "@id": "https://example.com/path/to/page/#article-image"
  },
  "datePublished": "ACTUAL_PUBLISH_DATE",
  "dateModified": "ACTUAL_EDIT_DATE",
  "potentialAction": {
    "@type": "ReadAction",
    "target": [
      "https://example.com/path/to/page"
    ]
  },
  "breadcrumb": {
    "@id": "https://example.com/path/to/page/#breadcrumb"
  }
}
</script>
```

Ensure that every `WebPage` has `BreadcrumbList`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://example.com/path/to/page/#breadcrumb",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "HOME_PAGE_TITLE",
    "item": "https://example.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "LEVEL_2_PAGE_TITLE",
    "item": "https://example.com/path"
  }, {
    "@type": "ListItem",
    "position": 3,
    "name": "LEVEL_3_PAGE_TITLE",
    "item": "https://example.com/path/to"
  }, {
    "@type": "ListItem",
    "position": 4,
    "name": "LEVEL_4_PAGE_TITLE",
    "item": "https://example.com/path/to/page"
  }]
}
</script>
```
