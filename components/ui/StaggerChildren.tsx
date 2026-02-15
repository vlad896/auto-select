"use client";

import { useRef, Children } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  duration = 0.45,
  className,
  as = "div",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={childVariants}
          transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {child}
        </motion.div>
      ))}
    </Component>
  );
}
