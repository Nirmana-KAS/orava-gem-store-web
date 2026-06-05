"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAGLINES = [
  "Your next masterpiece starts here.",
  "Cut by hand. Verified to the milligram.",
  "Sri Lanka to your atelier in 24 hours.",
  "Stones with provenance, prices with proof.",
];

interface HeroProps {
  totalCount: number;
  stats?: {
    variants: number;
    origins: number;
    shapesCuts: number;
    colours: number;
  };
}

export function Hero({ totalCount, stats }: HeroProps) {
  const statRows = [
    { v: stats?.variants ?? 0,   k: "Variants" },
    { v: stats?.origins ?? 0,    k: "Origins" },
    { v: stats?.shapesCuts ?? 0, k: "Shapes & Cuts" },
    { v: stats?.colours ?? 0,    k: "Colours" },
  ];
  const [tagIdx, setTagIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTagIdx((i) => (i + 1) % TAGLINES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e7f0fa] via-[#f4f8fc] to-white px-6 pb-9 pt-14 text-center">
      <Facets />

      <div className="relative z-10 mx-auto max-w-7xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
          <span className="block h-3 w-3 bg-gradient-to-br from-[#4a86c8] to-[#1f3a8a] [clip-path:polygon(50%_0%,100%_38%,80%_100%,20%_100%,0%_38%)]" />
          Precision-Cut Gemstone Collection
        </span>

        <h1 className="mt-3.5 font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-tight text-navy">
          Our Gemstone <span className="italic text-primary">Collection</span>
        </h1>

        <div className="mt-1.5 flex min-h-[2rem] items-center justify-center gap-2 font-serif text-[1.375rem] italic text-navy-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={tagIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <span className="font-semibold text-primary">&quot;</span>
              {TAGLINES[tagIdx]}
              <span className="font-semibold text-primary">&quot;</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm text-navy shadow-sm">
          <span className="relative inline-block h-2 w-2 rounded-full bg-primary animate-pulse">
            <span className="absolute -inset-1 animate-ping rounded-full border-2 border-primary opacity-40" />
          </span>
          <span>
            <b className="font-bold text-primary">{totalCount}</b> Gemstones in Collection
          </span>
        </div>

        <div className="mx-auto mt-7 grid max-w-3xl grid-cols-2 gap-0 rounded-2xl border border-line bg-white p-3.5 px-2 shadow-sm sm:grid-cols-4">
          {statRows.map((s) => (
            <div
              key={s.k}
              className="px-2 py-2 text-center sm:border-r sm:border-line-2 sm:last:border-r-0"
            >
              <div className="font-serif text-2xl font-semibold text-navy sm:text-2xl">{s.v}</div>
              <div className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-muted">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Facets() {
  const facets = [
    { className: "top-[18%] left-[8%]  h-[140px] w-[140px] [clip-path:polygon(50%_0%,100%_38%,80%_100%,20%_100%,0%_38%)]", delay: -2 },
    { className: "top-[60%] left-[18%] h-[90px]  w-[90px]  [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]",          delay: -8 },
    { className: "top-[12%] right-[10%] h-[160px] w-[160px] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]", delay: -5 },
    { className: "top-[65%] right-[20%] h-[80px] w-[80px]   [clip-path:polygon(30%_0%,70%_0%,100%_50%,70%_100%,30%_100%,0%_50%)]", delay: -12 },
    { className: "top-[38%] left-[45%]  h-[50px] w-[50px]   [clip-path:polygon(50%_0%,100%_38%,80%_100%,20%_100%,0%_38%)] opacity-50", delay: -3 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {facets.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute border border-primary/10 bg-gradient-to-br from-primary/15 to-primary/[0.04] ${f.className}`}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -30, 15, 0],
            rotate: [0, 18, -12, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: f.delay,
          }}
        />
      ))}
    </div>
  );
}
