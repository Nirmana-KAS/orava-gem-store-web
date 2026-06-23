import type { Metadata } from 'next';

// import AboutHero from '@/components/about/AboutHero';
// import FoundationSection from '@/components/about/FoundationSection';
// import HeritageTimeline from '@/components/about/HeritageTimeline';
// import CapabilitiesSection from '@/components/about/CapabilitiesSection';
// import SampleGalleryCard from '@/components/about/SampleGalleryCard';
// import PresidentialAwardSection from '@/components/about/PresidentialAwardSection';
// import WhyOravaSection from '@/components/about/WhyOravaSection';
// import CertificationsSection from '@/components/about/CertificationsSection';

export const metadata: Metadata = {
  title: 'About — ORAVA (Pvt) Ltd',
  description:
    'Two decades of precision-cut coloured gemstones from Colombo, Sri Lanka. Presidential Export Award 2024/25 — Gems Sector.',
  openGraph: {
    title: 'About — ORAVA (Pvt) Ltd',
    description:
      'Two decades of precision-cut coloured gemstones from Colombo, Sri Lanka. Presidential Export Award 2024/25 — Gems Sector.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <AboutHero /> */}
      {/* <FoundationSection /> */}
      {/* <HeritageTimeline /> */}
      {/* <CapabilitiesSection /> */}
      {/* <SampleGalleryCard /> */}
      {/* <PresidentialAwardSection /> */}
      {/* <WhyOravaSection /> */}
      {/* <CertificationsSection /> */}

      {/* Phase A placeholder — remove once first section ships */}
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <p className="font-serif text-3xl text-navy md:text-4xl">
          About page — skeleton ready.
        </p>
        <p className="mt-3 text-sm uppercase tracking-widest text-muted">
          Sections will be built in order — Foundation first, AboutHero last.
        </p>
      </div>
    </main>
  );
}
