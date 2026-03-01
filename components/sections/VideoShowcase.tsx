"use client";

import { useState, useCallback } from "react";
import { Play, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CarouselWithDots } from "@/components/ui/CarouselWithDots";
import { VIDEO_SHOWCASE_ITEMS } from "@/lib/constants";

// ============================================================
// VideoShowcase — YouTube video grid with modal player
// ============================================================

type BottomLink = { href: string; label: string } | null;

type VideoShowcaseProps = {
  /** If null, bottom CTA is hidden. Default: { href: "/cases/", label: "Наши кейсы" } */
  bottomLink?: BottomLink;
  /** Use carousel layout on all screen sizes and always show dots. For use on /cases/ page. Default false. */
  alwaysCarousel?: boolean;
};

const DEFAULT_BOTTOM_LINK: BottomLink = { href: "/cases/", label: "Наши кейсы" };

export function VideoShowcase({ bottomLink = DEFAULT_BOTTOM_LINK, alwaysCarousel = false }: VideoShowcaseProps = {}) {
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
      className="section-padding overflow-x-hidden bg-surface-100"
      aria-labelledby="video-heading"
    >
      <Container>
        <SectionHeading
          label="Видео"
          subtitle="Смотрите, как мы проверяем автомобили для наших клиентов. Реальные выезды, реальные находки."
        >
          <span id="video-heading">Видеоподбор автомобилей</span>
        </SectionHeading>

        {/* Мобильная: карусель с точками снизу. sm+: сетка 2 колонки (или всегда карусель на /cases/). */}
        <CarouselWithDots
          count={VIDEO_SHOWCASE_ITEMS.length}
          hideDotsAbove={alwaysCarousel ? false : "sm"}
          showArrows={alwaysCarousel}
          scrollContainerClassName={
            alwaysCarousel
              ? "w-full min-w-0 max-w-full flex items-stretch gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-2 scrollbar-hide cursor-grab active:cursor-grabbing"
              : "w-full min-w-0 max-w-full flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:snap-none"
          }
        >
          {VIDEO_SHOWCASE_ITEMS.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => openVideo(video.id)}
              className={`group relative flex h-full min-w-[100%] max-w-full flex-shrink-0 snap-center cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-200/30 text-left transition-all duration-300 hover:border-primary-600/30 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 sm:min-w-0 sm:max-w-none sm:snap-align-none ${
                alwaysCarousel ? "min-w-[85%] max-w-[85%] sm:min-w-[70%] sm:max-w-[70%] md:min-w-[45%] md:max-w-[45%] self-stretch" : ""
              }`}
              aria-label={`Смотреть видео: ${video.title}`}
            >
              {/* Крупное превью сверху (16:9) */}
              <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-surface-200">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600/90 text-white shadow-lg shadow-primary-600/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500 sm:h-20 sm:w-20">
                    <Play
                      className="h-7 w-7 fill-white sm:h-8 sm:w-8"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              {/* Под превью: заголовок и описание */}
              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-base font-semibold text-white transition-colors group-hover:text-primary-400 sm:text-lg">
                  {video.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {video.description}
                </p>
              </div>
            </button>
          ))}
        </CarouselWithDots>

        {/* Instruction + опциональная ссылка */}
        <p className="mt-6 text-center text-xs text-neutral-400">
          Нажмите на видео, чтобы посмотреть полный процесс проверки
        </p>
        {bottomLink && (
          <div className="mt-6 flex justify-center">
            <Button href={bottomLink.href} variant="secondary" size="md">
              {bottomLink.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
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
