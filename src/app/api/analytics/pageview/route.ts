import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { generateId } from "@/lib/utils";

const schema = z.object({
  page: z.string().min(1),
  country: z.string().optional(),
  userAgent: z.string().optional(),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    await prisma.pageView.create({
      data: {
        page: parsed.data.page,
        country: parsed.data.country ?? request.headers.get("x-vercel-ip-country") ?? undefined,
        userAgent: parsed.data.userAgent ?? request.headers.get("user-agent") ?? undefined,
        sessionId: request.headers.get("x-vercel-id") ?? generateId(),
      },
    });
    return ok(null, "Tracked", 201);
  } catch (error) {
    console.error("Pageview POST error:", error);
    return fail("Failed to track pageview", 500);
  }
}

