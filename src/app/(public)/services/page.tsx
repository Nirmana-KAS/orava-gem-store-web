import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Services",
  description: "CNC, laser cutting, grading, sourcing and custom finishing services.",
};

const services = [
  "CNC Premium Cutting & Finishing",
  "Laser Cutting",
  "Size Range: 0.5mm to 10mm precision",
  "Custom Diagram Cutting",
  "Gem Finishing & Polishing",
  "Colour Grading & Matching",
  "Stone Sourcing & Quality Assurance",
  "Calibration & Measurement",
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="rounded-xl border border-white/10 bg-gradient-to-r from-black to-dark-surface p-10 text-center">
        <h1 className="font-heading text-5xl">Our Services</h1>
        <p className="mt-3 text-zinc-300">Precision, consistency, and luxury-grade output for global brands.</p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service}>
            <h3 className="font-semibold">{service}</h3>
            <p className="mt-2 text-sm text-zinc-300">
              High-precision workflow engineered for premium gemstone manufacturing and export compliance.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/quotation?type=SERVICE">
                <Button>Make Inquiry</Button>
              </Link>
              <Link href="/quotation?meeting=SERVICE">
                <Button variant="outline">Request Meeting</Button>
              </Link>
            </div>
          </Card>
        ))}
      </section>
      <section className="mt-10 rounded-xl border border-white/10 bg-dark-surface p-6">
        <h2 className="font-heading text-3xl">Our Workflow</h2>
        <p className="mt-2 text-zinc-300">Submit → Review → Confirm → Deliver</p>
      </section>
    </main>
  );
}

