import { MeetingType, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { sendMeetingConfirmationEmail } from "@/lib/resend";
import { meetingSchema } from "@/lib/validations";
import { isValidEmail } from "@/lib/utils";
import { rateLimit } from "@/lib/rateLimit";

const querySchema = z.object({
  status: z.string().optional(),
  type: z.nativeEnum(MeetingType).optional(),
});

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const admin = await requireAdmin();
    if (!admin) return fail("Forbidden", 403);
    const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams.entries()));
    if (!parsed.success) return fail("Invalid query", 400);
    const where: Prisma.MeetingWhereInput = {
      status: parsed.data.status as Prisma.EnumMeetingStatusFilter | undefined,
      meetingType: parsed.data.type,
    };
    const meetings = await prisma.meeting.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return ok(meetings);
  } catch (error) {
    console.error("Meetings GET error:", error);
    return fail("Failed to fetch meetings", 500);
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!rateLimit(`meeting:${ip}`, 5, 60000)) return fail("Too many requests", 429);

    const session = await auth();
    const payload = await request.json();
    const parsed = meetingSchema.safeParse(payload);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid payload", 400);
    if (!session?.user && (!parsed.data.guestEmail || !isValidEmail(parsed.data.guestEmail))) {
      return fail("Guest email is required", 400);
    }

    const created = await prisma.meeting.create({
      data: {
        meetingType: parsed.data.meetingType,
        preferredDate: parsed.data.preferredDate,
        description: parsed.data.description,
        guestEmail: session?.user ? null : parsed.data.guestEmail,
        userId: session?.user?.id,
        attachmentUrl: parsed.data.attachmentUrl,
        attachmentName: parsed.data.attachmentName,
      },
    });
    const to = session?.user?.email ?? parsed.data.guestEmail;
    if (to) void sendMeetingConfirmationEmail(to, created);
    return ok(created, "Meeting request submitted", 201);
  } catch (error) {
    console.error("Meetings POST error:", error);
    return fail("Failed to submit meeting request", 500);
  }
}

