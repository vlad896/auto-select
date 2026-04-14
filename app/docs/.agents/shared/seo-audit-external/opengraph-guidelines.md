# Open Graph guidelines

Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional tags where necessary and remove the ones that won't fit with current project.

## General Open Graph meta-tags

Follow example below to create solid "base" for Open Graph setup.

1. Ensure `og:type` is set to correct value matching type of audited page
2. Ensure `og:title` corresponds to `<title>` tag
3. Ensure `og:site_name` is set to value aligned with branding and remains unchanged across all pages
4. Ensure `og:locale` is set to currently audited page language
5. Ensure `og:image:alt` corresponds to `<title>`, `description`, and branding
6. Ensure `og:image` meets recommended size of 1200 by 630 pixels and image size is less than 5MB
7. Ensure `og:image:width` and `og:image:height` is set to actual image sizes and only if known, it's better to drop these meta-tags if image size is unknown
8. Ensure `og:image:type` is set to actual image format and only if known, it's better to drop this meta-tags if image format/type is unknown
9. Add `og:updated_time` in `YYYY-MM-DDThh:mm:ssZ` or `YYYY-MM-DD` format and only if known, it's better to drop this meta-tags if publication/creation timestamp is unavailable

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PAGE_TITLE - BRAND_NAME</title>

  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="robots" content="index, follow, max-image-preview:large">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="PAGE_META_DESCRIPTION">

  <link rel="canonical" href="https://example.com/current-page-url">

  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="shortcut icon" href="/favicon.ico">

  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="theme-color" content="#FAFAFA">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="BRAND_NAME">
  <meta property="og:url" content="https://example.com/current-page-url">
  <meta property="og:title" content="PAGE_TITLE - BRAND_NAME">
  <meta property="og:description" content="PAGE_DESCRIPTION">
  <meta property="og:image" content="FQDN_URL_TO_IMAGE">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:alt" content="PAGE_TITLE">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:updated_time" content="ACTUAL_LAST_UPDATE_OR_CREATION_TIMESTAMP">
</head>
<body></body>
</html>
```

## Article or Blog Post Open Graph meta-tags

1. `og:type` is set to `article`
2. Add `article:published_time` and `article:modified_time` in `YYYY-MM-DDThh:mm:ssZ` or `YYYY-MM-DD` format
3. Set `article:section` to a title  of a section (category) this article belongs to, like General, News, Opinion, Guides, Engineering, Fintech, Blog, etc.
4. Set up to 5 `article:tag` with tags that describe the best this article
5. Add `author` meta-tag, it's out of Open Graph specs, but valuable for article/blog pages

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PAGE_TITLE - BRAND_NAME</title>

  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="robots" content="index, follow, max-image-preview:large">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="PAGE_META_DESCRIPTION">

  <link rel="canonical" href="https://example.com/current-page-url">

  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="shortcut icon" href="/favicon.ico">

  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="theme-color" content="#FAFAFA">

  <meta name="author" content="FULL_AUTHOR_NAME_OR_EDITORIAL_BRAND_NAME">

  <meta property="og:type" content="article">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="BRAND_NAME">
  <meta property="og:url" content="https://example.com/current-page-url">
  <meta property="og:title" content="ARTICLE_TITLE">
  <meta property="og:description" content="ARTICLE_DESCRIPTION">
  <meta property="og:image" content="FQDN_URL_TO_IMAGE">
  <meta property="og:image:alt" content="ARTICLE_TITLE">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <meta property="article:published_time" content="ACTUAL_PUBLISH_DATE">
  <meta property="article:modified_time" content="ACTUAL_UPDATE_TIME">
  <meta property="article:section" content="General">
  <meta property="article:tag" content="KEYWORD_1">
  <meta property="article:tag" content="KEYWORD_2">
  <meta property="article:tag" content="KEYWORD_3">
  <meta property="article:tag" content="KEYWORD_4">
</head>
<body></body>
</html>
```

## Product

Use the next additional Open Graph tags to describe product (digital, physical, or service)

- Change `og:type` to `product`
- Provide `product:*` tags
- Set `product:availability` to `in stock`, `out of stock`, `preorder`, `available for order`, or `discontinued`
- Set `product:condition` to `new`, `refurbished`, or `used`

```html
<meta property="og:type" content="product">
<meta property="product:retailer_item_id" content="PRODUCT_UNIQUE_ID_OR_SKU">
<meta property="product:price:amount" content="PRICE_AS_FLOAT">
<meta property="product:price:currency" content="CURRENCY">
<meta property="product:availability" content="in stock">
<meta property="product:condition" content="new">
<meta property="product:brand" content="BRAND_NAME">
```

## Open Graph for Internationalization setup

1. Add `og:locale:alternate` meta-tag with `content` set to country locale following "ISO 3166-1 Alpha 2" (language and country separated by underscore) or "ISO 639-1" (language only as two-letter code)
2. Add `<meta property="og:locale:alternate">` only to pages that has alternative versions
3. Link alternative page URL via `<link rel="alternate" hreflang="en">`
4. Link default language page URL via `<link rel="alternate" hreflang="x-default">`
5. Link current page locale via `<meta property="og:locale">` meta-tag

```html
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="it_IT">
<meta property="og:locale:alternate" content="en_GB">
<link rel="alternate" hreflang="en" href="https://example.com/blog/1017">
<link rel="alternate" hreflang="x-default" href="https://example.com/blog/1017">
```

## Open Graph for X/Twitter

1. Ensure Twitter/X meta-tags are using `name` attributes instead of `property`
2. Set `twitter:site` to business/company handle, and only if it's exists

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PAGE_TITLE - BRAND_NAME</title>
  <!-- ...other tags... -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@BUSINESS_TWITTER_HANDLE">
  <meta name="twitter:title" content="PAGE_TITLE">
  <meta name="twitter:description" content="PAGE_DESCRIPTION">
  <meta name="twitter:image" content="FQDN_URL_TO_IMAGE">
  <meta name="twitter:image:alt" content="PAGE_TITLE">
</head>
<body></body>
</html>
```

## Mobile app meta-tags

> To increase traffic to mobile app stores and installations Open Graph Tags can supply details about application from Apple Store and Google Play Store

Add the next meta-tags to display install/view banner when link shared in social media or messenger apps, for Apple iOS apps:

```html
<meta property="al:ios:app_store_id" content="APP_ID_FROM_APPLE_APP_STORE">
<meta property="al:ios:app_name" content="TITLE_AS_IN_APPLE_APP_STORE">
<!-- ONLY IF SCHEMA REGISTERED -->
<meta property="al:ios:url" content="scheme://path/within/app">
```

For Android Play Store apps:

```html
<meta property="al:android:package" content="GOOGLE_PLAY_STORE_APPLICATION_ID">
<meta property="al:android:app_name" content="TITLE_AS_IN_GOOGLE_PLAY_STORE">
<!-- ONLY IF SCHEMA REGISTERED -->
<meta property="al:android:url" content="scheme://path/within/app">
```

### Native application banner

> To drive traffic from website to App Store and Google Play app installation we recommend implementing "native banner", see `html-meta-tags.md` file for more details about `apple-itunes-app` meta-tag

### X/Twitter-specific tags

To display "App" card in posts shared on X/Twitter use the next meta-tags:

```html
<meta name="twitter:card" content="app">

<meta name="twitter:app:name:iphone" content="TITLE_AS_IN_APPLE_APP_STORE">
<meta name="twitter:app:id:iphone" content="APP_ID_FROM_APPLE_APP_STORE">
<!-- ONLY IF SCHEMA REGISTERED -->
<meta name="twitter:app:url:iphone" content="scheme://path/within/app">

<meta name="twitter:app:name:googleplay" content="TITLE_AS_IN_GOOGLE_PLAY_STORE">
<meta name="twitter:app:id:googleplay" content="GOOGLE_PLAY_STORE_APPLICATION_ID">
<!-- ONLY IF SCHEMA REGISTERED -->
<meta name="twitter:app:url:googleplay" content="scheme://path/within/app">
```

