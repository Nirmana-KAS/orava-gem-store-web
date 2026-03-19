"use client";

import { motion } from "framer-motion";
import { Compass, Gem, ShieldCheck, Wrench } from "lucide-react";
import Card from "@/components/ui/Card";

const services = [
  { icon: Wrench, title: "Cutting & Calibration", text: "Exact dimensions and brilliant finishing." },
  { icon: Compass, title: "Stone Sourcing", text: "Ethically sourced premium gemstones." },
  { icon: Gem, title: "Colour Grading & Matching", text: "Luxury-grade consistent color selections." },
  { icon: ShieldCheck, title: "Quality Assurance", text: "Computer vision + manual quality checks." },
];

export default function ServicesOverview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-center font-heading text-4xl">Our Services</h2>
      <div className="mx-auto mt-2 h-1 w-20 rounded bg-gold" />
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div key={service.title} whileInView={{ opacity: [0, 1], y: [20, 0] }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ willChange: "transform" }}>
              <Card className="h-full transition hover:-translate-y-1">
                <Icon className="mb-3 text-gold" />
                <h3 className="font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{service.text}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

