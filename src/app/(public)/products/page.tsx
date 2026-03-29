"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gem, Loader2, PackageSearch } from "lucide-react";
import { FilterSortPanel } from "@/components/products/FilterSortPanel";
import { ProductCard } from "@/components/products/ProductCard";

const PRODUCTS_PER_PAGE = 16;

const GREETING_LINES = [
  "Discover gemstones crafted to perfection.",
  "Every stone tells a story of precision.",
  "Sourced globally. Cut with excellence.",
  "Your next masterpiece starts here.",
  "Beauty crafted to an exemplary standard.",
];

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

interface ProductItem {
  id: string;
  name: string;
  origin: string;
  shape: string;
  colorName: string;
  colorHex: string;
  size: string;
  weight: number;
  lotQuantity: number;
  price?: number | null;
  availability: boolean;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [greetingIndex] = useState(() =>
    Math.floor(Math.random() * GREETING_LINES.length),
  );
  const [filters, setFilters] = useState<FilterState>({
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
      if (filters.polishedType)
        params.set("polishedType", filters.polishedType);
      if (filters.clarityType) params.set("clarityType", filters.clarityType);
      if (filters.condition) params.set("condition", filters.condition);
      if (filters.availability !== "all")
        params.set("availability", filters.availability);

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

  function handleFilterChange(newFilters: FilterState) {
    setFilters(newFilters);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#e8f0f9] via-white to-white px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]"
          >
            <Gem size={12} />
            Precision-Cut Gemstone Collection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl md:text-5xl"
          >
            Our Gemstone Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-xl text-base italic text-[#4a4a6a] sm:text-lg"
          >
            &quot;{GREETING_LINES[greetingIndex]}&quot;
          </motion.p>

          {!loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#dde2e8] bg-white px-5 py-2 shadow-sm"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#3c74ae]" />
              <span className="text-sm font-semibold text-[#1a1a2e]">
                {totalCount.toLocaleString()}{" "}
                <span className="text-[#3c74ae]">
                  {totalCount === 1 ? "Gemstone" : "Gemstones"}
                </span>{" "}
                in Collection
              </span>
            </motion.div>
          ) : null}
        </div>
      </div>

      <FilterSortPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        totalCount={totalCount}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 lg:px-8 md:pb-8">
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
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
