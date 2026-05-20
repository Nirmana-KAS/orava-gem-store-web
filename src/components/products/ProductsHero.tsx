"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import { STATS, TAGLINES } from "@/lib/productsDesignData";

interface ProductsHeroProps {
  totalCount: number;
  loading?: boolean;
}

export function ProductsHero({ totalCount, loading = false }: ProductsHeroProps) {
  const [tagIdx, setTagIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setTagIdx((i) => (i + 1) % TAGLINES.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f0f9] via-white to-white px-4 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#3c74ae]/10 blur-3xl animate-float" />
        <div className="absolute right-10 top-24 h-32 w-32 rotate-45 bg-[#3c74ae]/8 blur-2xl animate-float-delayed" />
        <div className="absolute bottom-12 left-1/4 h-28 w-28 rounded-full bg-[#6aa3d6]/15 blur-2xl animate-float" />
        <div className="absolute bottom-20 right-1/4 h-36 w-36 rotate-12 bg-[#3c74ae]/8 blur-3xl animate-float-delayed" />
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8f0f9]/40 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#3c74ae] shadow-sm backdrop-blur-sm"
        >
          <Gem size={12} />
          Precision-Cut Gemstone Collection
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3 font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Our Gemstone{" "}
          <span className="text-[#3c74ae]">Collection</span>
        </motion.h1>

        <motion.p
          key={tagIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-base italic text-[#4a4a6a] sm:text-lg"
        >
          <span className="text-[#3c74ae]">&ldquo;</span>
          {TAGLINES[tagIdx]}
          <span className="text-[#3c74ae]">&rdquo;</span>
        </motion.p>

        {!loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#dde2e8] bg-white px-5 py-2 shadow-sm"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#3c74ae]" />
            <span className="text-sm font-semibold text-[#1a1a2e]">
              <b>{totalCount.toLocaleString()}</b>{" "}
              <span className="text-[#3c74ae]">
                {totalCount === 1 ? "Gemstone" : "Gemstones"}
              </span>{" "}
              in Collection
            </span>
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4"
        >
          {STATS.map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-[#dde2e8] bg-white/70 p-3 shadow-sm backdrop-blur-sm transition-all hover:border-[#3c74ae]/40 hover:shadow-md"
            >
              <div className="font-heading text-2xl font-bold text-[#3c74ae] sm:text-3xl">
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[#8f8b8f] sm:text-xs">
                {s.k}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
