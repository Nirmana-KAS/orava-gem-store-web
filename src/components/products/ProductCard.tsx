"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Gem, ShoppingBag } from "lucide-react";
import { useQuotationStore } from "@/store/quotationStore";

interface ProductCardProps {
  product: {
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
  };
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const router = useRouter();
  const { addItem, isInCart } = useQuotationStore();
  const inCart = isInCart(product.id);

  function handleAddToCart(event: MouseEvent) {
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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      onClick={() => router.push(`/products/${product.id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#dde2e8] bg-white transition-all duration-300 hover:border-[#3c74ae] hover:shadow-lg hover:shadow-[#3c74ae]/10"
    >
      <div className="relative h-28 w-full overflow-hidden bg-[#f5f7fa] sm:h-36 md:h-40">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${product.colorHex}33, ${product.colorHex}88)`,
            }}
          >
            <Gem size={28} className="text-[#3c74ae] opacity-40" />
          </div>
        )}

        <div className="absolute right-2 top-2">
          {product.availability ? (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              Available
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">
              Sold
            </span>
          )}
        </div>
      </div>

      <div className="p-2.5 sm:p-3">
        <p className="mb-1 line-clamp-1 text-xs font-semibold leading-tight text-[#1a1a2e] sm:text-sm">
          {product.name}
        </p>

        <div className="mb-2 flex items-center gap-1">
          <span className="truncate text-[10px] text-[#8f8b8f] sm:text-xs">
            {product.origin}
          </span>
          <span className="text-[#dde2e8]">•</span>
          <span className="truncate text-[10px] text-[#8f8b8f] sm:text-xs">
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
            <p className="truncate text-[10px] font-medium text-[#4a4a6a] sm:text-xs">
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
              <div
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: product.colorHex }}
              />
              <p className="truncate text-[10px] text-[#4a4a6a] sm:text-xs">
                {product.colorName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        <div className="mb-2 text-center">
          {product.price ? (
            <p className="text-sm font-bold text-[#3c74ae] sm:text-base">
              ${product.price.toLocaleString()}
            </p>
          ) : (
            <p className="text-[10px] italic leading-tight text-[#8f8b8f] sm:text-xs">
              Contact for Price
            </p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all duration-200 active:scale-95 sm:py-2.5 sm:text-xs ${
            inCart
              ? "border border-green-300 bg-green-50 text-green-700"
              : "bg-[#3c74ae] text-white shadow-sm shadow-[#3c74ae]/20 hover:bg-[#2d5f96]"
          }`}
        >
          <ShoppingBag size={12} className="flex-shrink-0" />
          <span>{inCart ? "Added to Quote" : "Add to Quote"}</span>
        </button>
      </div>
    </motion.div>
  );
}
