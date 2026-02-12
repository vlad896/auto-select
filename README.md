# Автоподбор в Минске — Next.js Website

Professional car inspection and selection service landing page built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.5 | App Router, SSG, Server Actions |
| React | 19 | Server Components + selective client hydration |
| TypeScript | 5.7 | Full type safety |
| Tailwind CSS | 4.0 | CSS-first theming, utility classes |
| Framer Motion | 11.x | Available for animations |
| Lucide React | 0.468 | Icon library (tree-shakeable) |
| Zod | 3.24 | Form validation schemas |

## Getting Started

```bash
# Install dependencies
npm install

# Development (Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Project Structure

```
app/
├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
├── page.tsx            # Home page (composes 11 sections)
├── actions.ts          # Server Actions (contact form, quiz)
└── globals.css         # Tailwind v4 theme + custom CSS

components/
├── layout/
│   ├── Header.tsx      # Sticky header with mobile menu
│   ├── Footer.tsx      # 3-column footer with contact form
│   └── StickyMessenger.tsx  # Floating messenger FAB
├── sections/
│   ├── HeroSection.tsx # H1 + USP + dual CTAs
│   ├── Quiz.tsx        # 5-step interactive quiz
│   ├── ToolsProof.tsx  # Equipment showcase (4 cards)
│   ├── ServicesGrid.tsx# 3 service pricing cards
│   ├── Methodology.tsx # Technical expertise (H2-H4)
│   ├── PricingTable.tsx# Responsive pricing table
│   ├── Calculator.tsx  # ROI calculator
│   ├── ProcessSteps.tsx# 5-step timeline
│   ├── LegalCheck.tsx  # VIN/legal verification
│   ├── CaseStudies.tsx # BMW/VW case study cards
│   └── FAQSection.tsx  # Accordion FAQ
└── ui/
    ├── Button.tsx      # Polymorphic button (5 variants)
    ├── Card.tsx        # Card + sub-components
    ├── Container.tsx   # Max-width wrapper
    ├── Badge.tsx       # Status badges (6 variants)
    ├── SectionHeading.tsx # Reusable heading block
    └── Accordion.tsx   # ARIA-compliant accordion

lib/
├── constants.ts        # All business data
├── schemas.ts          # Zod validation schemas
└── jsonld.ts           # JSON-LD structured data generators
```

## Performance

| Metric | Value |
|---|---|
| First Load JS | 111 kB |
| Page JS (app-specific) | 5.78 kB |
| CSS bundle | 57 kB |
| Build time | ~2s |
| Rendering | Static (SSG) |
| Client components | 4 of 17 (Header, Footer, Quiz, Calculator, Accordion, StickyMessenger) |

## SEO & Structured Data

- Full Metadata API (title, description, OG, Twitter cards, canonical, robots)
- 3 JSON-LD blocks: Organization+Service+FAQ graph, AutoRepair LocalBusiness, BreadcrumbList
- Semantic HTML with proper H1-H4 hierarchy
- All images have descriptive `alt` text

## Accessibility (WCAG 2.2)

- Skip-to-content link
- Full ARIA on all interactive components
- `focus-visible` rings on all focusable elements
- Keyboard navigable (Tab, Enter, Escape)
- `role="banner"`, `role="contentinfo"`, `role="progressbar"`, `role="radiogroup"`
- `aria-expanded`, `aria-controls`, `aria-labelledby` on menus and accordions

## Deployment

Optimized for [Vercel](https://vercel.com):

```bash
npm run build  # Static export ready
```

Or deploy to any Node.js hosting with `npm start`.
