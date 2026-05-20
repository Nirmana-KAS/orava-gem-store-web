"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ACTIVITY_MESSAGES } from "@/lib/productsDesignData";

export function ActivityTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % ACTIVITY_MESSAGES.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-y border-[#dde2e8] bg-[#f5f7fa]">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <span className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-[#3c74ae] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Live
        </span>
        <div className="relative h-5 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 truncate text-xs text-[#4a4a6a] sm:text-sm"
            >
              {ACTIVITY_MESSAGES[idx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
