"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ColorSwatch from "@/components/ui/ColorSwatch";
import { formatCurrency } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/demo/image/upload/sample.jpg";

function isAllowedImageUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    const isHttps = url.protocol === "https:";
    const host = url.hostname;
    return (
      isHttps &&
      (host === "res.cloudinary.com" ||
        host === "lh3.googleusercontent.com" ||
        host.endsWith(".supabase.co"))
    );
  } catch {
    return false;
  }
}

interface ProductCardProps {
  product: Product;
  onQuickInquiry?: (productId: string) => void;
}

export default function ProductCard({
  product,
  onQuickInquiry,
}: ProductCardProps) {
  const imageSrc = isAllowedImageUrl(product.images[0])
    ? product.images[0]
    : FALLBACK_IMAGE;

  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative h-56">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{product.name}</h3>
          <Badge tone={product.availability ? "success" : "danger"}>
            {product.availability ? "Available" : "Unavailable"}
          </Badge>
        </div>
        <p className="text-sm text-zinc-300">
          {product.origin} • {product.shape}
        </p>
        <ColorSwatch hex={product.colorHex} label={product.colorName} />
        <p className="text-sm text-zinc-300">
          {product.weight}ct • {product.size}
        </p>
        <p className="text-gold">
          {typeof product.price === "number"
            ? formatCurrency(product.price)
            : "Contact for Price"}
        </p>
        <div className="flex gap-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onQuickInquiry?.(product.id)}
          >
            Quick Inquiry
          </Button>
        </div>
      </div>
    </Card>
  );
}
