"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";

const CERTIFICATION_LOGOS = [
  {
    src: "/certifications/cert-1.png",
    alt: "Certification 1",
  },
  {
    src: "/certifications/cert-2.png",
    alt: "Certification 2",
  },
  {
    src: "/certifications/cert-3.png",
    alt: "Certification 3",
  },
];

export function CertificationsLogos() {
  return (
    <section className="border-t border-[#dde2e8] bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
            <Award size={12} />
            Standards & Certifications
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#1a1a2e] sm:text-3xl">
            Certified Quality. Trusted Standards.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#8f8b8f]">
            Every gemstone meets internationally recognized grading and quality
            standards.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {CERTIFICATION_LOGOS.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative flex h-16 w-28 items-center justify-center sm:h-20 sm:w-32 md:w-36"
            >
              <div className="relative h-full w-full grayscale opacity-60 transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 112px, 144px"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-10 max-w-lg text-center text-xs leading-relaxed text-[#8f8b8f]"
        >
          ORAVA (Pvt) Ltd. is registered with the Sri Lanka Export Development
          Board (SLEDB) and operates to the highest international gemstone
          quality standards. Certified reports available on request.
        </motion.p>
      </div>
    </section>
  );
}
