"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const YANDEX_METRIKA_ID = 107049640;
const TAG_SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";

declare global {
  interface Window {
    ym?: YmQueueFn;
    yandex_metrika_init?: boolean;
  }
}

type YmQueueFn = {
  (id: number, method: string, ...args: unknown[]): void;
  a?: unknown[];
  l?: number;
};

// ============================================================
// Yandex.Metrika — SPA: очередь ym, загрузка tag.js, init, hit при смене маршрута
// ============================================================

function ensureYmQueue() {
  if (typeof window === "undefined") return;
  const w = window as Window & { ym?: YmQueueFn };
  if (w.ym) return;
  const queue: YmQueueFn = function (id: number, method: string, ...args: unknown[]) {
    (queue.a = queue.a || []).push([id, method, ...args]);
  } as YmQueueFn;
  queue.a = [];
  queue.l = 1 * Date.now();
  w.ym = queue;
}

export function YandexMetrika() {
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    ensureYmQueue();

    // Не подгружать скрипт повторно
    for (let j = 0; j < document.scripts.length; j++) {
      if ((document.scripts[j] as HTMLScriptElement).src === TAG_SCRIPT_URL) return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = TAG_SCRIPT_URL;
    script.onload = () => {
      if (typeof window === "undefined" || window.ym == null || window.yandex_metrika_init) return;
      window.ym(YANDEX_METRIKA_ID, "init", {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        referrer: document.referrer || undefined,
        url: window.location.href,
        accurateTrackBounce: true,
        trackLinks: true,
      });
      window.yandex_metrika_init = true;
      initialized.current = true;
    };
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }, []);

  // При смене маршрута (SPA) отправляем hit с текущим URL
  useEffect(() => {
    if (typeof window === "undefined" || pathname == null) return;
    if (!initialized.current || window.ym == null) return;

    const fullUrl = window.location.origin + pathname + (window.location.search || "");
    window.ym(YANDEX_METRIKA_ID, "hit", fullUrl);
  }, [pathname]);

  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element -- Yandex Metrika noscript pixel; external 1x1 tracking, next/image not applicable */}
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}
