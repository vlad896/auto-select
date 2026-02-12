"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

// ============================================================
// Table of Contents items (matching H2 ids on page)
// ============================================================

const TOC_ITEMS = [
  { id: "protocol", label: "Протокол глубокой проверки" },
  { id: "agregat", label: "ДВС, трансмиссия и навесное" },
  { id: "legal", label: "Юридический аудит" },
  { id: "hodovaya", label: "Ходовая и тормоза" },
  { id: "electro", label: "Электрооборудование" },
  { id: "cases", label: "Реальные кейсы" },
  { id: "checklist", label: "Чек-лист: 5 признаков" },
  { id: "order", label: "Как заказать" },
  { id: "pricing", label: "Стоимость в 2026 году" },
] as const;

// ============================================================
// Interactive TOC with scroll tracking
// ============================================================

export function DiagTableOfContents() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6"
      aria-label="Содержание статьи"
    >
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
        <List className="h-4 w-4" aria-hidden="true" />
        Содержание
      </div>
      <ol className="space-y-1.5">
        {TOC_ITEMS.map(({ id, label }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex items-baseline gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeId === id
                  ? "bg-primary-600/15 text-primary-400 font-medium"
                  : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
              }`}
            >
              <span className="shrink-0 text-xs text-neutral-600 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
