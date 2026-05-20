"use client";

import { SHAPES } from "@/lib/productsDesignData";

interface ShapeFilterGridProps {
  value: string;
  onChange: (shape: string) => void;
}

export function ShapeFilterGrid({ value, onChange }: ShapeFilterGridProps) {
  return (
    <div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
        Shape
      </span>
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {SHAPES.map((s) => {
          const active = value === s.name;
          return (
            <button
              key={s.name}
              type="button"
              title={s.name}
              onClick={() => onChange(active ? "" : s.name)}
              className={`group relative flex aspect-square items-center justify-center rounded-lg border transition-all duration-200 ${
                active
                  ? "border-[#3c74ae] bg-[#e8f0f9] shadow-sm ring-2 ring-[#3c74ae]/30"
                  : "border-[#dde2e8] bg-white hover:border-[#3c74ae]/50 hover:bg-[#f5f7fa]"
              }`}
            >
              <svg
                viewBox="0 0 100 100"
                className={`h-7 w-7 transition-colors ${
                  active ? "text-[#3c74ae]" : "text-[#4a4a6a] group-hover:text-[#3c74ae]"
                }`}
              >
                <path
                  d={s.icon}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a1a2e] px-2 py-0.5 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {s.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
