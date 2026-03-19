import { NextRequest } from "next/server";
import { z } from "zod";
import { logAudit } from "@/lib/audit";
import { auth } from "@/lib/auth";
import { fail, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { userUpdateSchema } from "@/lib/validations";

const idSchema = z.object({ id: z.string().uuid() });

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const session = await auth();
    if (!session?.user) return fail("Unauthorized", 401);
    const p = idSchema.safeParse(params);
    if (!p.success) return fail("Invalid user ID", 400);
    const isAdmin = session.user.role === "ADMIN";
    if (!isAdmin && session.user.id !== p.data.id) return fail("Forbidden", 403);
    const user = await prisma.user.findUnique({
      where: { id: p.data.id },
      include: { inquiries: true, meetings: true },
    });
    if (!user) return fail("User not found", 404);
    return ok(user);
  } catch (error) {
    console.error("User GET error:", error);
    return fail("Failed to fetch user", 500);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const session = await auth();
    if (!session?.user) return fail("Unauthorized", 401);
    const p = idSchema.safeParse(params);
    if (!p.success) return fail("Invalid user ID", 400);
    const isAdmin = session.user.role === "ADMIN";
    if (!isAdmin && session.user.id !== p.data.id) return fail("Forbidden", 403);
    const body = await request.json();
    const parsed = userUpdateSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    const data = isAdmin ? parsed.data : { ...parsed.data, role: undefined };
    const user = await prisma.user.update({ where: { id: p.data.id }, data });
    if (isAdmin && parsed.data.role) {
      await logAudit({
        adminId: session.user.id,
        adminEmail: session.user.email ?? "",
        action: "USER_ROLE_UPDATE",
        target: "User",
        targetId: user.id,
        details: `role=${parsed.data.role}`,
        ipAddress: request.headers.get("x-forwarded-for"),
      });
    }
    return ok(user, "User updated");
  } catch (error) {
    console.error("User PUT error:", error);
    return fail("Failed to update user", 500);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);
    const p = idSchema.safeParse(params);
    if (!p.success) return fail("Invalid user ID", 400);
    const user = await prisma.user.delete({ where: { id: p.data.id } });
    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "",
      action: "USER_DELETE",
      target: "User",
      targetId: user.id,
      details: user.email,
      ipAddress: request.headers.get("x-forwarded-for"),
    });
    return ok(null, "User deleted");
  } catch (error) {
    console.error("User DELETE error:", error);
    return fail("Failed to delete user", 500);
  }
}

