import type { Metadata } from "next";
import CTASection from "@/components/home/CTASection";
import CertificationsStrip from "@/components/home/CertificationsStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import GemstoneHighlights from "@/components/home/GemstoneHighlights";
import HeroSection from "@/components/home/HeroSection";
import OurProcess from "@/components/home/OurProcess";
import OurCapabilities from "@/components/home/OurCapabilities";
import TrustBadges from "@/components/home/TrustBadges";
import WhyOrava from "@/components/home/WhyOrava";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Premium precision-cut gemstone exporter from Sri Lanka since 2006.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />
      <GemstoneHighlights />
      <OurCapabilities />
      <WhyOrava />
      <OurProcess />
      <CTASection />
      <CertificationsStrip />
    </main>
  );
}
