"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Crown,
  Gem,
  Globe2,
  Ruler,
  Sparkles,
} from "lucide-react";
import { AutoImageSlider } from "@/components/ui/AutoImageSlider";
import { NumberTicker } from "@/components/ui/aceternity/NumberTicker";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FEATURE_IMAGES = [
  "https://res.cloudinary.com/dafsnkkux/image/upload/v1776663773/01-HS_fpkhwg.png",
  "https://res.cloudinary.com/dafsnkkux/image/upload/v1776663753/02-HS_bn8zh4.png",
  "https://res.cloudinary.com/dafsnkkux/image/upload/v1776663749/03-HS_zut9mb.png",
  "https://res.cloudinary.com/dafsnkkux/image/upload/v1776663744/04-HS_bgwlxa.png",
  "https://res.cloudinary.com/dafsnkkux/image/upload/v1776663750/05-HS_wpgca1.png",
  "https://res.cloudinary.com/dafsnkkux/image/upload/v1776663744/06-HS_qlfzvg.png",
];

const CERT_LOGOS = [
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671011/01-GIA-CQTS_jb0kld.png",
    alt: "GIA certification",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671011/02-ICA-CQTS_jdmajv.png",
    alt: "ICA certification",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671013/03-SLEDB-CQTS_ntxycj.png",
    alt: "SLEDB registration",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671013/04-SLGJA-CQTS_bvpymm.png",
    alt: "SLGJA certification",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671037/05-NGJA-CQTS_bptjpk.png",
    alt: "NGJA certification",
  },
];

const SHAPES = [
  "Round",
  "Oval",
  "Cushion",
  "Pear",
  "Emerald",
  "Marquise",
  "Heart",
  "Princess",
];

interface CraftQualityShowcaseProps {
  totalCount: number;
  scrollTargetId?: string;
}

export function CraftQualityShowcase({
  totalCount,
  scrollTargetId = "products-collection-grid",
}: CraftQualityShowcaseProps) {
  const stats = [
    {
      value: 20,
      suffix: "+",
      label: "Years of Expertise",
      icon: Crown,
    },
    {
      value: CERT_LOGOS.length,
      suffix: "",
      label: "Global Certifications",
      icon: Award,
    },
    {
      value: totalCount,
      suffix: "",
      label: totalCount === 1 ? "Gemstone Available" : "Gemstones Available",
      icon: Gem,
    },
  ];

  function scrollToCollection() {
    if (typeof document === "undefined") return;
    document
      .getElementById(scrollTargetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      aria-label="Our craft, quality and capabilities"
      className="bg-gradient-to-b from-white via-[#f5f7fa] to-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8 text-center sm:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
              <Sparkles size={12} />
              Craft • Quality • Capability
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl md:text-4xl">
              More Than a Collection. A Commitment.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#8f8b8f] sm:text-base">
              Every stone below is the result of two decades of expertise,
              ultra-precision cutting, and internationally recognised quality
              standards.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {/* TILE 1 — Signature craftsmanship feature */}
          <ScrollReveal className="md:col-span-3 lg:col-span-4">
            <div className="group relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-[#dde2e8] bg-[#1a1a2e] sm:min-h-[400px] lg:min-h-[420px]">
              <AutoImageSlider
                images={FEATURE_IMAGES}
                alt="ORAVA gemstone craftsmanship"
                interval={4500}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
                  <Crown size={10} /> Signature Craftsmanship
                </span>
                <h3 className="font-heading text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl">
                  From Mine to Masterpiece
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
                  Ceylon sapphires, Burmese rubies, Colombian emeralds —
                  sourced, cut, and calibrated to the world&apos;s most exacting
                  standards since 2006.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* TILE 2 — Stats trio */}
          <ScrollReveal delay={0.05} className="md:col-span-3 lg:col-span-2">
            <div className="flex h-full min-h-[180px] flex-row divide-x divide-[#dde2e8] overflow-hidden rounded-3xl border border-[#dde2e8] bg-white sm:min-h-[220px] lg:min-h-[420px] lg:flex-col lg:divide-x-0 lg:divide-y">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-1 flex-col items-center justify-center p-4 text-center sm:p-6"
                  >
                    <Icon className="mb-2 h-5 w-5 text-[#3c74ae]" />
                    <div className="font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
                      <NumberTicker value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#8f8b8f] sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* TILE 3 — Bespoke / Any Shape */}
          <ScrollReveal delay={0.1} className="md:col-span-3 lg:col-span-2">
            <div className="flex h-full min-h-[200px] flex-col justify-between rounded-3xl border border-[#dde2e8] bg-white p-6">
              <div>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae]">
                  <Gem size={16} />
                </div>
                <h3 className="mt-3 font-heading text-lg font-bold text-[#1a1a2e]">
                  Any Shape. Any Size. Any Design.
                </h3>
                <p className="mt-1 text-sm text-[#8f8b8f]">
                  Bespoke cuts for watchmakers and fine jewellery houses.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {SHAPES.map((shape) => (
                  <span
                    key={shape}
                    className="rounded-full bg-[#f5f7fa] px-2.5 py-1 text-[11px] font-medium text-[#4a4a6a] transition-colors hover:bg-[#e8f0f9] hover:text-[#3c74ae]"
                  >
                    {shape}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* TILE 4 — Precision highlight */}
          <ScrollReveal delay={0.15} className="md:col-span-1 lg:col-span-2">
            <div className="relative flex h-full min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#3c74ae]/30 bg-gradient-to-br from-[#3c74ae] to-[#1a4a7a] p-6 text-center text-white">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <Ruler className="relative mb-2 h-6 w-6 text-white/80" />
              <div className="relative font-heading text-3xl font-bold sm:text-4xl">
                0.5mm
              </div>
              <p className="relative mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                Ultra-Precision Cut
              </p>
            </div>
          </ScrollReveal>

          {/* TILE 5 — Certification logos */}
          <ScrollReveal delay={0.2} className="md:col-span-2 lg:col-span-2">
            <div className="flex h-full min-h-[200px] flex-col rounded-3xl border border-[#dde2e8] bg-white p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#3c74ae]">
                  <Award size={12} /> Certified Quality
                </span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#4a4a6a] transition-colors hover:text-[#3c74ae]"
                >
                  Learn more <ArrowRight size={10} />
                </Link>
              </div>
              <p className="text-sm text-[#4a4a6a]">
                Recognised by leading international and national gemmological
                bodies.
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-center gap-3 pt-4 sm:gap-4">
                {CERT_LOGOS.map((cert) => (
                  <div
                    key={cert.alt}
                    className="relative h-10 w-16 grayscale opacity-70 transition-all duration-300 hover:scale-105 hover:grayscale-0 hover:opacity-100 sm:h-12 sm:w-20"
                  >
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* TILE 6 — CTA strip */}
          <ScrollReveal delay={0.25} className="md:col-span-3 lg:col-span-6">
            <div className="relative flex h-full flex-col items-start justify-between gap-5 overflow-hidden rounded-3xl border border-[#1a1a2e] bg-[#1a1a2e] p-6 text-white sm:flex-row sm:items-center sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/85 backdrop-blur">
                  <Globe2 size={10} /> Ready when you are
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold sm:text-2xl">
                  Explore the full collection — or request a bespoke piece.
                </h3>
              </div>
              <div className="relative flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={scrollToCollection}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3c74ae] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3c74ae]/30 transition-all hover:bg-[#2d5f96] active:scale-95"
                >
                  View Collection <ArrowRight size={14} />
                </button>
                <Link
                  href="/quotation?type=CUSTOMIZED"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white hover:bg-white/15"
                >
                  Custom Inquiry
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
