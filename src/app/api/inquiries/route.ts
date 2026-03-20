import { InquiryType, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { sendInquiryConfirmationEmail } from "@/lib/resend";
import { inquiryGuestSchema, inquirySchema } from "@/lib/validations";
import { isValidEmail } from "@/lib/utils";
import { rateLimit } from "@/lib/rateLimit";

const querySchema = z.object({
  status: z.string().optional(),
  type: z.nativeEnum(InquiryType).optional(),
});

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const admin = await requireAdmin();
    if (!admin) return fail("Forbidden", 403);
    const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams.entries()));
    if (!parsed.success) return fail("Invalid query", 400);
    const where: Prisma.InquiryWhereInput = {
      status: parsed.data.status as Prisma.EnumInquiryStatusFilter | undefined,
      inquiryType: parsed.data.type,
    };
    const inquiries = await prisma.inquiry.findMany({
      where,
      include: {
        user: true,
        inquiredProducts: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return ok(inquiries);
  } catch (error) {
    console.error("Inquiries GET error:", error);
    return fail("Failed to fetch inquiries", 500);
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!rateLimit(`inquiry:${ip}`, 5, 60000)) return fail("Too many requests", 429);

    const session = await auth();
    const payload = await request.json();
    const schema = session?.user ? inquirySchema : inquiryGuestSchema;
    const parsed = schema.safeParse(payload);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid payload", 400);

    if (!session?.user && (!parsed.data.guestEmail || !isValidEmail(parsed.data.guestEmail))) {
      return fail("Guest email is required", 400);
    }

    const created = await prisma.inquiry.create({
      data: {
        inquiryType: parsed.data.inquiryType,
        description: parsed.data.description,
        guestEmail: session?.user ? null : parsed.data.guestEmail,
        userId: session?.user?.id,
        attachmentUrl: parsed.data.attachmentUrl,
        attachmentName: parsed.data.attachmentName,
        inquiredProducts: parsed.data.productIds?.length
          ? {
              create: parsed.data.productIds.map((productId) => ({
                productId,
              })),
            }
          : undefined,
      },
      include: { inquiredProducts: true },
    });

    const to = session?.user?.email ?? parsed.data.guestEmail;
    if (to) void sendInquiryConfirmationEmail(to, created);
    return ok(created, "Inquiry submitted", 201);
  } catch (error) {
    console.error("Inquiries POST error:", error);
    return fail("Failed to submit inquiry", 500);
  }
}

