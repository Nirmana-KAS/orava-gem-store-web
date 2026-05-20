"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, PackageSearch, X } from "lucide-react";
import {
  DEFAULT_FILTERS,
  FilterSortPanel,
  PRICE_BOUNDS,
  WEIGHT_BOUNDS,
  type FilterState,
} from "@/components/products/FilterSortPanel";
import {
  ProductCard,
  type ProductCardData,
} from "@/components/products/ProductCard";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ActivityTicker } from "@/components/products/ActivityTicker";
import { FeaturedGem } from "@/components/products/FeaturedGem";
import { BirthstoneStrip } from "@/components/products/BirthstoneStrip";
import type { ViewMode } from "@/components/products/ViewToggle";

const PRODUCTS_PER_PAGE = 16;

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid4");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", currentPage.toString());
      params.set("limit", PRODUCTS_PER_PAGE.toString());

      if (filters.name) params.set("search", filters.name);
      if (filters.origin) params.set("origin", filters.origin);
      if (filters.shape) params.set("shape", filters.shape);
      if (filters.colorName) params.set("colorName", filters.colorName);
      if (filters.size) params.set("size", filters.size);
      if (filters.clarityType) params.set("clarityType", filters.clarityType);
      if (filters.condition) params.set("condition", filters.condition);
      if (filters.availability !== "all")
        params.set("availability", filters.availability);
      if (filters.weightMin > WEIGHT_BOUNDS[0])
        params.set("weightMin", String(filters.weightMin));
      if (filters.weightMax < WEIGHT_BOUNDS[1])
        params.set("weightMax", String(filters.weightMax));
      if (filters.priceMin > PRICE_BOUNDS[0])
        params.set("priceMin", String(filters.priceMin));
      if (filters.priceMax < PRICE_BOUNDS[1])
        params.set("priceMax", String(filters.priceMax));

      const sortMap: Record<string, { sortBy: string; sortOrder: string }> = {
        latest: { sortBy: "createdAt", sortOrder: "desc" },
        oldest: { sortBy: "createdAt", sortOrder: "asc" },
        price_asc: { sortBy: "price", sortOrder: "asc" },
        price_desc: { sortBy: "price", sortOrder: "desc" },
        weight_asc: { sortBy: "weight", sortOrder: "asc" },
        weight_desc: { sortBy: "weight", sortOrder: "desc" },
        lot_asc: { sortBy: "lotQuantity", sortOrder: "asc" },
        lot_desc: { sortBy: "lotQuantity", sortOrder: "desc" },
        name_asc: { sortBy: "name", sortOrder: "asc" },
        name_desc: { sortBy: "name", sortOrder: "desc" },
      };
      const sort = sortMap[filters.sortBy] ?? sortMap.latest;
      params.set("sortBy", sort.sortBy);
      params.set("sortOrder", sort.sortOrder);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data?.products || []);
        setTotalCount(data.data?.total || 0);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  function handleFilterChange(next: FilterState) {
    setFilters(next);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const activeChips = useMemo(
    () => buildActiveChips(filters),
    [filters],
  );

  function removeChip(key: ChipKey) {
    switch (key) {
      case "name":
      case "origin":
      case "shape":
      case "colorName":
      case "size":
      case "clarityType":
      case "condition":
        setFilters({ ...filters, [key]: "", presetId: null });
        break;
      case "availability":
        setFilters({ ...filters, availability: "all", presetId: null });
        break;
      case "weight":
        setFilters({
          ...filters,
          weightMin: WEIGHT_BOUNDS[0],
          weightMax: WEIGHT_BOUNDS[1],
          presetId: null,
        });
        break;
      case "price":
        setFilters({
          ...filters,
          priceMin: PRICE_BOUNDS[0],
          priceMax: PRICE_BOUNDS[1],
          presetId: null,
        });
        break;
    }
  }

  const gridClass =
    viewMode === "list"
      ? "flex flex-col gap-3"
      : viewMode === "grid3"
      ? "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5"
      : "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5";

  return (
    <div className="min-h-screen bg-white">
      <ProductsHero totalCount={totalCount} loading={loading} />

      <ActivityTicker />

      <FeaturedGem />

      <FilterSortPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        totalCount={totalCount}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <BirthstoneStrip
          activeStone={filters.name}
          onPick={(stone) =>
            setFilters({ ...filters, name: stone, presetId: null })
          }
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8 md:pb-12">
        {activeChips.length > 0 ? (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#8f8b8f]">
              Active:
            </span>
            {activeChips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => removeChip(c.key)}
                className="inline-flex items-center gap-1 rounded-full border border-[#3c74ae]/30 bg-[#e8f0f9] px-3 py-1 text-xs font-semibold text-[#3c74ae] transition-colors hover:bg-[#3c74ae] hover:text-white"
              >
                {c.label}
                <X size={11} />
              </button>
            ))}
          </div>
        ) : null}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={32} className="mb-4 animate-spin text-[#3c74ae]" />
            <p className="text-sm text-[#8f8b8f]">Loading gemstones...</p>
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f0f9]">
              <PackageSearch size={32} className="text-[#3c74ae]" />
            </div>
            <h3 className="mb-2 font-heading text-xl font-bold text-[#1a1a2e]">
              No Gemstones Found
            </h3>
            <p className="max-w-sm text-sm text-[#8f8b8f]">
              Try adjusting your filters or search terms to discover our full
              collection.
            </p>
          </motion.div>
        ) : (
          <>
            <div className={gridClass}>
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((page) => Math.max(1, page - 1));
                      scrollToTop();
                    }}
                    disabled={currentPage === 1}
                    className="rounded-xl border border-[#dde2e8] px-4 py-2 text-sm font-semibold text-[#4a4a6a] transition-all hover:border-[#3c74ae] hover:text-[#3c74ae] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === currentPage;
                    const show =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1;

                    if (!show) {
                      if (
                        (pageNum === 2 && currentPage > 3) ||
                        (pageNum === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <span key={pageNum} className="px-1 text-[#8f8b8f]">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNum);
                          scrollToTop();
                        }}
                        className={`h-9 w-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-[#3c74ae] text-white shadow-md shadow-[#3c74ae]/30"
                            : "border border-[#dde2e8] text-[#4a4a6a] hover:border-[#3c74ae] hover:text-[#3c74ae]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((page) => Math.min(totalPages, page + 1));
                      scrollToTop();
                    }}
                    disabled={currentPage === totalPages}
                    className="rounded-xl border border-[#dde2e8] px-4 py-2 text-sm font-semibold text-[#4a4a6a] transition-all hover:border-[#3c74ae] hover:text-[#3c74ae] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>

                <p className="text-center text-xs text-[#8f8b8f]">
                  Page {currentPage} of {totalPages} - Showing{" "}
                  {Math.min(
                    (currentPage - 1) * PRODUCTS_PER_PAGE + 1,
                    totalCount,
                  )}
                  - {Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount)} of{" "}
                  {totalCount.toLocaleString()} gemstones
                </p>
              </motion.div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

type ChipKey =
  | "name"
  | "origin"
  | "shape"
  | "colorName"
  | "size"
  | "clarityType"
  | "condition"
  | "availability"
  | "weight"
  | "price";

function buildActiveChips(f: FilterState): Array<{ key: ChipKey; label: string }> {
  const chips: Array<{ key: ChipKey; label: string }> = [];
  if (f.name) chips.push({ key: "name", label: `Search: ${f.name}` });
  if (f.origin) chips.push({ key: "origin", label: f.origin });
  if (f.shape) chips.push({ key: "shape", label: f.shape });
  if (f.colorName) chips.push({ key: "colorName", label: f.colorName });
  if (f.size) chips.push({ key: "size", label: `Size: ${f.size}` });
  if (f.clarityType) chips.push({ key: "clarityType", label: f.clarityType });
  if (f.condition) chips.push({ key: "condition", label: f.condition });
  if (f.availability !== "all" && f.availability !== "")
    chips.push({
      key: "availability",
      label: f.availability === "true" ? "Available" : "Sold",
    });
  if (f.weightMin > WEIGHT_BOUNDS[0] || f.weightMax < WEIGHT_BOUNDS[1])
    chips.push({
      key: "weight",
      label: `${f.weightMin.toFixed(1)}–${f.weightMax.toFixed(1)}ct`,
    });
  if (f.priceMin > PRICE_BOUNDS[0] || f.priceMax < PRICE_BOUNDS[1])
    chips.push({
      key: "price",
      label: `$${f.priceMin.toLocaleString()}–$${f.priceMax.toLocaleString()}`,
    });
  return chips;
}
