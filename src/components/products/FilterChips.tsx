"use client";

import { X } from "lucide-react";

export interface ActiveChip {
  key: string;
  label: string;
  clear: () => void;
}

export function FilterChips({
  chips,
  onClearAll,
}: {
  chips: ActiveChip[];
  onClearAll: () => void;
}) {
  if (chips.length === 0) return null;
  return (
    <div className="mt-3.5 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[11px] font-medium uppercase tracking-wider text-muted">Active</span>
      {chips.map((c) => (
        <span
          key={c.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary-soft bg-primary-soft py-1 pl-3 pr-1 text-xs font-medium text-primary"
        >
          {c.label}
          <button
            type="button"
            onClick={c.clear}
            className="grid h-5 w-5 place-items-center rounded-full text-primary hover:bg-primary/15"
            aria-label={`Remove ${c.label}`}
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="rounded px-2.5 py-1 text-xs text-muted hover:bg-primary-softer hover:text-primary"
      >
        Clear all
      </button>
    </div>
  );
}
