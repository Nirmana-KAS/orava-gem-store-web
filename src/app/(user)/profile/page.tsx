import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage account and view inquiry/meeting history.",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      inquiries: { include: { inquiredProducts: { include: { product: true } } }, orderBy: { createdAt: "desc" } },
      meetings: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!user) redirect("/signin");

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-5xl">Profile</h1>
      <Card>
        <h2 className="mb-3 text-xl font-semibold">Personal Information</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile ?? "-"}</p>
          <p>Country: {user.country ?? "-"}</p>
          <p>Company: {user.companyName ?? "-"}</p>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 text-xl font-semibold">Inquiry History</h2>
        <div className="space-y-3">
          {user.inquiries.map((inquiry) => (
            <div key={inquiry.id} className="rounded-md border border-white/10 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{inquiry.inquiryType}</Badge>
                <Badge>{inquiry.status}</Badge>
                <span className="text-xs text-zinc-400">{formatDateTime(inquiry.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-300">{inquiry.description ?? "No description"}</p>
              {inquiry.adminReply ? <p className="mt-2 text-sm text-gold">Reply: {inquiry.adminReply}</p> : null}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 text-xl font-semibold">Meeting History</h2>
        <div className="space-y-3">
          {user.meetings.map((meeting) => (
            <div key={meeting.id} className="rounded-md border border-white/10 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{meeting.meetingType}</Badge>
                <Badge>{meeting.status}</Badge>
                <span className="text-xs text-zinc-400">{formatDateTime(meeting.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-300">{meeting.description ?? "No description"}</p>
              {meeting.adminReply ? <p className="mt-2 text-sm text-gold">Reply: {meeting.adminReply}</p> : null}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

