import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { fail, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const paramsSchema = z.object({ id: z.string().uuid() });

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const admin = await requireAdmin();
    if (!admin) return fail("Unauthorized", 401);

    const resolved = await params;
    const parsed = paramsSchema.safeParse(resolved);
    if (!parsed.success) return fail("Invalid field value ID", 400);

    await prisma.fieldValue.delete({ where: { id: parsed.data.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Field value DELETE error:", error);
    return fail("Failed to delete field value", 500);
  }
}
