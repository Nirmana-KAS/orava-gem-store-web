"use client";

import { COLOR_SWATCHES, shade } from "@/lib/products/data";

interface ColorFilterProps {
  value: string | null;
  onChange: (v: string | null) => void;
}

export function ColorFilter({ value, onChange }: ColorFilterProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Color</span>
      <div className="flex flex-wrap gap-2">
        {COLOR_SWATCHES.map((c) => {
          const active = value === c.name;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(active ? null : c.name)}
              className={`group relative h-[30px] w-[30px] rounded-full transition-transform hover:z-10 hover:scale-110
                ${active ? "outline outline-2 outline-offset-2 outline-primary" : ""}`}
              style={{
                background: `radial-gradient(circle at 35% 30%, ${shade(c.hex, 40)}, ${c.hex} 70%)`,
                boxShadow: "inset -3px -4px 8px rgba(0,0,0,.28), inset 3px 4px 6px rgba(255,255,255,.4)",
              }}
              aria-label={c.name}
            >
              <span
                className="pointer-events-none absolute left-[7px] top-[5px] h-1.5 w-2 rounded-full bg-white/70"
                style={{ filter: "blur(1px)" }}
              />
              <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 flex -translate-x-1/2 translate-y-1 flex-col items-center gap-px whitespace-nowrap rounded-lg bg-navy px-2.5 py-1.5 opacity-0 shadow-md transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <b className="text-[11px] font-semibold text-white">{c.name}</b>
                <span className="font-mono text-[10px] tracking-wider text-[#9dc4ed]">
                  {c.hex.toUpperCase()}
                </span>
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-[5px] border-transparent border-t-navy" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
