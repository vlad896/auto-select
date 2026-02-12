import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";

// ============================================================
// Variant styles — dark theme
// ============================================================

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-500 focus-visible:ring-primary-500 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-500/30",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/15 focus-visible:ring-white/50",
  accent:
    "bg-primary-600 text-white hover:bg-primary-500 focus-visible:ring-primary-500 shadow-lg shadow-primary-600/30 font-semibold",
  ghost:
    "bg-transparent text-neutral-300 hover:bg-white/10 hover:text-white focus-visible:ring-white/30",
  danger:
    "bg-danger-600 text-white hover:bg-danger-700 focus-visible:ring-danger-600",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
} as const;

// ============================================================
// Types
// ============================================================

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Show full width on mobile, inline on desktop */
  fullWidthMobile?: boolean;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// ============================================================
// Component
// ============================================================

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  fullWidthMobile = false,
  ...props
}: ButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-medium",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950",
    "disabled:opacity-50 disabled:pointer-events-none",
    "cursor-pointer select-none",
    variants[variant],
    sizes[size],
    fullWidthMobile ? "w-full sm:w-auto" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render as <a> if href is provided
  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={baseClasses} {...rest}>
        {children}
      </a>
    );
  }

  // Default: render as <button>
  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={baseClasses} {...rest}>
      {children}
    </button>
  );
}
