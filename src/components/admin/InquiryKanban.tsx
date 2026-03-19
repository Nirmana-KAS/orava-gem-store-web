"use client";

import { InquiryStatus } from "@prisma/client";
import { useMemo } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { truncateText } from "@/lib/utils";

interface InquiryCard {
  id: string;
  inquiryType: string;
  guestEmail: string | null;
  user?: { email: string } | null;
  status: InquiryStatus;
  description: string | null;
  inquiredProducts: Array<{ id: string }>;
}

interface InquiryKanbanProps {
  inquiries: InquiryCard[];
  onMove: (id: string, status: InquiryStatus) => void;
  onOpen: (id: string) => void;
}

const columns: InquiryStatus[] = [
  InquiryStatus.PENDING,
  InquiryStatus.IN_REVIEW,
  InquiryStatus.REPLIED,
  InquiryStatus.CLOSED,
];

export default function InquiryKanban({ inquiries, onMove, onOpen }: InquiryKanbanProps) {
  const grouped = useMemo(
    () =>
      columns.reduce(
        (acc, column) => {
          acc[column] = inquiries.filter((item) => item.status === column);
          return acc;
        },
        {} as Record<InquiryStatus, InquiryCard[]>,
      ),
    [inquiries],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {columns.map((column) => (
        <div key={column} className="space-y-3 rounded-xl border border-white/10 bg-dark-surface p-3">
          <h3 className="text-sm font-semibold text-gold">{column}</h3>
          {grouped[column].map((inquiry) => (
            <Card key={inquiry.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge>{inquiry.inquiryType}</Badge>
                <span className="text-xs text-zinc-400">#{inquiry.id.slice(0, 8)}</span>
              </div>
              <p className="text-xs text-zinc-300">{inquiry.user?.email ?? inquiry.guestEmail ?? "-"}</p>
              <p className="text-sm text-zinc-200">{truncateText(inquiry.description ?? "No description", 90)}</p>
              <p className="text-xs text-zinc-400">Products: {inquiry.inquiredProducts.length}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => onOpen(inquiry.id)}>
                  View
                </Button>
                {columns
                  .filter((status) => status !== inquiry.status)
                  .slice(0, 1)
                  .map((status) => (
                    <Button key={status} onClick={() => onMove(inquiry.id, status)}>
                      Move to {status}
                    </Button>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

