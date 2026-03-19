import { addHours } from "date-fns";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/resend";
import { generateId } from "@/lib/utils";

const schema = z.object({ email: z.string().email() });

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);
    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) return ok(null, "If account exists, reset instructions were sent");
    const token = generateId();
    await prisma.verificationToken.create({
      data: { identifier: user.email, token, expires: addHours(new Date(), 1) },
    });
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    void sendPasswordResetEmail(user.email, resetLink);
    return ok(null, "Reset email sent");
  } catch (error) {
    console.error("Forgot password error:", error);
    return fail("Failed to process request", 500);
  }
}

