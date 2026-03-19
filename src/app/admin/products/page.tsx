"use client";

import { Product } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products?limit=100");
    const json = (await res.json()) as { success: boolean; data?: { items: Product[] }; error?: string };
    if (!json.success || !json.data) {
      toast(json.error ?? "Failed to load products");
      return;
    }
    setProducts(json.data.items);
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  const selectedProducts = useMemo(() => products.filter((p) => selectedIds.includes(p.id)), [products, selectedIds]);

  const onDelete = async (product: Product) => {
    if (!confirm(`Delete ${product.name}?`)) return;
    const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Delete failed");
      return;
    }
    toast("Product deleted");
    void fetchProducts();
  };

  const bulkDelete = async () => {
    if (!selectedProducts.length) return;
    if (!confirm(`Delete ${selectedProducts.length} products?`)) return;
    await Promise.all(selectedProducts.map((product) => fetch(`/api/products/${product.id}`, { method: "DELETE" })));
    toast("Bulk delete completed");
    setSelectedIds([]);
    void fetchProducts();
  };

  const bulkToggle = async () => {
    if (!selectedProducts.length) return;
    await Promise.all(
      selectedProducts.map((product) =>
        fetch(`/api/products/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...product, availability: !product.availability }),
        }),
      ),
    );
    toast("Bulk availability update completed");
    void fetchProducts();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-heading text-4xl">Products</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={bulkToggle}>
            Bulk Toggle Availability
          </Button>
          <Button variant="danger" onClick={bulkDelete}>
            Bulk Delete
          </Button>
          <Button
            onClick={() => {
              setEditing(undefined);
              setOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>
      </div>
      <p className="text-sm text-zinc-400">Select product rows via edit workflow for bulk actions.</p>
      <ProductTable
        products={products}
        onEdit={(product) => {
          setSelectedIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
          setEditing(product);
          setOpen(true);
        }}
        onDelete={onDelete}
      />
      <ProductForm isOpen={open} onClose={() => setOpen(false)} product={editing} onSaved={() => void fetchProducts()} />
    </div>
  );
}

