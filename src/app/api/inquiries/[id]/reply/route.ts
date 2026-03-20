import { InquiryStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { logAudit } from "@/lib/audit";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { sendAdminInquiryReplyEmail } from "@/lib/resend";

const schema = z.object({
  reply: z.string().min(3).max(5000),
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

    const inquiry = await prisma.inquiry.findUnique({
      where: { id: resolvedParams.id },
      include: { user: true },
    });
    if (!inquiry) return fail("Inquiry not found", 404);
    const updated = await prisma.inquiry.update({
      where: { id: resolvedParams.id },
      data: {
        adminReply: parsed.data.reply,
        repliedAt: new Date(),
        status: InquiryStatus.REPLIED,
      },
    });

    const to = inquiry.user?.email ?? inquiry.guestEmail;
    if (to) void sendAdminInquiryReplyEmail(to, inquiry.id, parsed.data.reply);

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "",
      action: "INQUIRY_REPLY",
      target: "Inquiry",
      targetId: inquiry.id,
      details: parsed.data.reply.slice(0, 120),
      ipAddress: request.headers.get("x-forwarded-for"),
    });

    return ok(updated, "Reply sent");
  } catch (error) {
    console.error("Inquiry reply error:", error);
    return fail("Failed to reply inquiry", 500);
  }
}
