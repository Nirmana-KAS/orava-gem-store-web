"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle, Gem, Watch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OurCapabilities() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
            What We Do Best
          </span>
          <h2 className="mt-4 text-center font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Precision. Customization. Certification.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#8f8b8f] sm:text-base">
            From custom watch gemstones to certified fine jewelry stones — ORAVA
            delivers world-class quality on every order.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            className="group relative overflow-hidden rounded-3xl border border-[#dde2e8] transition-all duration-400 hover:shadow-xl hover:shadow-[#3c74ae]/10"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/capabilities/watch-gems.jpg"
                alt="Custom watch gemstones"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Watch className="mb-2 h-10 w-10 rounded-xl bg-[#3c74ae] p-2 text-white" />
                <h3 className="font-heading text-xl font-bold text-white">
                  Custom Watch Gemstones
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed text-[#4a4a6a]">
                Specialized precision cutting for luxury watch manufacturers
                worldwide. Ultra-small sizes from 0.5mm, color-matched lots,
                consistent calibration for every production run.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "0.5mm–10mm",
                  "Color-Matched Lots",
                  "Any Custom Shape",
                  "Worldwide Supply",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#e8f0f9] px-3 py-1 text-xs font-medium text-[#3c74ae]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative overflow-hidden rounded-3xl border border-[#dde2e8] transition-all duration-400 hover:shadow-xl hover:shadow-[#3c74ae]/10"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src="/capabilities/jewelry-gems.jpg"
                alt="Bespoke jewelry gemstones"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Gem className="mb-2 h-10 w-10 rounded-xl bg-[#3c74ae] p-2 text-white" />
                <h3 className="font-heading text-xl font-bold text-white">
                  Bespoke Jewelry Solutions
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed text-[#4a4a6a]">
                Custom designed and precision cut gemstones for fine jewelry
                brands. Any shape, any diagram, any design. We bring your
                creative vision to life with flawless execution.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Any Design",
                  "Custom Diagrams",
                  "Calibrated Sets",
                  "Color Grading",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#e8f0f9] px-3 py-1 text-xs font-medium text-[#3c74ae]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative overflow-hidden rounded-3xl border border-[#3c74ae]/30 bg-gradient-to-br from-[#3c74ae] to-[#1a4a7a] transition-all duration-400 hover:shadow-xl hover:shadow-[#3c74ae]/20"
          >
            <div className="p-6 pb-0">
              <Award className="mb-4 h-12 w-12 rounded-2xl bg-white p-2.5 text-[#3c74ae]" />
              <h3 className="font-heading text-xl font-bold text-white">
                World-Standard Certification
              </h3>
            </div>

            <div className="p-6 pt-4">
              <p className="text-sm leading-relaxed text-white/80">
                For clients requiring certified gemstones, we provide
                internationally recognized gem laboratory reports. Every
                certified stone meets the highest global grading standards.
              </p>

              <div className="my-4 border-t border-white/20" />

              <div className="space-y-2">
                {[
                  "International grading standards",
                  "Available for sapphire, ruby, emerald",
                  "Report available on request",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/90"
                  >
                    <CheckCircle size={14} className="text-white/70" />
                    {item}
                  </p>
                ))}
              </div>

              <p className="mt-4 text-xs text-white/60">
                Ask about certification when placing your inquiry
              </p>
            </div>
          </motion.article>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#dde2e8] bg-[#f5f7fa] p-6 sm:flex-row sm:p-8">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#1a1a2e]">
              Ready to discuss your requirements?
            </h3>
            <p className="text-sm text-[#8f8b8f]">
              Our team responds within 24 hours to every inquiry.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/quotation"
              className="rounded-xl bg-[#3c74ae] px-6 py-3 text-center text-white"
            >
              Submit Inquiry
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-[#3c74ae] px-6 py-3 text-center text-[#3c74ae] transition hover:bg-[#e8f0f9]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
