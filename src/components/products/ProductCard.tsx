"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Gem, MapPin, ShoppingBag } from "lucide-react";
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

        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#1a1a2e]/85 via-[#1a1a2e]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="grid w-full grid-cols-2 gap-x-3 gap-y-1.5 p-3 text-white">
            {product.clarityType ? (
              <div>
                <p className="text-[8px] uppercase tracking-wider text-white/60">
                  Clarity
                </p>
                <p className="truncate text-[11px] font-semibold">
                  {product.clarityType}
                </p>
              </div>
            ) : null}
            {conditionLabel(product.condition) ? (
              <div>
                <p className="text-[8px] uppercase tracking-wider text-white/60">
                  Treatment
                </p>
                <p className="truncate text-[11px] font-semibold">
                  {conditionLabel(product.condition)}
                </p>
              </div>
            ) : null}
            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/60">
                Size
              </p>
              <p className="truncate text-[11px] font-semibold">{product.size}</p>
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-wider text-white/60">
                Color
              </p>
              <p className="truncate text-[11px] font-semibold">
                {product.colorName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2.5 sm:p-3">
        <div className="mb-1 flex items-center justify-between gap-1 text-[9px] text-[#8f8b8f] sm:text-[10px]">
          <span className="inline-flex items-center gap-1">
            <MapPin size={9} />
            {product.origin}
          </span>
          <span className="font-mono uppercase">{product.id.slice(0, 8)}</span>
        </div>
        <p className="mb-2 line-clamp-1 text-xs font-semibold leading-tight text-[#1a1a2e] sm:text-sm">
          {product.name}
        </p>

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
              Shape
            </p>
            <p className="truncate text-[10px] font-medium text-[#4a4a6a] sm:text-xs">
              {product.shape}
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
        <div className="mb-2 flex items-center justify-between">
          {product.price ? (
            <p className="text-sm font-bold text-[#3c74ae] sm:text-base">
              ${product.price.toLocaleString()}
              <span className="ml-1 text-[9px] font-normal text-[#8f8b8f]">
                USD
              </span>
            </p>
          ) : (
            <p className="text-[10px] italic leading-tight text-[#8f8b8f] sm:text-xs">
              Contact for Price
            </p>
          )}
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#3c74ae] opacity-0 transition-opacity group-hover:opacity-100">
            View
            <ArrowRight size={10} />
          </span>
        </div>

        <button
          type="button"
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
