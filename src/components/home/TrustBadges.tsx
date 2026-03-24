"use client";

import { motion } from "framer-motion";
import { Award, Clock, Globe, Users } from "lucide-react";
import { NumberTicker } from "@/components/ui/aceternity/NumberTicker";

const items = [
  { icon: Award, value: 18, suffix: "+", label: "Years of Excellence" },
  { icon: Users, value: 500, suffix: "+", label: "Satisfied Clients" },
  { icon: Globe, value: 50, suffix: "+", label: "Countries Served" },
  { icon: Clock, value: 24, suffix: "h", label: "Worldwide Delivery" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-[#dde2e8] bg-white py-12">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="flex flex-col items-center rounded-2xl bg-white p-4 text-center"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f0f9] text-[#3c74ae]">
                <Icon size={18} />
              </div>
              <p className="font-heading text-4xl font-bold text-[#3c74ae]">
                <NumberTicker
                  value={item.value}
                  suffix={item.suffix}
                  duration={2}
                />
              </p>
              <p className="mt-1 text-sm text-[#8f8b8f]">{item.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
