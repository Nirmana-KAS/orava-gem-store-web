import type { Metadata } from "next";
import QuotationForm from "@/components/forms/QuotationForm";

export const metadata: Metadata = {
  title: "Request a Quotation",
  description: "Submit quotation requirements to ORAVA Gems.",
};

export default function QuotationPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 font-heading text-5xl">Request a Quotation</h1>
      <QuotationForm />
    </main>
  );
}

