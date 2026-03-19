import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Service usage, inquiry terms, privacy, and delivery terms.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <h1 className="font-heading text-5xl">Terms &amp; Conditions</h1>
      <p className="text-zinc-300">These terms govern the use of ORAVA Gems services, inquiries, quotations, and delivery commitments.</p>
      <h2 className="mt-6 text-xl font-semibold">Service Usage</h2>
      <p className="text-zinc-300">All services are provided for lawful commercial use. Misuse may result in account suspension.</p>
      <h2 className="mt-6 text-xl font-semibold">Inquiry & Quotation Terms</h2>
      <p className="text-zinc-300">Submitted information must be accurate. Response times are best effort and subject to complexity.</p>
      <h2 className="mt-6 text-xl font-semibold">Delivery Terms</h2>
      <p className="text-zinc-300">24-hour dispatch applies after order completion and final confirmation.</p>
    </main>
  );
}

