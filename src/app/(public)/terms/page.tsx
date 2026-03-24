import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Service usage, inquiry terms, privacy, and delivery terms.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <h1 className="font-heading text-5xl text-[#1a1a2e]">
        Terms &amp; Conditions
      </h1>
      <p className="text-[#4a4a6a]">
        These terms govern the use of ORAVA Gems services, inquiries,
        quotations, and delivery commitments.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-brand-blue">
        Service Usage
      </h2>
      <p className="text-[#4a4a6a]">
        All services are provided for lawful commercial use. Misuse may result
        in account suspension.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-brand-blue">
        Inquiry & Quotation Terms
      </h2>
      <p className="text-[#4a4a6a]">
        Submitted information must be accurate. Response times are best effort
        and subject to complexity.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-brand-blue">
        Delivery Terms
      </h2>
      <p className="text-[#4a4a6a]">
        24-hour dispatch applies after order completion and final confirmation.
      </p>
    </main>
  );
}
