import { prisma } from "@/lib/prisma";

interface AuditInput {
  adminId: string;
  adminEmail: string;
  action: string;
  target: string;
  targetId?: string;
  details?: string;
  ipAddress?: string | null;
}

export async function logAudit(input: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        adminId: input.adminId,
        adminEmail: input.adminEmail,
        action: input.action,
        target: input.target,
        targetId: input.targetId,
        details: input.details,
        ipAddress: input.ipAddress ?? undefined,
      },
    });
  } catch (error) {
    console.error("Audit logging failed:", error);
  }
}

