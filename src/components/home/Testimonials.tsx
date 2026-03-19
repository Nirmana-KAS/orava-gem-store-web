import Card from "@/components/ui/Card";

const testimonials = [
  { name: "European Watch Brand", quote: "ORAVA consistently delivers color-matched calibrated stones with remarkable precision." },
  { name: "Luxury Jewelry House", quote: "Their 24-hour dispatch capability has transformed our production planning." },
  { name: "Custom Atelier", quote: "Excellent bespoke cutting and highly responsive communication." },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-6 text-center font-heading text-4xl">Client Testimonials</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name}>
            <p className="text-sm text-zinc-300">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-3 text-sm text-gold">{testimonial.name}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

