"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Gem, PackageCheck, SearchCheck } from "lucide-react";

const processSteps = [
  {
    icon: SearchCheck,
    title: "Requirement Discovery",
    description:
      "We align on stone type, dimensions, color tone, and delivery timeline before production starts.",
  },
  {
    icon: Gem,
    title: "Sourcing & Selection",
    description:
      "Our team sources premium rough and selects matching lots to maintain consistency across your batch.",
  },
  {
    icon: ClipboardCheck,
    title: "Precision Cutting & QA",
    description:
      "Expert cutting with strict calibration checks and computer vision validation for shape and size accuracy.",
  },
  {
    icon: PackageCheck,
    title: "Dispatch & Delivery",
    description:
      "After final approval, parcels are prepared and dispatched globally within 24 hours.",
  },
];

export default function OurProcess() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Our Process
          </h2>
          <p className="mt-3 text-sm text-[#8f8b8f] sm:text-base">
            A structured workflow designed for quality, speed, and repeatable
            results.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-2xl border border-[#dde2e8] bg-[#f5f7fa] p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0f9] text-[#3c74ae]">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-[#3c74ae]">
                    Step {index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#1a1a2e]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a4a6a]">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
