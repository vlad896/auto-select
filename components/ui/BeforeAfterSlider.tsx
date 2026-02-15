"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  width: number;
  height: number;
  className?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "До проверки",
  afterLabel = "После проверки",
  width,
  height,
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const aspectRatio = `${width}/${height}`;

  return (
    <div
      ref={containerRef}
      className={`relative cursor-col-resize select-none overflow-hidden rounded-2xl border border-white/10 ${className}`}
      style={{ aspectRatio }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Сравнение до и после проверки"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      {/* After image (full, behind) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover"
        quality={75}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          width={width}
          height={height}
          className="h-full w-full object-cover"
          style={{ width: `${100 / (position / 100 || 1)}%`, maxWidth: "none" }}
          quality={75}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black/60 backdrop-blur-sm">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 10L3 7M3 7L6 4M3 7H9M14 10L17 7M17 7L14 4M17 7H11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0,3)"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 z-10 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 z-10 rounded-lg bg-primary-600/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  );
}
