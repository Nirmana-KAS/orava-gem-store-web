import AuditLogTable from "@/components/admin/AuditLogTable";
import { prisma } from "@/lib/prisma";

export default async function AdminAuditPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl">Audit Log</h1>
      <AuditLogTable logs={logs} />
    </div>
  );
}

