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
      <div className="flex h-36 items-center justify-center bg-[#f5f7fa] text-[#3c74ae] sm:h-44">
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="h-full"
                >
                  <article className="h-full overflow-hidden rounded-2xl border border-[#dde2e8] bg-white">
                    <div className="relative h-36 w-full sm:h-44">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

                    <div className="space-y-2 p-3 sm:space-y-3 sm:p-4">
                      <h3 className="truncate text-sm font-semibold text-[#1a1a2e] sm:text-base">
                        {product.name}
                      </h3>

                      <p className="truncate text-[11px] text-[#8f8b8f] sm:text-xs">
                        {product.origin} · {product.shape}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-[#4a4a6a] sm:text-sm">
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-[#dde2e8] sm:h-4 sm:w-4"
                          style={{
                            backgroundColor: product.colorHex || "#3c74ae",
                          }}
                        />
                        <span className="truncate">{product.colorName}</span>
                      </div>

                      <p className="text-xs font-semibold text-[#3c74ae] sm:text-sm">
                        {typeof product.price === "number"
                          ? `$${product.price.toLocaleString()}`
                          : "Contact for pricing"}
                      </p>

                      <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex-1 rounded-lg bg-[#3c74ae] px-3 py-2 text-center text-[11px] font-semibold text-white transition hover:bg-[#2d5f96] sm:text-xs"
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
                          className="flex-1 rounded-lg border border-[#3c74ae] px-3 py-2 text-[11px] font-semibold text-[#3c74ae] transition hover:bg-[#e8f0f9] sm:text-xs"
                        >
                          Add to Quote
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
