# `BreadcrumbList` JSON-LD Entity

Follow the next guidelines when creating `BreadcrumbList` for `Webpage` entity in JSON-LD. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks.

1. Ensure every `WebPage` supplied with `BreadcrumbList` entity and linked via `breadcrumb` property

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://example.com/path/current-page-url/#breadcrumb",
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
    "item": "https://example.com/path/current-page-url"
  }]
}
</script>
```
