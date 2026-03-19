import { NextRequest } from "next/server";
import { handlers } from "@/lib/auth";
import { fail } from "@/lib/api";
import { rateLimit } from "@/lib/rateLimit";

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function GET(request: NextRequest): Promise<Response> {
  return handlers.GET(request);
}

export async function POST(request: NextRequest): Promise<Response> {
  const ip = getIp(request);
  if (!rateLimit(`auth:${ip}`, 5, 60000)) {
    return fail("Too many authentication requests", 429);
  }
  return handlers.POST(request);
}

