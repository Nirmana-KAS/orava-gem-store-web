"use client";

import { motion } from "framer-motion";

const TICKER_ITEMS = [
  { text: "Ceylon Sapphires", icon: "✦" },
  { text: "Burmese Rubies", icon: "✦" },
  { text: "Colombian Emeralds", icon: "✦" },
  { text: "Certified Gemstones", icon: "✦" },
  { text: "24h Worldwide Delivery", icon: "✦" },
  { text: "Precision Cut Since 2006", icon: "✦" },
  { text: "SLEDB Registered Exporter", icon: "✦" },
  { text: "Custom Cuts Available", icon: "✦" },
  { text: "Lot-Wise Supply", icon: "✦" },
  { text: "Watch & Jewelry Specialists", icon: "✦" },
  { text: "Bespoke Gemstone Solutions", icon: "✦" },
  { text: "Computer Vision QA", icon: "✦" },
];

export function MarqueeTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#1a1a2e]/20 bg-[#1a1a2e] py-3.5">
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-[#1a1a2e] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-[#1a1a2e] to-transparent" />

      <motion.div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 35s linear infinite",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className="mx-6 inline-flex flex-shrink-0 items-center gap-3"
          >
            <span
              className="flex-shrink-0 text-sm font-bold leading-none text-[#3c74ae]"
              style={{ fontSize: "10px" }}
            >
              {item.icon}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-white/80 transition-colors duration-200 hover:text-white sm:text-sm">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
