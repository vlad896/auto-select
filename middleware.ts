import { NextRequest, NextResponse } from "next/server";

/**
 * Edge Middleware — нормализация URL для устранения дублей.
 *
 * Обрабатывает (всё одним 301-хопом):
 * 0. Vercel preview host → canonical
 * 1. HTTP → HTTPS (первый визит до HSTS)
 * 2. www → non-www
 * 3. Двойные/множественные слеши → одинарный
 * 4. Uppercase path → lowercase
 * 5. Дописывает trailing slash для cross-host редиректов
 *    (чтобы избежать вторичного 308 от nginx канона)
 */

const CANONICAL_HOST = "автоподборминск.бел";
const CANONICAL_HOST_PUNYCODE = "xn--80aafgkdcbpkjhgmfcdo6o.xn--d1acj3b";
const VERCEL_PREVIEW_HOST = "auto-select-one.vercel.app";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { protocol, hostname, pathname, search } = url;
  let needsRedirect = false;

  const lowerHost = hostname.toLowerCase();

  // ── 0. Vercel preview → canonical (одним хопом 301) ──
  // Делаем в middleware, а не в next.config.redirects, чтобы обойти
  // двойной хоп от Next.js trailingSlash normalization.
  if (lowerHost === VERCEL_PREVIEW_HOST) {
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    needsRedirect = true;
  }

  // ── 1. HTTPS enforcement (пропускаем localhost) ──
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.");
  if (!isLocalhost) {
    const proto = request.headers.get("x-forwarded-proto") || protocol;
    if (proto === "http:" || proto === "http") {
      url.protocol = "https:";
      needsRedirect = true;
    }
  }

  // ── 2. www → non-www ──
  if (
    lowerHost === `www.${CANONICAL_HOST}` ||
    lowerHost === `www.${CANONICAL_HOST_PUNYCODE}`
  ) {
    url.hostname = CANONICAL_HOST;
    needsRedirect = true;
  }

  // ── 3. Двойные слеши → одинарный ──
  // /podbor//expert/ → /podbor/expert/
  if (pathname !== pathname.replace(/\/{2,}/g, "/")) {
    url.pathname = pathname.replace(/\/{2,}/g, "/");
    needsRedirect = true;
  }

  // ── 4. Uppercase → lowercase path ──
  // /Podbor/ → /podbor/  (кроме query string)
  // Пропускаем /_next/, /api/ и статику — эти пути case-sensitive
  if (
    !url.pathname.startsWith("/_next") &&
    !url.pathname.startsWith("/api") &&
    url.pathname !== url.pathname.toLowerCase()
  ) {
    url.pathname = url.pathname.toLowerCase();
    needsRedirect = true;
  }

  // ── 5. Trailing slash для cross-host редиректов ──
  // Если уже редиректим (особенно на канон) — добавляем slash здесь,
  // чтобы избежать ещё одного хопа от nginx канона (trailingSlash: true).
  // Файлы с расширениями (.xml, .txt, .json, …) пропускаем.
  if (needsRedirect && !url.pathname.endsWith("/")) {
    const lastSegment = url.pathname.split("/").pop() || "";
    if (!lastSegment.includes(".")) {
      url.pathname = `${url.pathname}/`;
    }
  }

  if (needsRedirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Не запускать middleware для статических файлов, изображений и _next
export const config = {
  matcher: [
    /*
     * Совпадает со всеми путями, кроме:
     * - _next/static (статические файлы)
     * - _next/image (оптимизация изображений)
     * - favicon.ico, icon.svg, apple-touch-icon.png
     * - Файлы с расширениями (изображения, шрифты, sw.js и т.д.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|icon-512\\.png|icon-maskable\\.png|apple-touch-icon\\.png|sw\\.js|manifest\\.webmanifest|images/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|eot)).*)",
  ],
};
