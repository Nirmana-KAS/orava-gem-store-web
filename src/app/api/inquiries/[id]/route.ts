import { InquiryStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const idSchema = z.object({ id: z.string().uuid() });
const updateSchema = z.object({
  status: z.nativeEnum(InquiryStatus),
  adminNote: z.string().optional(),
});

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const session = await auth();
    const p = idSchema.safeParse(params);
    if (!p.success) return fail("Invalid inquiry ID", 400);
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: p.data.id },
      include: { user: true, inquiredProducts: { include: { product: true } } },
    });
    if (!inquiry) return fail("Inquiry not found", 404);
    const own = session?.user && (inquiry.userId === session.user.id || inquiry.guestEmail === session.user.email);
    const isAdmin = session?.user?.role === "ADMIN";
    if (!own && !isAdmin) return fail("Forbidden", 403);
    return ok(inquiry);
  } catch (error) {
    console.error("Inquiry GET error:", error);
    return fail("Failed to fetch inquiry", 500);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const admin = await requireAdmin();
    if (!admin) return fail("Forbidden", 403);
    const p = idSchema.safeParse(params);
    if (!p.success) return fail("Invalid inquiry ID", 400);
    const payload = await request.json();
    const parsed = updateSchema.safeParse(payload);
    if (!parsed.success) return fail("Invalid payload", 400);
    const updated = await prisma.inquiry.update({
      where: { id: p.data.id },
      data: {
        status: parsed.data.status,
        adminNote: parsed.data.adminNote,
        acceptDate: parsed.data.status === InquiryStatus.IN_REVIEW ? new Date() : undefined,
      },
    });
    return ok(updated, "Inquiry updated");
  } catch (error) {
    console.error("Inquiry PUT error:", error);
    return fail("Failed to update inquiry", 500);
  }
}

