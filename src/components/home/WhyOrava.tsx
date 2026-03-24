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
        <h2 className="font-heading text-4xl text-[#1a1a2e]">Why ORAVA</h2>
        <p className="mt-3 text-[#8f8b8f]">
          We operate as a precision partner, not just a supplier.
        </p>
        <ul className="mt-4 space-y-2 text-[#4a4a6a]">
          {points.map((point) => (
            <li
              key={point}
              className="rounded-lg border border-[#dde2e8] bg-white px-3 py-2"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-[#c9d9ec] bg-gradient-to-br from-[#e8f0f9] to-white p-8">
        <p className="font-heading text-2xl text-brand-blue">
          Luxury-grade supply chain, engineered for precision.
        </p>
        <p className="mt-4 text-[#4a4a6a]">
          Dedicated lot matching, low-variance quality control, and fast global
          dispatch keep your production timeline resilient.
        </p>
      </div>
    </section>
  );
}
