"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  /** Parallax intensity: how many px to shift (default 60) */
  offset?: number;
  className?: string;
}

export function Parallax({
  children,
  offset = 60,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
