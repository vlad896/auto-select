"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface OdometerProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

function OdometerDigit({
  digit,
  delay,
  duration,
}: {
  digit: number;
  delay: number;
  duration: number;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span className="relative inline-block h-[1em] w-[0.6em] overflow-hidden">
      <span
        className="absolute left-0 flex flex-col items-center transition-transform"
        style={{
          transitionDuration: `${duration}s`,
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transform: animate ? `translateY(-${digit}em)` : "translateY(0)",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="flex h-[1em] w-[0.6em] items-center justify-center"
            aria-hidden={n !== digit}
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Odometer({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !triggered) setTriggered(true);
  }, [isInView, triggered]);

  const digits = String(value).split("");

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`} aria-label={`${prefix}${value}${suffix}`}>
      {prefix && <span>{prefix}</span>}
      {triggered ? (
        digits.map((d, i) => (
          <OdometerDigit
            key={`${i}-${d}`}
            digit={parseInt(d, 10)}
            delay={i * 0.08}
            duration={duration}
          />
        ))
      ) : (
        <span className="invisible">{value}</span>
      )}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
