## ServiceWorker Setup

As part of CWV audit we suggest all websites to implement and utilize ServiceWorker setup.

1. In the application's JavaScript codebase (usually core/bundle) call `navigator.serviceWorker.register`, adjust path to `/sw.js` if necessary (*see code-block below*)
2. Create `sw.js` as static asset (*see example below*)

### Enable Service Worker

Enable service worker by calling `navigator.serviceWorker.register`:

```js
if ("serviceWorker" in navigator && window.isSecureContext) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => console.error("SW register failed:", err));
  });
}
```

### SW.js contents

Recommended default ServiceWorker source code will be provided by our team
