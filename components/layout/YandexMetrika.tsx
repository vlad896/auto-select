"use client";

import Script from "next/script";

// Код счётчика Яндекс.Метрики 107049640 — без изменений (как в интерфейсе Метрики)
const METRIKA_ID = 107049640;

export function YandexMetrika() {
  return (
    <>
      <Script
        id="yandex-metrika-tag"
        src={`https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="yandex-metrika-init" strategy="afterInteractive">
        {`
          window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
          window.ym.l = window.ym.l || Date.now();
          window.ym(${METRIKA_ID}, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: 'dataLayer',
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
