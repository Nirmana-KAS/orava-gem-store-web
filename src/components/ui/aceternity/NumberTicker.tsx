"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface NumberTickerProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function NumberTicker({
  value,
  suffix = "",
  duration = 2,
}: NumberTickerProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [motionValue, value, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [rounded]);

  return (
    <motion.span
      whileInView={{ opacity: [0, 1], y: [8, 0] }}
      viewport={{ once: true }}
    >
      {displayValue}
      {suffix}
    </motion.span>
  );
}
