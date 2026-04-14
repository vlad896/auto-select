# Semantic HTML Guidelines

1. Ensure content is split between core main element (when applicable): `<header>`, `<nav>`, `<main>`, `<footer>`, and `<aside>`
2. Ensure each page has exactly one `<main>` element. The `<main>` element must not be nested and should contain the content that makes this URL unique (not header/footer boilerplate).
3. Split `<main>` into logical `<section>` elements. Each `<section>` element must have a heading (`<h2>` or deeper level heading)
4. Ensure all pages have one `<h1>` element. Content of `<h1>` should align with page's `<title>` and target primary keywords
5. Ensure `h*` (heading elements) maintain correct order and levels
6. Prefer `h*` elements followed by `<p>` located inside `<header>` — suggest this option where applicable
7. Ensure `<article>` element used correctly and where applicable
8. Suggest using `<time datetime>` and `<data value>` for key dates and key numeric values where applicable
9. Prefer `<a>` to all elements that will trigger navigation or opening new tab/page (only where possible/applicable)
10. Prefer `<button>` to all elements that will change state or perform action without navigation (only where possible/applicable)
11. Use `data-nosnippet` attribute following the best practices
12. Add `rel="noopener noreferrer"` attribute to all foreign links
13. Add `rel="me"` attribute to all social media accounts associated with this brand/project

## HTML Markup Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PAGE_TITLE - BRAND_NAME</title>
</head>
<body>
  <!-- Global site header -->
  <header role="banner">
    <nav aria-label="Primary navigation">
      <ul>
        <li><a href="/" aria-current="page">HOME_PAGE</a></li>
        <li><a href="/url-1/">LINK_1</a></li>
        <li><a href="/url-2/">LINK_2</a></li>
        <li><a href="/url-3/">LINK_3</a></li>
        <li><a href="/url-4/">LINK_4</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main content (unique for this URL) -->
  <main role="main">
    <!-- Primary content unit, e.g. a blog post or main page content -->
    <article>
      <header>
        <h1>HEADING_ALIGNED_WITH_PAGE_TITLE</h1>
        <p>SHORT_DESCRIPTION</p>

        <p>
          Published
          <time datetime="2025-12-01">December 1, 2025</time>
          · Updated
          <time datetime="2025-12-10">December 10, 2025</time>
        </p>
      </header>

      <!-- First logical section -->
      <section aria-labelledby="section-1">
        <header>
          <h2 id="section-1">SECTION_HEADING</h2>
          <p>SECTION_SHORT_DESCRIPTION</p>
        </header>

        <!-- SECTION_BODY HERE -->
      </section>

      <!-- Second logical section -->
      <section aria-labelledby="section-2">
        <header>
          <h2 id="section-2">SECTION_HEADING</h2>
          <p>SECTION_SHORT_DESCRIPTION</p>
        </header>

        <!-- SECTION_BODY HERE -->

        <p>
          SOME VALUE AS NUMBER <data value="327">327</data> THAT IS IMPORTANT FOR THIS PAGE.
        </p>
      </section>

      <!-- Optional CTA section -->
      <section aria-labelledby="section-3">
        <header>
          <h2 id="section-3">SECTION_HEADING</h2>
          <p>SECTION_SHORT_DESCRIPTION</p>
        </header>

        <!-- SECTION_BODY HERE -->
      </section>

      <footer>
        <p>ARTICLE_FOOTER_NOTES_AND_LINKS <a href="/about/">LINK</a>.</p>
      </footer>
    </article>

    <!-- Related / secondary content -->
    <aside aria-label="Related links">
      <section>
        <header>
          <h2>RELATED_LINKS</h2>
        </header>
        <ul>
          <li><a href="/related-link-1/">RELATED_LINK_1</a></li>
          <li><a href="/related-link-2/">RELATED_LINK_2</a></li>
          <li><a href="/related-link-3/">RELATED_LINK_3</a></li>
        </ul>
      </section>
    </aside>
  </main>

  <!-- Global site footer -->
  <footer>
    <section aria-label="Footer navigation">
      <nav aria-label="Footer links">
        <ul>
          <li><a href="/about/">About</a></li>
          <li><a href="/privacy-policy/">Privacy Policy</a></li>
          <li><a href="/terms/">Terms of Service</a></li>
        </ul>
      </nav>
    </section>

    <section data-nosnippet aria-label="Footer information">
      <p>&copy; <time datetime="2025">2025</time> BRAND_NAME. All rights reserved.</p>
    </section>
  </footer>
</body>
</html>
```
