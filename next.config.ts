import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Trailing slash: /podbor → 308 → /podbor/ (убирает дубли) ──
  trailingSlash: true,

  // ── Critical CSS inlining: инлайнит above-the-fold CSS в HTML,
  //    остальное загружается асинхронно (убирает render-blocking) ──
  experimental: {
    optimizeCss: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1536],
  },

  // ── Redirects: зеркала и нормализация ──
  redirects: async () => [
    // www → non-www (301 permanent)
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.автоподборминск.бел" }],
      destination: "https://автоподборминск.бел/:path*",
      permanent: true,
    },
    // Punycode www → non-www (для DNS, которые резолвят IDN в punycode)
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "www.xn--80aafgkdcbpkjhgmfcdo6o.xn--d1acj3b",
        },
      ],
      destination: "https://автоподборминск.бел/:path*",
      permanent: true,
    },
  ],

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value:
            "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: blob: https: http:",
            "font-src 'self' https://fonts.gstatic.com",
            "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
            "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com",
            "media-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
