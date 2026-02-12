import { type ReactNode } from "react";

const badgeVariants = {
  default: "bg-white/10 text-neutral-300",
  primary: "bg-primary-600/20 text-primary-400",
  success: "bg-green-500/15 text-green-400",
  danger: "bg-red-500/15 text-red-400",
  warning: "bg-amber-500/15 text-amber-400",
  accent: "bg-primary-600 text-white font-semibold",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

const badgeSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1 text-sm",
} as const;

type BadgeSize = keyof typeof badgeSizes;

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium leading-none ${badgeVariants[variant]} ${badgeSizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
