# `CollectionPage` JSON-LD Entity

Use `CollectionPage` JSON-LD entity with supplied `ItemList` as `mainEntity` property for pagination pages or pages with list of links to other pages/entities, usually combined with `WebPage`. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["WebPage", "CollectionPage"],
  "@id": "https://example.com/blog/#webpage",
  "url": "https://example.com/blog",
  "name": "PAGE_TITLE - BRAND_NAME",
  "description": "PAGE_DESCRIPTION",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "breadcrumb": {
    "@id": "https://example.com/blog/#breadcrumb"
  },
  "mainEntity": {
    "@type": "ItemList",
    "@id": "https://example.com/blog/#list",
    "name": "LIST_OR_PAGINATION_TITLE",
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "url": "https://example.com/blog/1017",
      "name": "ARTICLE_1_TITLE"
    }, {
      "@type": "ListItem",
      "position": 2,
      "url": "https://example.com/blog/1016",
      "name": "ARTICLE_2_TITLE"
    }, {
      "@type": "ListItem",
      "position": 3,
      "url": "https://example.com/blog/1015",
      "name": "ARTICLE_3_TITLE"
    }]
  }
}
</script>
```

## Combine with other primary entity

When page has another `mainEntity` and `ItemList` at the same time, connect it via `hasPart` property (as array that may include multiple additional entities), use example below:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["WebPage", "CollectionPage"],
  "@id": "https://example.com/item/999/#webpage",
  "url": "https://example.com/item/999",
  "name": "PAGE_TITLE - BRAND_NAME",
  "description": "PAGE_DESCRIPTION",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://example.com/#website"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "breadcrumb": {
    "@id": "https://example.com/item/999/#breadcrumb"
  },
  "mainEntity": {
    "@id": "https://example.com/product/slug/#product"
  },
  "hasPart": [{
    "@type": "ItemList",
    "@id": "https://example.com/item/999/#list",
    "name": "LIST_TITLE",
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "url": "https://example.com/item/917",
      "name": "ITEM_1_TITLE"
    }, {
      "@type": "ListItem",
      "position": 2,
      "url": "https://example.com/item/916",
      "name": "ITEM_2_TITLE"
    }, {
      "@type": "ListItem",
      "position": 3,
      "url": "https://example.com/item/915",
      "name": "ITEM_3_TITLE"
    }]
  }]
}
</script>
```
