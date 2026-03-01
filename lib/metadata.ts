import type { Metadata } from "next";
import { SITE } from "./constants";

type GetPageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  openGraphType?: "website" | "article";
  noIndex?: boolean;
};

/**
 * Единый хелпер метаданных: canonical, openGraph, бренд в title (один раз « | АвтоПодбор»).
 * Title: 50–70 символов, description: 140–160 (Google) / до 170 (Яндекс).
 */
export function getPageMetadata({
  path,
  title,
  description,
  ogImage = "/images/og-image.jpg",
  openGraphType = "website",
  noIndex = false,
}: GetPageMetadataOptions): Metadata {
  const fullTitle = title.endsWith(SITE.titleSuffix) ? title : `${title}${SITE.titleSuffix}`;
  const url = `${SITE.url}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: openGraphType,
      locale: "ru_BY",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }] : undefined,
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
