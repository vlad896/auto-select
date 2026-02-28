# Деплой на хостинг (Passenger + Nginx)

## 1. Перед загрузкой

- На сервере должен быть **Node.js 18+** (проверка: `node -v`).
- В корне проекта выполните локально: **`npm run build`** (папка `.next` должна попасть на хостинг).

## 2. Что запускает приложение

- Точка входа: **`server.js`**.
- Команда запуска: **`npm start`** (она вызывает `node server.js`).
- Passenger должен запускать именно эту команду из **корня проекта** (где лежат `package.json` и `server.js`).

## 3. Настройка Phusion Passenger

- В панели хостинга укажите:
  - **Тип приложения:** Node.js
  - **Стартовый файл:** `server.js` или команда: `npm start`
  - **Корень приложения:** каталог с `package.json` и `server.js`
- Файл **`Passengerfile.json`** в корне уже задаёт `startup_file: server.js` и `environment: production` — если хостинг его читает, этого достаточно.

## 4. Nginx (если настраиваете вручную)

- Пример конфига: **`nginx.conf.example`**.
- Замените `/path/to/your/auto/project` на реальный путь к проекту.
- Если используется только Passenger без своего proxy — оставьте только блок с `passenger_enabled on` и `passenger_startup_file server.js`.

## 5. Переменные окружения

- **`NODE_ENV=production`** — желательно задать на хостинге. Если не задана, приложение всё равно запускается в режиме production (режим dev только при явном `NODE_ENV=development`).
- **`PORT`** — Passenger обычно подставляет сам; если нет — задайте порт, на котором слушает приложение (например, 3000).

## 6. Ошибка «Web application could not be started»

- Проверьте лог Passenger (в панели или по пути из сообщения об ошибке). Частые причины:
  - не выполнен **`npm run build`** или папка `.next` не загружена;
  - на сервере старая версия Node (нужна 18+);
  - стартовый файл указан неверно — должен быть **`server.js`** или команда **`npm start`**;
  - приложение падает при старте — смотрите полный текст ошибки в логе.

## 7. WebSocket и консоль браузера (Lighthouse Best Practices)

- **`ws://localhost:8081`** — в production Next.js к этому адресу не подключается. Сообщение обычно даёт **расширение** (React DevTools и т.п.). На работу сайта не влияет.
- **`wss://ваш-домен/_next/webpack-hmr` failed (ERR_NAME_NOT_RESOLVED и т.п.)** — подключение к HMR (Hot Module Replacement) появляется только в режиме разработки (`next dev`). При запуске через `npm start` (production) этого кода в сборке нет. Если ошибка видна при проверке боевого сайта:
  - убедитесь, что на хостинге запускается именно **`npm start`** и задан **`NODE_ENV=production`** (или не задан — по умолчанию считается production);
  - если аудит запускали не на боевом URL, а на копии в dev — перезапустите проверку на продакшн-URL.
- **Missing source maps / SyntaxError "Not Found" is not valid JSON** — в проекте включены production source maps (`productionBrowserSourceMaps: true`). После нового деплоя с `npm run build` карты источников отдаются с сайта, предупреждение Lighthouse исчезает.
