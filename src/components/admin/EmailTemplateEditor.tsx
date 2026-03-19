"use client";

import { EmailTemplate } from "@prisma/client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

interface EmailTemplateEditorProps {
  templates: EmailTemplate[];
}

export default function EmailTemplateEditor({ templates }: EmailTemplateEditorProps) {
  const [selected, setSelected] = useState<EmailTemplate | null>(templates[0] ?? null);
  const [subject, setSubject] = useState(selected?.subject ?? "");
  const [body, setBody] = useState(selected?.body ?? "");

  const save = async () => {
    if (!selected) return;
    const res = await fetch("/api/admin/email-templates", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id, subject, body }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to save template");
      return;
    }
    toast("Template saved");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
      <div className="space-y-2 rounded-xl border border-white/10 bg-dark-surface p-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              setSelected(template);
              setSubject(template.subject);
              setBody(template.body);
            }}
            className={`w-full rounded-md px-3 py-2 text-left text-sm ${
              selected?.id === template.id ? "bg-gold/20 text-gold" : "hover:bg-white/10"
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
      <div className="space-y-3 rounded-xl border border-white/10 bg-dark-surface p-4">
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="h-80 w-full rounded-md border border-white/20 bg-dark-elevated p-3 text-sm"
          placeholder="Template body"
        />
        <p className="text-xs text-zinc-400">Variables: {"{{firstName}} {{inquiryId}} {{meetingId}}"}</p>
        <Button onClick={save}>Save Template</Button>
      </div>
    </div>
  );
}

