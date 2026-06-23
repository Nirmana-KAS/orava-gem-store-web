/**
 * HeritageTimeline — Section 02 / HERITAGE
 *
 * Two-column header followed by a 4-chapter vertical timeline: a gradient rail
 * with evenly-spaced dots on the left, stacked chapter cards on the right.
 * The 4th chapter is the "Live Chapter" (gradient blue card).
 *
 * Server Component — interactivity is CSS-only (hover + keyframes).
 * Responsive: header and cards stack on mobile; rail narrows to 40px.
 */
interface Chapter {
  number: string;
  period: string;
  title: string;
  body: string;
  chips: string[];
  live?: boolean;
}

const chapters: Chapter[] = [
  {
    number: '01',
    period: '2006 — 2011',
    title: 'Founding',
    body: 'ORAVA is founded in Sri Lanka — built on a simple promise: deliver precision-cut coloured gemstones to an exemplary standard.',
    chips: ['Sri Lankan foundation', 'First export shipments'],
  },
  {
    number: '02',
    period: '2012 — 2017',
    title: 'Scaling Precision',
    body: 'Calibrated production lines established. First long-term partnerships with international watchmakers and fine-jewellery houses.',
    chips: ['Calibrated production', 'Global clientele'],
  },
  {
    number: '03',
    period: '2018 — 2023',
    title: 'Technology & Quality',
    body: 'Computer-vision QA and micron-accurate cutting equipment integrated across the workshop. Export coverage expands beyond 20 countries.',
    chips: ['Computer-vision QA', '20+ export markets'],
  },
  {
    number: '04',
    period: '2024 — TODAY',
    title: 'Global Recognition',
    body: "Recognised as one of Sri Lanka's premier gemstone exporters — with the Presidential Export Award 2024/25 and certifications from leading international gemmological bodies.",
    chips: ['National award recognition', '5 global certifications'],
    live: true,
  },
];

export default function HeritageTimeline() {
  return (
    <section className="w-full bg-primary-softer">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:py-32">
        {/* Header block */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              — 02 / HERITAGE
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl">
              From a Sri Lankan workshop{' '}
              <span className="italic text-primary">to a global name.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-navy-2 md:text-lg">
            Four chapters of growth — each unlocking a new level of precision,
            technology, and international reach.
          </p>
        </div>

        {/* Timeline block — one row per chapter, dot centered to its card */}
        <div className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-8 lg:mt-20">
          {chapters.map((chapter, index) => {
            const isLive = chapter.live;
            const isFirst = index === 0;
            const isLast = index === chapters.length - 1;
            // Line extends past each row's top/bottom edges to bridge the gaps,
            // fading in on the first row and out on the last so the rail reads
            // as one continuous line.
            const lineGradient = isFirst
              ? 'bg-gradient-to-b from-transparent via-primary/50 to-primary/50'
              : isLast
                ? 'bg-gradient-to-b from-primary/50 via-primary/50 to-transparent'
                : 'bg-primary/50';
            return (
              <div
                key={chapter.number}
                className="grid grid-cols-[110px_24px_1fr] items-stretch gap-3 md:grid-cols-[140px_32px_1fr] md:gap-6"
              >
                {/* Period label — left of the rail, right-aligned */}
                <div className="flex items-center justify-end pr-2">
                  <span
                    className={`whitespace-nowrap font-serif text-[11px] font-medium italic uppercase tracking-[0.18em] md:text-xs ${
                      isLive ? 'text-primary' : 'text-muted'
                    }`}
                  >
                    {chapter.period}
                  </span>
                </div>

                {/* Rail cell — continuous line + open-ring / breathing dot */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={[
                      'pointer-events-none absolute left-1/2 w-px -translate-x-1/2',
                      '-top-3 -bottom-3 md:-top-4 md:-bottom-4',
                      lineGradient,
                    ].join(' ')}
                    aria-hidden
                  />

                  {!isLive && (
                    <div
                      className="relative z-10 h-3.5 w-3.5 rounded-full border-2 border-primary bg-white"
                      aria-hidden
                    />
                  )}

                  {isLive && (
                    <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                      <span
                        className="absolute inset-0 -m-2 rounded-full bg-primary/30 animate-ping"
                        aria-hidden
                      />
                      <span
                        className="absolute inset-0 -m-1 rounded-full bg-primary/40 animate-pulse"
                        aria-hidden
                      />
                      <span className="relative h-4 w-4 rounded-full border-2 border-white bg-primary shadow-md" />
                    </div>
                  )}
                </div>

                {/* Chapter card */}
                <div
                  className={
                    isLive
                      ? 'group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-deep px-6 py-6 transition-all duration-300 hover:translate-x-2 hover:shadow-2xl hover:shadow-primary/40 md:px-8 md:py-7'
                      : 'group relative rounded-2xl border border-line bg-white px-6 py-6 transition-all duration-300 hover:translate-x-2 hover:border-primary hover:shadow-xl hover:shadow-primary/15 md:px-8 md:py-7'
                  }
                >
                  {isLive && (
                    <>
                      <div
                        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl"
                        aria-hidden
                      />
                      <span className="absolute right-5 top-5 inline-flex items-center rounded-full border border-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        Live Chapter
                      </span>
                    </>
                  )}

                  <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
                    <span
                      className={
                        isLive
                          ? 'font-serif text-2xl italic text-white/80 md:text-3xl'
                          : 'font-serif text-2xl italic text-primary md:text-3xl'
                      }
                    >
                      {chapter.number}
                    </span>
                    <h3
                      className={
                        isLive
                          ? 'font-serif text-2xl text-white md:text-3xl'
                          : 'font-serif text-2xl text-navy md:text-3xl'
                      }
                    >
                      {chapter.title}
                    </h3>
                  </div>

                  <p
                    className={
                      isLive
                        ? 'mt-3 text-base leading-relaxed text-white/85'
                        : 'mt-3 text-base leading-relaxed text-navy-2'
                    }
                  >
                    {chapter.body}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {chapter.chips.map((chip) => (
                      <span
                        key={chip}
                        className={
                          isLive
                            ? 'inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white'
                            : 'inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary'
                        }
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
