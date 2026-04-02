import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return fail("Invalid payload", 400);

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token: parsed.data.token },
    });

    if (!verificationToken) return fail("Invalid or expired token", 400);
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token: parsed.data.token },
      });
      return fail("Token has expired. Please request a new reset link.", 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });
    if (!user) return fail("User not found", 404);

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await prisma.verificationToken.delete({
      where: { token: parsed.data.token },
    });

    return ok(null, "Password reset successfully");
  } catch (error) {
    console.error("Reset password error:", error);
    return fail("Failed to reset password", 500);
  }
}
