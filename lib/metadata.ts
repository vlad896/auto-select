import type { Metadata } from "next";
import { SITE } from "./constants";

type GetPageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  /** MIME подтип для `og:image:type`, например `image/jpeg`. Если не задан — выводится из расширения URL. */
  ogImageType?: string;
  openGraphType?: "website" | "article";
  noIndex?: boolean;
};

function inferOgImageMimeType(imageUrl: string): string | undefined {
  const lower = imageUrl.split("?")[0]?.toLowerCase() ?? "";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return undefined;
}

/**
 * Единый хелпер метаданных: canonical, openGraph, Twitter, бренд в title (один раз « | АвтоПодбор»).
 * Title: 50–70 символов, description: 140–160 (Google) / до 170 (Яндекс).
 */
export function getPageMetadata({
  path,
  title,
  description,
  ogImage = "/images/og-image.jpg",
  ogImageType,
  openGraphType = "website",
  noIndex = false,
}: GetPageMetadataOptions): Metadata {
  const fullTitle = title.endsWith(SITE.titleSuffix) ? title : `${title}${SITE.titleSuffix}`;
  const url = `${SITE.url}${path}`;
  const imageMime = ogImageType ?? (ogImage ? inferOgImageMimeType(ogImage) : undefined);

  const ogImages =
    ogImage &&
    ({
      url: ogImage,
      alt: fullTitle,
      ...(imageMime ? { type: imageMime } : {}),
    } as const);

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
      images: ogImages ? [ogImages] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImage ? [{ url: ogImage, alt: fullTitle }] : undefined,
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
