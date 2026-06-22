/**
 * FoundationSection — "Two decades of precision craftsmanship"
 *
 * Section 01 of the About page redesign.
 * Left: sticky sidebar with heading + spinning gem badge + fact-sheet.
 * Right: Our Story card (white) + Our Mission card (gradient blue).
 *
 * Server Component — all interactivity is CSS-only (hover effects + keyframes).
 * Responsive: stacks to single column on mobile.
 */
export default function FoundationSection() {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-8 pb-10 lg:pt-12 lg:pb-14">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-20 items-start">

        {/* ── LEFT: Sticky sidebar ── */}
        <div className="lg:sticky lg:top-[120px]">
          <div
            className="o-mono"
            style={{ fontSize: 11, color: '#3c74ae', textTransform: 'uppercase' }}
          >
            — 01 / Foundation
          </div>

          <h2
            className="o-serif text-[36px] sm:text-[44px] lg:text-[56px]"
            style={{
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: '-0.5px',
              margin: '14px 0 0',
              color: '#2a5a8c',
            }}
          >
            Two decades of{' '}
            <span style={{ fontStyle: 'italic', color: '#3c74ae' }}>precision</span>{' '}
            craftsmanship.
          </h2>

          <p
            className="o-mono"
            style={{
              fontSize: 12,
              color: '#8f8b8f',
              marginTop: 18,
              textTransform: 'uppercase',
            }}
          >
            [ OUR STORY · OUR MISSION ]
          </p>

          <div style={{ marginTop: 38 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 50,
                  height: 50,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '1px dashed #3c74ae',
                    borderRadius: '50%',
                    opacity: 0.5,
                    animation: 'oravaGemSpin 18s linear infinite',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    inset: 9,
                    background: 'linear-gradient(135deg, #3c74ae, #2a5a8c)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="#e7f0fa">
                    <polygon points="12,4 5,10 19,10" />
                    <polygon points="5,10 19,10 12,21" />
                  </svg>
                </span>
              </div>

              <div>
                <div className="o-mono" style={{ fontSize: 10, color: '#8f8b8f' }}>
                  CRAFTING SINCE
                </div>
                <div
                  className="o-serif"
                  style={{
                    fontSize: 26,
                    color: '#000000',
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  2006
                </div>
              </div>
            </div>

            <div
              style={{
                border: '1px solid #eaf2fa',
                borderRadius: 16,
                background: '#f4f8fc',
                overflow: 'hidden',
              }}
            >
              <div
                className="oh-3"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderBottom: '1px solid #eaf2fa',
                  transition: 'background .35s, padding-left .35s',
                }}
              >
                <span className="o-mono" style={{ fontSize: 10, color: '#8f8b8f' }}>
                  FOUNDED
                </span>
                <span
                  className="o-serif"
                  style={{ fontSize: 17, color: '#2a5a8c', fontWeight: 500 }}
                >
                  2006
                </span>
              </div>

              <div
                className="oh-4"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderBottom: '1px solid #eaf2fa',
                  transition: 'background .35s, padding-left .35s',
                }}
              >
                <span className="o-mono" style={{ fontSize: 10, color: '#8f8b8f' }}>
                  HEADQUARTERS
                </span>
                <span
                  className="o-serif"
                  style={{ fontSize: 17, color: '#2a5a8c', fontWeight: 500 }}
                >
                  Colombo, Sri Lanka
                </span>
              </div>

              <div
                className="oh-5"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderBottom: '1px solid #eaf2fa',
                  transition: 'background .35s, padding-left .35s',
                }}
              >
                <span className="o-mono" style={{ fontSize: 10, color: '#8f8b8f' }}>
                  SPECIALTY
                </span>
                <span
                  className="o-serif"
                  style={{ fontSize: 17, color: '#2a5a8c', fontWeight: 500 }}
                >
                  Precision Gem Cutting
                </span>
              </div>

              <div
                className="oh-6"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  transition: 'background .35s, padding-left .35s',
                }}
              >
                <span className="o-mono" style={{ fontSize: 10, color: '#8f8b8f' }}>
                  RECOGNITION
                </span>
                <span
                  className="o-serif"
                  style={{ fontSize: 17, color: '#3c74ae', fontWeight: 600 }}
                >
                  Presidential Award &apos;24/25
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Story + Mission cards ── */}
        <div className="grid grid-cols-1 gap-6">

          <article
            className="oh-7"
            style={{
              position: 'relative',
              padding: '36px 36px 36px 40px',
              border: '1px solid #eaf2fa',
              borderRadius: 20,
              background: '#ffffff',
              overflow: 'hidden',
              transition:
                'transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s, border-color .45s',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: 36,
                bottom: 36,
                width: 3,
                background: 'linear-gradient(180deg, #3c74ae, transparent)',
                borderRadius: 3,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                className="o-mono"
                style={{ fontSize: 11, color: '#3c74ae', textTransform: 'uppercase' }}
              >
                Our Story
              </span>
              <span style={{ flex: 1, height: 1, background: '#eaf2fa' }} />
              <span className="o-mono" style={{ fontSize: 11, color: '#8f8b8f' }}>
                2006 →
              </span>
            </div>

            <h3
              className="o-serif text-[26px] sm:text-[30px] lg:text-[34px]"
              style={{
                fontWeight: 500,
                lineHeight: 1.15,
                margin: '14px 0 14px',
                color: '#2a5a8c',
              }}
            >
              Built on a promise — to{' '}
              <span style={{ fontStyle: 'italic', color: '#3c74ae' }}>exceed</span>{' '}
              every expectation.
            </h3>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: '#2a5a8c',
                margin: 0,
              }}
            >
              Founded in 2006, ORAVA (Pvt) Ltd caters to the intricate needs of the
              fine jewellery and watch sectors, with a mission to exceed the
              expectations of discerning clients. We precision-cut coloured stones on
              demand, serving prestigious watch and jewellery brands — a commitment to
              excellence and integrity that defines our esteemed industry presence.
            </p>
          </article>

          <article
            className="oh-8"
            style={{
              position: 'relative',
              padding: '36px 36px 36px 40px',
              border: '1px solid #3c74ae',
              borderRadius: 20,
              background: 'linear-gradient(135deg, #3c74ae, #2a5a8c)',
              color: '#ffffff',
              overflow: 'hidden',
              transition:
                'transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: -120,
                top: -120,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background:
                  'radial-gradient(closest-side, rgba(231,240,250,0.25), transparent 70%)',
              }}
            />

            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: 36,
                bottom: 36,
                width: 3,
                background: 'linear-gradient(180deg, #e7f0fa, transparent)',
                borderRadius: 3,
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                position: 'relative',
              }}
            >
              <span
                className="o-mono"
                style={{
                  fontSize: 11,
                  color: '#e7f0fa',
                  textTransform: 'uppercase',
                }}
              >
                Our Mission
              </span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: 'rgba(255,255,255,0.2)',
                }}
              />
              <span
                className="o-mono"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}
              >
                → EVERY ORDER
              </span>
            </div>

            <h3
              className="o-serif text-[26px] sm:text-[30px] lg:text-[34px]"
              style={{
                fontWeight: 500,
                lineHeight: 1.15,
                margin: '14px 0 14px',
                position: 'relative',
                color: '#ffffff',
              }}
            >
              Exceeding expectations{' '}
              <span style={{ fontStyle: 'italic', color: '#e7f0fa' }}>
                — always.
              </span>
            </h3>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.9)',
                margin: 0,
                position: 'relative',
              }}
            >
              ORAVA is dedicated to delivering exceptional quality and service —
              striving to meet the demands of the most exacting customer in every
              order. With a passion for excellence, we are committed to creating
              timeless pieces that resonate with the discerning tastes of our clients.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
