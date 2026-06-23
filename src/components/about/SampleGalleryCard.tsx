/**
 * SampleGalleryCard — Section 04 / THE COLLECTION
 *
 * A single large CTA panel: copy on the left (eyebrow + heading + body +
 * button + caption) and a decorative right side with floating gem-shape
 * chips and two tilted preview cards.
 *
 * Server Component — interactivity is CSS-only (hover + keyframes).
 * Responsive: two columns on lg+, stacks below.
 */
import Link from 'next/link';

interface ShapeChip {
  label: string;
  pos: string;
  delay: string;
}

const shapeChips: ShapeChip[] = [
  { label: 'Round', pos: 'left-2 top-6', delay: '[animation-delay:0s]' },
  { label: 'Cabochon', pos: 'left-20 top-32', delay: '[animation-delay:1.5s]' },
  { label: 'Baguette', pos: 'left-4 bottom-10', delay: '[animation-delay:3s]' },
  { label: 'Beads', pos: 'left-28 bottom-32', delay: '[animation-delay:4.5s]' },
];

interface Sample {
  tag: string;
  title: string;
  rotation: string;
  position: string;
  z: string;
}

const samples: Sample[] = [
  {
    tag: 'REF · SP-0142',
    title: 'Ceylon Sapphire',
    rotation: '-12deg',
    position: 'right-16 top-12',
    z: 'z-10',
  },
  {
    tag: 'REF · RB-0218',
    title: 'Burma Ruby',
    rotation: '8deg',
    position: 'right-4 top-28',
    z: 'z-20',
  },
];

export default function SampleGalleryCard() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-soft via-primary-softer to-primary-soft/40 p-8 shadow-xl shadow-primary/10 md:min-h-[480px] md:p-12 lg:p-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            {/* LEFT — copy */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                — 04 / THE COLLECTION
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-navy md:text-5xl lg:text-6xl">
                See the <span className="italic text-primary">samples.</span>
                <br />
                Real stones. Real cuts.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-2">
                Browse our curated sample gallery — sapphires, rubies, emeralds
                and semi-precious stones from the ORAVA workshop, organised by
                cut, colour and origin.
              </p>

              <div className="mt-8">
                <Link
                  href="/products"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-lg hover:shadow-primary/30"
                >
                  <span
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="relative z-10 inline-flex items-center gap-3">
                    <span>Visit Sample Gallery</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </div>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                105+ SAMPLES · SAPPHIRE · RUBY · EMERALD · SEMI-PRECIOUS
              </p>
            </div>

            {/* RIGHT — visual */}
            <div className="relative h-[360px] md:h-[440px]">
              {/* Decorative background anchor */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-primary-soft/40 backdrop-blur-sm"
                aria-hidden
              />

              {/* 105+ samples floating pill */}
              <div className="absolute right-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-line bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                  105+ SAMPLES
                </span>
              </div>

              {/* Layer A — floating gem-shape chips */}
              {shapeChips.map((chip) => (
                <div
                  key={chip.label}
                  className={`absolute ${chip.pos} ${chip.delay} animate-float-y`}
                >
                  <div className="flex items-center gap-2 rounded-full border border-line bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                    <span className="text-xs font-medium text-navy">
                      {chip.label}
                    </span>
                  </div>
                </div>
              ))}

              {/* Layer B — tilted preview cards */}
              {samples.map((sample) => (
                <div
                  key={sample.tag}
                  className={`absolute ${sample.position} ${sample.z} w-44 md:w-52`}
                  style={{ transform: `rotate(${sample.rotation})` }}
                >
                  <div className="rounded-2xl border border-line bg-white p-4 shadow-xl shadow-primary/10 transition-transform duration-500 hover:scale-105">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                      {sample.tag}
                    </div>
                    <div className="mt-2 font-serif text-xl italic text-navy">
                      {sample.title}
                    </div>
                    <div
                      className="mt-4 h-20 rounded-lg bg-gradient-to-br from-primary-soft to-primary/30"
                      aria-hidden
                    />
                    <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted">
                      <span>Cabochon</span>
                      <span>4.2ct</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
