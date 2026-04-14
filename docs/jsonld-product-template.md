# `Product` JSON-LD Entity

Use `Product` JSON-LD entity for physical and digital products. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project and its product.

1. Create `Offer` and `Product` linked via `offers` property
2. Link `Product` to `WebPage` via `mainEntity` property
3. Add `sku`, `mpn`, `gtin13`, and `aggregateRating` only if it exists, don't use fake data
4. Create `ImageObject` to link product's image(s) via `image` to `Product` and `primaryImageOfPage` to `WebPage`
5. Set `availability` to `https://schema.org/InStock`, `https://schema.org/OutOfStock`, `https://schema.org/PreOrder`, `https://schema.org/PreSale`, `https://schema.org/InStoreOnly`, `https://schema.org/OnlineOnly`, `https://schema.org/LimitedAvailability`, `https://schema.org/SoldOut`, or `https://schema.org/Discontinued` to match actual product's availability
6. Set `itemCondition` to `https://schema.org/NewCondition`, `https://schema.org/UsedCondition`, `https://schema.org/RefurbishedCondition`, or `https://schema.org/DamagedCondition` to match product's actual condition

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://example.com/product/slug/#product",
  "url": "https://example.com/product/slug/",
  "name": "PRODUCT_NAME",
  "description": "DETAILED_PRODUCT_DESCRIPTION",
  "sku": "PRODUCT_SKU",
  "mpn": "MANUFACTURER_PART_NUMBER",
  "gtin13": "1234567890123",
  "brand": {
    "@id": "https://example.com/#organization"
  },
  "image": [{
    "@id": "https://example.com/product/slug/#primaryimage"
  }],
  "isAccessibleForFree": false,
  "category": "PRODUCT_CATEGORY_LABEL",
  "color": "PRODUCT_COLOR",
  "material": "PRODUCT_MATERIAL",
  "model": "PRODUCT_MODEL_NAME",
  "offers": {
    "@type": "Offer",
    "@id": "https://example.com/product/slug/#offer"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 127
  }
}
</script>
```

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "@id": "https://example.com/product/slug/#offer",
  "url": "https://example.com/product/slug/",
  "price": "99.90",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@id": "https://example.com/#organization"
  }
}
</script>
```
