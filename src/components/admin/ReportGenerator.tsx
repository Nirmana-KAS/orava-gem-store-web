"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import type { ReportStats } from "@/types";

interface ReportGeneratorProps {
  onGenerated: (stats: ReportStats) => void;
}

export default function ReportGenerator({ onGenerated }: ReportGeneratorProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/reports/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to }),
    });
    const json = (await res.json()) as { success: boolean; data?: ReportStats; error?: string };
    setLoading(false);
    if (!json.success || !json.data) {
      toast(json.error ?? "Failed to generate report");
      return;
    }
    onGenerated(json.data);
  };

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-dark-surface p-4">
      <h3 className="font-semibold">Generate Report</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <Button onClick={handleGenerate} isLoading={loading}>
        Generate Report
      </Button>
    </div>
  );
}

