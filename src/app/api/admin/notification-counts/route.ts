import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);

    const [meetings, products, customized, quotations] = await Promise.all([
      prisma.meeting.count({ where: { status: "PENDING" } }),
      prisma.inquiry.count({
        where: { inquiryType: "PRODUCT", status: "PENDING" },
      }),
      prisma.inquiry.count({
        where: { inquiryType: "CUSTOMIZED", status: "PENDING" },
      }),
      prisma.inquiry.count({
        where: { inquiryType: "QUOTATION", status: "PENDING" },
      }),
    ]);

    const total = meetings + products + customized + quotations;
    return ok({ meetings, products, customized, quotations, total });
  } catch (error) {
    console.error("Notification counts error:", error);
    return fail("Failed to fetch notification counts", 500);
  }
}
