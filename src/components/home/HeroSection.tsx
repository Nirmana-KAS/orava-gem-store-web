"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-gradient-to-br from-black via-dark to-dark-surface px-4 text-center">
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(201,168,76,0.3)_1px,transparent_0)] [background-size:26px_26px]" />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ willChange: "transform" }} className="relative z-10 max-w-4xl">
        <span className="inline-block rounded-full border border-gold/60 px-3 py-1 text-xs text-gold">Sri Lanka&apos;s Premier Gemstone Exporter</span>
        <h1 className="mt-6 font-heading text-5xl leading-tight text-white md:text-7xl">Beauty Crafted To An Exemplary Standard</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
          Precision-cut coloured gemstones since 2006 for global luxury watch and jewelry brands.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/products">
            <Button>Explore Collection</Button>
          </Link>
          <Link href="/quotation">
            <Button variant="outline">Request Inquiry</Button>
          </Link>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute -top-8 right-20 h-24 w-24 animate-float rounded-full bg-gold/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-16 left-12 h-28 w-28 animate-float rounded-full bg-gold/10 blur-2xl [animation-delay:1s]" />
    </section>
  );
}

