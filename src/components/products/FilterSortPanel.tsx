"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { SmartDropdown } from "@/components/ui/SmartDropdown";
import { ShapeFilterGrid } from "./ShapeFilterGrid";
import { ColorSwatchGrid } from "./ColorSwatchGrid";
import { RangeSlider } from "./RangeSlider";
import { PresetChips } from "./PresetChips";
import { ViewToggle, type ViewMode } from "./ViewToggle";
import type { PresetFilter } from "@/lib/productsDesignData";

export const WEIGHT_BOUNDS: [number, number] = [0, 10];
export const PRICE_BOUNDS: [number, number] = [0, 15000];
export const DIM_BOUNDS: [number, number] = [0, 30];

export interface DimensionState {
  length: [number, number];
  width: [number, number];
  height: [number, number];
}

export const DEFAULT_DIMENSIONS: DimensionState = {
  length: [DIM_BOUNDS[0], DIM_BOUNDS[1]],
  width: [DIM_BOUNDS[0], DIM_BOUNDS[1]],
  height: [DIM_BOUNDS[0], DIM_BOUNDS[1]],
};

export interface FilterState {
  name: string;
  origin: string;
  shape: string;
  colorName: string;
  size: string;
  clarityType: string;
  condition: string;
  availability: string;
  sortBy: string;
  weightMin: number;
  weightMax: number;
  priceMin: number;
  priceMax: number;
  presetId: string | null;
}

export const DEFAULT_FILTERS: FilterState = {
  name: "",
  origin: "",
  shape: "",
  colorName: "",
  size: "",
  clarityType: "",
  condition: "",
  availability: "all",
  sortBy: "latest",
  weightMin: WEIGHT_BOUNDS[0],
  weightMax: WEIGHT_BOUNDS[1],
  priceMin: PRICE_BOUNDS[0],
  priceMax: PRICE_BOUNDS[1],
  presetId: null,
};

interface FilterSortPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  dimensions: DimensionState;
  onDimensionsChange: (next: DimensionState) => void;
}

const SORT_OPTIONS = [
  { value: "latest", label: "Latest Added" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "weight_asc", label: "Weight: Low to High" },
  { value: "weight_desc", label: "Weight: High to Low" },
  { value: "lot_asc", label: "Lot Qty: Min to Max" },
  { value: "lot_desc", label: "Lot Qty: Max to Min" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
];

function countActiveFilters(f: FilterState): number {
  let n = 0;
  if (f.name) n++;
  if (f.origin) n++;
  if (f.shape) n++;
  if (f.colorName) n++;
  if (f.size) n++;
  if (f.clarityType) n++;
  if (f.condition) n++;
  if (f.availability !== "all" && f.availability !== "") n++;
  if (f.weightMin > WEIGHT_BOUNDS[0] || f.weightMax < WEIGHT_BOUNDS[1]) n++;
  if (f.priceMin > PRICE_BOUNDS[0] || f.priceMax < PRICE_BOUNDS[1]) n++;
  return n;
}

export function FilterSortPanel({
  filters,
  onFilterChange,
  totalCount,
  viewMode,
  onViewModeChange,
  dimensions,
  onDimensionsChange,
}: FilterSortPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeFiltersCount = useMemo(
    () => countActiveFilters(filters),
    [filters],
  );

  // Lock body scroll while the mobile filter sheet is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onFilterChange({ ...filters, [key]: value, presetId: null });
  }

  function updateWeight(next: [number, number]) {
    onFilterChange({
      ...filters,
      weightMin: next[0],
      weightMax: next[1],
      presetId: null,
    });
  }

  function updatePrice(next: [number, number]) {
    onFilterChange({
      ...filters,
      priceMin: next[0],
      priceMax: next[1],
      presetId: null,
    });
  }

  function applyPreset(id: string | null, p: PresetFilter) {
    onFilterChange({
      ...DEFAULT_FILTERS,
      sortBy: filters.sortBy,
      availability: filters.availability,
      name: p.name ?? "",
      origin: p.origin ?? "",
      shape: p.shape ?? "",
      colorName: p.colorName ?? "",
      condition: p.condition ?? "",
      weightMin: p.weightMin ?? WEIGHT_BOUNDS[0],
      weightMax: p.weightMax ?? WEIGHT_BOUNDS[1],
      priceMin: p.priceMin ?? PRICE_BOUNDS[0],
      priceMax: p.priceMax ?? PRICE_BOUNDS[1],
      presetId: id,
    });
  }

  function clearAllFilters() {
    onFilterChange({ ...DEFAULT_FILTERS, sortBy: filters.sortBy });
    onDimensionsChange(DEFAULT_DIMENSIONS);
  }

  /* ----- Filter sections shared between desktop and mobile sheet ----- */
  const FilterSections = (
    <div className="space-y-6">
      <PresetChips activeId={filters.presetId} onApply={applyPreset} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SmartDropdown
          fieldType="gemName"
          label="Gemstone"
          value={filters.name}
          onChange={(val) => update("name", val)}
          placeholder="All Gemstones"
          showAllOption
          readOnly
        />
        <SmartDropdown
          fieldType="origin"
          label="Origin"
          value={filters.origin}
          onChange={(val) => update("origin", val)}
          placeholder="All Origins"
          showAllOption
          readOnly
        />
        <SmartDropdown
          fieldType="clarityType"
          label="Clarity"
          value={filters.clarityType}
          onChange={(val) => update("clarityType", val)}
          placeholder="All Clarities"
          showAllOption
          readOnly
        />
        <SmartDropdown
          fieldType="condition"
          label="Treatment"
          value={filters.condition}
          onChange={(val) => update("condition", val)}
          placeholder="All Treatments"
          showAllOption
          readOnly
        />
      </div>

      <ShapeFilterGrid
        value={filters.shape}
        onChange={(v) => update("shape", v)}
      />

      <ColorSwatchGrid
        value={filters.colorName}
        onChange={(v) => update("colorName", v)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <RangeSlider
          label="Carat Weight"
          min={WEIGHT_BOUNDS[0]}
          max={WEIGHT_BOUNDS[1]}
          step={0.1}
          value={[filters.weightMin, filters.weightMax]}
          onChange={updateWeight}
          format={(n) => `${n.toFixed(1)}ct`}
        />
        <RangeSlider
          label="Price (USD)"
          min={PRICE_BOUNDS[0]}
          max={PRICE_BOUNDS[1]}
          step={100}
          value={[filters.priceMin, filters.priceMax]}
          onChange={updatePrice}
          format={(n) => `$${n.toLocaleString()}`}
        />
      </div>

      <div>
        <p className="mb-3 text-[10px] uppercase tracking-wider text-[#8f8b8f]">
          Stone Dimensions (mm){" "}
          <span className="ml-1 italic normal-case tracking-normal text-[#b8b1b8]">
            preview — applied in next release
          </span>
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <RangeSlider
            label="Length"
            min={DIM_BOUNDS[0]}
            max={DIM_BOUNDS[1]}
            step={0.5}
            value={dimensions.length}
            onChange={(v) => onDimensionsChange({ ...dimensions, length: v })}
            format={(n) => `${n.toFixed(1)}mm`}
          />
          <RangeSlider
            label="Width"
            min={DIM_BOUNDS[0]}
            max={DIM_BOUNDS[1]}
            step={0.5}
            value={dimensions.width}
            onChange={(v) => onDimensionsChange({ ...dimensions, width: v })}
            format={(n) => `${n.toFixed(1)}mm`}
          />
          <RangeSlider
            label="Height"
            min={DIM_BOUNDS[0]}
            max={DIM_BOUNDS[1]}
            step={0.5}
            value={dimensions.height}
            onChange={(v) => onDimensionsChange({ ...dimensions, height: v })}
            format={(n) => `${n.toFixed(1)}mm`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ---------- Desktop sticky toolbar ---------- */}
      <div className="sticky top-16 z-30 hidden border-y border-[#dde2e8] bg-white/95 shadow-sm backdrop-blur md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="relative flex-1 max-w-md">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f8b8f]"
            />
            <input
              type="text"
              value={filters.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Search by name, variety, or feature…"
              className="w-full rounded-xl border border-[#dde2e8] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1a2e] placeholder:text-[#8f8b8f] focus:border-[#3c74ae] focus:outline-none focus:ring-2 focus:ring-[#3c74ae]/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-[#3c74ae]" />
            <select
              value={filters.sortBy}
              onChange={(e) => update("sortBy", e.target.value)}
              className="cursor-pointer rounded-lg border border-[#dde2e8] bg-white py-1.5 pl-3 pr-8 text-sm text-[#1a1a2e] focus:border-[#3c74ae] focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden items-center gap-1.5 lg:flex">
            {[
              { value: "all", label: "All" },
              { value: "true", label: "Available" },
              { value: "false", label: "Sold" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("availability", opt.value)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                  filters.availability === opt.value
                    ? "border-[#3c74ae] bg-[#3c74ae] text-white"
                    : "border-[#dde2e8] bg-white text-[#4a4a6a] hover:border-[#3c74ae]/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ViewToggle value={viewMode} onChange={onViewModeChange} />

            {activeFiltersCount > 0 ? (
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
              >
                <X size={12} />
                Clear ({activeFiltersCount})
              </button>
            ) : null}

            <span
              className="hidden whitespace-nowrap text-xs font-semibold text-[#8f8b8f] xl:inline"
              data-total-count={totalCount}
            >
              {totalCount.toLocaleString()} stones
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Desktop inline filter sections (always visible) ---------- */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#dde2e8] bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            {FilterSections}
          </div>
        </div>
      </div>

      {/* ---------- Mobile bottom bar ---------- */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[#dde2e8] bg-white px-4 py-3 shadow-lg md:hidden">
        <div className="flex items-center gap-2">
          <ViewToggle value={viewMode} onChange={onViewModeChange} />

          <select
            value={filters.sortBy}
            onChange={(e) => update("sortBy", e.target.value)}
            className="flex-1 rounded-xl border border-[#dde2e8] bg-white px-3 py-2.5 text-sm text-[#1a1a2e] focus:border-[#3c74ae] focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="relative flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#3c74ae] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFiltersCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {activeFiltersCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* ---------- Mobile filter sheet ---------- */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 md:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[101] flex max-h-[90vh] flex-col overflow-hidden rounded-t-3xl bg-white md:hidden"
            >
              <div className="flex flex-shrink-0 items-center justify-between border-b border-[#dde2e8] px-5 py-4">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-[#3c74ae]" />
                  <h3 className="text-base font-semibold text-[#1a1a2e]">
                    Filters
                  </h3>
                  {activeFiltersCount > 0 ? (
                    <span className="rounded-full bg-[#3c74ae] px-2 py-0.5 text-xs font-bold text-white">
                      {activeFiltersCount}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#f5f7fa]"
                >
                  <X size={18} className="text-[#4a4a6a]" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
                <div className="relative">
                  <Search
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f8b8f]"
                  />
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Search…"
                    className="w-full rounded-xl border border-[#dde2e8] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1a2e] placeholder:text-[#8f8b8f] focus:border-[#3c74ae] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
                    Availability
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "all", label: "All" },
                      { value: "true", label: "Available" },
                      { value: "false", label: "Sold" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => update("availability", opt.value)}
                        className={`flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition-all duration-200 ${
                          filters.availability === opt.value
                            ? "border-[#3c74ae] bg-[#3c74ae] text-white"
                            : "border-[#dde2e8] bg-white text-[#4a4a6a] hover:border-[#3c74ae]/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {FilterSections}

                {activeFiltersCount > 0 ? (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="w-full rounded-xl border border-red-200 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                  >
                    Clear All Filters ({activeFiltersCount})
                  </button>
                ) : null}
              </div>

              <div className="flex-shrink-0 border-t border-[#dde2e8] bg-white px-5 py-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-xl bg-[#3c74ae] py-3 font-semibold text-white transition-colors hover:bg-[#2d5f96]"
                >
                  View {totalCount.toLocaleString()} Stones
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
