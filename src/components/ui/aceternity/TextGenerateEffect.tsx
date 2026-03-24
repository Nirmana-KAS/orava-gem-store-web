"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export function TextGenerateEffect({
  words,
  className,
}: TextGenerateEffectProps) {
  const wordsArray = words.split(" ");

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {wordsArray.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                delay: index * 0.08,
                duration: 0.35,
                ease: "easeOut",
              },
            },
          }}
          className="inline-block pr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
