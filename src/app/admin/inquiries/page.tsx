"use client";

import { InquiryStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import InquiryKanban from "@/components/admin/InquiryKanban";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";

interface InquiryItem {
  id: string;
  inquiryType: string;
  guestEmail: string | null;
  user?: { email: string } | null;
  status: InquiryStatus;
  description: string | null;
  attachmentUrl: string | null;
  adminNote: string | null;
  inquiredProducts: Array<{ id: string; product?: { name: string } }>;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [selected, setSelected] = useState<InquiryItem | null>(null);
  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");

  const load = async () => {
    const res = await fetch("/api/inquiries");
    const json = (await res.json()) as { success: boolean; data?: InquiryItem[]; error?: string };
    if (!json.success || !json.data) {
      toast(json.error ?? "Failed to load inquiries");
      return;
    }
    setInquiries(json.data);
  };

  useEffect(() => {
    void load();
  }, []);

  const move = async (id: string, status: InquiryStatus) => {
    const target = inquiries.find((item) => item.id === id);
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNote: target?.adminNote ?? undefined }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to update status");
      return;
    }
    void load();
  };

  const sendReply = async () => {
    if (!selected) return;
    const res = await fetch(`/api/inquiries/${selected.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to send reply");
      return;
    }
    if (note.trim()) {
      await fetch(`/api/inquiries/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selected.status, adminNote: note }),
      });
    }
    toast("Reply sent");
    setSelected(null);
    setReply("");
    setNote("");
    void load();
  };

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl">Inquiries</h1>
      <InquiryKanban
        inquiries={inquiries}
        onMove={move}
        onOpen={(id) => {
          const inquiry = inquiries.find((item) => item.id === id) ?? null;
          setSelected(inquiry);
          setNote(inquiry?.adminNote ?? "");
        }}
      />
      <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title="Inquiry Details">
        {selected ? (
          <div className="space-y-3">
            <p className="text-sm text-zinc-300">ID: {selected.id}</p>
            <p className="text-sm text-zinc-300">Type: {selected.inquiryType}</p>
            <p className="text-sm text-zinc-300">Requester: {selected.user?.email ?? selected.guestEmail ?? "-"}</p>
            <p className="text-sm text-zinc-300">Description: {selected.description ?? "-"}</p>
            <p className="text-sm text-zinc-300">
              Products: {selected.inquiredProducts.map((item) => item.product?.name ?? item.id).join(", ") || "-"}
            </p>
            {selected.attachmentUrl ? (
              <a href={selected.attachmentUrl} target="_blank" className="text-gold underline" rel="noreferrer">
                Download attachment
              </a>
            ) : null}
            <label className="block text-sm">
              Internal Note
              <textarea value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 h-20 w-full rounded-md border border-white/20 bg-dark-elevated p-2" />
            </label>
            <label className="block text-sm">
              Reply
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} className="mt-1 h-28 w-full rounded-md border border-white/20 bg-dark-elevated p-2" />
            </label>
            <Button onClick={sendReply}>Send Reply</Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

