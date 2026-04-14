import type { MetadataRoute } from "next";
import { SITE_ASCII_URL } from "@/lib/constants";

type SitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const SITEMAP_ENTRIES: readonly SitemapEntry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "podbor/", changeFrequency: "weekly", priority: 0.95 },
  { path: "diagnostika/", changeFrequency: "weekly", priority: 0.95 },
  { path: "marki/", changeFrequency: "weekly", priority: 0.9 },
  { path: "pricing/", changeFrequency: "weekly", priority: 0.9 },
  { path: "faq/", changeFrequency: "monthly", priority: 0.7 },
  { path: "cases/", changeFrequency: "monthly", priority: 0.7 },
  { path: "podbor/expert-na-den/", changeFrequency: "monthly", priority: 0.85 },
  { path: "podbor/yuridicheskaya-chistota/", changeFrequency: "monthly", priority: 0.8 },
  { path: "diagnostika/proverka-kuzova-lkp/", changeFrequency: "monthly", priority: 0.85 },
  { path: "diagnostika/kompyuternaya-diagnostika/", changeFrequency: "monthly", priority: 0.85 },
  { path: "diagnostika/proverka-probega/", changeFrequency: "monthly", priority: 0.8 },
  { path: "diagnostika/endoskopiya-dvigatelya/", changeFrequency: "monthly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ENTRIES.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? `${SITE_ASCII_URL}/` : `${SITE_ASCII_URL}/${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
