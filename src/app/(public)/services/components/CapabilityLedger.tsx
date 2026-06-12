import React from "react";
import Link from "next/link";

/* ================================================================
   CapabilityLedger — Single definitive list of services with
   numbered rows, icons, description chips, and CTA buttons.
   Static component — no client JS needed.

   Each "Make Inquiry" link targets /quotation?type=<inquiryType>.
   The QuotationForm does not yet read the `type` param to
   pre-select the inquiry — see Phase 2 TODO below.
   ================================================================ */

interface Service {
  num: string;
  inquiryType: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  chips: string[];
}

const SERVICES: Service[] = [
  {
    num: "01",
    inquiryType: "CUTTING",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9Z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <path d="M2 9h20" />
      </svg>
    ),
    title: "Precision Cutting",
    description: "Calibrated faceting on the cutting floor — rough sorted, oriented, and brought to a finished stone with repeatable geometry.",
    chips: ["0.5 – 10 mm", "Repeatable facets"],
  },
  {
    num: "02",
    inquiryType: "CALIBRATION",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 1 1 9-9" />
        <path d="M12 12 16 8" />
        <path d="M12 3v2" /><path d="M21 12h-2" /><path d="M3 12h2" />
      </svg>
    ),
    title: "Calibration & Measurement",
    description: "0.5 mm to 10 mm calibrated output for watch and jewellery assemblies, matched to your spec sheet within tight tolerance.",
    chips: ["±0.02 mm", "Watch-grade"],
  },
  {
    num: "03",
    inquiryType: "GRADING",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a5 5 0 0 0 5-5c0-5-4.5-8.7-10-8.7Z" />
        <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
        <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
        <circle cx="16.5" cy="10.5" r="1.2" fill="currentColor" />
      </svg>
    ),
    title: "Colour Grading & Matching",
    description: "Uniform hue and saturation matched across an entire production lot, graded under daylight-calibrated conditions.",
    chips: ["Lot-matched", "Daylight-calibrated"],
  },
  {
    num: "04",
    inquiryType: "QUALITY",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
        <path d="M8.5 11h5" /><path d="M11 8.5v5" />
      </svg>
    ),
    title: "Quality Assurance",
    description: "Computer vision and manual inspection combined — every stone checked for inclusions and surface defects before it ships.",
    chips: ["CV + manual", "100% inspected"],
  },
  {
    num: "05",
    inquiryType: "BESPOKE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 7v10l8 5 8-5V7Z" />
        <path d="M12 2v20" />
        <path d="m4 7 8 5 8-5" />
        <path d="m12 12 8-5" />
      </svg>
    ),
    title: "Bespoke Design Studio",
    description: "Client-specific geometry translated into high-fidelity finished stones — from CAD model to calibrated cut.",
    chips: ["Custom geometry", "CAD-modelled"],
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

export default function CapabilityLedger() {
  return (
    <>
      <div className="section-head">
        <div>
          <span className="eyebrow">What we do</span>
          <h2>Capabilities</h2>
        </div>
        <p className="sh-note">
          Each capability is offered as a standalone service or as part of a full production run.
        </p>
      </div>

      <section className="ledger">
        {SERVICES.map((svc) => (
          <article key={svc.num} className="svc">
            <div className="svc-num">{svc.num}</div>
            <div className="svc-icon">{svc.icon}</div>
            <div className="svc-body">
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
              <div className="svc-chips">
                {svc.chips.map((chip, i) => (
                  <span key={i} className="svc-chip">
                    {i === 0 && <span className="gem" />}
                    {chip}
                  </span>
                ))}
              </div>
              <Link
                className="svc-cta svc-cta-mobile"
                href={`/quotation?type=${svc.inquiryType.toLowerCase()}`}
              >
                Make Inquiry <ArrowIcon />
              </Link>
            </div>
            <Link
              className="svc-cta svc-cta-desktop"
              href={`/quotation?type=${svc.inquiryType.toLowerCase()}`}
            >
              Make Inquiry <ArrowIcon />
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
