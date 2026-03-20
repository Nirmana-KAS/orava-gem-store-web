import type { Metadata } from "next";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSort from "@/components/products/ProductSort";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse precision-cut gemstone collection.",
};

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page ?? "1");
  const limit = 12;
  const sortField = (resolvedSearchParams.sortField ?? "createdAt") as
    | "price"
    | "lotQuantity"
    | "weight"
    | "createdAt";
  const sortOrder = (resolvedSearchParams.sortOrder ?? "desc") as
    | "asc"
    | "desc";
  const where = {
    name: resolvedSearchParams.name
      ? { contains: resolvedSearchParams.name, mode: "insensitive" as const }
      : undefined,
    shape: resolvedSearchParams.shape
      ? { contains: resolvedSearchParams.shape, mode: "insensitive" as const }
      : undefined,
    size: resolvedSearchParams.size
      ? { contains: resolvedSearchParams.size, mode: "insensitive" as const }
      : undefined,
    colorName: resolvedSearchParams.colorName
      ? {
          contains: resolvedSearchParams.colorName,
          mode: "insensitive" as const,
        }
      : undefined,
    origin: resolvedSearchParams.origin
      ? { contains: resolvedSearchParams.origin, mode: "insensitive" as const }
      : undefined,
    clarityType: resolvedSearchParams.clarityType
      ? {
          contains: resolvedSearchParams.clarityType,
          mode: "insensitive" as const,
        }
      : undefined,
    polishedType: resolvedSearchParams.polishedType
      ? {
          contains: resolvedSearchParams.polishedType,
          mode: "insensitive" as const,
        }
      : undefined,
    condition:
      (resolvedSearchParams.condition as
        | "NATURAL"
        | "SEMI_PRESSURE"
        | "HEATED"
        | "SYNTHETIC"
        | undefined) ?? undefined,
    availability: resolvedSearchParams.availability
      ? resolvedSearchParams.availability === "true"
      : undefined,
  };
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 font-heading text-5xl">Products</h1>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside>
          <ProductFilters />
        </aside>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-zinc-300">{total} results</p>
            <ProductSort />
          </div>
          <ProductGrid products={products} />
          <div className="mt-6 flex items-center justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/products?${new URLSearchParams({ ...resolvedSearchParams, page: String(p) } as Record<string, string>).toString()}`}
                className={`rounded px-3 py-1 text-sm ${p === page ? "bg-gold text-dark" : "border border-white/20 text-zinc-200"}`}
              >
                {p}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
