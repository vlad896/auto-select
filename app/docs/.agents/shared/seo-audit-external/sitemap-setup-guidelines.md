# Guidelines for `sitemap.xml`

Follow guidelines in this file to create `sitemap.xml`. Replace all placeholders in CAPS, `example.com` URLs, and generic details. Ask additional questions to fill in blanks.

1. Use `lastmod` only when website developers/owners can maintain correct and actual timestamps for this field
2. Drop `changefreq` and `priority` as deprecated
3. Avoid using unnecessary `xmlns:*` namespaces, especially if its functionality unused
4. Where possible: prefer organizing `sitemap.xml` as `sitemapindex` where nested sitemaps located under `/path/` with corresponding URLs from the same `/path/*` as `/path/sitemap.xml`
5. `sitemap.xml` files always must start with `<?xml version="1.0" encoding="UTF-8"?>` on the first line of the file (no spaces, no empty lines before this tag)

## General `sitemap.xml`

Use the next template for `sitemap.xml` when we need to list all website's pages

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/full-path</loc></url>
  <url><loc>...other URLs here...</loc></url>
</urlset>
```

## Sitemap Internationalization

Use the next template to reference page's versions in the other languages, assuming `en` (English) is the default language of the website

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/path/page-slug</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/path/page-slug"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://example.com/de/path/page-slug"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://example.com/it/path/page-slug"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/path/page-slug"/>
  </url>
  <!-- repeat for every post -->
</urlset>
```

## Sitemap with images

Use the next template for `sitemap.xml` that reference images. Extend `urlset` with `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml"` attributes and follow the next template:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/page/path-10772</loc>
    <lastmod>YYYY-MM-DDThh:mm:ss+00:00</lastmod>
    <image:image>
      <image:loc>https://example.com/full/path/to/image-3bc5bf87e022.jpd</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://example.com/full/path/to/image-731f923a67e4.jpd</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://example.com/full/path/to/image-c41f769ce3b7.jpd</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://example.com/full/path/to/image-42d95b2d7459.jpd</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://example.com/full/path/to/image-42faf56429fe.jpd</image:loc>
    </image:image>
  </url>
</urlset>
```

## Setup for `sitemapindex`

Use the next template for `sitemapindex` file. Where:

1. `https://example.com/sitemap-pages.xml` - holds all URLs to "root" pages `/*`
1. `https://example.com/path/sitemap.xml` - holds all URLs `/path/*`
1. `https://example.com/path-2/sitemap.xml` - holds all URLs `/path-2/*`
1. `https://example.com/path-3/sitemap.xml` - holds all URLs `/path-3/*`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>YYYY-MM-DDThh:mm:ss+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/path/sitemap.xml</loc>
    <lastmod>YYYY-MM-DDThh:mm:ss+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/path-2/sitemap.xml</loc>
    <lastmod>YYYY-MM-DDThh:mm:ss+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/path-3/sitemap.xml</loc>
    <lastmod>YYYY-MM-DDThh:mm:ss+00:00</lastmod>
  </sitemap>
</sitemapindex>
```
