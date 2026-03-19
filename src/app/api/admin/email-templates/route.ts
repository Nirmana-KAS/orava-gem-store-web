import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok, requireAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  id: z.string().uuid(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const session = await requireAdmin();
    if (!session) return fail("Forbidden", 403);
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    const template = await prisma.emailTemplate.update({
      where: { id: parsed.data.id },
      data: {
        subject: parsed.data.subject,
        body: parsed.data.body,
      },
    });
    return ok(template, "Template updated");
  } catch (error) {
    console.error("Email template PUT error:", error);
    return fail("Failed to update template", 500);
  }
}

