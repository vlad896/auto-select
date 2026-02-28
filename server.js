const fs = require("fs");
const path = require("path");

// Пишем ошибки запуска в файл (чтобы посмотреть в cPanel File Manager)
function logStartupError(msg) {
  const logPath = path.join(__dirname, "startup.log");
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  try {
    fs.appendFileSync(logPath, line);
  } catch (_) {}
  console.error(msg);
}

try {
  const { createServer } = require("http");
  const { parse } = require("url");
  const next = require("next");

  const dev = process.env.NODE_ENV === "development";
  const port = parseInt(process.env.PORT, 10) || 3000;
  const hostname = "0.0.0.0";

  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, (err) => {
      if (err) {
        logStartupError("Listen error: " + err.message);
        process.exit(1);
      }
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  }).catch((err) => {
    logStartupError("app.prepare() failed: " + (err && err.message ? err.message : String(err)));
    if (err && err.stack) logStartupError(err.stack);
    process.exit(1);
  });
} catch (err) {
  logStartupError("Startup crash: " + (err && err.message ? err.message : String(err)));
  if (err && err.stack) logStartupError(err.stack);
  process.exit(1);
}
