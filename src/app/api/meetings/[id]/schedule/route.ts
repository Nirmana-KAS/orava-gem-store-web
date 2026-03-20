import { MeetingStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { logAudit } from "@/lib/audit";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { sendMeetingScheduledEmail } from "@/lib/resend";

const schema = z.object({
  scheduledAt: z.coerce.date(),
  adminReply: z.string().min(2),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const resolvedParams = await params;
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    const meeting = await prisma.meeting.findUnique({
      where: { id: resolvedParams.id },
      include: { user: true },
    });
    if (!meeting) return fail("Meeting not found", 404);
    const updated = await prisma.meeting.update({
      where: { id: resolvedParams.id },
      data: {
        scheduledAt: parsed.data.scheduledAt,
        adminReply: parsed.data.adminReply,
        status: MeetingStatus.SCHEDULED,
      },
    });
    const to = meeting.user?.email ?? meeting.guestEmail;
    if (to)
      void sendMeetingScheduledEmail(
        to,
        meeting.id,
        parsed.data.scheduledAt,
        parsed.data.adminReply,
      );
    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "",
      action: "MEETING_SCHEDULE",
      target: "Meeting",
      targetId: meeting.id,
      details: parsed.data.scheduledAt.toISOString(),
      ipAddress: request.headers.get("x-forwarded-for"),
    });
    return ok(updated, "Meeting scheduled");
  } catch (error) {
    console.error("Meeting schedule error:", error);
    return fail("Failed to schedule meeting", 500);
  }
}
