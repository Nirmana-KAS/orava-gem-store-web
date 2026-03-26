"use client";

import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  availability: boolean;
  price?: number | null;
  images: string[];
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const addItem = useQuotationStore((state) => state.addItem);

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

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading || products.length === 0
            ? placeholderCards
            : products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -3 }}
                >
                  <article
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#dde2e8] bg-white transition-all duration-300 hover:border-[#3c74ae] hover:shadow-lg hover:shadow-[#3c74ae]/10"
                  >
                    <div className="relative h-28 w-full overflow-hidden bg-[#f5f7fa] sm:h-36 md:h-40">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${(product.colorHex || "#3c74ae") + "33"}, ${(product.colorHex || "#3c74ae") + "88"})`,
                          }}
                        >
                          <Gem size={48} className="text-[#3c74ae]" />
                        </div>
                      )}

                      <span
                        className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          product.availability
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.availability ? "Available" : "Sold"}
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-3">
                      <h3 className="mb-1 line-clamp-1 text-xs font-semibold leading-tight text-[#1a1a2e] sm:text-sm">
                        {product.name}
                      </h3>

                      <div className="mb-2 flex items-center gap-1">
                        <span className="line-clamp-1 text-[10px] text-[#8f8b8f] sm:text-xs">
                          {product.origin}
                        </span>
                        <span className="text-[#dde2e8]">•</span>
                        <span className="text-[10px] text-[#8f8b8f] sm:text-xs">
                          {product.shape}
                        </span>
                      </div>

                      <div className="mb-2.5 grid grid-cols-2 gap-x-2 gap-y-1">
                        <div>
                          <p className="text-[9px] uppercase tracking-wide text-[#8f8b8f] sm:text-[10px]">
                            Weight
                          </p>
                          <p className="text-[10px] font-medium text-[#4a4a6a] sm:text-xs">
                            {product.weight}ct
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-wide text-[#8f8b8f] sm:text-[10px]">
                            Size
                          </p>
                          <p className="line-clamp-1 text-[10px] font-medium text-[#4a4a6a] sm:text-xs">
                            {product.size}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-wide text-[#8f8b8f] sm:text-[10px]">
                            Lot Qty
                          </p>
                          <p className="text-[10px] font-medium text-[#4a4a6a] sm:text-xs">
                            {product.lotQuantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] uppercase tracking-wide text-[#8f8b8f] sm:text-[10px]">
                            Color
                          </p>
                          <div className="flex items-center gap-1">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: product.colorHex || "#3c74ae",
                              }}
                            />
                            <span className="line-clamp-1 text-[10px] text-[#4a4a6a] sm:text-xs">
                              {product.colorName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5 sm:px-3 sm:pb-3">
                      {typeof product.price === "number" ? (
                        <p className="text-sm font-bold text-[#3c74ae] sm:text-base">
                          ${product.price.toLocaleString()}
                        </p>
                      ) : (
                        <p className="text-[10px] italic text-[#8f8b8f] sm:text-xs">
                          Contact for Price
                        </p>
                      )}

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/products/${product.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          className="whitespace-nowrap rounded-lg border border-[#3c74ae] px-2 py-1 text-[10px] font-medium text-[#3c74ae] transition-colors hover:bg-[#e8f0f9] sm:px-3 sm:py-1.5 sm:text-xs"
                        >
                          Details
                        </Link>

                        <button
                          onClick={(event) => {
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
                          className="whitespace-nowrap rounded-lg bg-[#3c74ae] px-2 py-1 text-[10px] font-medium text-white transition-colors hover:bg-[#2d5f96] sm:px-3 sm:py-1.5 sm:text-xs"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
