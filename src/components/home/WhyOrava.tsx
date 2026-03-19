export default function WhyOrava() {
  const points = [
    "24-hour delivery",
    "Computer Vision QA",
    "Precision cutting",
    "Trusted since 2006",
    "SLEDB registered",
  ];
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2">
      <div>
        <h2 className="font-heading text-4xl">Why ORAVA</h2>
        <ul className="mt-4 space-y-2 text-zinc-300">
          {points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent p-8">
        <p className="font-heading text-2xl text-gold">Luxury-grade supply chain, engineered for precision.</p>
      </div>
    </section>
  );
}

