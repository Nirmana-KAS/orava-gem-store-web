"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// ─── SLIDE DATA ───────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774593697/CWG1-PCC-HomePage_saffrq.png",
    bigTitle: "Beauty Crafted To An Exemplary Standard",
    smallText:
      "Precision-cut coloured gemstones on demand for the world's most discerning luxury watch and jewellery brands. Founded in Colombo, Sri Lanka, 2006.",
    cta1: { label: "Explore Collection", href: "/products" },
    cta2: { label: "Request Inquiry", href: "/quotation" },
    animationType: "fadeUp",
    overlayOpacity: 0.55,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774593679/CWG2-PCC-HomePage_ryubht.png",
    bigTitle: "Every Stone, A Masterpiece of Precision",
    smallText:
      "From Ceylon sapphires to Burmese rubies and Colombian emeralds — sourced, cut and calibrated to your exact specifications, every single time.",
    cta1: { label: "Our Collection", href: "/products" },
    cta2: { label: "Learn More", href: "/about" },
    animationType: "slideLeft",
    overlayOpacity: 0.5,
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774593689/CWG3-PCC-HomePage_y2gjy8.png",
    bigTitle: "Any Shape. Any Design. Any Size.",
    smallText:
      "Ultra-precision cutting from 0.5mm to 10mm. Custom diagrams, calibrated sets and bespoke designs crafted for your unique production requirements.",
    cta1: { label: "Custom Orders", href: "/customized" },
    cta2: { label: "Our Services", href: "/services" },
    animationType: "slideRight",
    overlayOpacity: 0.55,
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774593697/CWG4-PCC-HomePage_xicagl.png",
    bigTitle: "Perfection Measured To The Micron",
    smallText:
      "Computer Vision technology and precision measuring equipment ensure every stone meets the highest international quality standards before leaving our facility.",
    cta1: { label: "Our Process", href: "/services" },
    cta2: { label: "Get a Quote", href: "/quotation" },
    animationType: "scaleUp",
    overlayOpacity: 0.6,
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774593696/CWG5-PCC-HomePage_ktacy7.png",
    bigTitle: "Your Vision, Cut To Perfection",
    smallText:
      "From ultra-small 0.5mm precision cuts to large bespoke designs — ORAVA transforms your creative vision into flawless gemstones for the world\'s finest watch and jewellery collections.",
    cta1: { label: "View Products", href: "/products" },
    cta2: { label: "Contact Us", href: "/contact" },
    animationType: "rotateReveal",
    overlayOpacity: 0.5,
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dzie1rnt3/image/upload/v1774593689/CWG6-PCC-HomePage_zwq4bn.png",
    bigTitle: "Two Decades Of Gemstone Excellence",
    smallText:
      "Since 2006, ORAVA (Pvt) Ltd. has served the intricate needs of fine jewellery and luxury watch sectors with an unwavering commitment to quality and integrity.",
    cta1: { label: "Our Story", href: "/about" },
    cta2: { label: "Get Started", href: "/quotation" },
    animationType: "wordReveal",
    overlayOpacity: 0.55,
  },
];

// ─── IMAGE TRANSITION VARIANTS ────────────────────────────
// 6 unique image transition styles

const imageVariants = {
  // Slide 1: Gentle fade crossfade
  fadeUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  // Slide 2: Image slides in from right
  slideLeft: {
    initial: { opacity: 0, x: "8%" },
    animate: { opacity: 1, x: "0%" },
    exit: { opacity: 0, x: "-8%" },
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  // Slide 3: Image slides in from left
  slideRight: {
    initial: { opacity: 0, x: "-8%" },
    animate: { opacity: 1, x: "0%" },
    exit: { opacity: 0, x: "8%" },
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  // Slide 4: Image zooms in gently
  scaleUp: {
    initial: { opacity: 0, scale: 1.08 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { duration: 1.2, ease: "easeOut" },
  },
  // Slide 5: Image fades with slight zoom out
  rotateReveal: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.04 },
    transition: { duration: 1.1, ease: "easeInOut" },
  },
  // Slide 6: Slow gentle fade
  wordReveal: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1.4, ease: "easeInOut" },
  },
};

// ─── TEXT ANIMATION VARIANTS ──────────────────────────────
// 6 unique text animation styles — one per slide

function getTextAnimations(type: string) {
  switch (type) {
    // Slide 1: Staggered fade up from bottom
    case "fadeUp":
      return {
        badge: {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.3 },
        },
        title: {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.5 },
        },
        desc: {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.75 },
        },
        buttons: {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 1.0 },
        },
      };

    // Slide 2: Slide in from left with blur
    case "slideLeft":
      return {
        badge: {
          initial: { opacity: 0, x: -60, filter: "blur(8px)" },
          animate: { opacity: 1, x: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, delay: 0.3 },
        },
        title: {
          initial: { opacity: 0, x: -80, filter: "blur(10px)" },
          animate: { opacity: 1, x: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay: 0.45 },
        },
        desc: {
          initial: { opacity: 0, x: -60, filter: "blur(6px)" },
          animate: { opacity: 1, x: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, delay: 0.65 },
        },
        buttons: {
          initial: { opacity: 0, x: -40 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.85 },
        },
      };

    // Slide 3: Slide in from right
    case "slideRight":
      return {
        badge: {
          initial: { opacity: 0, x: 60 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.7, delay: 0.3 },
        },
        title: {
          initial: { opacity: 0, x: 80 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.9, delay: 0.45 },
        },
        desc: {
          initial: { opacity: 0, x: 60 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.7, delay: 0.65 },
        },
        buttons: {
          initial: { opacity: 0, x: 40 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.85 },
        },
      };

    // Slide 4: Scale up from center with fade
    case "scaleUp":
      return {
        badge: {
          initial: { opacity: 0, scale: 0.7 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.6,
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          },
        },
        title: {
          initial: { opacity: 0, scale: 0.85 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.8,
            delay: 0.45,
            type: "spring",
            stiffness: 150,
          },
        },
        desc: {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, delay: 0.65 },
        },
        buttons: {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.5,
            delay: 0.85,
            type: "spring",
            stiffness: 200,
          },
        },
      };

    // Slide 5: Clip reveal from top (curtain reveal effect)
    case "rotateReveal":
      return {
        badge: {
          initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
          transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
        },
        title: {
          initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
          transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
        },
        desc: {
          initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
          transition: { duration: 0.7, delay: 0.7, ease: "easeOut" },
        },
        buttons: {
          initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
          transition: { duration: 0.6, delay: 0.9, ease: "easeOut" },
        },
      };

    // Slide 6: Simple elegant long fade — cinematic
    case "wordReveal":
      return {
        badge: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1.0, delay: 0.4 },
        },
        title: {
          initial: { opacity: 0, letterSpacing: "0.3em" },
          animate: { opacity: 1, letterSpacing: "0.02em" },
          transition: { duration: 1.2, delay: 0.6 },
        },
        desc: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1.0, delay: 0.9 },
        },
        buttons: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay: 1.2 },
        },
      };

    default:
      return {
        badge: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.3 },
        },
        title: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay: 0.5 },
        },
        desc: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.7 },
        },
        buttons: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.9 },
        },
      };
  }
}

// ─── MAIN COMPONENT ───────────────────────────────────────
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const slide = SLIDES[currentSlide];
  const imgVariant =
    imageVariants[slide.animationType as keyof typeof imageVariants];
  const textAnim = getTextAnimations(slide.animationType);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#1a1a2e] flex flex-col">
      {/* ── BACKGROUND IMAGE CAROUSEL ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`image-${slide.id}`}
          className="absolute inset-0 z-0"
          initial={imgVariant.initial}
          animate={imgVariant.animate}
          exit={imgVariant.exit}
          transition={imgVariant.transition}
        >
          <Image
            src={slide.image}
            alt={slide.bigTitle}
            fill
            priority={currentSlide === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── DARK GRADIENT OVERLAY ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(26,26,46,${slide.overlayOpacity}) 0%,
            rgba(26,26,46,0.3) 40%,
            rgba(26,26,46,0.7) 80%,
            rgba(26,26,46,0.85) 100%
          )`,
        }}
      />

      {/* ── SUBTLE DOT PATTERN ── */}
      <div
        className="absolute inset-0 z-10 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              className="flex flex-col items-center gap-5 sm:gap-6"
            >
              {/* Badge */}
              <motion.div
                initial={textAnim.badge.initial}
                animate={textAnim.badge.animate}
                transition={textAnim.badge.transition}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm">
                  ✦ Sri Lanka&apos;s Premier Gemstone Exporter
                </span>
              </motion.div>

              {/* Big Title */}
              <motion.h1
                initial={textAnim.title.initial}
                animate={textAnim.title.animate}
                transition={textAnim.title.transition}
                className="font-heading font-bold text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-2xl"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
              >
                {slide.bigTitle}
              </motion.h1>

              {/* Small Description */}
              <motion.p
                initial={textAnim.desc.initial}
                animate={textAnim.desc.animate}
                transition={textAnim.desc.transition}
                className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-lg"
              >
                {slide.smallText}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={textAnim.buttons.initial}
                animate={textAnim.buttons.animate}
                transition={textAnim.buttons.transition}
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mt-2"
              >
                <Link
                  href={slide.cta1.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base bg-[#3c74ae] text-white hover:bg-[#2d5f96] shadow-lg shadow-[#3c74ae]/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {slide.cta1.label}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base bg-white text-[#1a1a2e] border-2 border-white hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {slide.cta2.label}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── SLIDE INDICATORS (dots) ── */}
      <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 flex justify-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group flex items-center justify-center p-1 focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-500 ${
                currentSlide === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <motion.div
          key={`progress-${currentSlide}`}
          className="h-full bg-[#3c74ae]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 6,
            ease: "linear",
          }}
        />
      </div>

      {/* ── SLIDE NUMBER INDICATOR ── */}
      <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-8 z-30">
        <span className="text-white/50 text-xs font-mono tracking-widest">
          {String(currentSlide + 1).padStart(2, "0")}
          {" / "}
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── PREV / NEXT ARROWS (desktop only) ── */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 8000);
        }}
        className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronDown size={20} className="text-white rotate-90" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 8000);
        }}
        className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronDown size={20} className="text-white -rotate-90" />
      </button>

      {/* ── SCROLL DOWN INDICATOR ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} className="text-white/40" />
      </motion.div>
    </section>
  );
}
