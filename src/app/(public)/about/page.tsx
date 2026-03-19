import type { Metadata } from "next";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description: "About ORAVA (Pvt) Ltd and our gemstone export legacy.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="rounded-xl border border-white/10 bg-dark-surface p-10">
        <h1 className="font-heading text-5xl">About ORAVA</h1>
        <p className="mt-3 text-zinc-300">Founded in 2006 in Sri Lanka, ORAVA specializes in precision gemstone manufacturing and export.</p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-gold">Mission</h3>
          <p className="mt-2 text-sm text-zinc-300">Deliver world-class gemstones with speed, precision and consistency.</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-gold">Values</h3>
          <p className="mt-2 text-sm text-zinc-300">Craftsmanship, trust, global reliability, and innovation.</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-gold">Certifications</h3>
          <p className="mt-2 text-sm text-zinc-300">SLEDB membership with export-grade quality process standards.</p>
        </Card>
      </section>
      <section className="mt-8 rounded-xl border border-white/10 bg-dark-surface p-6">
        <h2 className="font-heading text-3xl">Leadership Team</h2>
        <p className="mt-2 text-zinc-300">Director and executive members with decades of gemstone industry experience.</p>
      </section>
    </main>
  );
}

