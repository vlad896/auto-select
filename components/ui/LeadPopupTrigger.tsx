"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";

const OPEN_LEAD_POPUP_EVENT = "open-lead-popup";

/** Кнопка «Срочный выезд на осмотр» — открывает попап заявки. Только клиентский островок. */
export function LeadPopupTrigger() {
  return (
    <MagneticButton>
      <Button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent(OPEN_LEAD_POPUP_EVENT))}
        variant="secondary"
        size="lg"
        fullWidthMobile
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Срочный выезд на осмотр
      </Button>
    </MagneticButton>
  );
}
