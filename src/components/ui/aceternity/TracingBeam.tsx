"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TracingBeamProps {
  children: React.ReactNode;
}

export function TracingBeam({ children }: TracingBeamProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative pl-8">
      <div className="absolute left-2 top-0 h-full w-[2px] bg-[#dde2e8]" />
      <motion.div
        className="absolute left-2 top-0 w-[2px] bg-[#3c74ae]"
        style={{ height: beamHeight }}
      />
      {children}
    </div>
  );
}
