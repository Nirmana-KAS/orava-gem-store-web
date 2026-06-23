/**
 * CertificationsSection — Section 06 / CERTIFICATIONS & MEMBERSHIPS
 *
 * Centered header + a responsive row of 5 certification cards with
 * dashed-circle logo placeholders, plus a footer link to /contact.
 *
 * Server Component — interactivity is CSS-only (hover effects).
 * Responsive grid: 1 col → 2 (sm) → 3 (md) → 5 (lg).
 */
import Link from 'next/link';

interface Certification {
  title: string;
  subtitle: string;
}

const certifications: Certification[] = [
  { title: 'GIA Alumni Member', subtitle: 'Gemmological Institute' },
  { title: 'ICA Member', subtitle: "Int'l Coloured Gemstones" },
  { title: 'EDB Sri Lanka', subtitle: 'Registered Exporter' },
  { title: 'SLGJA Member', subtitle: 'Gem & Jewellery Assn.' },
  { title: 'NGJA Licensed', subtitle: 'National Gem Authority' },
];

export default function CertificationsSection() {
  return (
    <section className="w-full bg-primary-softer">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:py-32">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            — 06 / CERTIFICATIONS &amp; MEMBERSHIPS
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-navy md:text-5xl lg:text-6xl">
            Recognised. Registered.{' '}
            <span className="italic text-primary">Trusted.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">
            Accredited by the bodies that matter — internationally and at home.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="group relative flex flex-col items-center rounded-2xl border border-line bg-white px-5 py-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:bg-primary-soft hover:shadow-xl hover:shadow-primary/15 md:py-10"
            >
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-line text-[10px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover:border-primary group-hover:text-primary">
                LOGO
              </div>
              <h3 className="font-serif text-lg text-navy md:text-xl">
                {cert.title}
              </h3>
              <p className="mt-1 text-xs text-muted">{cert.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-10 text-center md:mt-14">
          <p className="text-sm text-muted">
            Certification reports available on request —{' '}
            <Link
              href="/contact"
              className="font-serif font-medium italic text-primary underline-offset-4 hover:underline"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
