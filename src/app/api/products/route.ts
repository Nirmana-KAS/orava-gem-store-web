import { Condition, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { adminProductSchema } from "@/lib/validations";
import type { ProductWithDetails } from "@/types";

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  name: z.string().optional(),
  shape: z.string().optional(),
  size: z.string().optional(),
  colorName: z.string().optional(),
  origin: z.string().optional(),
  clarityType: z.string().optional(),
  polishedType: z.string().optional(),
  condition: z.nativeEnum(Condition).optional(),
  availability: z.coerce.boolean().optional(),
  sortField: z.enum(["price", "lotQuantity", "weight", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams.entries()));
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid query", 400);
    const { page, limit, sortField, sortOrder, ...filters } = parsed.data;

    const where: Prisma.ProductWhereInput = {
      name: filters.name ? { contains: filters.name, mode: "insensitive" } : undefined,
      shape: filters.shape ? { contains: filters.shape, mode: "insensitive" } : undefined,
      size: filters.size ? { contains: filters.size, mode: "insensitive" } : undefined,
      colorName: filters.colorName ? { contains: filters.colorName, mode: "insensitive" } : undefined,
      origin: filters.origin ? { contains: filters.origin, mode: "insensitive" } : undefined,
      clarityType: filters.clarityType ? { contains: filters.clarityType, mode: "insensitive" } : undefined,
      polishedType: filters.polishedType ? { contains: filters.polishedType, mode: "insensitive" } : undefined,
      condition: filters.condition,
      availability: filters.availability,
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { inquiredProducts: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortField]: sortOrder },
      }),
      prisma.product.count({ where }),
    ]);
    return ok<{ items: ProductWithDetails[]; total: number; page: number; limit: number }>({ items, total, page, limit });
  } catch (error) {
    console.error("Products GET error:", error);
    return fail("Failed to fetch products", 500);
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const payload = await request.json();
    const parsed = adminProductSchema.safeParse(payload);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid payload", 400);
    const created = await prisma.product.create({ data: parsed.data });
    return ok(created, "Product created", 201);
  } catch (error) {
    console.error("Products POST error:", error);
    return fail("Failed to create product", 500);
  }
}

