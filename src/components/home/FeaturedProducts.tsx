"use client";

import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuotationStore } from "@/store/quotationStore";

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
  images: string[];
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useQuotationStore((state) => state.addItem);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          "/api/products?limit=6&sortBy=createdAt&sortOrder=desc",
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

  const placeholderCards = Array.from({ length: 6 }).map((_, index) => (
    <div
      key={`placeholder-${index}`}
      className="overflow-hidden rounded-2xl border border-[#dde2e8] bg-white"
    >
      <div className="flex h-28 items-center justify-center bg-[#f5f7fa] text-[#3c74ae] sm:h-36">
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
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {loading || products.length === 0
            ? placeholderCards
            : products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28, delay: index * 0.045 }}
                  className="h-full"
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="group block h-full"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#d8e0ea] bg-gradient-to-b from-white to-[#f8fbff] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_18px_rgba(31,54,84,0.09)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_13px_22px_rgba(31,54,84,0.14)]">
                      <div className="relative h-28 w-full overflow-hidden sm:h-36">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="h-full w-full"
                            style={{
                              background: `linear-gradient(135deg, ${product.colorHex || "#3c74ae"}, #f5f7fa)`,
                            }}
                          />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-4">
                        <div>
                          <h3 className="truncate text-[13px] font-semibold text-[#1a1a2e] sm:text-base">
                            {product.name}
                          </h3>
                          <p className="mt-0.5 truncate text-[11px] text-[#8f8b8f] sm:mt-1 sm:text-xs">
                            {product.origin} · {product.shape}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-[#e2e8f0] bg-white/90 p-2 text-[10px] text-[#4a4a6a] sm:gap-2 sm:text-xs">
                          <div>
                            <p className="text-[#8f8b8f]">Size</p>
                            <p className="truncate font-medium text-[#1a1a2e]">
                              {product.size}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#8f8b8f]">Lot Qty</p>
                            <p className="font-medium text-[#1a1a2e]">
                              {product.lotQuantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#8f8b8f]">Weight</p>
                            <p className="font-medium text-[#1a1a2e]">
                              {product.weight.toFixed(2)} ct
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-[#dde2e8]"
                              style={{
                                backgroundColor: product.colorHex || "#3c74ae",
                              }}
                            />
                            <span className="truncate font-medium text-[#1a1a2e]">
                              {product.colorName}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center gap-2">
                          <p className="min-w-0 flex-1 text-sm font-semibold text-[#3c74ae] sm:text-base">
                            {typeof product.price === "number"
                              ? `$${product.price.toLocaleString()}`
                              : "Contact"}
                          </p>

                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              addItem({
                                id: product.id,
                                name: product.name,
                                origin: product.origin,
                                shape: product.shape,
                                colorName: product.colorName,
                                colorHex: product.colorHex,
                                size: product.size,
                                weight: product.weight,
                                price: product.price,
                                image: product.images?.[0],
                              });
                            }}
                            className="rounded-lg border border-[#3c74ae] px-2.5 py-1.5 text-[10px] font-semibold text-[#3c74ae] transition hover:bg-[#e8f0f9] sm:px-3 sm:py-2 sm:text-xs"
                          >
                            Add to Quote
                          </button>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
