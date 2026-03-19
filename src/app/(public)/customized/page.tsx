import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Customized",
  description: "Bespoke gemstone solutions with ultra-precision finishing.",
};

const capabilities = [
  "Any custom diagram or shape",
  "0.5mm to 10mm ultra-precision finishing",
  "Computer Vision quality check",
  "24hr delivery after completion",
];

export default function CustomizedPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="rounded-xl border border-white/10 bg-gradient-to-r from-black to-dark-surface p-10 text-center">
        <h1 className="font-heading text-5xl">Bespoke Gemstone Solutions</h1>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {capabilities.map((c) => (
          <Card key={c}>{c}</Card>
        ))}
      </section>
      <section className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="relative h-44 overflow-hidden rounded-lg border border-white/10">
            <Image src={`https://res.cloudinary.com/demo/image/upload/sample.jpg?i=${i}`} alt="Custom gem sample" fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
          </div>
        ))}
      </section>
      <section className="mt-8 rounded-xl border border-white/10 bg-dark-surface p-6">
        <h2 className="font-heading text-3xl">How Custom Orders Work</h2>
        <p className="mt-2 text-zinc-300">Consultation → Specs → Sample → Production → Delivery</p>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
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

