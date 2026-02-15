"use client";

import { useState, useCallback, useId, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

// ============================================================
// Single Accordion Item — dark theme
// ============================================================

interface AccordionItemProps {
  /** Question / trigger text */
  title: string;
  /** Answer / panel content */
  children: ReactNode;
  /** Controlled open state */
  isOpen: boolean;
  /** Toggle handler */
  onToggle: () => void;
  /** Unique id for ARIA */
  itemId: string;
}

function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
  itemId,
}: AccordionItemProps) {
  const triggerId = `accordion-trigger-${itemId}`;
  const panelId = `accordion-panel-${itemId}`;

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <h3 className="text-base sm:text-lg">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-white transition-colors hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 rounded-lg cursor-pointer"
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-primary-500" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm leading-relaxed text-neutral-400 sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Accordion Container
// ============================================================

interface AccordionProps {
  items: {
    title: string;
    content: ReactNode;
  }[];
  /** Allow multiple panels open simultaneously */
  allowMultiple?: boolean;
  /** Index of the item to open by default (-1 = none) */
  defaultOpen?: number;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = -1,
  className = "",
}: AccordionProps) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    defaultOpen >= 0 ? new Set([defaultOpen]) : new Set(),
  );

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndexes((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div className={`divide-y-0 ${className}`} role="region">
      {items.map((item, index) => (
        <AccordionItem
          key={`${baseId}-${index}`}
          itemId={`${baseId}-${index}`}
          title={item.title}
          isOpen={openIndexes.has(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
