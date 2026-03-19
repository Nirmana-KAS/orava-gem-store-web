import { endOfDay, startOfDay } from "date-fns";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import type { ReportStats } from "@/types";

const schema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    const from = startOfDay(parsed.data.from);
    const to = endOfDay(parsed.data.to);

    const [inquiries, meetings, newUsers, topProductsRaw, responseTimes] = await Promise.all([
      prisma.inquiry.groupBy({
        by: ["inquiryType"],
        where: { createdAt: { gte: from, lte: to } },
        _count: { inquiryType: true },
      }),
      prisma.meeting.groupBy({
        by: ["status"],
        where: { createdAt: { gte: from, lte: to } },
        _count: { status: true },
      }),
      prisma.user.count({ where: { createdAt: { gte: from, lte: to } } }),
      prisma.inquiredProduct.groupBy({
        by: ["productId"],
        _count: { productId: true },
        orderBy: { _count: { productId: "desc" } },
        take: 10,
      }),
      prisma.inquiry.findMany({
        where: { createdAt: { gte: from, lte: to }, repliedAt: { not: null } },
        select: { createdAt: true, repliedAt: true },
      }),
    ]);

    const products = await prisma.product.findMany({
      where: { id: { in: topProductsRaw.map((x) => x.productId) } },
      select: { id: true, name: true },
    });
    const productMap = new Map(products.map((p) => [p.id, p.name]));

    const averageInquiryResponseHours =
      responseTimes.length > 0
        ? responseTimes.reduce((acc, item) => {
            const repliedAt = item.repliedAt ?? item.createdAt;
            return acc + (repliedAt.getTime() - item.createdAt.getTime()) / (1000 * 60 * 60);
          }, 0) / responseTimes.length
        : 0;

    const stats: ReportStats = {
      inquiriesByType: {
        PRODUCT: 0,
        SERVICE: 0,
        CUSTOMIZED: 0,
        QUOTATION: 0,
      },
      meetingsByStatus: {
        PENDING: 0,
        SCHEDULED: 0,
        COMPLETED: 0,
        CANCELLED: 0,
      },
      newUsers,
      topProducts: topProductsRaw.map((item) => ({
        name: productMap.get(item.productId) ?? "Unknown",
        count: item._count.productId,
      })),
      averageInquiryResponseHours,
    };

    inquiries.forEach((item) => {
      stats.inquiriesByType[item.inquiryType] = item._count.inquiryType;
    });
    meetings.forEach((item) => {
      stats.meetingsByStatus[item.status] = item._count.status;
    });

    return ok(stats, "Report generated");
  } catch (error) {
    console.error("Report generate error:", error);
    return fail("Failed to generate report", 500);
  }
}

