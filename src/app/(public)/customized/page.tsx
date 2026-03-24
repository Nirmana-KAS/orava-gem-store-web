import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Customized",
  description: "Bespoke gemstone solutions with ultra-precision finishing.",
};

const capabilities = [
  "Any custom diagram or shape",
  "0.5mm to 10mm ultra-precision finishing",
  "Computer Vision quality check",
  "24hr dispatch after completion",
  "Complex lot-matching by hue and tone",
  "Microscope-level edge and polish validation",
];

const processSteps = [
  "Consultation & feasibility review",
  "Design/CAD alignment",
  "Prototype stone approval",
  "Batch production with QA",
  "Final packing and global dispatch",
];

export default function CustomizedPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <section className="rounded-2xl border border-[#dbe3f2] bg-gradient-to-r from-[#e8f0f9] to-white p-10 text-center">
        <h1 className="font-heading text-5xl text-[#1a1a2e]">
          Bespoke Gemstone Solutions
        </h1>
        <p className="mt-3 text-[#4a4a6a]">
          Custom engineering for high-spec watch and jewelry programs.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {capabilities.map((c, index) => (
          <ScrollReveal key={c} delay={index * 0.06}>
            <article className="rounded-xl border border-[#dde2e8] bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-[#1a1a2e]">Capability</h3>
              <p className="mt-2 text-sm text-[#4a4a6a]">{c}</p>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative h-44 overflow-hidden rounded-xl border border-[#dde2e8]"
          >
            <Image
              src={`https://res.cloudinary.com/demo/image/upload/sample.jpg?i=${i}`}
              alt="Custom gem sample"
              fill
              className="object-cover"
              sizes="(max-width:768px) 50vw, 33vw"
            />
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[#c9d9ec] bg-gradient-to-r from-[#f5f7fa] to-white p-6">
        <h2 className="font-heading text-3xl text-brand-blue">
          Technology & Precision Showcase
        </h2>
        <p className="mt-2 text-[#4a4a6a]">
          We combine CNC micro-cutting, laser-guided shaping, and computer
          vision quality validation for repeatable luxury-grade results.
        </p>
      </section>

      <section className="rounded-2xl border border-[#dde2e8] bg-white p-6">
        <h2 className="font-heading text-3xl text-[#1a1a2e]">5-Step Process</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-lg border border-[#dbe3f2] bg-[#f8fbff] px-3 py-4 text-sm text-[#4a4a6a]"
            >
              <span className="mb-2 block text-xs font-semibold text-brand-blue">
                Step {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/quotation?type=CUSTOMIZED">
          <Button>Submit Custom Inquiry</Button>
        </Link>
        <Link href="/quotation?meeting=CUSTOMIZED">
          <Button variant="outline">Schedule a Consultation</Button>
        </Link>
      </div>
    </main>
  );
}
