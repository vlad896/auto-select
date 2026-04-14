# `FAQPage` JSON-LD Entity

Use `FAQPage` JSON-LD entity for every page of the website where FAQ section is present. Convert FAQ section using its questions and answers from HTML into JSON-LD object. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks. Suggest additional fields where necessary and remove the ones that won't fit with current project.

1. Ensure every `Question` has unique `@id` value
2. Connect `FAQPage` with `WebPage` via `mainEntityOfPage`
3. Include all questions and answers from the page to `mainEntity` as array with separate `{"@type": "Question"}`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://example.com/page/#faq",
  "url": "https://example.com/page",
  "inLanguage": "en",
  "mainEntityOfPage": {
    "@id": "https://example.com/page/#webpage"
  },
  "mainEntity": [{
    "@type": "Question",
    "@id": "https://example.com/page/#faq-unique-id",
    "name": "QUESTION",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "ANSWER_BODY_TEXT"
    }
  }]
}
</script>
```
