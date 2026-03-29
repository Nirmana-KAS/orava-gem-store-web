"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@prisma/client";
import { useRef } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";

interface FeaturedProductsCarouselProps {
  products: Product[];
}

export default function FeaturedProductsCarousel({
  products,
}: FeaturedProductsCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (distance: number) => {
    containerRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => scrollBy(-420)}>
          <ChevronLeft size={16} />
        </Button>
        <Button type="button" variant="outline" onClick={() => scrollBy(420)}>
          <ChevronRight size={16} />
        </Button>
      </div>
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[310px] shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
