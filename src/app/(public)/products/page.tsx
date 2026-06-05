"use client";

import "./products.css";

import { useMemo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  Grid2x2,
  Grid3x3,
  List as ListIcon,
  Search as SearchIcon,
  X,
  Loader2,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

import { Hero } from "@/components/products/Hero";
import { Featured } from "@/components/products/Featured";
import { Dropdown } from "@/components/products/Dropdown";
import { ShapeFilter } from "@/components/products/ShapeFilter";
import { ColorFilter } from "@/components/products/ColorFilter";
import { RangeSlider } from "@/components/products/RangeSlider";
import { GemCard } from "@/components/products/GemCard";
import { EmptyState } from "@/components/products/EmptyState";
import { Pagination } from "@/components/products/Pagination";
import { FilterChips, type ActiveChip } from "@/components/products/FilterChips";

import { useProducts } from "@/lib/products/store";
import { applyFilters } from "@/lib/products/filter";
import { productsToGems } from "@/lib/products/adapter";
import {
  VARIETIES,
  ORIGINS,
  CLARITIES,
  CONDITIONS,
  SORT_OPTIONS,
  type Gem,
} from "@/lib/products/data";

const PAGE_SIZE = 16;

const SAMPLE_FEATURED: Gem = {
  id: "sample-featured",
  _realId: "sample-featured",
  name: "Ceylon Royal Blue Sapphire",
  variety: "Sapphire",
  origin: "Sri Lanka",
  shape: "Oval",
  color: "#1f3a8a",
  colorName: "Royal Blue",
  carat: 3.42,
  clarity: "VVS",
  cut: "Brilliant",
  condition: "Available",
  certified: "GIA",
  price: 8400,
  ri: 1.762,
  treated: "Heat",
  length: 9.8,
  width: 7.6,
  height: 4.8,
  images: [],
  featured: true,
};

export default function ProductsPage() {
  const [gems, setGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/products?limit=100&sortBy=createdAt&sortOrder=desc")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const products = data?.data?.products || data?.data?.items || [];
        setGems(productsToGems(products));
      })
      .catch(() => {
        if (!cancelled) setGems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const f = useProducts();
  const featured = useMemo(
    () => gems.find((g) => g.featured) ?? gems[0] ?? SAMPLE_FEATURED,
    [gems],
  );

  const stats = useMemo(() => {
    const variants = new Set(gems.map((g) => g.variety)).size;
    const origins = new Set(gems.map((g) => g.origin)).size;
    const shapesCuts = new Set(gems.map((g) => g.shape)).size;
    const colours = new Set(gems.map((g) => g.colorName)).size;
    return { variants, origins, shapesCuts, colours };
  }, [gems]);

  const filtered = useMemo(() => applyFilters(gems, f), [gems, f]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(f.page, totalPages);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const gridTopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (gridTopRef.current) {
      window.scrollTo({ top: gridTopRef.current.offsetTop - 80, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const gridCols =
    f.view === "list" ? "grid-cols-1"
    : f.view === "grid3" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  const chips: ActiveChip[] = [
    f.variety && { key: "variety", label: f.variety, clear: () => f.set("variety", null) },
    f.origin  && { key: "origin",  label: f.origin,  clear: () => f.set("origin",  null) },
    f.shape   && { key: "shape",   label: `Shape: ${f.shape}`,   clear: () => f.set("shape",   null) },
    f.color   && { key: "color",   label: `Color: ${f.color}`,   clear: () => f.set("color",   null) },
    f.clarity && { key: "clarity", label: `Clarity: ${f.clarity}`, clear: () => f.set("clarity", null) },
    f.certified && { key: "cert", label: `Cert: ${f.certified}`, clear: () => f.set("certified", null) },
    f.availability !== "All" && { key: "cond", label: f.availability, clear: () => f.set("availability", "All") },
    (f.carat[0] > 0 || f.carat[1] < 10)    && { key: "carat",  label: `${f.carat[0]}–${f.carat[1]}ct`,           clear: () => f.set("carat",  [0, 10]) },
    (f.price[0] > 0 || f.price[1] < 15000) && { key: "price",  label: `$${f.price[0]}–$${f.price[1]}`,           clear: () => f.set("price",  [0, 15000]) },
    (f.length[0] > 0 || f.length[1] < 20)  && { key: "length", label: `L: ${f.length[0]}–${f.length[1]}mm`,      clear: () => f.set("length", [0, 20]) },
    (f.width[0] > 0  || f.width[1]  < 15)  && { key: "width",  label: `W: ${f.width[0]}–${f.width[1]}mm`,        clear: () => f.set("width",  [0, 15]) },
    (f.height[0] > 0 || f.height[1] < 10)  && { key: "height", label: `H: ${f.height[0]}–${f.height[1]}mm`,      clear: () => f.set("height", [0, 10]) },
  ].filter(Boolean) as ActiveChip[];

  const activeFilterCount = chips.length;

  const filterContent = (
    <>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Dropdown
          label="Gemstone"
          value={f.variety}
          options={VARIETIES}
          onChange={(v) => f.set("variety", v)}
          placeholder="All Varieties"
        />
        <Dropdown
          label="Origin"
          value={f.origin}
          options={ORIGINS}
          onChange={(v) => f.set("origin", v)}
          placeholder="All Origins"
        />
        <Dropdown
          label="Clarity"
          value={f.clarity}
          options={CLARITIES}
          onChange={(v) => f.set("clarity", v)}
          placeholder="Any Clarity"
        />
        <Dropdown
          label="Condition"
          value={f.availability === "All" ? null : f.availability}
          options={CONDITIONS}
          onChange={(v) => f.set("availability", (v as typeof f.availability) ?? "All")}
          placeholder="Any Condition"
        />
      </div>

      <div className="mt-4 grid items-start gap-x-6 gap-y-4 rounded-2xl border border-line bg-white p-5 shadow-sm
                      [grid-template-areas:'shape_color_carat_price_._''shape_color_length_width_height']
                      [grid-template-columns:1.6fr_1.3fr_1fr_1fr_1fr]
                      max-[1100px]:[grid-template-areas:'shape_shape_color''carat_price_.''length_width_height']
                      max-[1100px]:[grid-template-columns:1fr_1fr_1fr]
                      max-[640px]:[grid-template-areas:'shape''color''carat''price''length''width''height']
                      max-[640px]:[grid-template-columns:1fr]">
        <div style={{ gridArea: "shape" }}>
          <ShapeFilter value={f.shape} onChange={(v) => f.set("shape", v)} />
        </div>
        <div style={{ gridArea: "color" }}>
          <ColorFilter value={f.color} onChange={(v) => f.set("color", v)} />
        </div>
        <div style={{ gridArea: "carat" }}>
          <RangeSlider
            label="Carat Weight" min={0} max={10} step={0.1}
            value={f.carat} onChange={(v) => f.set("carat", v)}
            format={(v) => v.toFixed(1) + "ct"}
          />
        </div>
        <div style={{ gridArea: "price" }}>
          <RangeSlider
            label="Price (USD)" min={0} max={15000} step={100}
            value={f.price} onChange={(v) => f.set("price", v)}
            format={(v) => "$" + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : v)}
          />
        </div>
        <div style={{ gridArea: "length" }}>
          <RangeSlider
            label="Length (mm)" min={0} max={20} step={0.1}
            value={f.length} onChange={(v) => f.set("length", v)}
            format={(v) => v.toFixed(1) + "mm"}
          />
        </div>
        <div style={{ gridArea: "width" }}>
          <RangeSlider
            label="Width (mm)" min={0} max={15} step={0.1}
            value={f.width} onChange={(v) => f.set("width", v)}
            format={(v) => v.toFixed(1) + "mm"}
          />
        </div>
        <div style={{ gridArea: "height" }}>
          <RangeSlider
            label="Height (mm)" min={0} max={10} step={0.1}
            value={f.height} onChange={(v) => f.set("height", v)}
            format={(v) => v.toFixed(1) + "mm"}
          />
        </div>
      </div>
    </>
  );

  return (
    <main>
      <Hero totalCount={gems.length} stats={stats} />

      <div className="hidden md:block">
        <Featured gem={featured} />
      </div>

      <section className="mx-auto mt-7 max-w-[1300px] px-8">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white p-3.5 px-4 shadow-sm">
          <div className="flex h-10 min-w-[220px] flex-1 items-center gap-2.5 rounded-[10px] border border-transparent bg-primary-softer px-3 focus-within:border-primary focus-within:bg-white">
            <SearchIcon className="h-4 w-4 text-muted" />
            <input
              type="text"
              value={f.search}
              onChange={(e) => f.set("search", e.target.value)}
              placeholder="Search by name, ID, or variety..."
              className="flex-1 border-none bg-transparent text-sm text-navy outline-none placeholder:text-muted"
            />
            {f.search && (
              <button type="button" onClick={() => f.set("search", "")} className="text-muted">
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="flex h-10 items-center gap-2 rounded-[10px] border border-line bg-white px-3.5 text-sm text-navy">
            <ArrowUpDown className="h-4 w-4" />
            <select
              value={f.sort}
              onChange={(e) => f.set("sort", e.target.value as typeof f.sort)}
              className="border-none bg-transparent font-medium outline-none"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-0.5 rounded-[10px] bg-primary-softer p-0.5">
            <ViewBtn active={f.view === "grid4"} onClick={() => f.set("view", "grid4")} label="Grid">
              <Grid2x2 className="h-3.5 w-3.5" />
            </ViewBtn>
            <ViewBtn active={f.view === "grid3"} onClick={() => f.set("view", "grid3")} label="Larger Grid">
              <Grid3x3 className="h-3.5 w-3.5" />
            </ViewBtn>
            <ViewBtn active={f.view === "list"} onClick={() => f.set("view", "list")} label="Detail List">
              <ListIcon className="h-3.5 w-3.5" />
            </ViewBtn>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileFiltersOpen((o) => !o)}
          className="mt-3 flex w-full items-center justify-between rounded-2xl border border-line bg-white px-4 py-3.5 text-sm font-semibold text-navy shadow-sm md:hidden"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted transition-transform duration-200 ${mobileFiltersOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Desktop — always visible */}
        <div className="hidden md:block">{filterContent}</div>

        {/* Mobile — collapsible */}
        <AnimatePresence initial={false}>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              {filterContent}
            </motion.div>
          )}
        </AnimatePresence>

        <FilterChips chips={chips} onClearAll={f.reset} />
      </section>

      <div ref={gridTopRef} className="mx-auto mb-3 mt-7 flex max-w-[1300px] items-center justify-between px-8">
        <div className="text-sm text-navy-2">
          <b className="font-serif text-xl italic text-primary">{filtered.length}</b> gemstones match
        </div>
      </div>

      {loading ? (
        <div className="mx-auto flex max-w-[1300px] flex-col items-center justify-center px-8 py-24">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted">Loading gemstones...</p>
        </div>
      ) : paged.length === 0 ? (
        <EmptyState onClear={f.reset} />
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${f.view}-${page}`}
            className={`mx-auto grid max-w-[1300px] gap-5 px-8 pb-20 ${gridCols}`}
          >
            {paged.map((g) => (
              <GemCard key={g.id} gem={g} view={f.view} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <Pagination current={page} total={totalPages} onChange={(p) => f.set("page", p)} />
    </main>
  );
}

function ViewBtn({
  children,
  active,
  onClick,
  label,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-[34px] w-[34px] place-items-center rounded-[7px] transition-colors
        ${active ? "bg-white text-primary shadow-sm" : "text-navy-2 hover:text-primary"}`}
    >
      {children}
    </button>
  );
}
