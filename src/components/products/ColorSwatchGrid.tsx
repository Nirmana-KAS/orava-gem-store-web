"use client";

import { Check } from "lucide-react";
import { COLOR_SWATCHES, shadeHex } from "@/lib/productsDesignData";

interface ColorSwatchGridProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorSwatchGrid({ value, onChange }: ColorSwatchGridProps) {
  return (
    <div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
        Color
      </span>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-9">
        {COLOR_SWATCHES.map((c) => {
          const active = value === c.name;
          const isLight = ["#e9eef5", "#f3e7d1", "#7cc7a3"].includes(c.hex);
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(active ? "" : c.name)}
              className={`group relative flex aspect-square items-center justify-center rounded-full transition-all duration-200 ${
                active
                  ? "ring-2 ring-[#3c74ae] ring-offset-2"
                  : "hover:scale-110"
              }`}
              style={{
                background: `radial-gradient(circle at 35% 30%, ${shadeHex(
                  c.hex,
                  40,
                )}, ${c.hex} 70%, ${shadeHex(c.hex, -30)})`,
                boxShadow:
                  "inset -2px -2px 4px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)",
              }}
              title={`${c.name} • ${c.hex.toUpperCase()}`}
            >
              {active ? (
                <Check
                  size={14}
                  className={isLight ? "text-[#1a1a2e]" : "text-white"}
                  strokeWidth={3}
                />
              ) : null}
              <span className="pointer-events-none absolute -bottom-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a1a2e] px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <b>{c.name}</b>{" "}
                <span className="text-white/60">{c.hex.toUpperCase()}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
