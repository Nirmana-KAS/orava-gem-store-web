import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  fieldType: z.string().trim().min(1, "fieldType is required"),
  value: z
    .string()
    .trim()
    .min(1, "value is required")
    .max(100, "value must be at most 100 characters"),
});

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const field = request.nextUrl.searchParams.get("field")?.trim();
    if (!field) return fail("field query parameter is required", 400);

    const values = await prisma.fieldValue.findMany({
      where: { fieldType: field },
      orderBy: { createdAt: "asc" },
    });

    return ok(values);
  } catch (error) {
    console.error("Field values GET error:", error);
    return fail("Failed to fetch field values", 500);
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const admin = await requireAdmin();
    if (!admin) return fail("Unauthorized", 401);

    const payload = await request.json();
    const parsed = bodySchema.safeParse(payload);
    if (!parsed.success) {
      return fail(parsed.error.issues[0]?.message ?? "Invalid payload", 400);
    }

    const fieldType = parsed.data.fieldType;
    const value = parsed.data.value.trim();

    const existing = await prisma.fieldValue.findUnique({
      where: {
        fieldType_value: {
          fieldType,
          value,
        },
      },
    });

    if (existing) return ok(existing);

    const created = await prisma.fieldValue.create({
      data: { fieldType, value },
    });

    return ok(created, "Field value created", 201);
  } catch (error) {
    console.error("Field values POST error:", error);
    return fail("Failed to create field value", 500);
  }
}
