"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Gem, Heart, MapPin, ShoppingBag } from "lucide-react";
import { useQuotationStore } from "@/store/quotationStore";
import type { ViewMode } from "./ViewToggle";

export interface ProductCardData {
  id: string;
  name: string;
  origin: string;
  shape: string;
  colorName: string;
  colorHex: string;
  size: string;
  weight: number;
  lotQuantity: number;
  clarityType?: string;
  condition?: string;
  price?: number | null;
  availability: boolean;
  images: string[];
}

interface ProductCardProps {
  product: ProductCardData;
  index?: number;
  viewMode?: ViewMode;
}

const CONDITION_LABEL: Record<string, string> = {
  NATURAL: "Natural",
  SEMI_PRESSURE: "Semi-Pressure",
  HEATED: "Heated",
  SYNTHETIC: "Synthetic",
};

function conditionLabel(c: string | undefined) {
  if (!c) return undefined;
  return CONDITION_LABEL[c] ?? c;
}

export function ProductCard({
  product,
  index = 0,
  viewMode = "grid4",
}: ProductCardProps) {
  const router = useRouter();
  const { addItem, isInCart } = useQuotationStore();
  const inCart = isInCart(product.id);
  const isList = viewMode === "list";

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

  function navigate() {
    router.push(`/products/${product.id}`);
  }

  if (isList) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
        onClick={navigate}
        className="group flex cursor-pointer items-stretch gap-4 overflow-hidden rounded-2xl border border-[#dde2e8] bg-white p-3 transition-all duration-300 hover:border-[#3c74ae] hover:shadow-lg hover:shadow-[#3c74ae]/10 sm:p-4"
      >
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#f5f7fa] sm:h-32 sm:w-32">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 30vw, 15vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${product.colorHex}33, ${product.colorHex}88)`,
              }}
            >
              <Gem size={24} className="text-[#3c74ae] opacity-40" />
            </div>
          )}
          {!product.availability ? (
            <div className="absolute left-1 top-1 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              Sold
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-[10px] text-[#8f8b8f]">
              <span className="font-mono uppercase">{product.id.slice(0, 8)}</span>
              <span className="text-[#dde2e8]">•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={9} />
                {product.origin}
              </span>
            </div>
            <h3 className="mb-2 line-clamp-1 font-heading text-base font-bold text-[#1a1a2e] sm:text-lg">
              {product.name}
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#4a4a6a]">
              <span>
                <b className="text-[#1a1a2e]">{product.weight}</b>ct
              </span>
              <span>
                <b className="text-[#1a1a2e]">{product.shape}</b>
              </span>
              {product.clarityType ? (
                <span>
                  <b className="text-[#1a1a2e]">{product.clarityType}</b>
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1">
                <span
                  className="h-2 w-2 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: product.colorHex }}
                />
                <b className="text-[#1a1a2e]">{product.colorName}</b>
              </span>
              {conditionLabel(product.condition) ? (
                <span>
                  <b className="text-[#1a1a2e]">
                    {conditionLabel(product.condition)}
                  </b>
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end justify-between">
          <div className="text-right">
            {product.price ? (
              <p className="text-base font-bold text-[#3c74ae] sm:text-lg">
                ${product.price.toLocaleString()}
                <span className="ml-1 text-[10px] font-normal text-[#8f8b8f]">
                  USD
                </span>
              </p>
            ) : (
              <p className="text-xs italic text-[#8f8b8f]">Contact for Price</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all active:scale-95 ${
              inCart
                ? "border border-green-300 bg-green-50 text-green-700"
                : "bg-[#3c74ae] text-white hover:bg-[#2d5f96]"
            }`}
          >
            <ShoppingBag size={12} />
            {inCart ? "Added" : "Quote"}
          </button>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index, 10) * 0.05 }}
      whileHover={{ y: -3 }}
      onClick={navigate}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#dde2e8] bg-white transition-all duration-300 hover:border-[#3c74ae] hover:shadow-lg hover:shadow-[#3c74ae]/10"
    >
      <div className="relative h-44 w-full overflow-hidden bg-[#f5f7fa] sm:h-48 md:h-52">
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
            <Gem size={36} className="text-[#3c74ae] opacity-40" />
          </div>
        )}

        {product.clarityType ? (
          <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#1a1a2e] shadow-sm backdrop-blur-sm">
            {product.clarityType}
          </span>
        ) : null}

        <div
          aria-hidden="true"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#8f8b8f] shadow-sm backdrop-blur-sm"
        >
          <Heart size={12} />
        </div>

        {!product.availability ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e]/55">
            <span className="rounded-md bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Sold
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center justify-between gap-2 text-[10px] text-[#8f8b8f]">
          <span className="font-mono uppercase tracking-wider">
            ORV-{product.id.slice(-4).toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={10} />
            {product.origin}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-1 font-heading text-base italic text-[#1a1a2e] sm:text-lg">
          {product.name}
        </h3>

        <p className="mb-3 text-xs text-[#8f8b8f]">
          <b className="text-[#1a1a2e]">{product.weight}</b> ct
          <span className="mx-1.5 text-[#dde2e8]">·</span>
          <b className="text-[#1a1a2e]">{product.shape}</b>
          {product.clarityType ? (
            <>
              <span className="mx-1.5 text-[#dde2e8]">·</span>
              <b className="text-[#1a1a2e]">{product.clarityType}</b>
            </>
          ) : null}
        </p>

        <div className="mb-3 flex items-center justify-between">
          {product.price ? (
            <p className="font-semibold text-[#1a1a2e]">
              <span className="text-base sm:text-lg">
                ${product.price.toLocaleString()}
              </span>
              <span className="ml-1 text-[10px] font-normal text-[#8f8b8f]">
                USD
              </span>
            </p>
          ) : (
            <p className="text-xs italic text-[#8f8b8f]">Contact for Price</p>
          )}

          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#3c74ae] transition-transform group-hover:translate-x-0.5">
            View
            <ArrowRight size={12} />
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
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
