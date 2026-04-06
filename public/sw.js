;(function (self) {
  "use strict";

  const CACHE_NAME = "autopodborminsk_sw_v2";
  const PRECACHE = [
    "/",
    "/offline",
    "/manifest.webmanifest",
    "/icon.svg",
    "/icon-512.png",
    "/icon-maskable.png",
    "/apple-touch-icon.png",
    "/images/og-image.jpg",
  ];
  const EVERGREEN = ["/manifest.webmanifest"];
  const PASSTHROUGH = ["/sw.js"];
  const STATIC = [
    ".png",
    ".jpg",
    ".jpeg",
    ".ico",
    ".css",
    ".js",
    ".gif",
    ".webm",
    ".webp",
    ".eot",
    ".svg",
    ".ttf",
    ".webmanifest",
    ".woff",
    ".woff2",
  ];

  const origin = self.location.origin;

  const DEFAULT_RESPONSES = {
    image: new Response('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>', {
      status: 200,
      headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-store" },
    }),
    style: new Response("", {
      status: 200,
      headers: { "Content-Type": "text/css; charset=utf-8", "Cache-Control": "no-store" },
    }),
    script: new Response("", {
      status: 504,
      statusText: "Gateway Timeout",
      headers: { "Content-Type": "application/javascript", "Cache-Control": "no-store" },
    }),
    fetch: new Response(JSON.stringify({ error: { offline: true } }), {
      status: 503,
      statusText: "Service Unavailable",
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    }),
    generic: new Response("", {
      status: 504,
      statusText: "Gateway Timeout",
      headers: { "Content-Type": "application/octet-stream", "Cache-Control": "no-store" },
    }),
  };

  const logMessage = function () {
    var args = Array.prototype.slice.call(arguments);
    console.log.apply(console, ["[SW]"].concat(args));
  };

  const isNetworkError = function (error) {
    if (!error) return false;
    if (error.name === "TypeError" || error.name === "AbortError") return true;

    const msg = String(error.message || error);
    if (!msg) return false;
    if (msg.includes("Failed to fetch")) return true;
    if (msg.includes("NetworkError")) return true;
    if (msg.includes("The network connection was lost")) return true;
    return false;
  };

  const offlineAssetFallback = function (req) {
    const defaultResponse = DEFAULT_RESPONSES[req.destination];
    if (defaultResponse) return defaultResponse.clone();
    if ((req.headers.get("Accept") || "").includes("application/json")) return DEFAULT_RESPONSES.fetch.clone();
    return DEFAULT_RESPONSES.generic.clone();
  };

  const offlineResponse = new Response(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Офлайн</title></head><body><h1>Сервис временно недоступен</h1><p>Похоже, что вы офлайн или соединение нестабильно. Попробуйте <a href="#" onclick="window.location.reload()">обновить страницу</a>.</p><p>Если страница не загружается, очистите кэш браузера в DevTools:</p><ol><li>Откройте DevTools (правой кнопкой мыши → Inspect).</li><li>Перейдите на вкладку Application.</li><li>Нажмите кнопку Clear site data.</li></ol><p>Приносим извинения за неудобства.</p></body></html>',
    {
      status: 503,
      statusText: "Service Unavailable",
      headers: new Headers({
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      }),
    }
  );

  const exceptionHandler = function (req, error, isStatic) {
    logMessage("[exceptionHandler] Network Error:", error);
    if (isStatic) return offlineAssetFallback(req);
    return offlineResponse.clone();
  };

  const fetchWithTimeout = function (req, opts, timeout) {
    const options = opts || {};
    const ttl = typeof timeout === "number" ? timeout : 10000;
    const controller = new AbortController();
    const timerId = setTimeout(function () {
      controller.abort();
    }, ttl);
    return fetch(req, Object.assign({}, options, { signal: controller.signal })).finally(function () {
      clearTimeout(timerId);
    });
  };

  const cacheOrException = async function (req, error, isStatic) {
    if (req.mode === "navigate") {
      let cached = null;
      try {
        const cache = await caches.open(CACHE_NAME);
        cached = await cache.match("/", { ignoreSearch: true });
      } catch (cacheError) {
        logMessage("[cacheOrException] cacheError:", req.url, cacheError);
      }
      return cached || exceptionHandler(req, error, isStatic);
    }
    return exceptionHandler(req, error, isStatic);
  };

  const shouldRevalidate = function (req, url) {
    if (req.mode === "navigate" || req.mode === "cors") return true;
    for (const path of EVERGREEN) {
      if (url.pathname.startsWith(path)) return true;
    }
    return false;
  };

  const checkPassThroughRequest = function (req, url) {
    if (req.method !== "GET") return true;
    if (req.mode === "navigate") return false;
    if (req.cache === "only-if-cached" && req.mode !== "same-origin") return true;
    if (req.headers.has("Range")) return true;

    for (const path of PASSTHROUGH) {
      if (url.pathname.startsWith(path)) return true;
    }
    return false;
  };

  const checkOrigin = function (url) {
    return url.origin === origin;
  };

  const checkStatic = function (req, url) {
    if (req.destination === "document") return false;
    for (const ext of STATIC) {
      if (url.pathname.endsWith(ext)) return true;
    }
    return false;
  };

  const getFreshOrCached = async function (event, url, isStatic) {
    let cache = null;
    let cached = null;
    try {
      cache = await caches.open(CACHE_NAME);
      cached = await cache.match(event.request);
    } catch (cacheError) {
      logMessage("[getFreshOrCached] cacheError:", event.request.url, cacheError);
    }

    const willRevalidate = shouldRevalidate(event.request, url);
    const fresh = (async function () {
      try {
        const response = await fetchWithTimeout(
          event.request,
          willRevalidate ? { cache: "no-cache" } : {},
          20000
        );

        if (
          cache &&
          response &&
          response.ok &&
          response.status === 200 &&
          (response.type === "basic" || event.request.mode === "navigate" || response.type === "cors")
        ) {
          const cacheControl = (response.headers.get("Cache-Control") || "").toLowerCase();
          if (!cacheControl.includes("no-store")) {
            event.waitUntil(
              cache.put(event.request, response.clone()).catch(function (err) {
                logMessage("[getFreshOrCached] [fetch] [cache.put] Cache update failed:", err);
              })
            );
          }
        }
        return response;
      } catch (err) {
        if (!isNetworkError(err)) {
          logMessage("[getFreshOrCached] [fresh] [fetch] [bypass] Internal SW error, bypassing offline logic");
          try {
            return await fetchWithTimeout(event.request);
          } catch (networkError) {
            logMessage("[getFreshOrCached] [fresh] [fetch] [bypass] Network also failed:", event.request.url, networkError);
          }
        }
        logMessage("[getFreshOrCached] [fresh] [fetch] ERROR:", event.request.url, err);
        return cacheOrException(event.request, "Error fetching fresh: " + event.request.url, isStatic);
      }
    })();

    if (cached) {
      if (willRevalidate) event.waitUntil(fresh);
      return cached;
    }

    return (await fresh) || cacheOrException(event.request, "can't reach a server: " + event.request.url, isStatic);
  };

  self.addEventListener("install", function (event) {
    event.waitUntil(
      (async function () {
        const cache = await caches.open(CACHE_NAME);
        if (cache) {
          await Promise.all(
            PRECACHE.map(function (url) {
              return cache
                .add(new Request(url, { cache: "reload" }))
                .catch(function (err) {
                  logMessage("[install] [cache.add] Failed to pre-cache", url, err);
                });
            })
          );
        }
        await self.skipWaiting();
      })()
    );
  });

  self.addEventListener("fetch", function (event) {
    if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") return;

    const url = new URL(event.request.url);
    if (event.request.mode === "navigate") {
      event.respondWith(
        (async function () {
          if ("preloadResponse" in event && event.preloadResponse) {
            try {
              const preload = await Promise.race([
                event.preloadResponse,
                new Promise(function (resolve) {
                  setTimeout(function () {
                    resolve(false);
                  }, 5000);
                }),
              ]);
              if (preload) return preload;
            } catch (preloadResponseError) {
              logMessage("[fetch] [navigate] [preloadResponse] preloadResponseError:", preloadResponseError);
            }
          }

          try {
            return Promise.resolve(getFreshOrCached(event, url, false)).catch(function (err) {
              logMessage("[fetch] [navigate] [respondWith] [getFreshOrCached] ERROR:", err);
              return offlineAssetFallback(event.request);
            });
          } catch (err) {
            logMessage("[fetch] [preload/fetch] Error:", err);
            return cacheOrException(event.request, "Error fetching fresh: " + event.request.url, false);
          }
        })()
      );
      return;
    }

    if (!checkOrigin(url) || checkPassThroughRequest(event.request, url)) return;

    if (checkStatic(event.request, url)) {
      event.respondWith(
        Promise.resolve(getFreshOrCached(event, url, true)).catch(function (err) {
          logMessage("[fetch] [isStatic] [respondWith] [getFreshOrCached] ERROR:", err);
          return offlineAssetFallback(event.request);
        })
      );
    }
  });

  self.addEventListener("activate", function (event) {
    event.waitUntil(
      (async function () {
        if ("navigationPreload" in self.registration) {
          try {
            await self.registration.navigationPreload.enable();
          } catch (err) {
            logMessage("[activate] [navigationPreload.enable] Error:", err);
          }
        }

        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(function (cacheName) {
              return CACHE_NAME !== cacheName;
            })
            .map(async function (cacheName) {
              try {
                return await caches.delete(cacheName);
              } catch (err) {
                return logMessage("[activate] [caches.delete] Failed to delete cache by key", cacheName, err);
              }
            })
        );

        await self.clients.claim();
      })()
    );
  });
})(self);
