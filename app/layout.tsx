import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SITE } from "@/lib/constants";
import {
  getMainPageJsonLd,
  getLocalBusinessJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/jsonld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMessenger } from "@/components/layout/StickyMessenger";
import { PromoBanner } from "@/components/layout/PromoBanner";
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
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
        {/* JSON-LD: Organization + Service + FAQ (combined @graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getMainPageJsonLd()),
          }}
        />
        {/* JSON-LD: Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessJsonLd()),
          }}
        />
        {/* JSON-LD: Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen bg-surface-950 font-sans text-neutral-300 antialiased" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
