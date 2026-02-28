"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const GAP_PX = 16; // gap-4

type HideDotsAbove = "sm" | "md" | "lg";

const HIDE_CLASS: Record<HideDotsAbove, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
};

interface CarouselWithDotsProps {
  children: React.ReactNode;
  count: number;
  scrollContainerClassName: string;
  hideDotsAbove?: HideDotsAbove;
}

export function CarouselWithDots({
  children,
  count,
  scrollContainerClassName,
  hideDotsAbove = "lg",
}: CarouselWithDotsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const step = el.offsetWidth + GAP_PX;
      el.scrollTo({ left: index * step, behavior: "smooth" });
      setActiveIndex(index);
    },
    []
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || count <= 1) return;

    const handleScroll = () => {
      const step = el.offsetWidth + GAP_PX;
      if (step <= 0) return;
      const index = Math.round(el.scrollLeft / step);
      setActiveIndex(Math.min(index, count - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [count]);

  return (
    <div>
      <div ref={scrollRef} className={scrollContainerClassName}>
        {children}
      </div>
      {/* Точки-индикаторы: показываем только когда карусель активна (ниже breakpoint) */}
      <div
        className={`mt-4 flex justify-center gap-2 ${HIDE_CLASS[hideDotsAbove]}`}
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
