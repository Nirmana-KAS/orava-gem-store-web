"use client";

import { BIRTHSTONES } from "@/lib/productsDesignData";

interface BirthstoneStripProps {
  activeStone: string;
  onPick: (stoneName: string) => void;
}

const CURRENT_MONTH_INDEX = new Date().getMonth();

export function BirthstoneStrip({ activeStone, onPick }: BirthstoneStripProps) {
  const currentMonth = BIRTHSTONES[CURRENT_MONTH_INDEX]?.m;

  return (
    <div className="rounded-2xl border border-[#dde2e8] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
          Shop by Birthstone
        </span>
        {activeStone ? (
          <button
            type="button"
            onClick={() => onPick("")}
            className="text-[10px] font-semibold text-[#3c74ae] hover:underline"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {BIRTHSTONES.map((b) => {
          const isActive = activeStone === b.name;
          const isCurrent = !activeStone && b.m === currentMonth;
          return (
            <button
              key={b.m}
              type="button"
              onClick={() => onPick(isActive ? "" : b.name)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all duration-200 ${
                isActive
                  ? "border-[#3c74ae] bg-[#3c74ae] text-white shadow-md shadow-[#3c74ae]/30"
                  : isCurrent
                  ? "border-[#3c74ae]/60 bg-[#e8f0f9] text-[#1a1a2e]"
                  : "border-[#dde2e8] bg-white text-[#4a4a6a] hover:border-[#3c74ae]/50"
              }`}
            >
              <span
                className="h-2 w-2 flex-shrink-0 rounded-full border border-white/40 shadow-sm"
                style={{ background: b.color }}
              />
              <b className="font-semibold">{b.m}</b>
              <span className={isActive ? "text-white/80" : "text-[#8f8b8f]"}>
                · {b.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
