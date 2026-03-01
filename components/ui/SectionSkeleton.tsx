"use client";

/**
 * Минимальный скелетон секции для dynamic() — уменьшает CLS при медленной загрузке.
 */
export function SectionSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-white/5 bg-surface-200/30"
      style={{ minHeight: 200 }}
      aria-hidden
    >
      <div className="flex h-full min-h-[200px] flex-col p-6">
        <div className="mb-4 h-6 w-3/4 max-w-sm rounded-lg bg-white/10" />
        <div className="mb-2 h-4 w-full max-w-md rounded bg-white/5" />
        <div className="h-4 w-full max-w-lg rounded bg-white/5" />
      </div>
    </div>
  );
}
