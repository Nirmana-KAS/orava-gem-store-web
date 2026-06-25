/**
 * CapabilitiesSection — Section 03 / CAPABILITIES
 *
 * Header (eyebrow left, "04 PILLARS" pill right), a 6-stage horizontal process
 * pipeline strip with a traveling shimmer band, then a 2x2 grid of 4 capability
 * cards — each with its own unique mini-visualization.
 *
 * Server Component — interactivity is CSS-only (hover, shimmer, pulse).
 * Responsive: pipeline strip scrolls horizontally on mobile; card grid
 * collapses to a single column.
 */
interface PipelineStage {
  step: string; // "01" … "06"
  label: string;
  sub: string;
}

const pipeline: PipelineStage[] = [
  { step: '01', label: 'Source', sub: 'Vetted rough' },
  { step: '02', label: 'Cut', sub: 'Precision shaping' },
  { step: '03', label: 'Calibrate', sub: 'To spec, ±0.05mm' },
  { step: '04', label: 'Match', sub: 'Colour blending' },
  { step: '05', label: 'Grade', sub: 'Quality assurance' },
  { step: '06', label: 'Export', sub: '24h worldwide' },
];

interface Capability {
  number: string; // "01" … "04"
  title: string;
  body: string;
  viz: 'shapes' | 'sources' | 'colors' | 'scanner';
}

const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Cutting & Calibration',
    body: "Our experienced team cuts rounds, cabochons, baguettes and beads to the customer's exact specifications — using a full range of cutting techniques that bring out each stone's beauty.",
    viz: 'shapes',
  },
  {
    number: '02',
    title: 'Sourcing & Assurance',
    body: "We source sapphire, ruby, emerald and semi-precious materials from reliable suppliers worldwide — every parcel matched to the customer's specific requirement.",
    viz: 'sources',
  },
  {
    number: '03',
    title: 'Colour Matching & Grading',
    body: "Our skilled team blends and matches coloured stones into beautiful sets — every parcel hand-graded to the customer's design intent.",
    viz: 'colors',
  },
  {
    number: '04',
    title: 'Quality Assurance',
    body: 'Computer vision combined with high-precision measurement equipment ensures every stone meets exact size, shape and colour tolerances before it ships.',
    viz: 'scanner',
  },
];

const sources: { name: string; origin: string }[] = [
  { name: 'Sapphire', origin: 'Ceylon · Fancy' },
  { name: 'Ruby', origin: 'Burma · Africa' },
  { name: 'Emerald & Semi-precious', origin: 'Global' },
];

const colorBarHeights = ['h-8', 'h-12', 'h-16', 'h-20', 'h-14', 'h-10'];

function CapabilityViz({ viz }: { viz: Capability['viz'] }) {
  switch (viz) {
    case 'shapes':
      return (
        <div className="grid grid-cols-4 gap-2">
          {['round', 'cabochon', 'baguette', 'beads'].map((s) => (
            <div
              key={s}
              className="rounded-lg border border-line bg-primary-softer px-2 py-3 text-center text-[10px] uppercase tracking-widest text-muted"
            >
              {s}
            </div>
          ))}
        </div>
      );

    case 'sources':
      return (
        <div className="flex flex-col gap-2">
          {sources.map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2 text-navy">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                {row.name}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted">
                {row.origin}
              </span>
            </div>
          ))}
        </div>
      );

    case 'colors':
      return (
        <div>
          <div className="flex h-20 items-end gap-1.5">
            {colorBarHeights.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t bg-gradient-to-t from-primary to-primary/40 ${h}`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted">
            <span>HUE · BLUES</span>
            <span>SAT · 0.62</span>
            <span>VAL · 0.81</span>
          </div>
        </div>
      );

    case 'scanner':
      return (
        <div>
          <div className="relative h-20 overflow-hidden rounded-lg border border-line bg-primary-softer">
            <span
              aria-hidden
              className="absolute left-0 right-0 top-0 h-0.5 animate-scan-bi [background:linear-gradient(90deg,transparent,#3c74ae_50%,transparent)] [box-shadow:0_0_10px_rgba(60,116,174,0.55)]"
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted">
            <span>DIAMETER · 6.42mm</span>
            <span>TOLERANCE · ±0.05mm</span>
            <span>PASS RATE · 99.4%</span>
          </div>
        </div>
      );
  }
}

export default function CapabilitiesSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:py-32">
        {/* Header — eyebrow left, pill right */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            — 03 / CAPABILITIES
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              aria-hidden
            />
            04 PILLARS
          </span>
        </div>

        <h2 className="mt-6 max-w-4xl font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl">
          A complete{' '}
          <span className="italic text-primary">gem-cutting</span> service —
          end to end.
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-2 md:text-lg">
          Every stone moves through one continuous, controlled pipeline —
          sourced, cut, calibrated, colour-matched and verified entirely
          in-house before it ships.
        </p>

        {/* Pipeline strip */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-primary-softer md:mt-16">
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/4 -skew-x-12 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
              aria-hidden
            />
            <div className="relative z-10 flex snap-x snap-mandatory overflow-x-auto md:overflow-visible">
              {pipeline.map((stage, i) => (
                <div
                  key={stage.step}
                  className={`relative min-w-[160px] flex-shrink-0 snap-start px-5 py-6 transition-colors duration-300 hover:bg-white md:min-w-0 md:flex-1 md:py-7 ${
                    i < pipeline.length - 1 ? 'border-line md:border-r' : ''
                  }`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {stage.step}
                  </span>
                  <p className="mt-2 font-serif text-lg text-navy md:text-xl">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-xs text-muted">{stage.sub}</p>
                </div>
              ))}
            </div>
            <svg
              aria-hidden
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible"
            >
              <rect
                x="1"
                y="1"
                width="398"
                height="98"
                rx="16"
                ry="16"
                pathLength={400}
                fill="none"
                stroke="#3c74ae"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="60 340"
                className="animate-dash-run [filter:drop-shadow(0_0_3px_rgba(60,116,174,0.6))]"
              />
            </svg>
          </div>
        </div>

        {/* Capability cards grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl hover:shadow-primary/15 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  {cap.number} / CAPABILITY
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-soft">
                  <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                </div>
              </div>

              <h3 className="mt-3 font-serif text-2xl text-navy md:text-3xl">
                {cap.title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-navy-2">
                {cap.body}
              </p>

              <div className="mt-6">
                <CapabilityViz viz={cap.viz} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
