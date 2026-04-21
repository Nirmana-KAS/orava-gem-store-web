import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Building2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description: "About ORAVA (Pvt) Ltd and our gemstone export legacy.",
};

// ─── CONTENT CONSTANTS ────────────────────────────────────
// NOTE FOR MAINTAINERS — the constants in this block are the only things to
// edit when real photographs or updated award details become available.
// Keeping them at the top of the file so content can be updated without
// touching layout.

const FACILITY_PHOTOS: { src: string; caption: string }[] = [
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757753/Gemini_Generated_Image_pwf1zspwf1zspwf1_f5lklm.png",
    caption: "Precision cutting floor",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757742/Gemini_Generated_Image_s0z1mts0z1mts0z1_tkuqvi.png",
    caption: "Calibration & inspection",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757779/Gemini_Generated_Image_ie80lqie80lqie80_uthyzq.png",
    caption: "Bespoke design studio",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757829/Gemini_Generated_Image_wgwnadwgwnadwgwn_zaeam1.png",
    caption: "Quality assurance lab",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757858/Gemini_Generated_Image_za423dza423dza42_mxnut3.png",
    caption: "Finishing & export packing",
  },
];

const AWARD = {
  image:
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757177/Orava_Private_Limited_s_ygcq6y.webp",
  title: "Presidential Export Award Winner 2024/25",
  awardedBy: "Sri Lanka Export Development Board (SLEDB)",
  year: "2024/25",
  description:
    "Orava (Private) Limited has been recognised as the recipient of the Gems award at the Presidential Export Awards, organised annually by the Sri Lanka Export Development Board (SLEDB), in recognition of the company's outstanding export performance during the financial year 2024/25.",
  link: "https://pea.edb.gov.lk/home/company/105/orava-private-limited",
};

const STORY_BLOCKS = [
  {
    icon: BookOpen,
    eyebrow: "Our Story",
    title: "Two decades of precision craftsmanship.",
    body:
      "Founded in 2006, Orava (Pvt) Ltd caters to the intricate needs of the fine jewellery and watch sectors, with a mission to exceed the expectations of discerning clients. Orava precision-cuts coloured stones on demand, serving prestigious watch and jewellery brands. This commitment to excellence and integrity defines Orava's esteemed industry presence.",
  },
  {
    icon: Target,
    eyebrow: "Our Mission",
    title: "Exceeding Expectations.",
    body:
      "Orava is dedicated to delivering exceptional quality and service — striving to meet the demands of the most exacting customer, on every single order.",
  },
];

const GROWTH_CHAPTERS = [
  {
    range: "2006 — 2011",
    title: "Founding",
    description:
      "ORAVA is founded in Sri Lanka — built on a simple promise: deliver precision-cut coloured gemstones to an exemplary standard.",
    achievements: ["Sri Lankan foundation", "First export shipments"],
  },
  {
    range: "2012 — 2017",
    title: "Scaling Precision",
    description:
      "Calibrated production lines established. First long-term partnerships with international watchmakers and fine-jewellery houses.",
    achievements: ["Calibrated production", "Global clientele"],
  },
  {
    range: "2018 — 2023",
    title: "Technology & Quality",
    description:
      "Computer vision QA and micron-accurate cutting equipment integrated across the workshop. Export coverage expands beyond 20 countries.",
    achievements: ["Computer-vision QA", "20+ export markets"],
  },
  {
    range: "2024 — Today",
    title: "Global Recognition",
    description:
      "Recognised as one of Sri Lanka's premier gemstone exporters, with certifications from leading international gemmological bodies.",
    achievements: ["National award recognition", "5 global certifications"],
    highlight: true,
  },
];

const CERTIFICATIONS = [
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671011/01-GIA-CQTS_jb0kld.png",
    alt: "GIA — Gemological Institute of America",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671011/02-ICA-CQTS_jdmajv.png",
    alt: "ICA — International Colored Gemstone Association",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671013/03-SLEDB-CQTS_ntxycj.png",
    alt: "SLEDB — Sri Lanka Export Development Board",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671013/04-SLGJA-CQTS_bvpymm.png",
    alt: "SLGJA — Sri Lanka Gem & Jewellery Association",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671037/05-NGJA-CQTS_bptjpk.png",
    alt: "NGJA — National Gem & Jewellery Authority",
  },
];

// ─── PAGE ────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:space-y-20 sm:py-14">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-[#dbe3f2] bg-gradient-to-br from-[#e8f0f9] via-white to-white p-8 sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3c74ae] backdrop-blur">
          <Sparkles size={12} /> Est. 2006 · Sri Lanka
        </span>
        <h1 className="mt-4 font-heading text-4xl font-bold text-[#1a1a2e] sm:text-5xl md:text-6xl">
          About ORAVA
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4a4a6a] sm:text-lg">
          ORAVA (Pvt) Ltd. specialises in precision gemstone manufacturing and
          export — sourcing, cutting, and calibrating coloured gemstones for
          the world&apos;s finest watch and jewellery houses since 2006.
        </p>
      </section>

      {/* OUR STORY & OUR MISSION — replaces the previous stats strip */}
      <section aria-labelledby="story-heading">
        <div className="grid gap-4 md:grid-cols-2">
          {STORY_BLOCKS.map((block, i) => {
            const Icon = block.icon;
            const isFirst = i === 0;
            return (
              <ScrollReveal key={block.eyebrow} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-[#dde2e8] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3c74ae]/30 hover:shadow-lg hover:shadow-[#3c74ae]/5 sm:p-8">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae]">
                    <Icon size={18} />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3c74ae]">
                    {block.eyebrow}
                  </p>
                  <h2
                    {...(isFirst ? { id: "story-heading" } : {})}
                    className="mt-1 font-heading text-xl font-bold text-[#1a1a2e] sm:text-2xl"
                  >
                    {block.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a4a6a] sm:text-base">
                    {block.body}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* GROWTH STORY */}
      <section aria-labelledby="growth-heading">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
              <Sparkles size={12} /> Our Journey
            </span>
            <h2
              id="growth-heading"
              className="mt-3 font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl md:text-4xl"
            >
              From a Sri Lankan workshop to a global name.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#8f8b8f] sm:text-base">
              Four chapters of growth, each unlocking a new level of precision
              and reach.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* vertical progress rail */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#3c74ae]/10 via-[#3c74ae]/60 to-[#1a1a2e] sm:left-6"
          />

          <ol className="space-y-4">
            {GROWTH_CHAPTERS.map((chapter, i) => (
              <ScrollReveal key={chapter.range} delay={i * 0.08}>
                <li className="relative pl-12 sm:pl-16">
                  {/* marker */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[9px] top-6 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white sm:left-[17px] ${
                      chapter.highlight
                        ? "bg-gradient-to-br from-[#3c74ae] to-[#1a1a2e] shadow-lg shadow-[#3c74ae]/40"
                        : "bg-[#3c74ae]"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>

                  {/* chapter card */}
                  <article
                    className={`rounded-2xl border p-5 sm:p-6 ${
                      chapter.highlight
                        ? "border-[#1a1a2e] bg-gradient-to-br from-[#1a1a2e] to-[#1a4a7a] text-white shadow-xl shadow-[#1a1a2e]/10"
                        : "border-[#dde2e8] bg-white"
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p
                        className={`font-heading text-xs font-semibold uppercase tracking-widest ${
                          chapter.highlight
                            ? "text-white/70"
                            : "text-[#3c74ae]"
                        }`}
                      >
                        {chapter.range}
                      </p>
                      <h3
                        className={`font-heading text-xl font-bold sm:text-2xl ${
                          chapter.highlight ? "text-white" : "text-[#1a1a2e]"
                        }`}
                      >
                        {chapter.title}
                      </h3>
                    </div>
                    <p
                      className={`mt-3 text-sm leading-relaxed sm:text-base ${
                        chapter.highlight ? "text-white/85" : "text-[#4a4a6a]"
                      }`}
                    >
                      {chapter.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {chapter.achievements.map((ach) => (
                        <span
                          key={ach}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            chapter.highlight
                              ? "bg-white/10 text-white ring-1 ring-white/20"
                              : "bg-[#e8f0f9] text-[#3c74ae]"
                          }`}
                        >
                          {ach}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* INSIDE OUR FACILITY */}
      <section aria-labelledby="facility-heading">
        <ScrollReveal>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#3c74ae]">
                <Building2 size={12} /> Inside ORAVA
              </span>
              <h2
                id="facility-heading"
                className="mt-1 font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl"
              >
                A glimpse into our workshop.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#8f8b8f]">
              From precision cutting to final quality control — every stone
              passes through the same disciplined hands.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          {FACILITY_PHOTOS.map((photo, i) => {
            // 1st tile spans 2 cols × 2 rows on md+ to make a feature image
            const isFeature = i === 0;
            return (
              <ScrollReveal
                key={photo.src + i}
                delay={i * 0.05}
                className={
                  isFeature
                    ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
                    : ""
                }
              >
                <figure className="group relative h-full min-h-[180px] overflow-hidden rounded-2xl border border-[#dde2e8] bg-[#f5f7fa] sm:min-h-[200px] md:min-h-[220px]">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/70 via-[#1a1a2e]/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-white drop-shadow-md sm:p-4 sm:text-sm">
                    {photo.caption}
                  </figcaption>
                </figure>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* AWARD */}
      <section aria-labelledby="award-heading">
        <ScrollReveal>
          <div className="overflow-hidden rounded-3xl border border-[#dde2e8] bg-gradient-to-br from-white to-[#f5f7fa]">
            <div className="grid items-stretch gap-0 md:grid-cols-5">
              {/* image */}
              <div className="relative aspect-[4/3] min-h-[240px] bg-[#1a1a2e] md:col-span-2 md:aspect-auto">
                <Image
                  src={AWARD.image}
                  alt={`${AWARD.title} — ${AWARD.awardedBy}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/40 via-transparent to-transparent"
                />
              </div>

              {/* text */}
              <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3c74ae]">
                  <Trophy size={12} /> Achievement
                </span>
                <h2
                  id="award-heading"
                  className="mt-3 font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl"
                >
                  {AWARD.title}
                </h2>
                <p className="mt-1 text-sm font-semibold text-[#3c74ae]">
                  {AWARD.awardedBy} · {AWARD.year}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4a4a6a] sm:text-base">
                  {AWARD.description}
                </p>
                <a
                  href={AWARD.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-[#3c74ae] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#3c74ae]/25 transition-all hover:bg-[#2d5f96] active:scale-95"
                >
                  View on SLEDB
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CERTIFICATIONS & MEMBERSHIPS */}
      <section aria-labelledby="certifications-heading">
        <ScrollReveal>
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
              <ShieldCheck size={12} /> Certifications & Memberships
            </span>
            <h2
              id="certifications-heading"
              className="mt-3 font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl"
            >
              Recognised. Registered. Trusted.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#8f8b8f]">
              Accredited by the bodies that matter, internationally and at
              home.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <article className="rounded-2xl border border-[#dde2e8] bg-white p-6 sm:p-10">
            <header className="mb-6 flex flex-col gap-1 text-center sm:mb-8">
              <h3 className="inline-flex items-center justify-center gap-2 font-heading text-base font-bold text-[#1a1a2e] sm:text-lg">
                <Award size={16} className="text-[#3c74ae]" />
                International Certifications & National Memberships
              </h3>
              <p className="text-xs text-[#8f8b8f] sm:text-sm">
                Recognised by leading global gemmological bodies and registered
                with Sri Lanka&apos;s national gem and export authorities.
              </p>
            </header>
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
              {CERTIFICATIONS.map((logo) => (
                <div
                  key={logo.alt}
                  className="group relative h-16 w-28 sm:h-20 sm:w-36"
                >
                  <div className="relative h-full w-full grayscale opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 112px, 144px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </ScrollReveal>

        <p className="mx-auto mt-6 max-w-lg text-center text-xs leading-relaxed text-[#8f8b8f]">
          ORAVA (Pvt) Ltd. operates to the highest international gemstone
          quality standards. Certification reports available on request —{" "}
          <Link
            href="/contact"
            className="font-semibold text-[#3c74ae] hover:underline"
          >
            contact us
          </Link>
          .
        </p>
      </section>

    </main>
  );
}
