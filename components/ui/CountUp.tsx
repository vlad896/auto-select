"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  const hasStarted = useRef(false);

  const format = useCallback(
    (n: number) => {
      const fixed = n.toFixed(decimals);
      if (!separator) return `${prefix}${fixed}${suffix}`;
      const [int, dec] = fixed.split(".");
      const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return `${prefix}${dec ? `${formatted}.${dec}` : formatted}${suffix}`;
    },
    [prefix, suffix, decimals, separator],
  );

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const durationMs = duration * 1000;
    let start: number | null = null;
    let rafId: number;

    function tick(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      setValue(eased * end);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
