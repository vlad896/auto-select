"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface TextHighlightProps {
  children: React.ReactNode;
  /** Highlight color */
  color?: "red" | "amber" | "green";
  /** Animation type */
  variant?: "underline" | "marker" | "glow";
  className?: string;
}

const colorMap = {
  red: {
    underline: "after:bg-primary-500",
    marker: "bg-primary-500/20",
    glow: "text-primary-400 drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]",
  },
  amber: {
    underline: "after:bg-amber-500",
    marker: "bg-amber-500/20",
    glow: "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]",
  },
  green: {
    underline: "after:bg-emerald-500",
    marker: "bg-emerald-500/20",
    glow: "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]",
  },
};

export function TextHighlight({
  children,
  color = "red",
  variant = "underline",
  className = "",
}: TextHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  if (variant === "underline") {
    return (
      <span
        ref={ref}
        className={`relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-700 after:ease-out ${colorMap[color].underline} ${isInView ? "after:w-full" : "after:w-0"} ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === "marker") {
    return (
      <span
        ref={ref}
        className={`inline-block rounded-sm px-1 transition-all duration-700 ease-out ${isInView ? colorMap[color].marker : "bg-transparent"} ${className}`}
      >
        {children}
      </span>
    );
  }

  // glow
  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-700 ease-out ${isInView ? colorMap[color].glow : "text-inherit"} ${className}`}
    >
      {children}
    </span>
  );
}
