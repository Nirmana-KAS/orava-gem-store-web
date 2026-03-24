"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/aceternity/SpotlightEffect";
import { TextGenerateEffect } from "@/components/ui/aceternity/TextGenerateEffect";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 text-center"
      style={{
        backgroundImage: "radial-gradient(#3c74ae22 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <Spotlight />

      <div className="pointer-events-none absolute -top-10 left-[8%] h-56 w-56 animate-float rounded-full bg-[#3c74ae]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[8%] h-44 w-44 animate-float-delayed rounded-full bg-[#3c74ae]/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 h-36 w-36 -translate-x-1/2 animate-float rounded-full bg-[#3c74ae]/8 blur-2xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.2 }}
          className="mx-auto inline-flex rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-sm text-[#3c74ae]"
        >
          Sri Lanka&apos;s Premier Gemstone Exporter Since 2006
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <TextGenerateEffect
            words="Beauty Crafted To An Exemplary Standard"
            className="font-heading text-5xl font-bold leading-tight text-[#1a1a2e] md:text-7xl"
          />
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#4a4a6a] md:text-xl"
        >
          Precision-cut coloured gemstones on demand for global luxury watch and
          jewelry brands. Founded in 2006, trusted by the world&apos;s most
          discerning clients.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/products"
            className="rounded-xl bg-[#3c74ae] px-8 py-4 font-semibold text-white shadow-lg shadow-[#3c74ae]/25 transition-all hover:scale-105 hover:bg-[#2d5f96]"
          >
            Explore Collection
          </Link>
          <Link
            href="/quotation"
            className="rounded-xl border-2 border-[#3c74ae] px-8 py-4 font-semibold text-[#3c74ae] transition-all hover:bg-[#e8f0f9]"
          >
            Request Inquiry
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            delay: 1.3,
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#3c74ae]"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
