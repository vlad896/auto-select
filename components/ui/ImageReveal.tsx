"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ImageRevealProps {
  children: React.ReactNode;
  /** Direction the reveal comes from */
  direction?: "left" | "right" | "top" | "bottom";
  duration?: number;
  delay?: number;
  className?: string;
}

const clipPaths: Record<string, { hidden: string; visible: string }> = {
  left: {
    hidden: "inset(0 100% 0 0)",
    visible: "inset(0 0% 0 0)",
  },
  right: {
    hidden: "inset(0 0 0 100%)",
    visible: "inset(0 0 0 0%)",
  },
  top: {
    hidden: "inset(0 0 100% 0)",
    visible: "inset(0 0 0% 0)",
  },
  bottom: {
    hidden: "inset(100% 0 0 0)",
    visible: "inset(0% 0 0 0)",
  },
};

export function ImageReveal({
  children,
  direction = "left",
  duration = 0.8,
  delay = 0,
  className = "",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={`relative h-full w-full overflow-hidden ${className}`}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : { clipPath: clipPaths[direction].hidden }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
