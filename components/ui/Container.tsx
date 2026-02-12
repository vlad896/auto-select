import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** HTML element to render (defaults to div) */
  as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav";
  /** Optional id for anchor links */
  id?: string;
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
