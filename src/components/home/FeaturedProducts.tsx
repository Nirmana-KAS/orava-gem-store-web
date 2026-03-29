"use client";

import { Gem } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";

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
  availability: boolean;
  price?: number | null;
  images: string[];
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          "/api/products?limit=8&sortBy=createdAt&sortOrder=desc",
        );
        const data = await res.json();
        setProducts(data?.data?.items || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const placeholderCards = Array.from({ length: 8 }).map((_, index) => (
    <div
      key={`placeholder-${index}`}
      className="overflow-hidden rounded-2xl border border-[#dde2e8] bg-white"
    >
      <div className="flex h-28 items-center justify-center bg-[#f5f7fa] text-[#3c74ae] sm:h-36 md:h-40">
        <Gem size={28} />
      </div>
      <div className="space-y-2 p-3 sm:p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#e8f0f9]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#f0f3f7]" />
        <div className="h-8 w-full animate-pulse rounded bg-[#f5f7fa]" />
      </div>
    </div>
  ));

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
          <h2 className="font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Latest Collection
          </h2>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#3c74ae] transition hover:text-[#2d5f96] sm:text-sm"
          >
            View All Products &gt;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 lg:grid-cols-4">
          {loading || products.length === 0
            ? placeholderCards
            : products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
}
