import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-dark px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-heading text-2xl text-gold">ORAVA</h3>
          <p className="mt-2 text-sm text-zinc-300">Beauty Crafted To An Exemplary Standard</p>
          <div className="mt-4 inline-flex rounded border border-gold px-2 py-1 text-xs text-gold">
            24-hour Worldwide Delivery
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
          <div className="space-y-2 text-sm text-zinc-300">
            <Link className="block hover:text-gold" href="/products">
              Products
            </Link>
            <Link className="block hover:text-gold" href="/services">
              Services
            </Link>
            <Link className="block hover:text-gold" href="/about">
              About
            </Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Services</h4>
          <p className="text-sm text-zinc-300">Cutting, sourcing, grading, calibration, customized finishing.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
          <p className="text-sm text-zinc-300">Colombo, Sri Lanka</p>
          <p className="text-sm text-zinc-300">admin@oravagems.com</p>
          <p className="text-sm text-zinc-300">+94 11 000 0000</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
            <Linkedin size={16} /> LinkedIn
          </p>
          <p className="mt-1 text-xs text-gold">SLEDB Registered</p>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-zinc-400 md:flex-row">
        <span>© {new Date().getFullYear()} ORAVA (Pvt) Ltd. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

