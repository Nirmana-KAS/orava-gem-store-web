import Link from "next/link";
import { ExternalLink, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#dde2e8] bg-[#f5f7fa]">
      <div className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Logo className="justify-center" />
            <p className="mt-2 font-heading text-xl italic text-[#8f8b8f]">
              Beauty Crafted To An Exemplary Standard
            </p>
          </div>

          <div className="mt-10 border-t border-[#dde2e8]" />

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold text-[#1a1a2e]">About ORAVA</h4>
              <p className="text-sm leading-relaxed text-[#8f8b8f]">
                Precision-cut coloured gemstones from Sri Lanka for premium
                global brands since 2006.
              </p>
              <span className="mt-4 inline-flex rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-3 py-1 text-xs font-medium text-[#3c74ae]">
                24-Hour Worldwide Delivery
              </span>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-[#1a1a2e]">Quick Links</h4>
              <div className="flex flex-col">
                <Link
                  className="py-1 text-sm text-[#4a4a6a] transition-colors hover:text-[#3c74ae]"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="py-1 text-sm text-[#4a4a6a] transition-colors hover:text-[#3c74ae]"
                  href="/products"
                >
                  Products
                </Link>
                <Link
                  className="py-1 text-sm text-[#4a4a6a] transition-colors hover:text-[#3c74ae]"
                  href="/services"
                >
                  Services
                </Link>
                <Link
                  className="py-1 text-sm text-[#4a4a6a] transition-colors hover:text-[#3c74ae]"
                  href="/customized"
                >
                  Customized
                </Link>
                <Link
                  className="py-1 text-sm text-[#4a4a6a] transition-colors hover:text-[#3c74ae]"
                  href="/about"
                >
                  About
                </Link>
                <Link
                  className="py-1 text-sm text-[#4a4a6a] transition-colors hover:text-[#3c74ae]"
                  href="/contact"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-[#1a1a2e]">
                Our Services
              </h4>
              <div className="flex flex-col">
                <span className="py-1 text-sm text-[#4a4a6a]">
                  Cutting & Calibration
                </span>
                <span className="py-1 text-sm text-[#4a4a6a]">
                  Stone Sourcing
                </span>
                <span className="py-1 text-sm text-[#4a4a6a]">
                  Colour Grading
                </span>
                <span className="py-1 text-sm text-[#4a4a6a]">
                  Quality Assurance
                </span>
                <span className="py-1 text-sm text-[#4a4a6a]">
                  Custom Cutting
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-[#1a1a2e]">Contact Us</h4>
              <div className="space-y-3 text-sm text-[#8f8b8f]">
                <p className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-[#3c74ae]" />
                  No. 24, Carlwil Place, Colombo 03, Sri Lanka
                </p>
                <p className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 text-[#3c74ae]" />
                  +94 11 257 4062
                </p>
                <a
                  className="flex items-start gap-2 hover:text-[#3c74ae]"
                  href="mailto:orava@eureka.lk"
                >
                  <Mail size={16} className="mt-0.5 text-[#3c74ae]" />
                  orava@eureka.lk
                </a>
                <a
                  className="flex items-start gap-2 hover:text-[#3c74ae]"
                  href="https://www.linkedin.com/company/orava-private-limited/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={16} className="mt-0.5 text-[#3c74ae]" />
                  LinkedIn
                </a>
                <a
                  className="flex items-start gap-2 hover:text-[#3c74ae]"
                  href="https://maps.app.goo.gl/SXjNNqZzYhqV8qHR7"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} className="mt-0.5 text-[#3c74ae]" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 border-t border-[#dde2e8] px-8 py-4 text-xs text-[#8f8b8f] sm:flex-row">
        <span>© 2025 ORAVA (Pvt) Ltd. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
