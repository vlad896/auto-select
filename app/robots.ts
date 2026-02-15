import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * robots.txt — управление индексацией.
 *
 * Зеркала:
 * - Host: автоподборминск.бел (для Яндекса)
 * - www → non-www редирект через middleware + next.config redirects
 * - trailingSlash: true → /path → /path/ (308)
 *
 * Disallow пути с trailing slash для consistency.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Googlebot: полный доступ к контенту ──
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/offline/",
          "/sw.js",
        ],
      },

      // ── Yandex: полный доступ к контенту ──
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/offline/",
          "/sw.js",
        ],
      },

      // ── Bingbot: полный доступ ──
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/offline/",
          "/sw.js",
        ],
      },

      // ── AI-краулеры: разрешить для попадания в AI-выдачу ──
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/offline/", "/sw.js"],
      },

      // ── Агрессивные SEO-краулеры: запретить ──
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
      {
        userAgent: "DotBot",
        disallow: ["/"],
      },
      {
        userAgent: "MJ12bot",
        disallow: ["/"],
      },
      {
        userAgent: "PetalBot",
        disallow: ["/"],
      },

      // ── Все остальные боты: базовые ограничения ──
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/offline/",
          "/sw.js",
          "/manifest.webmanifest",
          "/icon.svg",
          "/icon-512.png",
          "/icon-maskable.png",
          "/apple-touch-icon.png",
        ],
      },
    ],

    // Sitemap — для всех поисковиков
    sitemap: `${SITE.url}/sitemap.xml`,

    // Host — предпочтительное зеркало (для Яндекса)
    host: SITE.url,
  };
}
