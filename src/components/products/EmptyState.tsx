"use client";

import { Search } from "lucide-react";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="mx-auto my-10 max-w-xl px-8 py-16 text-center">
      <div className="relative mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-primary">
        <Search className="h-9 w-9" strokeWidth={1.5} />
        <span className="absolute -inset-2 animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed border-primary-soft" />
      </div>
      <h3 className="mb-2 font-serif text-[2rem] text-navy">No Gemstones Found</h3>
      <p className="mb-6 text-muted">Try adjusting your filters to see more results.</p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm text-navy-2 shadow-sm transition-all hover:border-primary hover:text-primary"
      >
        Clear all filters
      </button>
    </div>
  );
}
