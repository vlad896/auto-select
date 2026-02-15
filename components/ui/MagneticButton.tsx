"use client";

import { useRef, useState, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  /** Magnetic pull strength in px (default 8) */
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 8,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTransform({ x: dx * strength, y: dy * strength });
    },
    [strength],
  );

  const handlePointerLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
      }}
    >
      {children}
    </div>
  );
}
