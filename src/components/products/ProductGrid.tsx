import { Product } from "@prisma/client";
import ProductCard from "@/components/products/ProductCard";

interface ProductGridProps {
  products: Product[];
  onQuickInquiry?: (productId: string) => void;
}

export default function ProductGrid({ products, onQuickInquiry }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="rounded-md border border-white/10 bg-dark-surface p-6 text-center text-zinc-300">No products found.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickInquiry={onQuickInquiry} />
      ))}
    </div>
  );
}

