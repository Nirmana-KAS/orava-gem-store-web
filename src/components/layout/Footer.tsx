import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#dde2e8] bg-surface px-4 py-12 text-[#4a4a6a]">
      <div className="mx-auto mb-8 flex max-w-7xl flex-col items-center text-center">
        {/* Replace /logo.png with your uploaded logo file in /public folder */}
        <Logo src="/logo.png" />
        <p className="mt-2 text-sm text-[#4a4a6a]">
          Beauty Crafted To An Exemplary Standard
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div className="rounded-xl border border-[#dde2e8] bg-white p-4">
          <h4 className="mb-2 text-sm font-semibold text-[#1a1a2e]">About</h4>
          <p className="text-sm text-[#4a4a6a]">
            Precision-cut colored gemstones from Sri Lanka for premium global
            brands.
          </p>
          <div className="mt-4 inline-flex rounded-full border border-[#c9d9ec] bg-[#e8f0f9] px-3 py-1 text-xs text-brand-blue">
            24-hour Worldwide Delivery
          </div>
        </div>

        <div className="rounded-xl border border-[#dde2e8] bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-[#1a1a2e]">
            Quick Links
          </h4>
          <div className="space-y-2 text-sm">
            <Link className="block hover:text-brand-blue" href="/">
              Home
            </Link>
            <Link className="block hover:text-brand-blue" href="/products">
              Products
            </Link>
            <Link className="block hover:text-brand-blue" href="/services">
              Services
            </Link>
            <Link className="block hover:text-brand-blue" href="/customized">
              Customized
            </Link>
            <Link className="block hover:text-brand-blue" href="/about">
              About
            </Link>
            <Link className="block hover:text-brand-blue" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-[#dde2e8] bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-[#1a1a2e]">
            Services
          </h4>
          <p className="text-sm">
            Cutting, sourcing, color grading, calibration, and customized
            finishing.
          </p>
        </div>

        <div className="rounded-xl border border-[#dde2e8] bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-[#1a1a2e]">Contact</h4>
          <p className="flex items-start gap-2 text-sm">
            <MapPin size={15} className="mt-0.5 text-brand-blue" />
            No. 42, Colombo 03, Western Province, Sri Lanka
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Mail size={15} className="text-brand-blue" />
            admin@oravagems.com
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Phone size={15} className="text-brand-blue" />
            +94 11 000 0000
          </p>
          <a
            className="mt-3 flex items-center gap-2 text-sm hover:text-brand-blue"
            href="#"
            aria-label="ORAVA LinkedIn"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <p className="mt-1 text-xs text-brand-blue">SLEDB Registered</p>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col justify-between gap-2 border-t border-[#dde2e8] pt-6 text-xs text-[#8f8b8f] md:flex-row">
        <span>
          © {new Date().getFullYear()} ORAVA (Pvt) Ltd. All rights reserved.
        </span>
        <div className="flex gap-4">
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
