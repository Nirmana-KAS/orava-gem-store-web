"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface AutoImageSliderProps {
  images: string[];
  alt: string;
  interval?: number;
  className?: string;
}

export function AutoImageSlider({
  images,
  alt,
  interval = 3000,
  className = "",
}: AutoImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "h-3 w-4 bg-white"
                : "h-3 w-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        key={`progress-${currentIndex}`}
        className="absolute bottom-0 left-0 z-20 h-0.5 bg-white/60"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: interval / 1000, ease: "linear" }}
      />
    </div>
  );
}
