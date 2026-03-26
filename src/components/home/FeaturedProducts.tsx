"use client";

import { motion } from "framer-motion";
import { Gem, ShoppingBag } from "lucide-react";
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
                    className="group relative bg-white rounded-2xl border border-[#dde2e8] overflow-hidden hover:border-[#3c74ae] hover:shadow-lg hover:shadow-[#3c74ae]/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative w-full h-28 sm:h-36 md:h-40 bg-[#f5f7fa] overflow-hidden">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${product.colorHex}33, ${product.colorHex}88)`,
                          }}
                        >
                          <Gem size={48} className="text-[#3c74ae]" />
                        </div>
                      )}

                      {product.availability ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 absolute top-2 right-2">
                          Available
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600 absolute top-2 right-2">
                          Sold
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 sm:p-3">
                      <h3 className="font-semibold text-[#1a1a2e] text-xs sm:text-sm leading-tight line-clamp-1 mb-1">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-[10px] sm:text-xs text-[#8f8b8f] line-clamp-1">
                          {product.origin}
                        </span>
                        <span className="text-[#dde2e8]">•</span>
                        <span className="text-[10px] sm:text-xs text-[#8f8b8f]">
                          {product.shape}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2.5">
                        <div>
                          <p className="text-[9px] sm:text-[10px] text-[#8f8b8f] uppercase tracking-wide">
                            Weight
                          </p>
                          <p className="text-[10px] sm:text-xs font-medium text-[#4a4a6a]">
                            {product.weight}ct
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] sm:text-[10px] text-[#8f8b8f] uppercase tracking-wide">
                            Size
                          </p>
                          <p className="text-[10px] sm:text-xs font-medium text-[#4a4a6a] line-clamp-1">
                            {product.size}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] sm:text-[10px] text-[#8f8b8f] uppercase tracking-wide">
                            Lot Qty
                          </p>
                          <p className="text-[10px] sm:text-xs font-medium text-[#4a4a6a]">
                            {product.lotQuantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] sm:text-[10px] text-[#8f8b8f] uppercase tracking-wide">
                            Color
                          </p>
                          <div className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: product.colorHex }}
                            />
                            <span className="text-[10px] sm:text-xs text-[#4a4a6a] line-clamp-1">
                              {product.colorName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        {typeof product.price === "number" ? (
                          <p className="font-bold text-[#3c74ae] text-xs sm:text-sm overflow-hidden text-ellipsis">
                            ${product.price.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-[10px] sm:text-xs text-[#8f8b8f] italic leading-tight overflow-hidden text-ellipsis">
                            Contact for Price
                          </p>
                        )}
                      </div>

                      <div className="flex-shrink-0">
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
                          className="flex items-center justify-center gap-1 w-full text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-[#3c74ae] text-white hover:bg-[#2d5f96] active:scale-95 transition-all duration-200 whitespace-nowrap"
                        >
                          <ShoppingBag size={10} className="flex-shrink-0" />
                          <span>Add</span>
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
