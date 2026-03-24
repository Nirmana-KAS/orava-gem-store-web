import type { Metadata } from "next";
import {
  Gem,
  Gauge,
  Microscope,
  Palette,
  ScanLine,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CNC, laser cutting, grading, sourcing and custom finishing services.",
};

const services = [
  {
    icon: Wrench,
    title: "CNC Premium Cutting & Finishing",
    description:
      "Micro-precision cuts with repeatable geometry for production-grade consistency.",
  },
  {
    icon: ScanLine,
    title: "Laser Cutting",
    description:
      "Laser-guided shaping for tight tolerance and flawless edge behavior.",
  },
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
    title: "Custom Diagram Cutting",
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
