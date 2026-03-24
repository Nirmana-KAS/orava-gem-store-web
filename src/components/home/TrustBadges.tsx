"use client";

import { Globe, Handshake, Sparkles, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

const items = [
  { icon: Sparkles, target: 18, suffix: "+", label: "Years of Excellence" },
  { icon: Handshake, target: 500, suffix: "+", label: "Satisfied Clients" },
  { icon: Globe, target: 50, suffix: "+", label: "Countries Served" },
  { icon: Timer, target: 24, suffix: "h", label: "Worldwide Delivery" },
];

export default function TrustBadges() {
  const [counts, setCounts] = useState<number[]>(items.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((value, index) => {
          const next = value + Math.ceil(items[index].target / 20);
          return next > items[index].target ? items[index].target : next;
        }),
      );
    }, 60);

    const stop = setTimeout(() => clearInterval(interval), 1500);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 md:grid-cols-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-light">
              <Icon className="text-brand-blue" />
            </div>
            <p className="font-heading text-3xl text-[#1a1a2e]">
              {counts[index]}
              {item.suffix}
            </p>
            <p className="text-sm text-[#8f8b8f]">{item.label}</p>
          </Card>
        );
      })}
    </section>
  );
}
