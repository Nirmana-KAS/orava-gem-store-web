import { MeetingStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const idSchema = z.object({ id: z.string().uuid() });
const updateSchema = z.object({
  status: z.nativeEnum(MeetingStatus).optional(),
  description: z.string().optional(),
  adminReply: z.string().optional(),
});

export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const session = await auth();
    const p = idSchema.safeParse(params);
    if (!p.success) return fail("Invalid meeting ID", 400);
    const meeting = await prisma.meeting.findUnique({
      where: { id: p.data.id },
      include: { user: true },
    });
    if (!meeting) return fail("Meeting not found", 404);
    const own = session?.user && (meeting.userId === session.user.id || meeting.guestEmail === session.user.email);
    const isAdmin = session?.user?.role === "ADMIN";
    if (!own && !isAdmin) return fail("Forbidden", 403);
    return ok(meeting);
  } catch (error) {
    console.error("Meeting GET error:", error);
    return fail("Failed to fetch meeting", 500);
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const admin = await requireAdmin();
    if (!admin) return fail("Forbidden", 403);
    const p = idSchema.safeParse(params);
    if (!p.success) return fail("Invalid meeting ID", 400);
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    const updated = await prisma.meeting.update({
      where: { id: p.data.id },
      data: parsed.data,
    });
    return ok(updated, "Meeting updated");
  } catch (error) {
    console.error("Meeting PUT error:", error);
    return fail("Failed to update meeting", 500);
  }
}

