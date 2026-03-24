"use client";

import { motion } from "framer-motion";
import { Gem, Palette, Scissors, ShieldCheck } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/BentoGrid";

const services = [
  {
    icon: Scissors,
    title: "Cutting & Calibration",
    description:
      "Our experienced team cuts Rounds, Cabochons, Baguettes and Beads to your exact specifications using the latest cutting techniques.",
    className:
      "md:col-span-2 border-l-4 border-l-[#3c74ae] bg-[#f5f7fa] hover:bg-[#e8f0f9]",
  },
  {
    icon: Gem,
    title: "Stone Sourcing",
    description:
      "Sapphire, ruby, emeralds and semi-precious materials sourced from reliable industry suppliers worldwide.",
  },
  {
    icon: Palette,
    title: "Colour Grading & Matching",
    description:
      "Expert blending and matching of coloured stones to create perfectly consistent sets for your requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Computer Vision technology and precision measuring equipment ensure every stone meets our exacting standards before delivery.",
    className: "md:col-span-2",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-4xl font-bold text-[#1a1a2e]">
          Our Services
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#3c74ae]" />
        <p className="mt-3 text-center text-[#8f8b8f]">
          Delivering precision and excellence in every stone we cut
        </p>

        <div className="mt-12">
          <BentoGrid>
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className="h-full"
              >
                <BentoGridItem
                  title={service.title}
                  description={service.description}
                  icon={<service.icon size={18} />}
                  className={`h-full rounded-2xl p-8 transition hover:scale-[1.02] hover:shadow-md ${service.className || ""}`}
                />
              </motion.div>
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
