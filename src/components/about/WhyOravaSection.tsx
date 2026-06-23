/**
 * WhyOravaSection — Section 05 / WHY ORAVA
 *
 * Two-column header (heading left, description + pull-quote right) followed by
 * a 2x2 grid of numbered pillar tiles — one dark gradient tile, three white.
 *
 * Server Component — interactivity is CSS-only (hover effects).
 * Responsive: single column on mobile, two columns from md up.
 */
interface Pillar {
  number: string;
  title: string;
  body: string;
  variant: 'light' | 'dark';
}

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'Artisan + Engineer',
    body: 'Two decades of hand-craft, sharpened by computer-vision QA and micron-scale tolerances.',
    variant: 'light',
  },
  {
    number: '02',
    title: 'Made on demand',
    body: 'Bespoke cuts, calibrated to your specification, in the rounds, baguettes and cabochons you ship.',
    variant: 'dark',
  },
  {
    number: '03',
    title: 'Reliable sourcing',
    body: 'Sapphire, ruby, emerald and semi-precious — vetted parcels from trusted, traceable suppliers.',
    variant: 'light',
  },
  {
    number: '04',
    title: 'Globally recognised',
    body: 'Presidential Export Award winner. Member of GIA, ICA, NGJA — registered with EDB Sri Lanka.',
    variant: 'light',
  },
];

const tileStyles = {
  light: {
    card: 'bg-white border border-line hover:border-primary hover:shadow-xl hover:shadow-primary/15',
    number: 'text-primary',
    dash: 'text-muted',
    title: 'text-navy',
    body: 'text-navy-2',
  },
  dark: {
    card: 'bg-gradient-to-br from-primary to-primary-deep hover:shadow-2xl hover:shadow-primary/40',
    number: 'text-white/70',
    dash: 'text-white/40',
    title: 'text-white',
    body: 'text-white/85',
  },
} as const;

export default function WhyOravaSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:py-32">
        {/* Header block */}
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Left — heading */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              — 05 / WHY ORAVA
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl">
              Unrivaled quality.{' '}
              <span className="italic text-primary">
                Engineered innovation.
              </span>
            </h2>
          </div>

          {/* Right — description + pull-quote */}
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-navy-2">
              ORAVA takes a unique approach — leveraging innovative manufacturing
              techniques combined with deep artisanal knowledge to elevate the
              standards of precision gem cutting.
            </p>
            <blockquote className="border-l-2 border-primary pl-5">
              <p className="font-serif text-xl italic text-navy md:text-2xl">
                &ldquo;Beauty crafted to an exemplary standard.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {pillars.map((pillar) => {
            const styles = tileStyles[pillar.variant];
            return (
              <div
                key={pillar.number}
                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] md:p-10 ${styles.card}`}
              >
                {pillar.variant === 'dark' && (
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
                    aria-hidden
                  />
                )}

                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-serif text-3xl md:text-4xl ${styles.number}`}
                  >
                    {pillar.number}
                  </span>
                  <span aria-hidden className={styles.dash}>
                    —
                  </span>
                  <h3
                    className={`font-serif text-xl md:text-2xl ${styles.title}`}
                  >
                    {pillar.title}
                  </h3>
                </div>

                <p className={`mt-4 text-base leading-relaxed ${styles.body}`}>
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
