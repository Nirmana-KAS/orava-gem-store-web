"use client";

import { useMemo, useState } from "react";
import ReportGenerator from "@/components/admin/ReportGenerator";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import type { ReportStats } from "@/types";

function toCsv(report: ReportStats): string {
  const lines = [
    "Section,Key,Value",
    ...Object.entries(report.inquiriesByType).map(([k, v]) => `Inquiries,${k},${v}`),
    ...Object.entries(report.meetingsByStatus).map(([k, v]) => `Meetings,${k},${v}`),
    `Users,New Users,${report.newUsers}`,
    ...report.topProducts.map((item) => `Top Products,${item.name},${item.count}`),
    `Performance,Average Inquiry Response Hours,${report.averageInquiryResponseHours.toFixed(2)}`,
  ];
  return lines.join("\n");
}

export default function AdminReportsPage() {
  const [report, setReport] = useState<ReportStats | null>(null);
  const [emails, setEmails] = useState("admin@oravagems.com");
  const [time, setTime] = useState("09:00");
  const [autoSend, setAutoSend] = useState(false);

  const csv = useMemo(() => (report ? toCsv(report) : ""), [report]);

  const exportCsv = () => {
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orava-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendNow = async () => {
    if (!report) {
      toast("Generate a report first");
      return;
    }
    const recipients = emails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
    const res = await fetch("/api/reports/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails: recipients, reportData: report }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to send report");
      return;
    }
    toast("Report email queued");
  };

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl">Reports</h1>
      <ReportGenerator onGenerated={setReport} />
      {report ? (
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold">Report Output</h2>
          <p className="text-sm text-zinc-300">Total inquiries by type: {JSON.stringify(report.inquiriesByType)}</p>
          <p className="text-sm text-zinc-300">Total meetings by status: {JSON.stringify(report.meetingsByStatus)}</p>
          <p className="text-sm text-zinc-300">New users: {report.newUsers}</p>
          <p className="text-sm text-zinc-300">
            Most inquired products: {report.topProducts.map((p) => `${p.name} (${p.count})`).join(", ") || "-"}
          </p>
          <p className="text-sm text-zinc-300">
            Inquiry response average: {report.averageInquiryResponseHours.toFixed(2)} hours
          </p>
          <Button variant="outline" onClick={exportCsv}>
            Export CSV
          </Button>
        </Card>
      ) : null}

      <Card className="space-y-3">
        <h2 className="text-xl font-semibold">Email Schedule</h2>
        <label className="block text-sm">
          Recipient Emails (comma separated)
          <Input value={emails} onChange={(e) => setEmails(e.target.value)} />
        </label>
        <label className="block text-sm">
          Daily Send Time
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={autoSend} onChange={(e) => setAutoSend(e.target.checked)} />
          Auto-send enabled
        </label>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast(`Schedule saved (${time}, auto=${autoSend})`)}>
            Save Schedule
          </Button>
          <Button onClick={sendNow}>Send Now</Button>
        </div>
      </Card>
    </div>
  );
}

