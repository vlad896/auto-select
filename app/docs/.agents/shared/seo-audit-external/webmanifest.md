# WebManifest Guidelines

As part of CWV audit we suggest all websites to add, follow correct format, correctly include via `link`, and utilize WebManifest file.

## Link webmanifest

Suggest to always include `type="application/manifest+json"` argument to ensure it has correct `Content-Type` and encoding.

```html
<head>
  <link rel="manifest" href="/manifest.webmanifest" type="application/manifest+json">
</head>
```

## WebManifest contents

Recommended WebManifest source code will be provided by our team. For existing WebManifest file — validate its markup, encoding, and mime-type.
