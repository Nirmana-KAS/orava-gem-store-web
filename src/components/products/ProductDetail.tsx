import { Product } from "@prisma/client";
import Badge from "@/components/ui/Badge";
import ColorSwatch from "@/components/ui/ColorSwatch";
import { formatCurrency } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid gap-2 rounded-xl border border-white/10 bg-dark-surface p-4 text-sm md:grid-cols-2">
      <p>Origin: {product.origin}</p>
      <p>Shape: {product.shape}</p>
      <p>Size: {product.size}</p>
      <p>Weight: {product.weight}ct</p>
      <p className="flex items-center gap-2">
        Color: <ColorSwatch hex={product.colorHex} label={product.colorName} />
      </p>
      <p>Clarity: {product.clarityType}</p>
      <p>Polish Type: {product.polishedType}</p>
      <p>
        Condition: <Badge>{product.condition}</Badge>
      </p>
      <p>Lot Quantity: {product.lotQuantity}</p>
      <p>Price: {typeof product.price === "number" ? formatCurrency(product.price) : "Contact for Price"}</p>
      <p>
        Availability: <Badge tone={product.availability ? "success" : "danger"}>{product.availability ? "Available" : "Unavailable"}</Badge>
      </p>
    </div>
  );
}

