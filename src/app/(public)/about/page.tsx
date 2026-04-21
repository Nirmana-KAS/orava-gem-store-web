import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Building2,
  Crown,
  Globe2,
  Ruler,
  ShieldCheck,
  Sparkles,
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
  // TODO: Replace with real facility photography (cutting floor, QA lab, office, etc.)
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670614/01-CGC-PCB_i1fxak.png",
    caption: "Precision cutting floor",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670609/05-CGC-PCB_aza3p8.png",
    caption: "Calibration & inspection",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670768/01-BGM-PCB_lpovnf.png",
    caption: "Bespoke design studio",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670764/02-BGM-PCB_gonmef.png",
    caption: "Quality assurance lab",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776670770/05-BGM-PCB_fio3ub.png",
    caption: "Finishing & export packing",
  },
];

// TODO: Replace placeholder image and details with the real award once shared.
const AWARD = {
  image:
    "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671013/03-SLEDB-CQTS_ntxycj.png",
  title: "Best Gemstone Exporter",
  awardedBy: "Sri Lanka Export Development Board",
  year: "2024",
  description:
    "Recognised for outstanding contribution to Sri Lanka's gem and jewellery export sector — honouring two decades of uncompromising quality, precision craftsmanship, and international partnerships.",
};

const MISSION_VALUES = [
  {
    icon: Ruler,
    title: "Precision",
    description:
      "Every stone calibrated to the micron. No compromises — from 0.5 mm calibration cuts to bespoke bench work.",
  },
  {
    icon: Crown,
    title: "Heritage",
    description:
      "Two decades serving the world's most discerning luxury watch and jewellery brands, on every order.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "A trusted Sri Lankan export partner for fine workshops across four continents.",
  },
];

const GROWTH_CHAPTERS = [
  {
    range: "2006 — 2011",
    title: "Founding",
    description:
      "ORAVA is founded in Colombo, Sri Lanka — built on a simple promise: deliver precision-cut coloured gemstones to an exemplary standard.",
    achievements: ["Founded in Colombo", "First export shipments"],
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

const CERT_GROUPS = [
  {
    title: "International Certifications",
    caption: "Recognised by leading global gemmological bodies.",
    logos: [
      {
        src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671011/01-GIA-CQTS_jb0kld.png",
        alt: "GIA — Gemological Institute of America",
      },
      {
        src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776671011/02-ICA-CQTS_jdmajv.png",
        alt: "ICA — International Colored Gemstone Association",
      },
    ],
  },
  {
    title: "National Memberships & Standards",
    caption: "Registered with Sri Lanka's national gem and export authorities.",
    logos: [
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
    ],
  },
];

const TEAM = [
  "Operations Director",
  "Quality Lead",
  "Production Manager",
  "Export Coordinator",
];

// ─── PAGE ────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:space-y-20 sm:py-14">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-[#dbe3f2] bg-gradient-to-br from-[#e8f0f9] via-white to-white p-8 sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3c74ae] backdrop-blur">
          <Sparkles size={12} /> Est. 2006 · Colombo, Sri Lanka
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

      {/* MISSION & VALUES — replaces the previous stats strip */}
      <section aria-labelledby="mission-heading">
        <ScrollReveal>
          <div className="mb-6 text-center">
            <h2
              id="mission-heading"
              className="font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl"
            >
              What We Stand For
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#8f8b8f] sm:text-base">
              The three principles that have guided every stone we&apos;ve cut
              for two decades.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {MISSION_VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <article className="h-full rounded-2xl border border-[#dde2e8] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3c74ae]/30 hover:shadow-lg hover:shadow-[#3c74ae]/5">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae]">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#1a1a2e]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a4a6a]">
                    {value.description}
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
              From a Colombo workshop to a global name.
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
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
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

        <div className="space-y-5">
          {CERT_GROUPS.map((group, gi) => (
            <ScrollReveal key={group.title} delay={gi * 0.06}>
              <article className="rounded-2xl border border-[#dde2e8] bg-white p-6 sm:p-8">
                <header className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="inline-flex items-center gap-2 font-heading text-base font-bold text-[#1a1a2e] sm:text-lg">
                    <Award size={16} className="text-[#3c74ae]" />
                    {group.title}
                  </h3>
                  <p className="text-xs text-[#8f8b8f] sm:text-sm">
                    {group.caption}
                  </p>
                </header>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  {group.logos.map((logo) => (
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
          ))}
        </div>

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

      {/* TEAM (unchanged structurally) */}
      <section aria-labelledby="team-heading">
        <ScrollReveal>
          <div className="mb-6 text-center">
            <h2
              id="team-heading"
              className="font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl"
            >
              Led by Experienced Hands
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#8f8b8f]">
              Operational discipline, export-grade quality, and a single
              standard of excellence.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-4">
          {TEAM.map((role, index) => (
            <ScrollReveal key={role} delay={index * 0.06}>
              <article className="rounded-xl border border-[#dde2e8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 h-20 rounded-lg bg-gradient-to-r from-[#e8f0f9] to-[#f5f7fa]" />
                <h3 className="font-semibold text-[#1a1a2e]">{role}</h3>
                <p className="mt-2 text-sm text-[#4a4a6a]">
                  Experienced leadership with export-grade operational
                  discipline.
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
