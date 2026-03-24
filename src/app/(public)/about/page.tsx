import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description: "About ORAVA (Pvt) Ltd and our gemstone export legacy.",
};

export default function AboutPage() {
  const timeline = [
    { year: "2006", event: "ORAVA founded in Sri Lanka" },
    { year: "2012", event: "Expanded calibrated production lines" },
    { year: "2018", event: "Adopted computer vision QA" },
    { year: "2023", event: "Scaled international export coverage" },
  ];
  const team = [
    "Operations Director",
    "Quality Lead",
    "Production Manager",
    "Export Coordinator",
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <section className="rounded-2xl border border-[#dbe3f2] bg-gradient-to-r from-[#e8f0f9] to-white p-10">
        <h1 className="font-heading text-5xl text-[#1a1a2e]">About ORAVA</h1>
        <p className="mt-3 text-[#4a4a6a]">
          Founded in 2006 in Sri Lanka, ORAVA specializes in precision gemstone
          manufacturing and export.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {["18+ Years", "500+ Clients", "50+ Countries", "24h Dispatch"].map(
          (stat, i) => (
            <ScrollReveal key={stat} delay={i * 0.07}>
              <article className="rounded-xl border border-[#dde2e8] bg-white p-5 text-center shadow-sm">
                <p className="font-heading text-3xl text-brand-blue">
                  {stat.split(" ")[0]}
                </p>
                <p className="mt-1 text-sm text-[#4a4a6a]">
                  {stat.split(" ").slice(1).join(" ")}
                </p>
              </article>
            </ScrollReveal>
          ),
        )}
      </section>

      <section className="rounded-2xl border border-[#dde2e8] bg-white p-6">
        <h2 className="font-heading text-3xl text-[#1a1a2e]">
          Company Timeline
        </h2>
        <div className="relative mt-5 space-y-4 border-l-2 border-brand-blue pl-6">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-brand-blue" />
              <p className="text-sm font-semibold text-brand-blue">
                {item.year}
              </p>
              <p className="text-[#4a4a6a]">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {team.map((role, index) => (
          <ScrollReveal key={role} delay={index * 0.06}>
            <article className="rounded-xl border border-[#dde2e8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-3 h-20 rounded-lg bg-gradient-to-r from-[#e8f0f9] to-[#f5f7fa]" />
              <h3 className="font-semibold text-[#1a1a2e]">{role}</h3>
              <p className="mt-2 text-sm text-[#4a4a6a]">
                Experienced leadership with export-grade operational discipline.
              </p>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section className="rounded-2xl border border-[#dde2e8] bg-[#f5f7fa] p-6">
        <h2 className="font-heading text-3xl text-[#1a1a2e]">Certifications</h2>
        <p className="mt-2 text-[#4a4a6a]">
          SLEDB aligned processes, internal QA standards, and traceable quality
          documentation for export operations.
        </p>
      </section>
    </main>
  );
}
