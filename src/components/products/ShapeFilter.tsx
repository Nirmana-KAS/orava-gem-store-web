"use client";

import { SHAPES } from "@/lib/products/data";

interface ShapeFilterProps {
  value: string | null;
  onChange: (v: string | null) => void;
}

export function ShapeFilter({ value, onChange }: ShapeFilterProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Shape</span>
      <div className="flex flex-wrap gap-1.5">
        {SHAPES.map((s) => {
          const active = value === s.name;
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => onChange(active ? null : s.name)}
              className={`group relative grid h-9 w-9 place-items-center rounded-lg border bg-white p-1.5 transition-all
                ${active
                  ? "border-primary bg-primary text-white"
                  : "border-line text-navy-2 hover:scale-105 hover:border-primary hover:text-primary"}`}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full fill-current stroke-current stroke-[0.6]">
                <path d={s.icon} />
              </svg>
              <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-navy px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {s.name}
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-navy" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
