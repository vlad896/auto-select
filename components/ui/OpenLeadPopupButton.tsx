"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const OPEN_LEAD_POPUP_EVENT = "open-lead-popup";

type Props = {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** Кнопка, открывающая попап заявки (телефон + согласие на обработку данных). */
export function OpenLeadPopupButton({
  children = "Заказать проверку от экспертов",
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_LEAD_POPUP_EVENT))}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}
