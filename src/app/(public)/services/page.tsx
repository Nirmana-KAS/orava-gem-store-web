import type { Metadata } from "next";
import { Gauge, Gem, Microscope, Palette, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Calibration, colour grading, quality assurance and bespoke diagram gemstone cutting services.",
};

const BANNER_IMAGES = [
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757753/Gemini_Generated_Image_pwf1zspwf1zspwf1_f5lklm.png",
    caption: "Precision cutting floor",
    eyebrow: "Precision Cutting",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757742/Gemini_Generated_Image_s0z1mts0z1mts0z1_tkuqvi.png",
    caption: "Calibration & inspection",
    eyebrow: "Calibration",
  },
  {
    src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1776757779/Gemini_Generated_Image_ie80lqie80lqie80_uthyzq.png",
    caption: "Bespoke design studio",
    eyebrow: "Bespoke",
  },
];

const services = [
  {
    icon: Gauge,
    title: "Calibration & Measurement",
    description:
      "0.5mm to 10mm calibrated output for watch and jewelry assemblies.",
  },
  {
    icon: Palette,
    title: "Colour Grading & Matching",
    description: "Uniform hue and saturation matching across production lots.",
  },
  {
    icon: Microscope,
    title: "Quality Assurance",
    description:
      "Computer vision and manual inspection for inclusion and surface checks.",
  },
  {
    icon: Gem,
    title: "Bespoke Diagrams Gemstones",
    description:
      "Client-specific geometry translated into high-fidelity finished stones.",
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10">
      <section className="rounded-2xl border border-[#dbe3f2] bg-gradient-to-r from-[#e8f0f9] to-white p-10 text-center">
        <h1 className="font-heading text-5xl text-[#1a1a2e]">Our Services</h1>
        <p className="mt-3 text-[#4a4a6a]">
          Precision, consistency, and luxury-grade output for global brands.
        </p>
      </section>

      {/* SERVICES BANNER MOSAIC */}
      <section aria-labelledby="services-banner-heading" className="space-y-5">
        <ScrollReveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#3c74ae]">
                <Sparkles size={12} /> Craft in Motion
              </span>
              <h2
                id="services-banner-heading"
                className="mt-1 font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl"
              >
                Precision, from rough to finished.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#8f8b8f]">
              Every service performed in-house under the same disciplined eye.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:h-[460px] md:grid-cols-3 md:grid-rows-2">
          {BANNER_IMAGES.map((image, i) => {
            const isFeature = i === 0;
            return (
              <ScrollReveal
                key={image.src}
                delay={i * 0.08}
                className={
                  isFeature ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
                }
              >
                <figure
                  className={`group relative h-full overflow-hidden rounded-2xl border border-[#dde2e8] bg-[#f5f7fa] ${
                    isFeature ? "min-h-[260px]" : "min-h-[200px]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      isFeature
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    priority={isFeature}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-[#1a1a2e]/20 to-transparent transition-opacity duration-300 group-hover:from-[#1a1a2e]/85"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3c74ae] shadow-sm">
                      {image.eyebrow}
                    </span>
                    <p
                      className={`mt-2 font-heading font-bold text-white drop-shadow-md ${
                        isFeature ? "text-lg sm:text-2xl" : "text-base sm:text-lg"
                      }`}
                    >
                      {image.caption}
                    </p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <article className="rounded-2xl border border-[#dde2e8] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue-light">
                  <Icon size={20} className="text-brand-blue" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-[#4a4a6a]">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/quotation?type=SERVICE">
                    <Button>Make Inquiry</Button>
                  </Link>
                  <Link href="/quotation?meeting=SERVICE">
                    <Button variant="outline">Request Meeting</Button>
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </section>

      <section className="space-y-4">
        {services.slice(0, 3).map((service, index) => (
          <ScrollReveal key={`${service.title}-alt`} delay={index * 0.08}>
            <article
              className={`grid items-center gap-4 rounded-2xl border border-[#dbe3f2] bg-white p-6 ${index % 2 === 0 ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[auto_1fr]"}`}
            >
              <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                <h3 className="text-xl font-semibold text-[#1a1a2e]">
                  {service.title}
                </h3>
                <p className="mt-2 text-[#4a4a6a]">{service.description}</p>
              </div>
              <div
                className={`rounded-xl bg-[#f5f7fa] px-4 py-3 text-sm text-brand-blue ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}
              >
                Alternating production lane for balanced throughput.
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section className="rounded-2xl border border-[#c9d9ec] bg-gradient-to-r from-[#3c74ae] to-[#5b92ca] p-8 text-center text-white">
        <h2 className="font-heading text-4xl">
          Ready to discuss your precision requirements?
        </h2>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/quotation?type=SERVICE">
            <Button className="bg-white text-brand-blue hover:bg-[#f0f6fc]">
              Make Inquiry
            </Button>
          </Link>
          <Link href="/quotation?meeting=SERVICE">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Request Meeting
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
