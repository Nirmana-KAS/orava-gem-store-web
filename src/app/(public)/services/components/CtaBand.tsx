import React from "react";
import Link from "next/link";

/* ================================================================
   CtaBand — Full-width blue gradient call-to-action with
   "Make Inquiry" + "Request a Meeting" buttons.

   Links target /quotation (the project's inquiry route), matching
   the convention used elsewhere on the site.
   ================================================================ */

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" />
  </svg>
);

export default function CtaBand() {
  return (
    <section className="cta-band" id="inquire">
      <span className="ce">Let&apos;s talk specifications</span>
      <h2>Ready to discuss your precision requirements?</h2>
      <p>
        Send us your spec sheet or book a call with our cutting team — we&apos;ll
        come back with a sampling plan.
      </p>
      <div className="cta-actions">
        <Link className="btn-white" href="/quotation?type=service">
          Make Inquiry <ArrowIcon />
        </Link>
        <Link className="btn-outline" href="/quotation?meeting=true">
          Request a Meeting <CalendarIcon />
        </Link>
      </div>
    </section>
  );
}
