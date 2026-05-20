"use client";

import { PRESETS, type PresetFilter } from "@/lib/productsDesignData";

interface PresetChipsProps {
  activeId: string | null;
  onApply: (id: string | null, filter: PresetFilter) => void;
}

export function PresetChips({ activeId, onApply }: PresetChipsProps) {
  return (
    <div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
        Quick Picks
      </span>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const active = activeId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() =>
                active ? onApply(null, {}) : onApply(p.id, p.filter)
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                active
                  ? "border-[#3c74ae] bg-[#3c74ae] text-white shadow-md shadow-[#3c74ae]/30"
                  : "border-[#dde2e8] bg-white text-[#4a4a6a] hover:border-[#3c74ae] hover:text-[#3c74ae]"
              }`}
            >
              <span aria-hidden>{p.emoji}</span>
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
