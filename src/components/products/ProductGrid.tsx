import { Product } from "@prisma/client";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-md border border-[#dde2e8] bg-[#f5f7fa] p-6 text-center text-[#4a4a6a]">
        No products found.
      </p>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
