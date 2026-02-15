import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    // L1 — homepage
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // L2 — Автоподбор
    {
      url: `${SITE.url}/podbor/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // L2 — Диагностика
    {
      url: `${SITE.url}/diagnostika/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // L2 — По маркам
    {
      url: `${SITE.url}/marki/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // L3 — Подбор
    {
      url: `${SITE.url}/podbor/expert-na-den/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/podbor/yuridicheskaya-chistota/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // L3 — Диагностика
    {
      url: `${SITE.url}/diagnostika/proverka-kuzova-lkp/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/diagnostika/kompyuternaya-diagnostika/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/diagnostika/proverka-probega/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/diagnostika/endoskopiya-dvigatelya/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
