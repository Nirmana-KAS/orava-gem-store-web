"use client";

import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card3D } from "@/components/ui/aceternity/Card3D";
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
      className="w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-[#dde2e8] bg-white"
    >
      <div className="flex h-[200px] items-center justify-center bg-[#f5f7fa] text-[#3c74ae]">
        <Gem size={28} />
      </div>
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#e8f0f9]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#f0f3f7]" />
        <div className="h-8 w-full animate-pulse rounded bg-[#f5f7fa]" />
      </div>
    </div>
  ));

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-heading text-4xl font-bold text-[#1a1a2e]">
            Latest Collection
          </h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#3c74ae] transition hover:text-[#2d5f96]"
          >
            View All Products →
          </Link>
        </div>

        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-5 pb-2">
            {loading || products.length === 0
              ? placeholderCards
              : products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="w-[300px] flex-shrink-0"
                  >
                    <Card3D className="h-full">
                      <article className="overflow-hidden rounded-2xl border border-[#dde2e8] bg-white">
                        <div className="relative h-[200px] w-full">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
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

                        <div className="space-y-3 p-4">
                          <h3 className="truncate text-base font-semibold text-[#1a1a2e]">
                            {product.name}
                          </h3>

                          <p className="text-xs text-[#8f8b8f]">
                            {product.origin} · {product.shape}
                          </p>

                          <div className="flex items-center gap-2 text-sm text-[#4a4a6a]">
                            <span
                              className="h-4 w-4 rounded-full border border-[#dde2e8]"
                              style={{
                                backgroundColor: product.colorHex || "#3c74ae",
                              }}
                            />
                            {product.colorName}
                          </div>

                          <p className="text-sm font-semibold text-[#3c74ae]">
                            {typeof product.price === "number"
                              ? `$${product.price.toLocaleString()}`
                              : "Contact for pricing"}
                          </p>

                          <div className="flex gap-2 pt-1">
                            <Link
                              href={`/products/${product.id}`}
                              className="flex-1 rounded-lg bg-[#3c74ae] px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#2d5f96]"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() =>
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
                                })
                              }
                              className="flex-1 rounded-lg border border-[#3c74ae] px-3 py-2 text-xs font-semibold text-[#3c74ae] transition hover:bg-[#e8f0f9]"
                            >
                              Add to Quote
                            </button>
                          </div>
                        </div>
                      </article>
                    </Card3D>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
