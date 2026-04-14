import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { BRAND_THEME_COLOR, SITE } from "@/lib/constants";
import { getMainPageJsonLd } from "@/lib/jsonld";
import { JsonLdScripts } from "@/components/layout/JsonLdScripts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMessenger } from "@/components/layout/StickyMessenger";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { CursorSpotlight } from "@/components/layout/CursorSpotlight";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { ServiceWorkerRegistration } from "@/components/layout/ServiceWorkerRegistration";
import { YandexMetrika } from "@/components/layout/YandexMetrika";
import { LeadPopup } from "@/components/layout/LeadPopup";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import "./globals.css";

// ============================================================
// Font optimization — self-hosted via next/font
// ============================================================

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-heading",
});

// ============================================================
// Metadata API — SEO, Open Graph, Twitter
// ============================================================

/** Единый `<title>`, `og:title`, `twitter:title` и описания для главной. */
const HOME_PAGE_TITLE =
  "Автоподбор в Минске — профессиональная диагностика и выездная проверка авто | АвтоПодбор";
const HOME_PAGE_DESCRIPTION =
  "Комплексная проверка авто перед покупкой в Минске. Launch X431, толщиномер Etari, проверка VIN, юридическая чистота. Договор, отчёт, аргументированный торг. От 130 BYN.";
const HOME_OG_IMAGE = "/images/og-image.jpg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: BRAND_THEME_COLOR,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  referrer: "strict-origin-when-cross-origin",
  // Один title без template, чтобы не дублировать бренд на дочерних страницах.
  title: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESCRIPTION,
  keywords: [
    "автоподбор Минск",
    "проверка авто перед покупкой",
    "диагностика авто Минск",
    "толщиномер проверка",
    "подбор авто под ключ",
    "проверка ЛКП",
    "проверка VIN Беларусь",
    "автоэксперт Минск",
    "выездная диагностика авто",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    telephone: true,
    email: true,
  },
  // ── PWA: manifest is auto-linked via app/manifest.ts ──
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "АвтоПодбор",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "АвтоПодбор",
    "msapplication-TileColor": BRAND_THEME_COLOR,
    "msapplication-config": "none",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    /** Дублируем SVG как shortcut icon — аналог favicon.ico для векторного набора проекта. */
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: SITE.url,
    siteName: SITE.name,
    title: HOME_PAGE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
    images: [
      {
        url: HOME_OG_IMAGE,
        type: "image/jpeg",
        alt: HOME_PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_PAGE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
    images: [{ url: HOME_OG_IMAGE, alt: HOME_PAGE_TITLE }],
  },
  alternates: {
    canonical: `${SITE.url}/`,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// ============================================================
// Root Layout
// ============================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {/* Preconnect: reduce latency for Yandex Metrika (Lighthouse) */}
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        {/* Alternate plain-text for AI citation: FAQ and About */}
        <link rel="alternate" type="text/plain" href={`${SITE.url}/faq.txt`} title="FAQ" />
        <link rel="alternate" type="text/plain" href={`${SITE.url}/about.txt`} title="About" />
        <JsonLdScripts schemas={getMainPageJsonLd()} idPrefix="root-jsonld" />
      </head>
      <body className="min-h-screen bg-surface-950 font-sans text-neutral-300 antialiased" suppressHydrationWarning>
        <CursorSpotlight />
        {/* Skip to content — WCAG 2.2 keyboard nav */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к основному содержимому
        </a>

        <PromoBanner />
        <Header />
        {children}
        <Footer />
        <StickyMessenger />
        <StickyCTA />
        <ServiceWorkerRegistration />
        <YandexMetrika />
        <LeadPopup />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
