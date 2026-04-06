import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import QuotationForm from "@/components/forms/QuotationForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ORAVA Gems headquarters in Sri Lanka.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 font-heading text-5xl text-[#1a1a2e]">Contact Us</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-[#dde2e8] bg-white">
          <iframe
            title="ORAVA Location"
            src="https://maps.google.com/maps?q=Colombo%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-[520px] w-full"
          />
        </div>

        <div className="space-y-4 rounded-2xl border border-[#dde2e8] bg-white p-6">
          <h2 className="text-2xl font-semibold text-[#1a1a2e]">
            Contact Card
          </h2>
          <p className="flex items-start gap-3 text-[#4a4a6a]">
            <MapPin className="mt-0.5 text-brand-blue" size={18} /> Colombo, Sri
            Lanka
          </p>
          <p className="flex items-center gap-3 text-[#4a4a6a]">
            <Phone className="text-brand-blue" size={18} /> +94 11 257 4062
          </p>
          <p className="flex items-center gap-3 text-[#4a4a6a]">
            <Mail className="text-brand-blue" size={18} /> info@oravagems.com
          </p>
          <Link
            href="https://www.linkedin.com/company/orava-private-limited/"
            className="text-brand-blue underline"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn Profile
          </Link>
          <p className="text-sm text-[#8f8b8f]">
            Office Hours: Mon-Fri 9:00 AM - 6:00 PM (IST)
          </p>
          <div className="rounded-xl bg-[#f5f7fa] p-4">
            <h3 className="mb-3 text-lg font-semibold text-[#1a1a2e]">
              Quick Contact Form
            </h3>
            <QuotationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
