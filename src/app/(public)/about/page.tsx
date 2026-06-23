import type { Metadata } from 'next';

// import AboutHero from '@/components/about/AboutHero';
import FoundationSection from '@/components/about/FoundationSection';
// import HeritageTimeline from '@/components/about/HeritageTimeline';
// import CapabilitiesSection from '@/components/about/CapabilitiesSection';
// import SampleGalleryCard from '@/components/about/SampleGalleryCard';
// import PresidentialAwardSection from '@/components/about/PresidentialAwardSection';
import WhyOravaSection from '@/components/about/WhyOravaSection';
import CertificationsSection from '@/components/about/CertificationsSection';

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
      <FoundationSection />
      {/* <HeritageTimeline /> */}
      {/* <CapabilitiesSection /> */}
      {/* <SampleGalleryCard /> */}
      {/* <PresidentialAwardSection /> */}
      <WhyOravaSection />
      <CertificationsSection />
    </main>
  );
}
