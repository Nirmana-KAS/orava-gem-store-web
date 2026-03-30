"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Spotlight } from "@/components/ui/aceternity/SpotlightEffect";
import { TextGenerateEffect } from "@/components/ui/aceternity/TextGenerateEffect";

const HERO_VIDEO_URLS = [
  "https://res.cloudinary.com/dzie1rnt3/video/upload/v1774438042/Generated_Video_March_24_2026_-_3_07PM_jcyvgy.mp4",
  "https://res.cloudinary.com/dzie1rnt3/video/upload/v1774438041/Generated_Video_March_24_2026_-_3_12PM_eyokit.mp4",
  "https://res.cloudinary.com/dzie1rnt3/video/upload/v1774438038/Generated_Video_March_24_2026_-_3_42PM_cbsffk.mp4",
];

const VIDEO_SWITCH_INTERVAL_MS = 6000;
const VIDEO_FADE_MS = 700;

export default function HeroSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      const firstVideo = videoRefs.current[0];
      firstVideo?.play().catch(() => undefined);
      return;
    }

    videoRefs.current.forEach((video) => {
      video?.load();
    });

    const firstVideo = videoRefs.current[0];
    firstVideo?.play().catch(() => undefined);

    const timer = window.setInterval(() => {
      setActiveVideoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % HERO_VIDEO_URLS.length;
        const nextVideo = videoRefs.current[nextIndex];
        const previousVideo = videoRefs.current[prevIndex];

        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => undefined);
        }

        if (previousVideo) {
          window.setTimeout(() => {
            previousVideo.pause();
          }, VIDEO_FADE_MS);
        }

        return nextIndex;
      });
    }, VIDEO_SWITCH_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [isMobile]);

  return (
    <section className="relative z-0 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[radial-gradient(#3c74ae22_1px,transparent_1px)] px-4 pb-10 pt-20 text-center [background-size:24px_24px] sm:min-h-[92vh] sm:[background-size:32px_32px]">
      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          <video
            ref={(element) => {
              videoRefs.current[0] = element;
            }}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={HERO_VIDEO_URLS[0]} type="video/mp4" />
          </video>
        ) : (
          HERO_VIDEO_URLS.map((videoUrl, index) => (
            <video
              key={videoUrl}
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                activeVideoIndex === index ? "opacity-60" : "opacity-0"
              }`}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ))
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/78 via-white/84 to-white/90 sm:from-white/68 sm:via-white/76 sm:to-white/84" />

      <div className="opacity-55 sm:opacity-100">
        <Spotlight />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.2 }}
          className="mx-auto inline-flex rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-sm text-[#3c74ae]"
        >
          Sri Lanka&apos;s Premier Gemstone Exporter Since 2006
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <TextGenerateEffect
            words="Beauty Crafted To An Exemplary Standard"
            className="font-heading text-3xl font-bold leading-tight text-[#1a1a2e] sm:text-5xl md:text-7xl"
          />
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4a4a6a] sm:mt-6 sm:text-lg md:text-xl"
        >
          Precision-cut coloured gemstones on demand for global luxury watch and
          jewelry brands. Founded in 2006, trusted by the world&apos;s most
          discerning clients.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 1 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <Link
            href="/products"
            className="w-full rounded-xl bg-[#3c74ae] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#3c74ae]/25 transition-all hover:bg-[#2d5f96] sm:w-auto sm:py-4"
          >
            Explore Collection
          </Link>
          <Link
            href="/quotation"
            className="w-full rounded-xl border-2 border-white bg-white px-8 py-3.5 font-semibold text-[#3c74ae] shadow-md transition-all hover:bg-[#f7fbff] sm:w-auto sm:py-4"
          >
            Request Inquiry
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            delay: 1.3,
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[#3c74ae] sm:block"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
