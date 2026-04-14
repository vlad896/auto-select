# robots.txt file guideline

- Check that `robots.txt` exists
- Check that rules in `robots.txt` is valid and compliant with guidelines described in this file
- Ensure `Allow:` and `Disallow` rules always:
    1. Start with `/` (as per standard)
    2. Never ends with `*` (as it's redundant)
    3. Skipped path(s) defined as `/*/`
- Ensure `Sitemap:` is included as FQDN and points to existing file following this project's "domain policy"

## Example

Allow all pages

```plain
User-agent: *
Disallow:

Sitemap: https://FQDN/sitemap.xml
```

Disallow some URLs

```plain
User-agent: *
Disallow: /path-1/
Disallow: /path-2/
Disallow: /page-slug

Sitemap: https://FQDN/sitemap.xml
```
