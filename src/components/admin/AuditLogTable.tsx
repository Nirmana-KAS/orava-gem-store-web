"use client";

import { AuditLog } from "@prisma/client";
import { formatDateTime } from "@/lib/utils";

interface AuditLogTableProps {
  logs: AuditLog[];
}

export default function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-dark-elevated">
          <tr>
            <th className="px-3 py-2 text-left">Admin Email</th>
            <th className="px-3 py-2 text-left">Action</th>
            <th className="px-3 py-2 text-left">Target</th>
            <th className="px-3 py-2 text-left">Details</th>
            <th className="px-3 py-2 text-left">IP Address</th>
            <th className="px-3 py-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-white/10">
              <td className="px-3 py-2">{log.adminEmail}</td>
              <td className="px-3 py-2">{log.action}</td>
              <td className="px-3 py-2">{log.target}</td>
              <td className="px-3 py-2">{log.details ?? "-"}</td>
              <td className="px-3 py-2">{log.ipAddress ?? "-"}</td>
              <td className="px-3 py-2">{formatDateTime(log.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

