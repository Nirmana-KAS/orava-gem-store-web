import type { Metadata } from 'next';
import './about.css';
import FoundationSection from '@/components/about/FoundationSection';

export const metadata: Metadata = {
  title: 'About — ORAVA (Pvt) Ltd · Precision Gem Cutting from Sri Lanka',
  description:
    "Founded in 2006, ORAVA precision-cuts coloured gemstones for the world's finest watch and jewellery houses. Presidential Export Award winner 2024/25.",
  openGraph: {
    title: 'About — ORAVA (Pvt) Ltd · Precision Gem Cutting from Sri Lanka',
    description:
      "Founded in 2006, ORAVA precision-cuts coloured gemstones for the world's finest watch and jewellery houses. Presidential Export Award winner 2024/25.",
    type: 'website',
    url: 'https://orava-gem-store-web.vercel.app/about',
    siteName: 'ORAVA (Pvt) Ltd',
  },
};

export default function AboutPage() {
  return (
    <main
      style={{
        background: '#ffffff',
        color: '#2a5a8c',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* === AboutHero goes here (built last) === */}

      <FoundationSection />

      {/* === HeritageTimeline goes here === */}
      {/* === CapabilitiesSection goes here === */}
      {/* === SampleGalleryCard goes here === */}
      {/* === PresidentialAwardSection goes here === */}
      {/* === WhyOravaSection goes here === */}
      {/* === CertificationsSection goes here === */}
    </main>
  );
}
