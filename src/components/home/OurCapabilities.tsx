"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle, Gem, Watch } from "lucide-react";
import Link from "next/link";
import { AutoImageSlider } from "@/components/ui/AutoImageSlider";

export default function OurCapabilities() {
  const watchGemImages = [
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670614/01-CGC-PCB_i1fxak.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670621/02-CGC-PCB_stuaau.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670621/03-CGC-PCB_k4ukgb.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670570/04-CGC-PCB_k13hlr.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670609/05-CGC-PCB_aza3p8.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670575/06-CGC-PCB_lavzu0.png",
  ];

  const jewelryGemImages = [
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670768/01-BGM-PCB_lpovnf.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670764/02-BGM-PCB_gonmef.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670760/03-BGM-PCB_eysptd.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670749/04-BGM-PCB_qkorcj.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670770/05-BGM-PCB_fio3ub.png",
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670783/06-BGM-PCB_sp6zhs.png",
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
            What We Do Best
          </span>
          <h2 className="mt-4 text-center font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Precision. Bespoke. Certification.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#8f8b8f] sm:text-base">
            From calibration gemstone collections to bespoke gemstone
            collections and certified stones, ORAVA delivers world-class quality
            on every order.
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
            <div className="relative overflow-hidden">
              <AutoImageSlider
                images={watchGemImages}
                alt="Calibration Gemstone Collection"
                interval={3000}
                className="h-40 w-full sm:h-48 md:h-52"
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#1a1a2e]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 z-20">
                <Watch className="mb-2 h-9 w-9 rounded-xl bg-[#3c74ae] p-2 text-white" />
                <h3 className="font-heading text-lg font-bold text-white drop-shadow-lg">
                  Calibration Gemstone Collection
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed text-[#4a4a6a]">
                Specialized precision cutting for luxury watch manufacturers.
                Ultra-small sizes from 0.5mm, color-matched lots, and consistent
                calibration for every production run.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "0.5mm Above",
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
            <div className="relative overflow-hidden">
              <AutoImageSlider
                images={jewelryGemImages}
                alt="Bespoke Gemstone Collection"
                interval={3500}
                className="h-40 w-full sm:h-48 md:h-52"
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#1a1a2e]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 z-20">
                <Gem className="mb-2 h-9 w-9 rounded-xl bg-[#3c74ae] p-2 text-white" />
                <h3 className="font-heading text-lg font-bold text-white drop-shadow-lg">
                  Bespoke Gemstone Collection
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed text-[#4a4a6a]">
                Custom designed and precision-cut gemstones for bespoke
                collections. Any shape, any diagram, any design. We bring your
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
