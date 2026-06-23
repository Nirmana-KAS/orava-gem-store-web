/**
 * FoundationSection — Section 01 / FOUNDATION
 *
 * Left: sticky fact-sheet sidebar with a spinning gem badge.
 * Right: two stacked cards — Our Story (white) + Our Mission (gradient blue).
 *
 * Server Component — all interactivity is CSS-only (hover + keyframes).
 * Responsive: single column below lg, two columns from lg up.
 */
export default function FoundationSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:py-32">
        {/* Eyebrow header */}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          — 01 / FOUNDATION
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl">
          Two decades of <span className="italic text-primary">precision</span>{' '}
          craftsmanship.
        </h2>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
          [ OUR STORY · OUR MISSION ]
        </p>

        {/* Two-column grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-[360px_1fr] lg:gap-16">
          {/* LEFT — sticky fact sheet */}
          <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            {/* Spinning gem badge */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-[50px] w-[50px] items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border border-dashed border-primary/40 animate-gem-spin"
                  aria-hidden
                />
                <div className="absolute inset-1 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-deep">
                  <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]">
                    <polygon points="12,4 20,20 4,20" fill="white" />
                  </svg>
                </div>
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-navy">
                CRAFTING SINCE 2006
              </span>
            </div>

            {/* Fact-sheet card */}
            <div className="overflow-hidden rounded-2xl border border-line bg-primary-softer">
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 transition-all duration-300 hover:bg-primary-soft hover:pl-7">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  FOUNDED
                </span>
                <span className="font-serif text-base text-navy">2006</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 transition-all duration-300 hover:bg-primary-soft hover:pl-7">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  HEADQUARTERS
                </span>
                <span className="font-serif text-base text-navy">
                  Colombo, Sri Lanka
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 transition-all duration-300 hover:bg-primary-soft hover:pl-7">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  SPECIALTY
                </span>
                <span className="font-serif text-base text-navy">
                  Precision Gem Cutting
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4 transition-all duration-300 hover:bg-primary-soft hover:pl-7">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  RECOGNITION
                </span>
                <span className="font-serif text-base text-primary">
                  Presidential Award &apos;24/25
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Story + Mission cards */}
          <div className="flex flex-col gap-6">
            {/* CARD 1 — Our Story */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10 md:p-10">
              <div
                className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary via-primary/40 to-transparent"
                aria-hidden
              />
              <div className="mb-6 flex items-center gap-4">
                <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Our Story
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="whitespace-nowrap font-serif text-xs text-muted">
                  2006 →
                </span>
              </div>
              <h3 className="font-serif text-2xl leading-snug text-navy md:text-3xl lg:text-4xl">
                Built on a promise — to{' '}
                <span className="italic text-primary">exceed</span> every
                expectation.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-navy-2">
                Founded in 2006, ORAVA (Pvt) Ltd caters to the intricate needs of
                the fine jewellery and watch sectors, with a mission to exceed the
                expectations of discerning clients. We precision-cut coloured
                stones on demand, serving prestigious watch and jewellery brands —
                a commitment to excellence and integrity that defines our esteemed
                industry presence.
              </p>
            </div>

            {/* CARD 2 — Our Mission */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-deep p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 md:p-10">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl"
                aria-hidden
              />
              <div className="mb-6 flex items-center gap-4">
                <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  Our Mission
                </span>
                <span className="h-px flex-1 bg-white/20" />
                <span className="whitespace-nowrap font-serif text-xs text-white/70">
                  Every order →
                </span>
              </div>
              <h3 className="font-serif text-2xl leading-snug text-white md:text-3xl lg:text-4xl">
                Exceeding expectations{' '}
                <span className="italic text-white/90">— always.</span>
              </h3>
              <p className="mt-5 text-base leading-relaxed text-white/85">
                ORAVA is dedicated to delivering exceptional quality and service —
                striving to meet the demands of the most exacting customer in
                every order. With a passion for excellence, we are committed to
                creating timeless pieces that resonate with the discerning tastes
                of our clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
