"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Eye, Package, Scissors } from "lucide-react";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/aceternity/TracingBeam";

const TEAM_PHOTO_URL =
  "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774928473/Team2_thnyrz.png";

const points = [
  {
    icon: Package,
    title: "24-Hour Worldwide Delivery",
    description:
      "Gem parcels delivered within 24 hours after order completion to anywhere in the world",
  },
  {
    icon: Eye,
    title: "Computer Vision Quality Assurance",
    description: "Advanced technology ensures precision in size and shape",
  },
  {
    icon: Scissors,
    title: "Precision Cutting 0.5mm–10mm",
    description: "Any custom diagram or shape with expert finishing",
  },
  {
    icon: Calendar,
    title: "Trusted Since 2006",
    description: "Nearly two decades serving luxury watch and jewelry brands",
  },
  {
    icon: Award,
    title: "SLEDB Registered",
    description: "Sri Lanka Export Development Board certified exporter",
  },
];

export default function WhyOrava() {
  return (
    <section className="bg-[#f5f7fa] py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:items-start md:gap-10">
        <div>
          <h2 className="font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Why Choose ORAVA?
          </h2>
          <p className="mt-2 text-sm text-[#8f8b8f] sm:mt-3 sm:text-base">
            We operate as a precision partner, not just a supplier.
          </p>

          <div className="mt-8">
            <TracingBeam>
              <div className="space-y-6">
                {points.map((point, index) => {
                  const Icon = point.icon;

                  return (
                    <motion.div
                      key={point.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      className="flex gap-3 sm:gap-4"
                    >
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f0f9] text-[#3c74ae]">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#1a1a2e] sm:text-base">
                          {point.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#8f8b8f]">
                          {point.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TracingBeam>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-br from-[#3c74ae] to-[#2d5f96] p-6 text-white shadow-lg sm:p-8"
        >
          <div className="relative mb-5 h-52 overflow-hidden rounded-xl border border-white/25 sm:h-64">
            <Image
              src={TEAM_PHOTO_URL}
              alt="ORAVA team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="font-heading text-xl italic leading-relaxed sm:text-2xl">
            &ldquo;With a passion for excellence, Orava (Private) Limited is
            committed to creating timeless pieces that resonate with the
            discerning tastes of our clients.&rdquo;
          </p>
          <p className="mt-6 text-sm text-white/85">
            — ORAVA (Pvt) Ltd., Founded 2006
          </p>
        </motion.div>
      </div>
    </section>
  );
}
