import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="mx-auto my-12 max-w-7xl rounded-xl bg-gradient-to-r from-[#3c74ae] to-[#5b92ca] px-6 py-10 text-center text-white">
      <h2 className="font-heading text-4xl">
        Ready to Source Premium Gemstones?
      </h2>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/quotation">
          <Button className="bg-white text-brand-blue hover:bg-[#f0f6fc]">
            Make an Inquiry
          </Button>
        </Link>
        <Link href="/quotation">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Request a Meeting
          </Button>
        </Link>
      </div>
    </section>
  );
}
