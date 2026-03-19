import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="mx-auto my-12 max-w-7xl rounded-xl bg-gradient-to-r from-dark to-gold/20 px-6 py-10 text-center">
      <h2 className="font-heading text-4xl">Ready to Source Premium Gemstones?</h2>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/quotation">
          <Button>Make an Inquiry</Button>
        </Link>
        <Link href="/quotation">
          <Button variant="outline">Request a Meeting</Button>
        </Link>
      </div>
    </section>
  );
}

