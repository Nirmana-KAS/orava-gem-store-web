import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";
import { fail, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/resend";
import { signUpSchema } from "@/lib/validations";

const registerSchema = signUpSchema.extend({
  password: z.string().min(8),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const payload = await request.json();
    const parsed = registerSchema.safeParse(payload);
    if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid payload", 400);
    const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (exists) return fail("Email already exists", 400);
    const password = payload.password.startsWith("$2") ? payload.password : await bcrypt.hash(payload.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        password,
      },
    });
    void sendWelcomeEmail(user.email, user.firstName);
    return ok(user, "Account created", 201);
  } catch (error) {
    console.error("Register error:", error);
    return fail("Failed to register", 500);
  }
}

