"use client";

import { Meeting, MeetingStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import MeetingTable from "@/components/admin/MeetingTable";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";

type MeetingItem = Meeting & { user?: { email: string } | null };

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<MeetingItem[]>([]);
  const [selected, setSelected] = useState<MeetingItem | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [adminReply, setAdminReply] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const load = async () => {
    const res = await fetch("/api/meetings");
    const json = (await res.json()) as { success: boolean; data?: MeetingItem[]; error?: string };
    if (!json.success || !json.data) {
      toast(json.error ?? "Failed to load meetings");
      return;
    }
    setMeetings(json.data);
  };

  useEffect(() => {
    void load();
  }, []);

  const updateStatus = async (meetingId: string, status: MeetingStatus) => {
    const res = await fetch(`/api/meetings/${meetingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to update status");
      return;
    }
    void load();
  };

  const schedule = async () => {
    if (!selected || !scheduledAt || !adminReply.trim()) return;
    const res = await fetch(`/api/meetings/${selected.id}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scheduledAt, adminReply }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to schedule meeting");
      return;
    }
    toast("Meeting scheduled");
    setSelected(null);
    setScheduledAt("");
    setAdminReply("");
    void load();
  };

  const cancelMeeting = async () => {
    if (!selected) return;
    const reasonText = cancelReason.trim();
    const res = await fetch(`/api/meetings/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: MeetingStatus.CANCELLED,
        adminReply: reasonText ? `Cancelled: ${reasonText}` : "Cancelled by admin",
      }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to cancel meeting");
      return;
    }
    toast("Meeting cancelled");
    setCancelReason("");
    setSelected(null);
    void load();
  };

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl">Meetings</h1>
      <MeetingTable meetings={meetings} onOpen={(meeting) => setSelected(meeting)} onStatus={updateStatus} />
      <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title="Meeting Details">
        {selected ? (
          <div className="space-y-3">
            <p className="text-sm text-zinc-300">ID: {selected.id}</p>
            <p className="text-sm text-zinc-300">Type: {selected.meetingType}</p>
            <p className="text-sm text-zinc-300">Requester: {selected.user?.email ?? selected.guestEmail ?? "-"}</p>
            <p className="text-sm text-zinc-300">Description: {selected.description ?? "-"}</p>
            {selected.attachmentUrl ? (
              <a href={selected.attachmentUrl} target="_blank" className="text-gold underline" rel="noreferrer">
                Download attachment
              </a>
            ) : null}
            <label className="block text-sm">
              Schedule Date/Time
              <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
            </label>
            <label className="block text-sm">
              Admin Reply
              <textarea value={adminReply} onChange={(e) => setAdminReply(e.target.value)} className="mt-1 h-24 w-full rounded-md border border-white/20 bg-dark-elevated p-2" />
            </label>
            <div className="flex gap-2">
              <Button onClick={schedule}>Schedule Meeting</Button>
              <Button variant="outline" onClick={() => void updateStatus(selected.id, MeetingStatus.COMPLETED)}>
                Mark Complete
              </Button>
            </div>
            <label className="block text-sm">
              Cancel Reason
              <textarea value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="mt-1 h-20 w-full rounded-md border border-white/20 bg-dark-elevated p-2" />
            </label>
            <Button variant="danger" onClick={cancelMeeting}>
              Cancel Meeting
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

