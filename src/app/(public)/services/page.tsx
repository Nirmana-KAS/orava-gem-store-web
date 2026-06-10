import React from "react";
import HeroGem from "./components/HeroGem";
import ExpandingGallery from "./components/ExpandingGallery";
import CapabilityLedger from "./components/CapabilityLedger";
import ProcessTimeline from "./components/ProcessTimeline";
import CtaBand from "./components/CtaBand";
import "./services.css";

/* ================================================================
   /services — ORAVA Services Page (Next.js App Router)
   ================================================================ */

export const metadata = {
  title: "Our Services — ORAVA",
  description:
    "Five disciplines, one cutting house. Precision cutting, calibration, colour grading, quality assurance, and bespoke design — all in-house.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ============ HEADER ============ */}
      <header className="s-header">
        <div className="wrap">
          <div className="s-header-inner">
            <div>
              <span className="eyebrow">Our Capabilities</span>
              <h1>
                Precision, from
                <br />
                rough to <em>finished</em>.
              </h1>
              <p className="lede">
                Five disciplines, one cutting house. Calibrated output and
                luxury-grade consistency for global brands.
              </p>
            </div>

            {/* Interactive rough-to-finished gem (client component) */}
            <HeroGem />
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* Expanding album gallery */}
        <ExpandingGallery />

        {/* Capability ledger (5 services) */}
        <CapabilityLedger />

        {/* Process timeline */}
        <ProcessTimeline />

        {/* CTA band */}
        <CtaBand />
      </main>
    </>
  );
}
