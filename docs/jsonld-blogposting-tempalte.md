# `BlogPosting` JSON-LD Entity

Use `BlogPosting` JSON-LD entity for SaaS and "cloud" type of services. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project.

1. Always include `BreadcrumbList` JSON-LD entities
2. Create `ImageObject` for Article's image
3. Connect `BlogPosting` with `WebPage` via `mainEntityOfPage`
4. Connect `BlogPosting` with `Website` via `isPartOf`

## General `BlogPosting` setup

Use the next template for `BlogPosting` JSON-LD setup

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://example.com/blog/post-url/#article-image",
  "url": "FQDN_URL_TO_IMAGE",
  "contentUrl": "FQDN_URL_TO_IMAGE",
  "width": 1200,
  "height": 630,
  "caption": "ARTICLE_TITLE",
  "inLanguage": "en"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://example.com/blog/post-url/#blogposting",
  "url": "https://example.com/blog/post-url",
  "headline": "ARTICLE_TITLE",
  "description": "ARTICLE_DESCRIPTION",
  "inLanguage": "en",
  "datePublished": "ACTUAL_PUBLISH_DATE",
  "dateModified": "ACTUAL_EDIT_DATE",
  "author": {
    "@type": "Person",
    "@id": "https://example.com/blog/post-url/#author",
    "name": "Full Name of author OR 'BRAND_NAME Editorial'"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "image": {
    "@id": "https://example.com/blog/post-url/#article-image"
  },
  "mainEntityOfPage": {
    "@id": "https://example.com/blog/post-url/#webpage"
  },
  "articleSection": "General",
  "keywords": ["KEYWORD_1", "KEYWORD_2", "KEYWORD_3", "KEYWORD_4"],
  "copyrightYear": 2025,
  "copyrightHolder": {
    "@id": "https://example.com/#organization"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://example.com/blog/post-url/#webpage",
  "url": "https://example.com/blog/post-url",
  "name": "ARTICLE_TITLE",
  "description": "ARTICLE_DESCRIPTION",
  "inLanguage": "en",
  "breadcrumb": {
    "@id": "https://example.com/blog/post-url/#breadcrumb"
  },
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "primaryImageOfPage": {
    "@id": "https://example.com/blog/post-url/#article-image"
  },
  "image": {
    "@id": "https://example.com/blog/post-url/#article-image"
  },
  "datePublished": "ACTUAL_PUBLISH_DATE",
  "dateModified": "ACTUAL_EDIT_DATE",
  "mainEntity": {
    "@id": "https://example.com/blog/post-url/#blogposting"
  },
  "potentialAction": {
    "@type": "ReadAction",
    "target": [
      "https://example.com/blog/post-url"
    ]
  }
}
</script>
```

## `BlogPosting` entity internationalization

### On the original post use

1. Use `workTranslation` property on original `BlogPosting` entity object passing `{"@type": "", "@id": ""}`
2. Use `workTranslation` property on original post's `WebPage` entity object passing array of URLs to translation

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://example.com/blog-post-slug/#blogposting",
  "url": "https://example.com/blog-post-slug",
  "inLanguage": "en",
  "workTranslation": [
    {
      "@type": "BlogPosting",
      "@id": "https://example.com/fr/blog-post-slug/#blogposting"
    },
    {
      "@type": "BlogPosting",
      "@id": "https://example.com/de/blog-post-slug/#blogposting"
    }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://example.com/blog-post-slug/#webpage",
  "url": "https://example.com/blog-post-slug",
  "inLanguage": "en",
  "workTranslation": [
    "https://example.com/fr/blog-post-slug",
    "https://example.com/de/blog-post-slug"
  ]
}
```

### On translation post use

1. Use `translationOfWork` on `BlogPosting` of a translation to link original post passing `{"@type": "", "@id": ""}`
1. Use `translationOfWork` on `WebPage` of a translation to link original `WebPage` passing its URL

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://example.com/fr/blog-post-slug/#blogposting",
  "url": "https://example.com/fr/blog-post-slug",
  "inLanguage": "fr",
  "translationOfWork": {
    "@type": "BlogPosting",
    "@id": "https://example.com/blog-post-slug/#blogposting"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://example.com/fr/blog-post-slug/#blogposting",
  "url": "https://example.com/fr/blog-post-slug",
  "inLanguage": "fr",
  "translationOfWork": "https://example.com/blog-post-slug"
}
```
