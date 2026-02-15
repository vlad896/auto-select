"use client";

import { useRef, Children, isValidElement } from "react";
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

/**
 * StaggerChildren — cascading entrance animation for child elements.
 *
 * When `as` is "ol" or "ul", children are NOT wrapped in an extra <div>.
 * Instead, framer-motion variants are spread directly onto each <li> child
 * to preserve valid <ol>/<ul> → <li> DOM structure (accessibility).
 *
 * For "div" / "section" containers, each child is wrapped in <motion.div>.
 */
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

  const isList = as === "ol" || as === "ul";

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
      {isList
        ? /* List mode: render <motion.li> directly to keep valid ol/ul → li */
          Children.map(children, (child) => {
            // Extract className and other props from the original <li>
            const props = isValidElement(child) ? child.props : {};
            const { className: childClass, children: grandChildren, ...rest } =
              props as Record<string, unknown>;
            return (
              <motion.li
                variants={childVariants}
                transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={childClass as string | undefined}
                {...rest}
              >
                {grandChildren as React.ReactNode}
              </motion.li>
            );
          })
        : /* Default mode: wrap each child in <motion.div> */
          Children.map(children, (child) => (
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
