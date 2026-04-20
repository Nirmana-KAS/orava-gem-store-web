"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gem, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type GemItem = {
  name: string;
  origin: string;
  image: string;
  fallbackGradient: string;
  cuts: string[];
  capability: string;
  href: string;
};

const gems: GemItem[] = [
  {
    name: "Sapphire",
    origin: "Sri Lanka · Madagascar · Kashmir",
    image: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776662955/01-Sapphire-GCH_cyvwqf.png",
    fallbackGradient: "from-blue-900 to-blue-500",
    cuts: [
      "Round",
      "Oval",
      "Cushion",
      "Emerald Cut",
      "Pear",
      "Marquise",
      "Custom",
    ],
    capability: "Ceylon blue to padparadscha — any shade, precision cut",
    href: "/products?search=sapphire",
  },
  {
    name: "Ruby",
    origin: "Burma · Thailand · Africa",
    image: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776662957/02-Ruby-GCH_k9het9.png",
    fallbackGradient: "from-red-900 to-red-500",
    cuts: ["Round", "Oval", "Cushion", "Cabochon", "Pear", "Custom"],
    capability: "Pigeon blood to rose — vivid reds precision cut to order",
    href: "/products?search=ruby",
  },
  {
    name: "Emerald",
    origin: "Colombia · Brazil · Africa",
    image: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776662957/02-Emerald-GCH_tdry4c.png",
    fallbackGradient: "from-green-900 to-green-600",
    cuts: ["Emerald Cut", "Oval", "Cushion", "Pear", "Round", "Custom"],
    capability: "Vivid green lots — calibrated sets for jewelry and watches",
    href: "/products?search=emerald",
  },
  {
    name: "Semi-Precious",
    origin: "Multiple Origins Worldwide",
    image: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776662965/04-SemiPrecious-GCH_cbdvxc.png",
    fallbackGradient: "from-purple-800 to-amber-500",
    cuts: ["All Shapes", "Beads", "Cabochons", "Calibrated", "Custom"],
    capability:
      "Full range of semi-precious materials sourced and precision cut",
    href: "/products?search=semi",
  },
];

export default function GemstoneHighlights() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="overflow-hidden bg-[#f5f7fa] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
            Our Specialization
          </span>
          <h2 className="text-center font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Gemstone Collection Highlights
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#8f8b8f] sm:text-base">
            Precision-cut sapphires, rubies, emeralds and semi-precious stones.
            Any shape, any design, supplied lot-wise to clients worldwide.
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#3c74ae]" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {gems.map((gem, index) => (
            <motion.article
              key={gem.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-[#dde2e8] bg-white transition-all duration-400 hover:border-[#3c74ae]/30 hover:shadow-xl hover:shadow-[#3c74ae]/10"
            >
              <div className="relative h-48 overflow-hidden sm:h-56">
                {!failedImages[gem.name] ? (
                  <Image
                    src={gem.image}
                    alt={gem.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => {
                      setFailedImages((prev) => ({
                        ...prev,
                        [gem.name]: true,
                      }));
                    }}
                  />
                ) : (
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gem.fallbackGradient}`}
                  >
                    <Gem size={48} className="text-white/50" />
                  </div>
                )}

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-4 z-20">
                  <h3 className="font-heading text-xl font-bold text-white">
                    {gem.name}
                  </h3>
                  <p className="text-xs text-white/80">{gem.origin}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin size={12} className="text-[#3c74ae]" />
                  <span className="text-xs font-medium text-[#8f8b8f]">
                    {gem.origin}
                  </span>
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1a1a2e]">
                  Available Cuts
                </p>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {gem.cuts.map((cut) => (
                    <span
                      key={cut}
                      className="rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-2 py-0.5 text-[10px] font-medium text-[#3c74ae]"
                    >
                      {cut}
                    </span>
                  ))}
                </div>

                <p className="mt-3 border-t border-[#dde2e8] pt-3 text-[10px] text-[#8f8b8f]">
                  Custom shapes & lot-wise supply available
                </p>

                <p className="mt-2 text-[10px] text-[#8f8b8f]">
                  {gem.capability}
                </p>

                <Link
                  href={gem.href}
                  className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#3c74ae] transition-all hover:gap-2"
                >
                  View Collection
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
