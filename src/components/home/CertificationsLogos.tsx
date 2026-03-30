"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Image from "next/image";

const CERTIFICATION_LOGOS = [
  {
    src: "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774876145/1-GIA-CQTS-HomePage_gywewc.png",
    alt: "Certification 1",
  },
  {
    src: "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774876145/2-ICA-CQTS-HomePage_j1kaqv.png",
    alt: "Certification 2",
  },
  {
    src: "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774876148/3-SLEDB-CQTS-HomePage_xqlktw.png",
    alt: "Certification 3",
  },
  {
    src: "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774876151/4-NGJA-CQTS-HomePage_cdkadk.png",
    alt: "Certification 4",
  },
  {
    src: "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774876149/4-SLGJA-CQTS-HomePage_ngm4gi.png",
    alt: "Certification 5",
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

        <div className="flex flex-nowrap items-center justify-center gap-4 overflow-x-auto sm:gap-6 sm:overflow-visible md:gap-8">
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
