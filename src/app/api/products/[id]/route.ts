import { NextRequest } from "next/server";
import { z } from "zod";
import { deleteImage } from "@/lib/cloudinary";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { adminProductSchema } from "@/lib/validations";
import { logAudit } from "@/lib/audit";

const paramsSchema = z.object({ id: z.string().uuid() });

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const resolvedParams = await params;
    const p = paramsSchema.safeParse(resolvedParams);
    if (!p.success) return fail("Invalid product ID", 400);
    const item = await prisma.product.findUnique({
      where: { id: p.data.id },
      include: { inquiredProducts: { include: { inquiry: true } } },
    });
    if (!item) return fail("Product not found", 404);
    return ok(item);
  } catch (error) {
    console.error("Product GET error:", error);
    return fail("Failed to fetch product", 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const resolvedParams = await params;
    const p = paramsSchema.safeParse(resolvedParams);
    if (!p.success) return fail("Invalid product ID", 400);
    const payload = await request.json();
    const parsed = adminProductSchema.safeParse(payload);
    if (!parsed.success)
      return fail(parsed.error.issues[0]?.message ?? "Invalid payload", 400);
    const updated = await prisma.product.update({
      where: { id: p.data.id },
      data: parsed.data,
    });
    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "",
      action: "PRODUCT_UPDATE",
      target: "Product",
      targetId: updated.id,
      details: updated.name,
      ipAddress: request.headers.get("x-forwarded-for"),
    });
    return ok(updated, "Product updated");
  } catch (error) {
    console.error("Product PUT error:", error);
    return fail("Failed to update product", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const resolvedParams = await params;
    const p = paramsSchema.safeParse(resolvedParams);
    if (!p.success) return fail("Invalid product ID", 400);
    const existing = await prisma.product.findUnique({
      where: { id: p.data.id },
    });
    if (!existing) return fail("Product not found", 404);
    await Promise.all(
      existing.images.map(async (url: string) => {
        try {
          const pathname = new URL(url).pathname;
          const uploadIdx = pathname.indexOf("/upload/");
          if (uploadIdx === -1) return;
          // After /upload/ there may be a version like v1234567890/
          let publicId = pathname.slice(uploadIdx + "/upload/".length);
          // Remove version prefix if present (e.g., v1234567890/)
          publicId = publicId.replace(/^v\d+\//, "");
          // Remove file extension
          publicId = publicId.replace(/\.[a-z]+$/i, "");
          await deleteImage(publicId);
        } catch (error) {
          console.error("Cloudinary cleanup warning:", error);
        }
      }),
    );
    await prisma.product.delete({ where: { id: p.data.id } });
    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "",
      action: "PRODUCT_DELETE",
      target: "Product",
      targetId: p.data.id,
      details: existing.name,
      ipAddress: request.headers.get("x-forwarded-for"),
    });
    return ok(null, "Product deleted");
  } catch (error) {
    console.error("Product DELETE error:", error);
    return fail("Failed to delete product", 500);
  }
}
