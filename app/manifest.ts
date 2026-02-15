import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "АвтоПодбор в Минске — диагностика и проверка авто",
    short_name: "АвтоПодбор",
    description:
      "Профессиональный автоподбор и комплексная диагностика автомобилей перед покупкой в Минске. Launch X431, толщиномер, VIN-аудит.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0a0a0a",
    theme_color: "#dc2626",
    categories: ["auto", "business", "utilities"],
    lang: "ru",
    dir: "ltr",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/images/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
        form_factor: "wide",
        label: "Главная страница АвтоПодбор",
      },
    ],
    shortcuts: [
      {
        name: "Оставить заявку",
        short_name: "Заявка",
        url: "/#quiz",
        description: "Рассчитать стоимость автоподбора",
      },
      {
        name: "Подбор по маркам",
        short_name: "Марки",
        url: "/marki/",
        description: "BMW, VAG, Mercedes, Geely — профильная диагностика",
      },
      {
        name: "Диагностика",
        short_name: "Диагностика",
        url: "/diagnostika/",
        description: "Выездная диагностика автомобиля",
      },
    ],
  };
}
