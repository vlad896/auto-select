# Website Audit SEO checklist

Starting point and checklist for SEO Audits

## Must have

List of must have items for good SEO setup of every website and page

### Robots.txt

- [ ] Check that `robots.txt` exists
- [ ] Check that rules in `robots.txt` is valid and compliant with guidelines
- [ ] Check that `Sitemap:` linked in `robots.txt`
- [ ] Check that linked in `robots.txt` Sitemap exists

### Sitemap

- [ ] Check that Sitemap follows the guidelines (*see `sitemap-setup-guidelines.md` file*)
- [ ] Check that "root" Sitemap has `urlset` or `sitemapindex` as root element
- [ ] Check that correct XML tag exists `<?xml version="1.0" encoding="UTF-8"?>` and valid

### Domain, url, and path policies

- [ ] Check `http:` to `https:` redirect with correct `301` status code
- [ ] Check "domain policy" where `www.` or TLD is the primary domain with correct `301` status code (aligned with TLD in FQDN to sitemap in `robots.txt` file)
- [ ] Check "path policy" (with or without trialing slash at the end of the path) with correct `301` status code
- [ ] Check `404` "Page not found" policy — It's advised to use the same value in `canonical` link and `og:url` meta tags across all served 404 pages to "collapse" all 404 pages into the single entity (for example using: `https://example.com/not-found/404`)

### Static Assets

- [ ] Check that all linked icons and images via meta-tags are using FQDN links
- [ ] Check that all linked icons, images, scripts, and WebManifest are exists (no broken links)
- [ ] Check that linked WebManifest served with `application/manifest+json` mime-type (if exists and linked)

### Per-page markup

- [ ] Check that every page has `<link rel="canonical">` with full FQDN and path to current page following project's "domain policy" and "path policy"
- [ ] Check that Open Graph correctly implemented, `og:url` aligned with `<link rel="canonical">`, and `og:type` set to correct page type; Additional OG tags added where necessary (see `opengraph-guidelines.md` file)
- [ ] Ensure all pages in pagination are point to main (or the first) page from the list via `<link rel="canonical">` link and `og:url` meta-tag
- [ ] Ensure all pages in pagination (except main/the first page) have `<meta name="robots" content="noindex, follow">` and `<meta name="googlebot" content="noindex, follow">`
- [ ] Check page against `html-semantic-guidelines.md`
- [ ] Check that JSON-LD correctly implemented and each page has Rich Media entity types, see `json-ld.md` for detailed guidelines
- [ ] Run Lighthouse/PageSpeed (preferably locally via MCP) tests and highlight critical issues

## Recommended

List of highly recommended items for proper technical SEO setup

- [ ] `favicon.ico` placed in the root of the website and linked via `<link rel="shortcut icon">` tag in `<head>`
- [ ] `favicon.png` as 96 by 96 PNG image for modern browsers and linked via `<link rel="icon">` tag in `<head>`
- [ ] `favicon.svg` as square SVG image for modern browsers and linked via `<link rel="icon">` tag in `<head>`
- [ ] `<link rel="preconnect" crossorigin>` for all 3rd party domains
- [ ] `<link rel="dns-prefetch">` for all 3rd party domains
- [ ] Ensure that most of the landing pages include FAQ section with correct JSON-LD markup
- [ ] For websites with related mobile apps — link application store apps via `al:` meta-tags to display native install/open banners
- [ ] Check "LLMs.txt" setup, suggest implementation if LLM instructions are missing

## Check pre-rendering integration

- [ ] Check that it's correctly implemented and applied to entire website
- [ ] Check that rendered pages look correctly and show good performance in CWV tests (PageSpeed/Lighthouse)

### Improve content appearence with active pre-rendering integration

List additional tasks to hide/show some elements of the page to bots (using `window.IS_PRERENDERING`; see [`detect-prerendering.md` docs](https://github.com/veliovgroup/ostrio/blob/master/docs/prerendering/detect-prerendering.md)).

Use-cases that should be taken into account:

- Hide (or move to the bottom as static element), like "cookies consent"
- Expand all accordions (Usually FAQ section and alike)
- Expand all truncated texts (Usually long descriptions)
- Serve images in smaller size (when suggested by CWV audit and applicable)
- Turn carousels into lists (where applicable)
- Turn infinite scrolling into pagination (*must have*)
- Hide modal that automatically opens after page is loaded or after user starts scrolling
- Disable JS-driven lazy-loading for images and videos
