"use client";

import { Meeting, MeetingStatus } from "@prisma/client";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatDateTime } from "@/lib/utils";

interface MeetingTableProps {
  meetings: (Meeting & { user?: { email: string } | null })[];
  onOpen: (meeting: Meeting) => void;
  onStatus: (meetingId: string, status: MeetingStatus) => void;
}

export default function MeetingTable({ meetings, onOpen, onStatus }: MeetingTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-dark-elevated">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Type</th>
            <th className="px-3 py-2 text-left">User/Guest</th>
            <th className="px-3 py-2 text-left">Preferred Date</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id} className="border-t border-white/10">
              <td className="px-3 py-2">{meeting.id.slice(0, 8)}</td>
              <td className="px-3 py-2">{meeting.meetingType}</td>
              <td className="px-3 py-2">{meeting.user?.email ?? meeting.guestEmail ?? "-"}</td>
              <td className="px-3 py-2">{meeting.preferredDate ? formatDateTime(meeting.preferredDate) : "-"}</td>
              <td className="px-3 py-2">
                <Badge>{meeting.status}</Badge>
              </td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => onOpen(meeting)}>
                    View
                  </Button>
                  <Button onClick={() => onStatus(meeting.id, MeetingStatus.COMPLETED)}>Complete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

