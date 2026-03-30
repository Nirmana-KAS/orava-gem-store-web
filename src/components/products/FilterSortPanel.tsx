"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Filter, SlidersHorizontal, X } from "lucide-react";
import { SmartDropdown } from "@/components/ui/SmartDropdown";

interface FilterState {
  name: string;
  origin: string;
  shape: string;
  colorName: string;
  size: string;
  polishedType: string;
  clarityType: string;
  condition: string;
  availability: string;
  sortBy: string;
}

interface FilterSortPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
}

export function FilterSortPanel({
  filters,
  onFilterChange,
  totalCount,
}: FilterSortPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    const count = Object.entries(filters).filter(
      ([key, val]) => key !== "sortBy" && val !== "" && val !== "all",
    ).length;
    setActiveFiltersCount(count);
  }, [filters]);

  function updateFilter(key: keyof FilterState, value: string) {
    onFilterChange({ ...filters, [key]: value });
  }

  function clearAllFilters() {
    onFilterChange({
      name: "",
      origin: "",
      shape: "",
      colorName: "",
      size: "",
      polishedType: "",
      clarityType: "",
      condition: "",
      availability: "all",
      sortBy: "latest",
    });
  }

  const sortOptions = [
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

  const FilterContent = () => (
    <div className="space-y-4">
      <SmartDropdown
        fieldType="gemName"
        label="Gemstone Name"
        value={filters.name}
        onChange={(val) => updateFilter("name", val)}
        placeholder="All Gemstones"
        showAllOption
        readOnly
      />
      <SmartDropdown
        fieldType="origin"
        label="Origin"
        value={filters.origin}
        onChange={(val) => updateFilter("origin", val)}
        placeholder="All Origins"
        showAllOption
        readOnly
      />
      <SmartDropdown
        fieldType="shape"
        label="Shape"
        value={filters.shape}
        onChange={(val) => updateFilter("shape", val)}
        placeholder="All Shapes"
        showAllOption
        readOnly
      />
      <SmartDropdown
        fieldType="colorName"
        label="Color Name"
        value={filters.colorName}
        onChange={(val) => updateFilter("colorName", val)}
        placeholder="All Colors"
        showAllOption
        readOnly
      />
      <SmartDropdown
        fieldType="size"
        label="Size"
        value={filters.size}
        onChange={(val) => updateFilter("size", val)}
        placeholder="All Sizes"
        showAllOption
        readOnly
      />
      <SmartDropdown
        fieldType="polishedType"
        label="Polish Type"
        value={filters.polishedType}
        onChange={(val) => updateFilter("polishedType", val)}
        placeholder="All Polish Types"
        showAllOption
        readOnly
      />
      <SmartDropdown
        fieldType="clarityType"
        label="Clarity Type"
        value={filters.clarityType}
        onChange={(val) => updateFilter("clarityType", val)}
        placeholder="All Clarity Types"
        showAllOption
        readOnly
      />
      <SmartDropdown
        fieldType="condition"
        label="Condition"
        value={filters.condition}
        onChange={(val) => updateFilter("condition", val)}
        placeholder="All Conditions"
        showAllOption
        readOnly
      />

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
              onClick={() => updateFilter("availability", opt.value)}
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

      {activeFiltersCount > 0 ? (
        <button
          onClick={clearAllFilters}
          className="w-full rounded-xl border border-red-200 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
        >
          Clear All Filters ({activeFiltersCount})
        </button>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="sticky top-16 z-40 hidden border-b border-[#dde2e8] bg-white shadow-sm md:block">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-[#3c74ae]" />
              <select
                value={filters.sortBy}
                onChange={(event) => updateFilter("sortBy", event.target.value)}
                className="text-sm text-[#1a1a2e] border border-[#dde2e8] rounded-lg pl-3 pr-8 py-1.5 bg-white focus:outline-none focus:border-[#3c74ae] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%238f8b8f%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_10px_center]"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="flex items-center gap-2"
              data-total-count={totalCount}
            >
              {[
                { value: "all", label: "All" },
                { value: "true", label: "Available" },
                { value: "false", label: "Sold" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateFilter("availability", opt.value)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    filters.availability === opt.value
                      ? "border-[#3c74ae] bg-[#3c74ae] text-white"
                      : "border-[#dde2e8] bg-white text-[#4a4a6a] hover:border-[#3c74ae]/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}

              <div className="mx-1 h-5 w-px bg-[#dde2e8]" />

              {activeFiltersCount > 0 ? (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 whitespace-nowrap rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
                >
                  <X size={12} />
                  Clear ({activeFiltersCount})
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-3 flex items-stretch gap-2 border-t border-[#dde2e8] pt-3 w-full">
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="gemName"
                label=""
                value={filters.name}
                onChange={(val) => updateFilter("name", val)}
                placeholder="Gemstone"
                showAllOption
                readOnly
              />
            </div>
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="origin"
                label=""
                value={filters.origin}
                onChange={(val) => updateFilter("origin", val)}
                placeholder="Origin"
                showAllOption
                readOnly
              />
            </div>
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="shape"
                label=""
                value={filters.shape}
                onChange={(val) => updateFilter("shape", val)}
                placeholder="Shape"
                showAllOption
                readOnly
              />
            </div>
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="colorName"
                label=""
                value={filters.colorName}
                onChange={(val) => updateFilter("colorName", val)}
                placeholder="Color"
                showAllOption
                readOnly
              />
            </div>
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="size"
                label=""
                value={filters.size}
                onChange={(val) => updateFilter("size", val)}
                placeholder="Size"
                showAllOption
                readOnly
              />
            </div>
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="polishedType"
                label=""
                value={filters.polishedType}
                onChange={(val) => updateFilter("polishedType", val)}
                placeholder="Polish Type"
                showAllOption
                readOnly
              />
            </div>
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="clarityType"
                label=""
                value={filters.clarityType}
                onChange={(val) => updateFilter("clarityType", val)}
                placeholder="Clarity Type"
                showAllOption
                readOnly
              />
            </div>
            <div className="flex-1 min-w-0">
              <SmartDropdown
                fieldType="condition"
                label=""
                value={filters.condition}
                onChange={(val) => updateFilter("condition", val)}
                placeholder="Condition"
                showAllOption
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-[#dde2e8] bg-white px-4 py-3 shadow-lg md:hidden">
        <div className="flex items-center gap-3">
          <select
            value={filters.sortBy}
            onChange={(event) => updateFilter("sortBy", event.target.value)}
            className="flex-1 rounded-xl border border-[#dde2e8] bg-white px-3 py-2.5 text-sm text-[#1a1a2e] focus:border-[#3c74ae] focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setMobileOpen(true)}
            className="relative flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#3c74ae] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFiltersCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {activeFiltersCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

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
              className="fixed bottom-0 left-0 right-0 z-[101] flex max-h-[85vh] flex-col overflow-hidden rounded-t-3xl bg-white md:hidden"
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
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#f5f7fa]"
                >
                  <X size={18} className="text-[#4a4a6a]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <FilterContent />
              </div>

              <div className="flex-shrink-0 border-t border-[#dde2e8] bg-white px-5 py-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-xl bg-[#3c74ae] py-3 font-semibold text-white transition-colors hover:bg-[#2d5f96]"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
