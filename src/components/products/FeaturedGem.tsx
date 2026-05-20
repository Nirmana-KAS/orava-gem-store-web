"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GemProfile3D } from "./GemProfile3D";

interface FeaturedProduct {
  id: string;
  name: string;
  origin: string;
  shape: string;
  colorName: string;
  colorHex: string;
  weight: number;
  price?: number | null;
  images: string[];
}

export function FeaturedGem() {
  const [product, setProduct] = useState<FeaturedProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          "/api/products?limit=1&sortBy=createdAt&sortOrder=desc&availability=true",
        );
        const data = await res.json();
        if (cancelled) return;
        const items: FeaturedProduct[] = data?.data?.products ?? [];
        setProduct(items[0] ?? null);
      } catch {
        if (!cancelled) setProduct(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !product) return null;

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#1f2547] to-[#1a1a2e] p-6 shadow-2xl sm:p-10 md:p-14"
        >
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#3c74ae]/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#6aa3d6]/20 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="text-white">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6aa3d6] backdrop-blur-sm">
                <Sparkles size={12} />
                Gem of the Week
              </div>

              <h2 className="mb-3 font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {product.name}
              </h2>

              <p className="mb-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                A rare {product.colorName.toLowerCase()} {product.shape.toLowerCase()}{" "}
                {product.weight}ct gemstone, hand-cut and certified from{" "}
                {product.origin}. Available now.
              </p>

              <div className="mb-6 grid grid-cols-3 gap-3">
                <MetaCell value={`${product.weight}`} label="Carats" />
                <MetaCell value={product.shape} label="Shape" />
                <MetaCell
                  value={
                    product.price
                      ? `$${product.price.toLocaleString()}`
                      : "Inquire"
                  }
                  label="Price"
                />
              </div>

              <Link
                href={`/products/${product.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1a1a2e] shadow-lg transition-all hover:bg-[#e8f0f9] hover:shadow-xl"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, ${product.colorHex}55, transparent 65%)`,
                  }}
                />
                <GemProfile3D
                  color={product.colorHex}
                  className="relative h-full w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                />
              </div>
              <div className="pointer-events-none absolute -left-2 top-6 h-3 w-3 animate-pulse rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
              <div className="pointer-events-none absolute -right-3 top-1/3 h-2 w-2 animate-pulse rounded-full bg-[#6aa3d6] shadow-[0_0_10px_rgba(106,163,214,0.9)]" />
              <div className="pointer-events-none absolute bottom-10 -left-3 h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <div className="pointer-events-none absolute -right-1 bottom-4 h-3 w-3 animate-pulse rounded-full bg-[#6aa3d6] shadow-[0_0_12px_rgba(106,163,214,0.9)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetaCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
      <div className="truncate font-heading text-lg font-bold text-white">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-white/60">
        {label}
      </div>
    </div>
  );
}
