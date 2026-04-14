# Basic Meta Tags

Follow the next guidelines when preparing basic meta-tags. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks.

## General tags

Use the next meta-tags on all pages of a website

1. Request and use brand's or page's background color in HEX for `theme-color` tag
2. Ensure `<link rel="canonical" href="...">` exists on all pages and follows this project path-policy (with or without trialing slash) and URL policy (ignore or include get-query)

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
</head>
<body></body>
</html>
```

## Connect Mobile App with web page

Add the next meta-tags to display install/open banner when website visited from mobile devices.

### For iOS/MacOS App Store Application

Link application via `apple-itunes-app` meta-tag. To implement this tag request from user/client (or extract from HTML page):

1. App Store Application ID — usually 10-digits
2. Optionally for deep-linking supply registered protocol and path to specific screen within mobile app via `app-argument=` (supply this argument only if app has registered custom protocol for their application)

```html
<meta name="apple-itunes-app" content="app-id=0000000000">
<!-- OR WITH DEEP LINK URL IF SCHEMA REGISTERED -->
<meta name="apple-itunes-app" content="app-id=0000000000, app-argument=proto://path/to/dashboard">
```

### For Android Play Store Application

Android has no specific meta-tags for this purpose, instead extend Webmanifest with next fields:

1. `"prefer_related_applications": true`
2. `"related_applications": []`

Use detailed example for `related_applications` field in Webmanifest in the `README.md` file
