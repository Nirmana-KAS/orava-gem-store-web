"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
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

const INQUIRY_BENEFITS = [
  "Detailed quote within 24 hours",
  "Custom cut, calibration, and shape",
  "Gem-lab certification on request",
  "Worldwide insured shipping",
];

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
      <div className="inline-flex items-center gap-2 rounded-full border border-[#dde2e8] bg-white px-3 py-1.5 text-xs font-medium text-[#8f8b8f]">
        <span className="h-2 w-2 rounded-full bg-[#8f8b8f]/40" />
        Checking office status…
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        status.open
          ? "border-[#3c74ae]/30 bg-[#e8f0f9] text-[#3c74ae]"
          : "border-[#dde2e8] bg-white text-[#8f8b8f]"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status.open ? "animate-ping bg-[#3c74ae]" : "bg-[#8f8b8f]/40"
          }`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            status.open ? "bg-[#3c74ae]" : "bg-[#8f8b8f]"
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
      className="inline-flex items-center gap-1 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-2 py-1 text-[11px] font-medium text-[#3c74ae] transition hover:border-[#3c74ae]/40 hover:bg-[#3c74ae] hover:text-white"
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
    <main className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:space-y-20 sm:py-14">
      {/* HERO — matches About page pattern */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative overflow-hidden rounded-3xl border border-[#dbe3f2] bg-gradient-to-br from-[#e8f0f9] via-white to-white p-8 sm:p-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#3c74ae]/10 blur-3xl"
        />
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3c74ae] backdrop-blur"
          >
            <Sparkles size={12} /> Get in Touch
          </motion.span>
          <motion.h1
            id="contact-hero-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 font-heading text-4xl font-bold text-[#1a1a2e] sm:text-5xl md:text-6xl"
          >
            Let&apos;s talk gemstones.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[#4a4a6a] sm:text-lg"
          >
            Based in Colombo, shipping to the world&apos;s finest jewellers and
            watchmakers. Our team replies to every inquiry within 24 hours.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Replies within 24 hours",
              "Worldwide delivery",
              "Trusted since 2006",
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#3c74ae]/20 bg-white/70 px-3 py-1 text-xs font-medium text-[#3c74ae] backdrop-blur"
              >
                <CheckCircle2 size={12} />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MAP + CONTACT CARD */}
      <section aria-labelledby="reach-us-heading">
        <h2 id="reach-us-heading" className="sr-only">
          How to reach us
        </h2>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-[#dde2e8] bg-white p-1 shadow-sm"
          >
            <div className="overflow-hidden rounded-[22px]">
              <iframe
                title="ORAVA Gems — No. 24, Carlwil Place, Colombo 03"
                src={MAP_EMBED_URL}
                className="h-[360px] w-full sm:h-[440px] lg:h-[560px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={MAPS_APP_URL}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-[#dde2e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#3c74ae] shadow-sm transition hover:border-[#3c74ae] hover:bg-[#3c74ae] hover:text-white"
            >
              <ExternalLink size={12} />
              Open in Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-[#dde2e8] bg-white p-6 shadow-sm sm:p-7"
          >
            <div className="mb-5">
              <OfficeStatusBadge />
            </div>

            <h3 className="font-heading text-xl font-bold text-[#1a1a2e] sm:text-2xl">
              ORAVA (Pvt) Ltd.
            </h3>
            <p className="mt-1 text-sm text-[#8f8b8f]">
              Precision-cut gemstones · since 2006
            </p>

            <div className="my-6 border-t border-[#dde2e8]" />

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae]">
                  <MapPin size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8f8b8f]">
                    Address
                  </p>
                  <p className="mt-1 break-words text-sm text-[#1a1a2e]">
                    {ADDRESS}
                  </p>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#3c74ae] transition hover:text-[#2d5f96]"
                  >
                    <Navigation size={12} />
                    Get directions
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae]">
                  <Phone size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8f8b8f]">
                      Phone
                    </p>
                    <CopyPill value={PHONE_DISPLAY} label="phone number" />
                  </div>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="mt-1 block text-sm font-medium text-[#1a1a2e] transition hover:text-[#3c74ae]"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae]">
                  <Mail size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8f8b8f]">
                      Email
                    </p>
                    <CopyPill value={EMAIL} label="email address" />
                  </div>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 block break-all text-sm font-medium text-[#1a1a2e] transition hover:text-[#3c74ae]"
                  >
                    {EMAIL}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f0f9] text-[#3c74ae]">
                  <Linkedin size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8f8b8f]">
                    LinkedIn
                  </p>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#1a1a2e] transition hover:text-[#3c74ae]"
                  >
                    orava-private-limited
                    <ExternalLink size={12} />
                  </a>
                </div>
              </li>
            </ul>

            <div className="my-6 border-t border-[#dde2e8]" />

            <div className="flex items-start gap-3 rounded-2xl border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#3c74ae]"
              />
              <p className="text-sm text-[#4a4a6a]">
                <span className="font-semibold text-[#1a1a2e]">
                  We reply within 24 hours
                </span>{" "}
                — to every inquiry, small or large.
              </p>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-[#8f8b8f]">
              <Clock size={12} />
              Office hours: Mon–Fri, 9:00 AM – 6:00 PM IST
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading" className="sr-only">
          Quick actions
        </h2>
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
      </section>

      {/* SEND AN INQUIRY — themed two-column layout */}
      <section
        aria-labelledby="inquiry-heading"
        className="relative overflow-hidden rounded-3xl border border-[#dbe3f2] bg-gradient-to-br from-[#e8f0f9] via-white to-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#3c74ae]/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#3c74ae]/10 blur-3xl"
        />

        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-5 lg:gap-10 lg:p-12">
          <div className="flex flex-col justify-center lg:col-span-2">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3c74ae] backdrop-blur"
            >
              <Sparkles size={12} /> Send an Inquiry
            </motion.span>
            <motion.h2
              id="inquiry-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-4 font-heading text-3xl font-bold leading-tight text-[#1a1a2e] sm:text-4xl"
            >
              Tell us what you&apos;re
              <span className="block text-[#3c74ae]">looking for.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 text-sm leading-relaxed text-[#4a4a6a] sm:text-base"
            >
              Share your requirement and we&apos;ll follow up with availability,
              pricing, and lead time — usually within a working day.
            </motion.p>

            <ul className="mt-6 space-y-3">
              {INQUIRY_BENEFITS.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3c74ae]/10 text-[#3c74ae]">
                    <CheckCircle2 size={14} />
                  </span>
                  <span className="text-sm text-[#1a1a2e]">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 flex items-center gap-2 text-xs text-[#8f8b8f]">
              <Clock size={12} />
              Prefer email? Write to{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="font-semibold text-[#3c74ae] hover:text-[#2d5f96]"
              >
                {EMAIL}
              </a>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-[#dde2e8] bg-white p-6 shadow-sm sm:p-8">
              <QuotationForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3c74ae]/20 bg-[#e8f0f9] px-4 py-1.5 text-xs font-semibold text-[#3c74ae]">
            Frequently Asked
          </span>
          <h2
            id="faq-heading"
            className="mt-4 font-heading text-3xl font-bold text-[#1a1a2e] sm:text-4xl"
          >
            Quick answers before you reach out.
          </h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}
