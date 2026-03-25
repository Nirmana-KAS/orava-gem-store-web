import type { Metadata } from "next";
import CTASection from "@/components/home/CTASection";
import CertificationsStrip from "@/components/home/CertificationsStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";
import OurProcess from "@/components/home/OurProcess";
import ServicesOverview from "@/components/home/ServicesOverview";
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
      <ServicesOverview />
      <FeaturedProducts />
      <WhyOrava />
      <OurProcess />
      <CTASection />
      <CertificationsStrip />
    </main>
  );
}
