import { Condition, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { adminProductSchema } from "@/lib/validations";
import type { ProductWithDetails } from "@/types";

const sortFieldSchema = z.enum([
  "price",
  "lotQuantity",
  "weight",
  "createdAt",
  "updatedAt",
  "name",
]);

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  name: z.string().optional(),
  shape: z.union([z.string(), z.array(z.string())]).optional(),
  size: z.string().optional(),
  colorName: z.string().optional(),
  origin: z.union([z.string(), z.array(z.string())]).optional(),
  clarityType: z.string().optional(),
  polishedType: z.string().optional(),
  condition: z
    .union([z.nativeEnum(Condition), z.array(z.nativeEnum(Condition))])
    .optional(),
  availability: z.enum(["true", "false", "all"]).optional(),
  weightMin: z.coerce.number().optional(),
  weightMax: z.coerce.number().optional(),
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  sortField: sortFieldSchema.optional(),
  sortBy: sortFieldSchema.optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

const toArray = (value: string | string[] | undefined): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => v.trim()).filter(Boolean);
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

const toConditionArray = (
  value: Condition | Condition[] | undefined,
): Condition[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const rawQuery = {
      page: request.nextUrl.searchParams.get("page") ?? undefined,
      limit: request.nextUrl.searchParams.get("limit") ?? undefined,
      name: request.nextUrl.searchParams.get("name") ?? undefined,
      shape: request.nextUrl.searchParams.getAll("shape").length
        ? request.nextUrl.searchParams.getAll("shape")
        : (request.nextUrl.searchParams.get("shape") ?? undefined),
      size: request.nextUrl.searchParams.get("size") ?? undefined,
      colorName: request.nextUrl.searchParams.get("colorName") ?? undefined,
      origin: request.nextUrl.searchParams.getAll("origin").length
        ? request.nextUrl.searchParams.getAll("origin")
        : (request.nextUrl.searchParams.get("origin") ?? undefined),
      clarityType: request.nextUrl.searchParams.get("clarityType") ?? undefined,
      polishedType:
        request.nextUrl.searchParams.get("polishedType") ?? undefined,
      condition: request.nextUrl.searchParams.getAll("condition").length
        ? request.nextUrl.searchParams.getAll("condition")
        : (request.nextUrl.searchParams.get("condition") ?? undefined),
      availability:
        request.nextUrl.searchParams.get("availability") ?? undefined,
      weightMin: request.nextUrl.searchParams.get("weightMin") ?? undefined,
      weightMax: request.nextUrl.searchParams.get("weightMax") ?? undefined,
      createdFrom: request.nextUrl.searchParams.get("createdFrom") ?? undefined,
      createdTo: request.nextUrl.searchParams.get("createdTo") ?? undefined,
      sortField: request.nextUrl.searchParams.get("sortField") ?? undefined,
      sortBy: request.nextUrl.searchParams.get("sortBy") ?? undefined,
      sortOrder: request.nextUrl.searchParams.get("sortOrder") ?? undefined,
    };

    const parsed = querySchema.safeParse(rawQuery);
    if (!parsed.success)
      return fail(parsed.error.issues[0]?.message ?? "Invalid query", 400);

    const {
      page,
      limit,
      sortField,
      sortBy,
      sortOrder,
      weightMin,
      weightMax,
      createdFrom,
      createdTo,
      availability,
      ...filters
    } = parsed.data;

    const shapeValues = toArray(filters.shape);
    const originValues = toArray(filters.origin);
    const conditionValues = toConditionArray(filters.condition);

    const createdAtFilter: Prisma.DateTimeFilter | undefined =
      createdFrom || createdTo
        ? {
            gte: createdFrom ? new Date(createdFrom) : undefined,
            lte: createdTo ? new Date(createdTo) : undefined,
          }
        : undefined;

    const weightFilter: Prisma.FloatFilter | undefined =
      typeof weightMin === "number" || typeof weightMax === "number"
        ? {
            gte: weightMin,
            lte: weightMax,
          }
        : undefined;

    const availabilityFilter =
      availability === "all" || availability === undefined
        ? undefined
        : availability === "true";

    const orderByField = sortField ?? sortBy ?? "createdAt";

    const where: Prisma.ProductWhereInput = {
      name: filters.name
        ? { contains: filters.name, mode: "insensitive" }
        : undefined,
      shape: shapeValues.length ? { in: shapeValues } : undefined,
      size: filters.size
        ? { contains: filters.size, mode: "insensitive" }
        : undefined,
      colorName: filters.colorName
        ? { contains: filters.colorName, mode: "insensitive" }
        : undefined,
      origin: originValues.length ? { in: originValues } : undefined,
      clarityType: filters.clarityType
        ? { contains: filters.clarityType, mode: "insensitive" }
        : undefined,
      polishedType: filters.polishedType
        ? { contains: filters.polishedType, mode: "insensitive" }
        : undefined,
      condition: conditionValues.length ? { in: conditionValues } : undefined,
      availability: availabilityFilter,
      weight: weightFilter,
      createdAt: createdAtFilter,
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { inquiredProducts: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
      }),
      prisma.product.count({ where }),
    ]);
    return ok<{
      items: ProductWithDetails[];
      total: number;
      page: number;
      limit: number;
    }>({ items, total, page, limit });
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
    if (!parsed.success)
      return fail(parsed.error.issues[0]?.message ?? "Invalid payload", 400);
    const created = await prisma.product.create({ data: parsed.data });
    return ok(created, "Product created", 201);
  } catch (error) {
    console.error("Products POST error:", error);
    return fail("Failed to create product", 500);
  }
}
