import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SITE } from "@/lib/constants";
import { getMainPageJsonLd } from "@/lib/jsonld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMessenger } from "@/components/layout/StickyMessenger";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { CursorSpotlight } from "@/components/layout/CursorSpotlight";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { ServiceWorkerRegistration } from "@/components/layout/ServiceWorkerRegistration";
import { LeadPopup } from "@/components/layout/LeadPopup";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dc2626",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Автоподбор в Минске — профессиональная диагностика и выездная проверка авто",
    template: "%s | Автоподбор в Минске",
  },
  description:
    "Комплексная проверка авто перед покупкой в Минске. Launch X431, толщиномер Etari, проверка VIN, юридическая чистота. Договор, отчёт, аргументированный торг. От 130 BYN.",
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
    "msapplication-TileColor": "#dc2626",
    "msapplication-config": "none",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: SITE.url,
    siteName: SITE.name,
    title:
      "Автоподбор в Минске — профессиональная диагностика и проверка авто перед покупкой",
    description:
      "Проверка по 140+ пунктам: сканер Launch X431, толщиномер, VIN-аудит, юридическая чистота. Экспертный отчёт через 2 часа. Работаем по договору.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Автоподбор в Минске — диагностика автомобилей сканером Launch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Автоподбор в Минске — проверка авто перед покупкой",
    description:
      "Комплексная диагностика: Launch X431, толщиномер, VIN-проверка. Отчёт за 2 часа. От 130 BYN.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: `${SITE.url}/`,
  },
  // TODO: Раскомментировать когда сайт готов к индексации
  robots: {
    index: false,     // ← заменить на true
    follow: false,    // ← заменить на true
    googleBot: {
      index: false,   // ← заменить на true
      follow: false,  // ← заменить на true
      // "max-video-preview": -1,
      // "max-image-preview": "large",
      // "max-snippet": -1,
      noimageindex: true, // ← удалить эту строку
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
        {/* JSON-LD: Combined @graph — WebSite, WebPage, Organization,
            LocalBusiness, Service, FAQPage, BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getMainPageJsonLd()),
          }}
        />
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
        <LeadPopup />
      </body>
    </html>
  );
}
