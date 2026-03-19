"use client";

import { Globe, Handshake, Sparkles, Timer } from "lucide-react";
import Card from "@/components/ui/Card";

const items = [
  { icon: Sparkles, value: "18+", label: "Years of Excellence" },
  { icon: Handshake, value: "500+", label: "Satisfied Clients" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Timer, value: "24 Hours", label: "Worldwide Delivery" },
];

export default function TrustBadges() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 md:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="text-center">
            <Icon className="mx-auto mb-2 text-gold" />
            <p className="font-heading text-3xl text-white">{item.value}</p>
            <p className="text-sm text-zinc-300">{item.label}</p>
          </Card>
        );
      })}
    </section>
  );
}

