"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Spotlight } from "@/components/ui/aceternity/SpotlightEffect";
import { TextGenerateEffect } from "@/components/ui/aceternity/TextGenerateEffect";

const HERO_VIDEO_URLS = [
  "https://res.cloudinary.com/dzie1rnt3/video/upload/v1774438042/Generated_Video_March_24_2026_-_3_07PM_jcyvgy.mp4",
  "https://res.cloudinary.com/dzie1rnt3/video/upload/v1774438041/Generated_Video_March_24_2026_-_3_12PM_eyokit.mp4",
  "https://res.cloudinary.com/dzie1rnt3/video/upload/v1774438038/Generated_Video_March_24_2026_-_3_42PM_cbsffk.mp4",
];
const HERO_GEM1_RIGHT_URL =
  "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774464292/Gemini_Generated_Image_2sr5eu2sr5eu2sr5_1_vuj4km.png";
const HERO_GEM1_LEFT_URL =
  "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774464292/Gemini_Generated_Image_drjmkhdrjmkhdrjm_1_s5l9v4.png";
const HERO_GEM2_RIGHT_URL =
  "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774464291/Gemini_Generated_Image_na3ksbna3ksbna3k_1_qsgpvf.png";
const HERO_GEM2_LEFT_URL =
  "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774464290/Gemini_Generated_Image_9ta8vy9ta8vy9ta8_1_apxxyi.png";
const HERO_GEM3_RIGHT_URL =
  "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774464290/Gemini_Generated_Image_4vjns74vjns74vjn_1_trwifv.png";
const HERO_GEM3_LEFT_URL =
  "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774464289/Gemini_Generated_Image_13snlr13snlr13sn_1_hmoing.png";

const DECORATIVE_GEMS = [
  {
    src: HERO_GEM1_RIGHT_URL,
    alt: "Decorative gemstone",
    className:
      "right-2 top-24 h-14 w-14 sm:right-[6%] sm:top-28 sm:h-28 sm:w-28 md:h-40 md:w-40",
    animate: { y: [0, -12, 0], rotate: [0, 3, 0] },
    duration: 5,
  },
  {
    src: HERO_GEM1_LEFT_URL,
    alt: "Decorative gemstone",
    className:
      "bottom-16 left-2 h-12 w-12 sm:bottom-20 sm:left-[6%] sm:h-24 sm:w-24 md:h-36 md:w-36",
    animate: { y: [0, 10, 0], rotate: [0, -4, 0] },
    duration: 5.5,
  },
  {
    src: HERO_GEM2_RIGHT_URL,
    alt: "Decorative gemstone",
    className:
      "right-10 top-1/2 hidden h-10 w-10 -translate-y-1/2 sm:block md:h-20 md:w-20",
    animate: { y: [0, -8, 0], rotate: [0, 5, 0] },
    duration: 6,
  },
  {
    src: HERO_GEM2_LEFT_URL,
    alt: "Decorative gemstone",
    className: "left-10 top-1/3 hidden h-10 w-10 sm:block md:h-16 md:w-16",
    animate: { y: [0, 7, 0], rotate: [0, -3, 0] },
    duration: 5.2,
  },
  {
    src: HERO_GEM3_RIGHT_URL,
    alt: "Decorative gemstone",
    className: "bottom-12 right-1/3 hidden h-9 w-9 sm:block md:h-14 md:w-14",
    animate: { y: [0, -6, 0], rotate: [0, 4, 0] },
    duration: 5.8,
  },
  {
    src: HERO_GEM3_LEFT_URL,
    alt: "Decorative gemstone",
    className: "left-1/4 top-16 hidden h-8 w-8 sm:block md:h-12 md:w-12",
    animate: { y: [0, 5, 0], rotate: [0, -2, 0] },
    duration: 6.3,
  },
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

      {DECORATIVE_GEMS.map((gem) => (
        <motion.div
          key={gem.className}
          className={`pointer-events-none absolute z-10 ${gem.className}`}
          animate={gem.animate}
          transition={{
            duration: gem.duration,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <Image
            src={gem.src}
            alt={gem.alt}
            fill
            sizes="(max-width: 640px) 56px, (max-width: 1024px) 96px, 160px"
            className="object-contain opacity-75 drop-shadow-[0_10px_24px_rgba(60,116,174,0.25)] sm:opacity-100 sm:drop-shadow-[0_16px_40px_rgba(60,116,174,0.32)]"
          />
        </motion.div>
      ))}

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
