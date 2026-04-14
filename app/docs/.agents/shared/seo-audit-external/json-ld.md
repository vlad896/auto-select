# JSON-LD Guidelines

Notes:

- All JSON-LD setups are split into "general" and "advanced"
- General JSON-LD setup includes "static" JSON-LD objects that included into every page of the website and remain unchanged across the website
- Advanced JSON-LD setup includes additional JSON-LD objects that describe entities that unique to each individual page of the website

## JSON-LD Rules

When creating JSON-LD setup follow the next main principles:

1. Review website's pages and learn about its project, offer, products before creating JSON-LD setup
2. Avoid using `@graph`; Prefer separate `<script type="application/ld+json"></script>` elements to `graph` property for maintainability and simplification
3. Connect all JSON-LD entities via its unique `@id`
4. `<script type="application/ld+json"></script>` can be located in any part of the HTML page
5. Avoid using in-HTML microdata; Prefer JSON-LD (replace existing microdata markup with JSON-LD where applicable)
6. Ensure every page have `WebPage` as standalone entity or combined with appropriate additional entity type to match page's context
7. Ensure every `WebPage` has separate `ImageObject` matching image from `og:image` and linked via `primaryImageOfPage` and `image`
8. Ensure every `WebPage` have `BreadcrumbList` linked via `@id` in `breadcrumb` property
9. Ensure every `WebPage` have `mainEntity` and optionally `hasPart` to ensure all present entities are linked with webpage
10. Ensure every `@id` ends with slash followed by hashtag with lowercase entity slug, like `https://example.com/#webpage`
11. Prefer two-letter language only code in `lang` field (ISO 639-1), when applicable on multi-lingual websites

## JSON-LD examples and templates

Follow the next guidelines located in the separate files:

- Start with general JSON-LD setup that repeats on every website's page — see `jsonld-general-setup.md` file
- `BlogPosting` template — see `jsonld-blogposting-tempalte.md` file
- `BreadcrumbList` template — see `jsonld-breadcrumblist-setup.md` file
- `CollectionPage` template for pagination views — see `jsonld-collectionpage-template.md` file
- `FAQPage` template — see `jsonld-faqpage-template.md` file
- `MobileApplication` template — see `jsonld-mobileapplication-template.md` file
- `Product` template — see `jsonld-product-template.md` file
- `SoftwareApplication` template — see `jsonld-softwareapplication-template.md` file
- `WebApplication` template — see `jsonld-webapplication-template.md` file
- `WebPage` template — see `jsonld-webpage-template.md` file

### Additional JSON-LD

When applicable implement the next JSON-LD entities for webpages and websites that will benefit from its additional markup:

- `ContactPage`
- `Article` with `WebPage`
- `NewsArticle`
- `Course`
- `Event`
- `LocalBusiness`
- `QAPage`
- `Recipe` with `HowTo`
- `Review` with `AggregateRating`
- `CreativeWork` for paywalled content: [Follow Google's guidelines](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content?sjid=15476201907585553913-EU)
- `VacationRental`
- `Offer`
- `VideoObject`
