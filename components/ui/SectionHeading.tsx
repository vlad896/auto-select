import { type ReactNode } from "react";

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
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-500">
          {label}
        </p>
      )}
      <Tag className="text-balance">{children}</Tag>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
