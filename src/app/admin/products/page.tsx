"use client";

import { Condition, Product } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { toast } from "@/components/ui/Toast";

type SortField =
  | "createdAt"
  | "updatedAt"
  | "price"
  | "weight"
  | "lotQuantity"
  | "name";

interface ProductQueryState {
  page: number;
  limit: number;
  name: string;
  origin: string;
  shape: string;
  condition: string;
  availability: "all" | "true" | "false";
  sortField: SortField;
  sortOrder: "asc" | "desc";
}

const defaultQuery: ProductQueryState = {
  page: 1,
  limit: 25,
  name: "",
  origin: "",
  shape: "",
  condition: "",
  availability: "all",
  sortField: "updatedAt",
  sortOrder: "desc",
};

const conditionOptions = Object.values(Condition).map((c) => ({
  value: c,
  label: c.replace("_", " "),
}));

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<ProductQueryState>(defaultQuery);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (current = query) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", String(current.page));
    params.set("limit", String(current.limit));
    params.set("sortField", current.sortField);
    params.set("sortOrder", current.sortOrder);
    if (current.name.trim()) params.set("name", current.name.trim());
    if (current.origin.trim()) params.set("origin", current.origin.trim());
    if (current.shape.trim()) params.set("shape", current.shape.trim());
    if (current.condition) params.set("condition", current.condition);
    if (current.availability !== "all")
      params.set("availability", current.availability);

    const res = await fetch(`/api/products?${params.toString()}`, {
      cache: "no-store",
    });
    const json = (await res.json()) as {
      success: boolean;
      data?: { items: Product[]; total: number };
      error?: string;
    };

    if (!json.success || !json.data) {
      toast(json.error ?? "Failed to load products");
      setLoading(false);
      return;
    }

    setProducts(json.data.items);
    setTotal(json.data.total);
    setLoading(false);
  };

  useEffect(() => {
    void fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds.includes(p.id)),
    [products, selectedIds],
  );
  const currentPageCount = products.length;
  const totalPages = Math.max(1, Math.ceil(total / query.limit));

  const onDelete = async (product: Product) => {
    if (!confirm(`Delete ${product.name}?`)) return;
    const res = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Delete failed");
      return;
    }
    toast("Product deleted");
    void fetchProducts(query);
  };

  const bulkDelete = async () => {
    if (!selectedProducts.length) return;
    if (!confirm(`Delete ${selectedProducts.length} products?`)) return;
    await Promise.all(
      selectedProducts.map((product) =>
        fetch(`/api/products/${product.id}`, { method: "DELETE" }),
      ),
    );
    toast("Bulk delete completed");
    setSelectedIds([]);
    void fetchProducts(query);
  };

  const bulkToggle = async () => {
    if (!selectedProducts.length) return;
    await Promise.all(
      selectedProducts.map((product) =>
        fetch(`/api/products/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            availability: !product.availability,
          }),
        }),
      ),
    );
    toast("Bulk availability update completed");
    void fetchProducts(query);
  };

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const runSearch = () => {
    const next = { ...query, page: 1 };
    setQuery(next);
    void fetchProducts(next);
  };

  const resetFilters = () => {
    setQuery(defaultQuery);
    setSelectedIds([]);
    void fetchProducts(defaultQuery);
  };

  const movePage = (direction: -1 | 1) => {
    const nextPage = Math.min(totalPages, Math.max(1, query.page + direction));
    const next = { ...query, page: nextPage };
    setQuery(next);
    void fetchProducts(next);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#dbe3f2] bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#111827]">
              Product Catalog Control
            </h1>
            <p className="text-sm text-[#64748b]">
              Search, sort, and maintain all listed gemstones.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={bulkToggle}
              disabled={!selectedProducts.length}
            >
              Toggle Availability
            </Button>
            <Button
              variant="danger"
              onClick={bulkDelete}
              disabled={!selectedProducts.length}
            >
              Delete Selected
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

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <Input
            placeholder="Product name"
            value={query.name}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            placeholder="Origin"
            value={query.origin}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, origin: e.target.value }))
            }
          />
          <Input
            placeholder="Shape"
            value={query.shape}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, shape: e.target.value }))
            }
          />
          <Select
            value={query.condition}
            onChange={(value) =>
              setQuery((prev) => ({ ...prev, condition: value }))
            }
            options={[
              { value: "", label: "Any condition" },
              ...conditionOptions,
            ]}
          />
          <Select
            value={query.availability}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                availability: value as ProductQueryState["availability"],
              }))
            }
            options={[
              { value: "all", label: "All stock" },
              { value: "true", label: "Available" },
              { value: "false", label: "Unavailable" },
            ]}
          />
          <div className="flex gap-2">
            <Select
              value={query.sortField}
              onChange={(value) =>
                setQuery((prev) => ({ ...prev, sortField: value as SortField }))
              }
              options={[
                { value: "updatedAt", label: "Updated" },
                { value: "createdAt", label: "Created" },
                { value: "name", label: "Name" },
                { value: "weight", label: "Weight" },
                { value: "price", label: "Price" },
                { value: "lotQuantity", label: "Quantity" },
              ]}
            />
            <Select
              value={query.sortOrder}
              onChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  sortOrder: value as "asc" | "desc",
                }))
              }
              options={[
                { value: "desc", label: "Desc" },
                { value: "asc", label: "Asc" },
              ]}
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={runSearch}>Apply Filters</Button>
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#dbe3f2] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#f8fafc] text-[#334155]">
              <tr>
                <th className="px-3 py-3 text-left">Select</th>
                <th className="px-3 py-3 text-left">Name</th>
                <th className="px-3 py-3 text-left">Origin</th>
                <th className="px-3 py-3 text-left">Shape</th>
                <th className="px-3 py-3 text-left">Weight</th>
                <th className="px-3 py-3 text-left">Price</th>
                <th className="px-3 py-3 text-left">Condition</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const checked = selectedIds.includes(product.id);
                return (
                  <tr
                    key={product.id}
                    className="border-t border-[#e2e8f0] text-[#1f2937]"
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelected(product.id)}
                        className="h-4 w-4 rounded border-[#cbd5e1]"
                      />
                    </td>
                    <td className="px-3 py-3 font-medium">{product.name}</td>
                    <td className="px-3 py-3">{product.origin}</td>
                    <td className="px-3 py-3">{product.shape}</td>
                    <td className="px-3 py-3">{product.weight}</td>
                    <td className="px-3 py-3">
                      {product.price
                        ? `$${product.price.toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="px-3 py-3">{product.condition}</td>
                    <td className="px-3 py-3">
                      <Badge tone={product.availability ? "success" : "danger"}>
                        {product.availability ? "Available" : "Unavailable"}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditing(product);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => void onDelete(product)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!products.length ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-3 py-10 text-center text-[#64748b]"
                  >
                    {loading
                      ? "Loading products..."
                      : "No products match current filters."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between border-t border-[#e2e8f0] px-4 py-3 text-sm text-[#64748b]">
          <p>
            Showing {currentPageCount} of {total} products
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => movePage(-1)}
              disabled={query.page <= 1 || loading}
            >
              Previous
            </Button>
            <span>
              Page {query.page} / {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => movePage(1)}
              disabled={query.page >= totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <ProductForm
        isOpen={open}
        onClose={() => setOpen(false)}
        product={editing}
        onSaved={() => void fetchProducts()}
      />
    </div>
  );
}
