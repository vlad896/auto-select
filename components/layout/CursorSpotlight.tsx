"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Subtle spotlight effect that follows the cursor.
 * Desktop-only, hidden on touch devices.
 * Uses a radial gradient on a fixed div — GPU-composited.
 */
export function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const pos = useRef({ x: -200, y: -200 });

  const update = useCallback(() => {
    if (spotRef.current) {
      spotRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`;
    }
  }, []);

  useEffect(() => {
    // Only enable on non-touch, wide screens
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    if (!mq.matches) return;

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    if (spotRef.current) spotRef.current.style.opacity = "1";

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500 lg:block"
      style={{
        background:
          "radial-gradient(circle, rgba(220,38,38,0.04) 0%, rgba(220,38,38,0.01) 40%, transparent 70%)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
