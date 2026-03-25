import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/aceternity/BackgroundGradientAnimation";

export default function CTASection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <BackgroundGradientAnimation className="rounded-3xl px-5 py-12 text-center sm:px-10 sm:py-16">
          <p className="mx-auto inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs text-white/90 sm:text-sm">
            Premium Gemstone Partner
          </p>

          <h2 className="mt-5 font-heading text-3xl font-bold text-white sm:mt-6 sm:text-4xl">
            Ready to Source Premium Gemstones?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base text-white/80 sm:mt-4 sm:text-lg">
            Delivering gem parcels within 24 hours worldwide after order
            completion. The world&apos;s most demanding clients trust ORAVA.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
            <Link
              href="/quotation"
              className="w-full rounded-xl border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#3c74ae] sm:w-auto"
            >
              Make an Inquiry
            </Link>
            <Link
              href="/services"
              className="w-full rounded-xl border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#3c74ae] sm:w-auto"
            >
              Request a Meeting
            </Link>
          </div>
        </BackgroundGradientAnimation>
      </div>
    </section>
  );
}
