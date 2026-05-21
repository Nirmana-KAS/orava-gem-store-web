"use client";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  format: (v: number) => string;
}

export function RangeSlider({ label, min, max, step, value, onChange, format }: RangeSliderProps) {
  const [lo, hi] = value;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</span>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-navy">
          <span>min <b className="font-semibold text-primary">{format(lo)}</b></span>
          <span>max <b className="font-semibold text-primary">{format(hi)}</b></span>
        </div>
        <div className="relative mt-1 h-1 rounded-full bg-line">
          <div
            className="absolute inset-y-0 rounded-full bg-primary"
            style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
          />
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-primary bg-white shadow-sm"
            style={{ left: `${pct(lo)}%` }}
          />
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-primary bg-white shadow-sm"
            style={{ left: `${pct(hi)}%` }}
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
            className="absolute -inset-y-2 left-0 right-0 z-[2] w-full cursor-pointer appearance-none bg-transparent opacity-0"
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
            className="absolute -inset-y-2 left-0 right-0 z-[3] w-full cursor-pointer appearance-none bg-transparent opacity-0"
          />
        </div>
      </div>
    </div>
  );
}
