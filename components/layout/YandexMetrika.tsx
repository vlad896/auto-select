"use client";

import { useEffect } from "react";

// Код счётчика Яндекс.Метрики 107049640 — без изменений (как в интерфейсе Метрики)
const METRIKA_SCRIPT = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107049640', 'ym');

ym(107049640, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export function YandexMetrika() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = METRIKA_SCRIPT;
    document.head.appendChild(script);
  }, []);

  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://mc.yandex.ru/watch/107049640"
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}
