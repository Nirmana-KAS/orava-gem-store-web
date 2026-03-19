import { NextRequest } from "next/server";
import { z } from "zod";
import { logAudit } from "@/lib/audit";
import { fail, ok, requireAdmin } from "@/lib/api";
import { sendDailySummaryReport } from "@/lib/resend";

const schema = z.object({
  emails: z.array(z.string().email()).min(1),
  reportData: z.record(z.unknown()),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    void sendDailySummaryReport(parsed.data.emails, parsed.data.reportData);
    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "",
      action: "REPORT_SEND",
      target: "Report",
      details: `emails=${parsed.data.emails.join(",")}`,
      ipAddress: request.headers.get("x-forwarded-for"),
    });
    return ok(null, "Report queued");
  } catch (error) {
    console.error("Report send error:", error);
    return fail("Failed to send report", 500);
  }
}

