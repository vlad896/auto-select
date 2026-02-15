"use client";

import { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Speed in seconds for one full cycle */
  speed?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  className?: string;
  /** Direction */
  reverse?: boolean;
}

export function Marquee({
  children,
  speed = 30,
  pauseOnHover = true,
  className = "",
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={`marquee-container overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`marquee-track flex w-max gap-8 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {/* Duplicate children for seamless loop */}
        <div className="flex shrink-0 gap-8">{children}</div>
        <div className="flex shrink-0 gap-8">{children}</div>
      </div>
    </div>
  );
}
