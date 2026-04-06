import type { MetadataRoute } from "next";
import { SITE, SITE_HOSTNAME } from "@/lib/constants";

/**
 * robots.txt — индексация, AI-цитирование (разрешён обход контента), служебные пути закрыты.
 * Правила путей: префикс `/`, без завершающего `*`, каталоги — с `/` на конце.
 */
const DISALLOW_PUBLIC_CONTENT: string[] = [
  "/api/",
  "/_next/",
  "/offline/",
  "/sw.js",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-512.png",
  "/icon-maskable.png",
  "/apple-touch-icon.png",
];

/** Поисковые и AI-краулеры для цитирования: полный доступ к страницам, кроме служебных путей. */
const SEARCH_AND_AI_AGENTS = [
  "Googlebot",
  "Yandex",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "CCBot",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended",
  "FacebookBot",
  "Bytespider",
  "PerplexityBot",
  "Applebot-Extended",
  "cohere-ai",
] as const;

export default function robots(): MetadataRoute.Robots {
  const searchAndAiRules: MetadataRoute.Robots["rules"] = SEARCH_AND_AI_AGENTS.map(
    (userAgent) => ({
      userAgent,
      allow: "/",
      disallow: DISALLOW_PUBLIC_CONTENT,
    })
  );

  return {
    rules: [
      ...searchAndAiRules,

      // Агрессивные SEO-краулеры: полный запрет
      { userAgent: "AhrefsBot", disallow: ["/"] },
      { userAgent: "SemrushBot", disallow: ["/"] },
      { userAgent: "DotBot", disallow: ["/"] },
      { userAgent: "MJ12bot", disallow: ["/"] },
      { userAgent: "PetalBot", disallow: ["/"] },

      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PUBLIC_CONTENT,
      },
    ],

    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE_HOSTNAME,
  };
}

