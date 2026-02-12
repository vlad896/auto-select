"use client";

import { useState, useCallback } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// ============================================================
// Video data — replace YouTube IDs with your real videos
// ============================================================

const VIDEOS = [
  {
    id: "VIDEO_ID_1",
    title: "Подбор BMW 5 G30 — полная проверка",
    description: "Пример выездной диагностики BMW 530d из Европы. Выявили скрученный пробег и шпатлёвку.",
    thumbnail: "/images/case-bmw-real.jpg",
  },
  {
    id: "VIDEO_ID_2",
    title: "Как мы проверяем ЛКП толщиномером",
    description: "Подробный обзор процесса замера толщины лакокрасочного покрытия.",
    thumbnail: "/images/tools-diagnostic.jpg",
  },
  {
    id: "VIDEO_ID_3",
    title: "Подбор VW Tiguan — аргументированный торг",
    description: "Кейс: нашли задиры цилиндров и сторговали $1 200 для клиента.",
    thumbnail: "/images/case-tiguan-real.jpg",
  },
  {
    id: "VIDEO_ID_4",
    title: "Оборудование для диагностики авто",
    description: "Обзор нашего профессионального оборудования: Launch X431, Etari, эндоскоп.",
    thumbnail: "/images/tools-equipment.jpg",
  },
] as const;

// ============================================================
// VideoShowcase — YouTube video grid with modal player
// ============================================================

export function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const openVideo = useCallback((videoId: string) => {
    setActiveVideo(videoId);
    document.body.style.overflow = "hidden";
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section
      id="video"
      className="section-padding bg-surface-100"
      aria-labelledby="video-heading"
    >
      <Container>
        <SectionHeading
          label="Видео"
          subtitle="Смотрите, как мы проверяем автомобили для наших клиентов. Реальные выезды, реальные находки."
        >
          <span id="video-heading">Видеоподбор автомобилей</span>
        </SectionHeading>

        {/* Video grid — 2x2 on desktop, 1 column on mobile */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {VIDEOS.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => openVideo(video.id)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface-200/30 text-left transition-all duration-300 hover:border-primary-600/30 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950"
              aria-label={`Смотреть видео: ${video.title}`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600/90 text-white shadow-lg shadow-primary-600/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500 sm:h-20 sm:w-20">
                    <Play
                      className="h-7 w-7 fill-white sm:h-8 sm:w-8"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Video info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-semibold text-white transition-colors group-hover:text-primary-400 sm:text-lg">
                  {video.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                  {video.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Instruction */}
        <p className="mt-6 text-center text-xs text-neutral-600">
          Нажмите на видео, чтобы посмотреть полный процесс проверки
        </p>
      </Container>

      {/* ===== Video Modal ===== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeVideo}
          role="dialog"
          aria-modal="true"
          aria-label="Видеоплеер"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeVideo}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            aria-label="Закрыть видео"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* YouTube iframe */}
          <div
            className="w-full max-w-4xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="Видео автоподбора"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
