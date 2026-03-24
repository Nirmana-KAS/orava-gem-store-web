import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/products/ProductDetail";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductGrid from "@/components/products/ProductGrid";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return {
    title: product ? product.name : "Product",
    description: product
      ? `${product.name} from ${product.origin}`
      : "Product details",
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  const related = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      OR: [{ origin: product.origin }, { shape: product.shape }],
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link href="/products" className="text-sm text-brand-blue underline">
        Back to Products
      </Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <ProductImageGallery images={product.images} alt={product.name} />
        <div>
          <h1 className="font-heading text-4xl text-[#1a1a2e]">
            {product.name}
          </h1>
          <p className="mt-2 text-[#4a4a6a]">
            {product.origin} • {product.shape}
          </p>
          <div className="mt-4">
            <ProductDetail product={product} />
          </div>
          <div className="mt-4 flex gap-3">
            <Link href={`/quotation?productId=${product.id}`}>
              <Button>Request Quotation</Button>
            </Link>
            <Link href={`/quotation?quickInquiry=${product.id}`}>
              <Button variant="outline">Make Inquiry</Button>
            </Link>
          </div>
        </div>
      </div>
      <section className="mt-12">
        <h2 className="mb-4 font-heading text-3xl text-[#1a1a2e]">
          Related Products
        </h2>
        <ProductGrid products={related} />
      </section>
    </main>
  );
}
