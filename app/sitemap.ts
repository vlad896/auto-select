import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/** Paths with trailing slash; `""` = homepage. Canonical-aligned with segment layouts. */
const SITEMAP_PATHS = [
  "",
  "podbor/",
  "diagnostika/",
  "marki/",
  "cases/",
  "faq/",
  "pricing/",
  "privacy/",
  "podbor/expert-na-den/",
  "podbor/yuridicheskaya-chistota/",
  "diagnostika/proverka-kuzova-lkp/",
  "diagnostika/kompyuternaya-diagnostika/",
  "diagnostika/proverka-probega/",
  "diagnostika/endoskopiya-dvigatelya/",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((path) => ({
    url: path === "" ? `${SITE.url}/` : `${SITE.url}/${path}`,
  }));
}
