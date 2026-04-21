"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import QuotationForm from "@/components/forms/QuotationForm";

const ADDRESS = "No. 24, Carlwil Place, Colombo 03, Sri Lanka";
const PHONE_DISPLAY = "+94 11 257 5756";
const PHONE_TEL = "+94112575756";
const EMAIL = "info@oravagems.com";
const LINKEDIN_URL = "https://www.linkedin.com/company/orava-private-limited/";
const MAPS_APP_URL = "https://maps.app.goo.gl/69GvtsP2E5J6aByD9";
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  ADDRESS,
)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS,
)}`;
const CALLBACK_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Callback request",
)}&body=${encodeURIComponent(
  "Hello ORAVA team,\n\nI'd like to request a callback. Please let me know a good time to connect.\n\nPreferred date/time:\nMy timezone:\nMy phone number:\nWhat I'd like to discuss:\n\nThank you.",
)}`;

const FAQ = [
  {
    q: "What is your minimum order quantity?",
    a: "We serve both small-batch and bulk buyers. The minimum depends on the gem type, size, and calibration — share your requirement and we'll confirm feasibility within a working day.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. We deliver to premium brands, jewellers, and watchmakers globally within 24 hours via trusted, insured, fully tracked courier partners — door to door.",
  },
  {
    q: "Can you provide gem laboratory certification?",
    a: "For clients requiring certified stones, we arrange internationally recognised gem laboratory reports for sapphire, ruby, and emerald. Let us know at the inquiry stage so we can include it in the quote.",
  },
  {
    q: "How quickly do you respond to inquiries?",
    a: "Every inquiry — small or large — receives a personal response within 24 hours on business days. Urgent requests are prioritised.",
  },
];

function useColomboOfficeStatus() {
  const [status, setStatus] = useState<{
    open: boolean;
    label: string;
  } | null>(null);

  useEffect(() => {
    function tick() {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Colombo",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(new Date());
      const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
      const minute = Number(
        parts.find((p) => p.type === "minute")?.value ?? "0",
      );
      const mins = hour * 60 + minute;
      const weekend = weekday === "Sat" || weekday === "Sun";
      const isOpen = !weekend && mins >= 540 && mins < 1080;

      if (isOpen) {
        setStatus({ open: true, label: "Open now · Closes 6:00 PM IST" });
        return;
      }
      let nextLabel = "";
      if (!weekend && mins < 540) {
        nextLabel = "Opens today at 9:00 AM IST";
      } else if (weekday === "Fri" || weekday === "Sat" || weekday === "Sun") {
        nextLabel = "Opens Monday at 9:00 AM IST";
      } else {
        nextLabel = "Opens tomorrow at 9:00 AM IST";
      }
      setStatus({ open: false, label: `Closed · ${nextLabel}` });
    }
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

function OfficeStatusBadge() {
  const status = useColomboOfficeStatus();

  if (!status) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
        <span className="h-2 w-2 rounded-full bg-white/30" />
        Checking office status…
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        status.open
          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
          : "border-white/10 bg-white/5 text-white/70"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status.open ? "animate-ping bg-emerald-400" : "bg-white/40"
          }`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            status.open ? "bg-emerald-400" : "bg-white/60"
          }`}
        />
      </span>
      {status.label}
    </div>
  );
}

function CopyPill({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/80 transition hover:border-[#7fb0e3]/50 hover:bg-[#3c74ae]/20 hover:text-white"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {FAQ.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-[#dde2e8] bg-white transition-colors hover:border-[#3c74ae]/40"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-heading text-sm font-semibold text-[#1a1a2e] sm:text-base">
                {item.q}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-[#3c74ae] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden" }}
            >
              <p className="px-5 pb-5 text-sm leading-relaxed text-[#4a4a6a]">
                {item.a}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function ActionCard({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group relative overflow-hidden rounded-2xl border border-[#dde2e8] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3c74ae] hover:shadow-lg hover:shadow-[#3c74ae]/10"
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae] transition-colors group-hover:bg-[#3c74ae] group-hover:text-white">
        {icon}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8f8b8f]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-[#1a1a2e]">
        {value}
      </p>
    </a>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#e8f0f9] via-white to-white px-4 pb-8 pt-10 sm:pt-14">
        <div className="mx-auto max-w-7xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]"
          >
            <Sparkles size={12} />
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl md:text-5xl"
          >
            Let&apos;s talk gemstones.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-3 max-w-xl text-sm text-[#4a4a6a] sm:text-base"
          >
            Based in Colombo, shipping worldwide. Our team replies to every
            inquiry within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1b2d] via-[#1a1a2e] to-[#0f1b2d] px-4 py-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(60,116,174,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#3c74ae]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#3c74ae]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 shadow-2xl shadow-[#3c74ae]/20 backdrop-blur"
            >
              <div className="overflow-hidden rounded-[22px] ring-1 ring-white/5">
                <iframe
                  title="ORAVA Gems — No. 24, Carlwil Place, Colombo 03"
                  src={MAP_EMBED_URL}
                  className="h-[380px] w-full sm:h-[440px] lg:h-[580px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={MAPS_APP_URL}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#1a1a2e]/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-[#3c74ae]"
              >
                <ExternalLink size={12} />
                Open in Google Maps
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-[#3c74ae]/10 backdrop-blur sm:p-7"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <OfficeStatusBadge />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
                  <Languages size={12} />
                  EN · සිංහල · தமிழ்
                </span>
              </div>

              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                ORAVA (Pvt) Ltd.
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Precision-cut gemstones · since 2006
              </p>

              <div className="my-6 border-t border-white/10" />

              <ul className="space-y-5">
                <li>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#3c74ae]/20 text-[#7fb0e3]">
                      <MapPin size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        Address
                      </p>
                      <p className="mt-1 break-words text-sm text-white">
                        {ADDRESS}
                      </p>
                      <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7fb0e3] transition hover:text-white"
                      >
                        <Navigation size={12} />
                        Get directions
                      </a>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#3c74ae]/20 text-[#7fb0e3]">
                      <Phone size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                          Phone
                        </p>
                        <CopyPill value={PHONE_DISPLAY} label="phone number" />
                      </div>
                      <a
                        href={`tel:${PHONE_TEL}`}
                        className="mt-1 block text-sm font-medium text-white transition hover:text-[#7fb0e3]"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#3c74ae]/20 text-[#7fb0e3]">
                      <Mail size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                          Email
                        </p>
                        <CopyPill value={EMAIL} label="email address" />
                      </div>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="mt-1 block break-all text-sm font-medium text-white transition hover:text-[#7fb0e3]"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#3c74ae]/20 text-[#7fb0e3]">
                      <Linkedin size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        LinkedIn
                      </p>
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-white transition hover:text-[#7fb0e3]"
                      >
                        orava-private-limited
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="my-6 border-t border-white/10" />

              <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-300"
                />
                <p className="text-sm text-white/80">
                  <span className="font-semibold text-white">
                    We reply within 24 hours
                  </span>{" "}
                  — to every inquiry, small or large.
                </p>
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
                <Clock size={12} />
                Office hours: Mon–Fri, 9:00 AM – 6:00 PM IST
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard
              icon={<Phone size={20} />}
              label="Call"
              value={PHONE_DISPLAY}
              href={`tel:${PHONE_TEL}`}
            />
            <ActionCard
              icon={<Mail size={20} />}
              label="Email"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
            />
            <ActionCard
              icon={<Navigation size={20} />}
              label="Directions"
              value="Open in Google Maps"
              href={DIRECTIONS_URL}
              external
            />
            <ActionCard
              icon={<Calendar size={20} />}
              label="Schedule a call"
              value="Request a callback"
              href={CALLBACK_MAILTO}
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-[#f5f7fa] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
              <Sparkles size={12} />
              Send an Inquiry
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
              Tell us what you&apos;re looking for.
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[#4a4a6a]">
              Share your requirement and we&apos;ll follow up with availability,
              pricing, and lead time — usually within a working day.
            </p>
          </div>
          <div className="rounded-3xl border border-[#dde2e8] bg-white p-6 shadow-sm sm:p-8">
            <QuotationForm />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
              Frequently Asked
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
              Quick answers before you reach out.
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}
