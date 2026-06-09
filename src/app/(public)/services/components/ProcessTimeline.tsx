import React from "react";

/* ================================================================
   ProcessTimeline — 5-step horizontal timeline: Sourcing ->
   Cutting -> Calibration -> Grading -> Assurance. Connecting line
   via CSS pseudo-element.
   ================================================================ */

const STEPS = [
  { label: "Sourcing", note: "Rough sorted & graded at intake." },
  { label: "Cutting", note: "Oriented and faceted to geometry." },
  { label: "Calibration", note: "Sized to spec within tolerance." },
  { label: "Grading", note: "Colour matched across the lot." },
  { label: "Assurance", note: "Inspected, certified & released." },
];

export default function ProcessTimeline() {
  return (
    <section className="process">
      <div className="process-top">
        <div>
          <span className="eyebrow">Craft in motion</span>
          <h2>From rough to finished</h2>
        </div>
        <p>One continuous line — no stone leaves a stage until it meets spec.</p>
      </div>
      <div className="steps">
        {STEPS.map((step, i) => (
          <div key={i} className="step">
            <div className="node">{i + 1}</div>
            <h4>{step.label}</h4>
            <p>{step.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
