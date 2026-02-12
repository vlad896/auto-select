import { type ReactNode } from "react";

// ============================================================
// Card variants — dark theme
// ============================================================

const cardVariants = {
  default:
    "bg-surface-100 border border-surface-200 shadow-sm hover:shadow-md hover:shadow-black/20",
  elevated:
    "bg-surface-100 border border-surface-200 shadow-md shadow-black/20 hover:shadow-lg",
  outlined:
    "bg-transparent border-2 border-surface-200 hover:border-primary-600/50",
  highlighted:
    "bg-primary-950/50 border-2 border-primary-600 shadow-md shadow-primary-600/10",
  dark:
    "bg-surface-950 text-white border border-surface-200",
} as const;

type CardVariant = keyof typeof cardVariants;

// ============================================================
// Card Component
// ============================================================

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  /** Optional padding override */
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article" | "li";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  children,
  variant = "default",
  className = "",
  padding = "md",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`rounded-2xl transition-all duration-200 ${cardVariants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </Tag>
  );
}

// ============================================================
// Card sub-components
// ============================================================

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-surface-200 ${className}`}>
      {children}
    </div>
  );
}
