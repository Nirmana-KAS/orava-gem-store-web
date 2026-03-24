import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Data collection, usage, rights, and cookie policy.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <h1 className="font-heading text-5xl text-[#1a1a2e]">Privacy Policy</h1>
      <p className="text-[#4a4a6a]">
        ORAVA collects contact and account data (such as email and usage
        analytics) to provide services and improve platform quality.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-brand-blue">
        How Data Is Used
      </h2>
      <p className="text-[#4a4a6a]">
        Data is used for account management, inquiry handling, communication,
        and analytics reporting.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-brand-blue">
        Your Rights
      </h2>
      <p className="text-[#4a4a6a]">
        Users may request access, correction, or deletion of personal data in
        line with GDPR principles.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-brand-blue">Cookies</h2>
      <p className="text-[#4a4a6a]">
        Cookies are used for analytics and essential session functionality.
        Consent can be changed anytime.
      </p>
    </main>
  );
}
