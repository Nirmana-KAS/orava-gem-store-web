"use client";

import { LayoutGrid, List, Rows3 } from "lucide-react";

export type ViewMode = "grid4" | "grid3" | "list";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { value: ViewMode; label: string; Icon: typeof LayoutGrid }[] = [
  { value: "grid4", label: "Compact grid", Icon: LayoutGrid },
  { value: "grid3", label: "Roomy grid", Icon: Rows3 },
  { value: "list", label: "List view", Icon: List },
];

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-[#dde2e8] bg-white p-0.5">
      {OPTIONS.map(({ value: v, label, Icon }) => (
        <button
          key={v}
          type="button"
          title={label}
          aria-label={label}
          onClick={() => onChange(v)}
          className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 ${
            value === v
              ? "bg-[#3c74ae] text-white shadow-sm"
              : "text-[#4a4a6a] hover:bg-[#f5f7fa]"
          }`}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
