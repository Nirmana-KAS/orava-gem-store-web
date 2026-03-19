import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types";

export function ok<T>(data?: T, message?: string, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function fail(error: string, status = 400): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ success: false, error }, { status });
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) return null;
  return session;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== Role.ADMIN) return null;
  return session;
}

