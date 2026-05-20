"use client";

import { useCallback } from "react";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
  format?: (n: number) => string;
}

export function RangeSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format = (n) => String(n),
}: RangeSliderProps) {
  const [lo, hi] = value;
  const pct = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max],
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
          {label}
        </span>
        <span className="text-xs text-[#8f8b8f]">
          <span className="text-[#3c74ae] font-semibold">{format(lo)}</span>
          {" – "}
          <span className="text-[#3c74ae] font-semibold">{format(hi)}</span>
        </span>
      </div>

      <div className="relative h-8 select-none">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#dde2e8]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#3c74ae]"
          style={{
            left: `${pct(lo)}%`,
            width: `${Math.max(0, pct(hi) - pct(lo))}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v <= hi) onChange([v, hi]);
          }}
          className="range-thumb absolute inset-0 h-full w-full appearance-none bg-transparent"
          style={{ zIndex: 2 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= lo) onChange([lo, v]);
          }}
          className="range-thumb absolute inset-0 h-full w-full appearance-none bg-transparent"
          style={{ zIndex: 3 }}
        />
      </div>

      <style jsx>{`
        .range-thumb {
          pointer-events: none;
        }
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #3c74ae;
          box-shadow: 0 2px 6px rgba(60, 116, 174, 0.35);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #3c74ae;
          box-shadow: 0 2px 6px rgba(60, 116, 174, 0.35);
          cursor: pointer;
        }
        .range-thumb::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
