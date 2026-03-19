import type { Metadata } from "next";
import Link from "next/link";
import QuotationForm from "@/components/forms/QuotationForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ORAVA Gems headquarters in Sri Lanka.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 font-heading text-5xl">Contact Us</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-white/10 bg-dark-surface p-6">
          <iframe
            title="ORAVA Location"
            src="https://maps.google.com/maps?q=Colombo%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-64 w-full rounded-md border border-white/10"
          />
          <p className="text-zinc-300">Address: Colombo, Sri Lanka</p>
          <p className="text-zinc-300">TP: +94 11 000 0000</p>
          <p className="text-zinc-300">Fax: +94 11 000 0001</p>
          <p className="text-zinc-300">Email: admin@oravagems.com</p>
          <Link href="https://linkedin.com" className="text-gold underline">
            LinkedIn Profile
          </Link>
          <p className="text-sm text-gold">SLEDB Registered</p>
          <p className="text-sm text-zinc-400">Office Hours: Mon-Fri 9:00 AM – 6:00 PM (IST)</p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-semibold">Quick Contact</h2>
          <QuotationForm />
        </div>
      </div>
    </main>
  );
}

