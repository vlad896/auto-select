"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GAP_PX = 16; // gap-4

type HideDotsAbove = "sm" | "md" | "lg" | false;

const HIDE_CLASS: Record<Exclude<HideDotsAbove, false>, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
};

interface CarouselWithDotsProps {
  children: React.ReactNode;
  count: number;
  scrollContainerClassName: string;
  /** Breakpoint above which dots are hidden. Use false to always show dots. */
  hideDotsAbove?: HideDotsAbove;
  /** Show prev/next arrow buttons. */
  showArrows?: boolean;
}

export function CarouselWithDots({
  children,
  count,
  scrollContainerClassName,
  hideDotsAbove = "lg",
  showArrows = false,
}: CarouselWithDotsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const scrollTo = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const first = el.children[0] as HTMLElement | undefined;
      const step = first ? first.offsetWidth + GAP_PX : el.offsetWidth + GAP_PX;
      el.scrollTo({ left: index * step, behavior: "smooth" });
      setActiveIndex(Math.max(0, Math.min(index, count - 1)));
    },
    [count]
  );

  const goPrev = useCallback(() => scrollTo(activeIndex - 1), [activeIndex, scrollTo]);
  const goNext = useCallback(() => scrollTo(activeIndex + 1), [activeIndex, scrollTo]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || count <= 1) return;

    const handleScroll = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const step = first ? first.offsetWidth + GAP_PX : el.offsetWidth + GAP_PX;
      if (step <= 0) return;
      const index = Math.round(el.scrollLeft / step);
      setActiveIndex(Math.min(Math.max(0, index), count - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [count]);

  // Перетаскивание мышью
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = scrollRef.current?.scrollLeft ?? 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const dx = e.pageX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - dx;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < count - 1;

  return (
    <div className="relative">
      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Предыдущий слайд"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-900/90 text-white shadow-lg transition-all hover:bg-surface-800 hover:border-primary-500 disabled:pointer-events-none disabled:opacity-30 left-2 md:left-4 lg:h-12 lg:w-12"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Следующий слайд"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-900/90 text-white shadow-lg transition-all hover:bg-surface-800 hover:border-primary-500 disabled:pointer-events-none disabled:opacity-30 right-2 md:right-4 lg:h-12 lg:w-12"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        className={`${scrollContainerClassName} select-none`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        {children}
      </div>
      {/* Точки-индикаторы: показываем только когда карусель активна (ниже breakpoint), или всегда если hideDotsAbove === false */}
      <div
        className={`mt-4 flex justify-center gap-2 ${hideDotsAbove === false ? "" : HIDE_CLASS[hideDotsAbove]}`}
        role="tablist"
        aria-label="Слайды карусели"
      >
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Слайд ${i + 1}`}
            className={`rounded-full transition-all duration-200 ${
              i === activeIndex
                ? "h-2.5 w-2.5 bg-primary-500"
                : "h-2 w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
