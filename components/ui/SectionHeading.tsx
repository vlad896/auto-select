import { type ReactNode } from "react";
import { AnimateOnScroll } from "./AnimateOnScroll";

interface SectionHeadingProps {
  /** The heading text or JSX */
  children: ReactNode;
  /** Optional subtitle below heading */
  subtitle?: string;
  /** Heading level (defaults to h2) */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Text alignment */
  align?: "left" | "center";
  /** Optional small label above heading */
  label?: string;
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  as: Tag = "h2",
  align = "center",
  label,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-10 sm:mb-12 lg:mb-14 ${alignClass} ${className}`}>
      {label && (
        <AnimateOnScroll variant="fadeIn" duration={0.4}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-500">
            {label}
          </p>
        </AnimateOnScroll>
      )}
      <AnimateOnScroll variant="fadeUp" delay={label ? 0.1 : 0} duration={0.5}>
        <Tag className="text-balance">{children}</Tag>
      </AnimateOnScroll>
      {subtitle && (
        <AnimateOnScroll variant="fadeUp" delay={label ? 0.2 : 0.1} duration={0.5}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg mx-auto">
            {subtitle}
          </p>
        </AnimateOnScroll>
      )}
    </div>
  );
}
