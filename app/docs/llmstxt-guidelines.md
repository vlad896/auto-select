# LLMs.txt and beyond

1. Implement `llms.txt` and place it at the root of the website (e.g. public/llms.txt), follow template in `llms-template.txt`
2. Add link to `/llms.txt` in the website footer: `<a href="/llms.txt" type="text/plain" title="PRODUCT_NAME LLMs.txt">Docs for LLMs and AI-agents</a>`
3. To `<head>` of Home page __only__ add `<link rel="alternate" type="text/plain" href="/llms.txt">` (e.g. via metadata alternates.types)
4. Implement `llms-instructions.txt` (content from `llms-template.md`) and place at site root
5. Implement `faq.txt` with all FAQ content and place at site root (template: `llms-faq-template.md`)
6. Optionally add to Home page head: `<link rel="alternate" type="text/plain" href="/faq.txt">` (FAQ section is on home)
7. Implement `about.txt` (template: `llms-about-template.md`) and place at site root
8. Optionally add to Home page head: `<link rel="alternate" type="text/plain" href="/about.txt">` (no separate About page)
