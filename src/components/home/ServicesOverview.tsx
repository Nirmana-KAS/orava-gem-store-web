"use client";

import { motion } from "framer-motion";
import { Clock3, Scissors, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Cutting & Calibration",
    description:
      "Our experienced team cuts Rounds, Cabochons, Baguettes and Beads to your exact specifications using the latest cutting techniques.",
    highlighted: true,
  },
  {
    icon: Clock3,
    title: "24-Hour Dispatch",
    description:
      "Fast, reliable global dispatch within 24 hours after your order is completed and quality approved.",
    highlighted: true,
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Computer Vision technology and precision measuring equipment ensure every stone meets our exacting standards before delivery.",
    highlighted: true,
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
          Our Major Services
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#3c74ae]" />
        <p className="mt-3 text-center text-sm text-[#8f8b8f] sm:text-base">
          Delivering precision and excellence in every stone we cut
        </p>

        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className={`h-full rounded-2xl border p-4 sm:p-6 ${
                    service.highlighted
                      ? "border-[#3c74ae]/25 bg-gradient-to-b from-[#f4f9ff] to-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_20px_rgba(60,116,174,0.12)]"
                      : "border-[#dde2e8] bg-[#f8fafc]"
                  }`}
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0f9] text-[#3c74ae]">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1a1a2e] sm:text-lg">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#4a4a6a] sm:text-sm">
                    {service.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
