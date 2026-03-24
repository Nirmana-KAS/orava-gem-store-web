import Link from "next/link";
import FeaturedProductsCarousel from "@/components/home/FeaturedProductsCarousel";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-4xl text-[#1a1a2e]">
          Latest Collection
        </h2>
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>
      <FeaturedProductsCarousel products={products} />
    </section>
  );
}
