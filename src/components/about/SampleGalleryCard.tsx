/**
 * SampleGalleryCard — Section 04 / THE COLLECTION
 *
 * A single large CTA panel: copy on the left (eyebrow + heading + body +
 * shape-tile row + button + caption) and a decorative right side with a
 * faint grid texture and two tilted blue preview cards.
 *
 * Server Component — interactivity is CSS-only (hover + keyframes).
 * Responsive: two columns on lg+, stacks below.
 */
import type { CSSProperties } from 'react';
import Link from 'next/link';

interface ShapeTile {
  label: string;
  icon: 'diamond' | 'oval' | 'baguette' | 'beads';
  rotation: string;
  delay: string;
}

const shapeTiles: ShapeTile[] = [
  { label: 'Round', icon: 'diamond', rotation: '-10deg', delay: '[animation-delay:0s]' },
  { label: 'Cabochon', icon: 'oval', rotation: '6deg', delay: '[animation-delay:0.5s]' },
  { label: 'Baguette', icon: 'baguette', rotation: '-4deg', delay: '[animation-delay:1s]' },
  { label: 'Beads', icon: 'beads', rotation: '8deg', delay: '[animation-delay:1.5s]' },
];

interface Sample {
  tag: string;
  title: string;
  shape: string;
  carat: string;
  icon: 'diamond' | 'oval' | 'emerald';
  image?: string;
  rotationClass: string;
  hoverRotationClass: string;
  position: string;
  z: string;
}

const samples: Sample[] = [
  // BACK CARD — Colombian Emerald
  {
    tag: 'REF · EM-0073',
    title: 'Colombian Emerald',
    shape: 'EMERALD',
    carat: '1.45ct',
    icon: 'emerald',
    rotationClass: '[transform:rotate(-14deg)]',
    hoverRotationClass:
      'hover:[transform:rotate(-22deg)_translate(-18px,-12px)_scale(1.05)]',
    position: 'left-1/2 -translate-x-[80%] top-4 md:left-auto md:translate-x-0 md:right-40 md:top-20',
    z: 'z-0',
  },
  // MIDDLE CARD — Ceylon Sapphire
  {
    tag: 'REF · SP-0142',
    title: 'Ceylon Sapphire',
    shape: 'ROUND',
    carat: '1.84ct',
    icon: 'diamond',
    rotationClass: '[transform:rotate(-8deg)]',
    hoverRotationClass:
      'hover:[transform:rotate(-17deg)_translate(-12px,-10px)_scale(1.05)]',
    position: 'left-1/2 -translate-x-1/2 top-12 md:left-auto md:translate-x-0 md:right-28 md:top-32',
    z: 'z-10',
  },
  // FRONT CARD — Burma Ruby
  {
    tag: 'REF · RB-0089',
    title: 'Burma Ruby',
    shape: 'CABOCHON',
    carat: '2.12ct',
    icon: 'oval',
    rotationClass: '[transform:rotate(6deg)]',
    hoverRotationClass:
      'hover:[transform:rotate(15deg)_translate(12px,-10px)_scale(1.05)]',
    position: 'left-1/2 -translate-x-[20%] top-20 md:left-auto md:translate-x-0 md:right-16 md:top-44',
    z: 'z-20',
  },
];

function renderShapeIcon(icon: ShapeTile['icon']) {
  switch (icon) {
    case 'diamond':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 md:h-7 md:w-7"
          fill="white"
          aria-hidden
        >
          <polygon points="12,3 20,12 12,21 4,12" />
        </svg>
      );
    case 'oval':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 md:h-7 md:w-7"
          fill="white"
          aria-hidden
        >
          <ellipse cx="12" cy="12" rx="9" ry="6" />
        </svg>
      );
    case 'baguette':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 md:h-7 md:w-7"
          fill="white"
          aria-hidden
        >
          <rect x="4" y="9" width="16" height="6" rx="1.5" />
        </svg>
      );
    case 'beads':
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 md:h-7 md:w-7"
          fill="white"
          aria-hidden
        >
          <circle cx="8" cy="10" r="2.5" />
          <circle cx="16" cy="10" r="2.5" />
          <circle cx="12" cy="15" r="2.5" />
        </svg>
      );
  }
}

function renderSampleIcon(icon: 'diamond' | 'oval' | 'emerald') {
  if (icon === 'diamond') {
    return (
      <svg viewBox="0 0 60 60" className="h-12 w-12 md:h-14 md:w-14" aria-hidden>
        <polygon points="30,8 50,30 30,52 10,30" fill="white" />
      </svg>
    );
  }
  if (icon === 'oval') {
    return (
      <svg viewBox="0 0 60 40" className="h-10 w-14 md:h-12 md:w-16" aria-hidden>
        <ellipse cx="30" cy="20" rx="22" ry="12" fill="white" />
      </svg>
    );
  }
  // emerald cut — hexagon with chamfered corners
  return (
    <svg viewBox="0 0 60 50" className="h-10 w-14 md:h-12 md:w-16" aria-hidden>
      <polygon points="14,8 46,8 56,25 46,42 14,42 4,25" fill="white" />
    </svg>
  );
}

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

              {/* Shape-tile row */}
              <div className="mt-8 flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center">
                  {shapeTiles.map((tile) => (
                    <div
                      key={tile.label}
                      className={`group relative -mr-3 last:mr-0 animate-gallery-tilt ${tile.delay}`}
                      style={{ ['--r' as string]: tile.rotation } as CSSProperties}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-[3px] border-white bg-gradient-to-br from-primary to-primary-deep shadow-lg shadow-primary/25 transition-all duration-300 group-hover:-translate-y-3 group-hover:scale-110 group-hover:brightness-110 md:h-[72px] md:w-[72px]">
                        {renderShapeIcon(tile.icon)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    Shown above
                  </span>
                  <span className="mt-1 font-serif text-base italic text-navy md:text-lg">
                    Round · Cabochon · Baguette · Beads
                  </span>
                </div>
              </div>

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
                    <span className="inline-flex animate-arrow-slide">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                100+ SAMPLES · SAPPHIRE · RUBY · EMERALD · SEMI-PRECIOUS
              </p>
            </div>

            {/* RIGHT — visual (desktop only) */}
            <div className="relative hidden md:block md:h-[440px]">
              {/* Decorative background anchor */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-primary-soft/40 backdrop-blur-sm"
                aria-hidden
              />

              {/* Faint grid texture with radial edge-fade mask */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(60,116,174,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(60,116,174,0.35) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  opacity: 0.5,
                  maskImage:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)',
                }}
                aria-hidden
              />

              {/* 100+ samples floating pill */}
              <div className="absolute right-6 top-2 z-30 inline-flex items-center gap-2 rounded-full border border-line bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                <span
                  className="relative inline-flex h-2 w-2 items-center justify-center"
                  aria-hidden
                >
                  <span
                    className="absolute inset-0 -m-1 rounded-full bg-primary/30 animate-ping"
                    aria-hidden
                  />
                  <span className="relative h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                  100+ SAMPLES
                </span>
              </div>

              {/* Tilted preview cards */}
              {samples.map((sample) => (
                <div
                  key={sample.tag}
                  className={`absolute ${sample.position} ${sample.z} w-28 transition-transform duration-500 md:w-52 ${sample.rotationClass} ${sample.hoverRotationClass}`}
                >
                  <div className="overflow-hidden rounded-2xl border-[3px] border-white bg-primary p-3 shadow-2xl shadow-primary-deep/40 transition-all duration-500 hover:shadow-primary-deep/60 md:p-5">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                      {sample.tag}
                    </div>
                    <div className="mt-1 font-serif text-sm italic text-white md:text-xl">
                      {sample.title}
                    </div>
                    <div className="relative mt-3 h-14 overflow-hidden rounded-lg bg-white/10 md:mt-4 md:h-24">
                      {sample.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={sample.image}
                          alt={sample.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          {renderSampleIcon(sample.icon)}
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 md:mt-3 md:text-[10px]">
                      <span>{sample.shape}</span>
                      <span>{sample.carat}</span>
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
