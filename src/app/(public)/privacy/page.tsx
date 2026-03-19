import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Data collection, usage, rights, and cookie policy.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <h1 className="font-heading text-5xl">Privacy Policy</h1>
      <p className="text-zinc-300">
        ORAVA collects contact and account data (such as email and usage analytics) to provide services and improve platform quality.
      </p>
      <h2 className="mt-6 text-xl font-semibold">How Data Is Used</h2>
      <p className="text-zinc-300">Data is used for account management, inquiry handling, communication, and analytics reporting.</p>
      <h2 className="mt-6 text-xl font-semibold">Your Rights</h2>
      <p className="text-zinc-300">Users may request access, correction, or deletion of personal data in line with GDPR principles.</p>
      <h2 className="mt-6 text-xl font-semibold">Cookies</h2>
      <p className="text-zinc-300">Cookies are used for analytics and essential session functionality. Consent can be changed anytime.</p>
    </main>
  );
}

