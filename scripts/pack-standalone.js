/**
 * Собирает папку для загрузки на хостинг (standalone).
 * Запуск: npm run build && npm run pack-deploy
 * Результат: папка deploy/ — её целиком залить в root-main на сервере.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standaloneDir = path.join(root, ".next", "standalone");
const staticDir = path.join(root, ".next", "static");
const publicDir = path.join(root, "public");
const deployDir = path.join(root, "deploy");
const rootServerFile = path.join(root, "server.js");
const packageJsonFile = path.join(root, "package.json");
const passengerFile = path.join(root, "Passengerfile.json");
const rootFilesToCopy = [
  "package-lock.json",
  ".env.example",
  "next.config.mjs",
  "middleware.ts",
  "DEPLOY.md",
  "HOSTING.md",
  "nginx.conf.example",
  "README.md",
];

if (!fs.existsSync(standaloneDir)) {
  console.error("Сначала выполните: npm run build");
  process.exit(1);
}

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir, { recursive: true });

function copyRecursive(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

function copyFileIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(standaloneDir, deployDir);
copyRecursive(staticDir, path.join(deployDir, ".next", "static"));
if (fs.existsSync(publicDir)) {
  copyRecursive(publicDir, path.join(deployDir, "public"));
}
copyFileIfExists(rootServerFile, path.join(deployDir, "server.js"));
copyFileIfExists(packageJsonFile, path.join(deployDir, "package.json"));
copyFileIfExists(passengerFile, path.join(deployDir, "Passengerfile.json"));
for (const fileName of rootFilesToCopy) {
  copyFileIfExists(path.join(root, fileName), path.join(deployDir, fileName));
}

console.log("Готово: папка deploy/");
console.log("Заливайте содержимое deploy/ в корень приложения (root-main) на хостинге.");
console.log("В панели: корень приложения = root-main, файл запуска = server.js");
