import { NextRequest } from "next/server";
import { fail, ok, requireAdmin } from "@/lib/api";
import { rateLimit } from "@/lib/rateLimit";

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);

    const ip = getIp(request);
    const allowed = rateLimit(`admin-passkey:${ip}`, 5, 60_000);
    if (!allowed)
      return fail("Too many attempts. Please try again in a minute.", 429);

    const body = (await request.json()) as { passkey?: string };
    const expected = process.env.ADMIN_PASSKEY;

    if (!expected) return fail("Admin passkey is not configured", 500);
    if (!body.passkey) return fail("Passkey is required", 400);

    if (body.passkey !== expected) return fail("Invalid passkey", 401);

    return ok({ verified: true }, "Passkey verified");
  } catch (error) {
    console.error("Verify passkey error:", error);
    return fail("Failed to verify passkey", 500);
  }
}
