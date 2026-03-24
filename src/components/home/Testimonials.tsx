import { InfiniteMovingCards } from "@/components/ui/aceternity/InfiniteMovingCards";

const testimonials = [
  {
    quote:
      "ORAVA consistently delivers color-matched calibrated stones with remarkable precision.",
    author: "European Watch Brand",
    company: "Luxury Timepieces",
  },
  {
    quote:
      "Their 24-hour dispatch capability has transformed our production planning.",
    author: "Luxury Jewelry House",
    company: "Fine Jewelry",
  },
  {
    quote: "Excellent bespoke cutting and highly responsive communication.",
    author: "Custom Atelier",
    company: "High Craft Studio",
  },
  {
    quote:
      "The quality assurance process gives us complete confidence in every parcel.",
    author: "Swiss Watch Manufacturer",
    company: "Swiss Precision Group",
  },
  {
    quote: "Reliable partner for sourcing the finest Sri Lankan sapphires.",
    author: "Fine Jewelry Designer",
    company: "Designer Atelier",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center font-heading text-4xl font-bold text-[#1a1a2e]">
          Trusted by Luxury Brands Worldwide
        </h2>
        <InfiniteMovingCards items={testimonials} />
      </div>
    </section>
  );
}
