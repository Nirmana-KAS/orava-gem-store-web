import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/aceternity/BackgroundGradientAnimation";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <BackgroundGradientAnimation className="rounded-3xl px-6 py-16 text-center sm:px-10">
          <p className="mx-auto inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white/90">
            Premium Gemstone Partner
          </p>

          <h2 className="mt-6 font-heading text-4xl font-bold text-white">
            Ready to Source Premium Gemstones?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Delivering gem parcels within 24 hours worldwide after order
            completion. The world&apos;s most demanding clients trust ORAVA.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/quotation"
              className="rounded-xl border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#3c74ae]"
            >
              Make an Inquiry
            </Link>
            <Link
              href="/services"
              className="rounded-xl border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#3c74ae]"
            >
              Request a Meeting
            </Link>
          </div>
        </BackgroundGradientAnimation>
      </div>
    </section>
  );
}
