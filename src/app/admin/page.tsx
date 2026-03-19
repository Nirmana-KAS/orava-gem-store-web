import { subDays } from "date-fns";
import DashboardCharts from "@/components/admin/DashboardCharts";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalUsers, pendingInquiries, pendingMeetings, totalProducts] = await Promise.all([
    prisma.user.count(),
    prisma.inquiry.count({ where: { status: "PENDING" } }),
    prisma.meeting.count({ where: { status: "PENDING" } }),
    prisma.product.count(),
  ]);

  const thirtyDaysAgo = subDays(new Date(), 30);
  const pageViews = await prisma.pageView.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    orderBy: { createdAt: "asc" },
  });
  const usersByCountryRaw = await prisma.user.groupBy({
    by: ["country"],
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: 10,
  });
  const inquiriesByTypeRaw = await prisma.inquiry.groupBy({ by: ["inquiryType"], _count: { inquiryType: true } });
  const meetingsByStatusRaw = await prisma.meeting.groupBy({ by: ["status"], _count: { status: true } });
  const monthlyInquiriesRaw = await prisma.inquiry.findMany({
    where: { createdAt: { gte: subDays(new Date(), 180) } },
    select: { createdAt: true },
  });
  const recentInquiries = await prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } });
  const recentMeetings = await prisma.meeting.findMany({ take: 5, orderBy: { createdAt: "desc" } });

  const visitorsMap = new Map<string, number>();
  pageViews.forEach((view) => {
    const key = view.createdAt.toISOString().slice(0, 10);
    visitorsMap.set(key, (visitorsMap.get(key) ?? 0) + 1);
  });
  const visitors = Array.from(visitorsMap.entries()).map(([date, count]) => ({ date, count }));

  const monthlyMap = new Map<string, number>();
  monthlyInquiriesRaw.forEach((item) => {
    const key = item.createdAt.toISOString().slice(0, 7);
    monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + 1);
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm text-zinc-300">Total Users</p>
          <p className="mt-1 text-3xl font-semibold">{totalUsers}</p>
          <p className="text-xs text-zinc-400">Growth % calculated in reports</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-300">Pending Inquiries</p>
          <p className="mt-1 text-3xl font-semibold">{pendingInquiries}</p>
          {pendingInquiries > 10 ? <Badge tone="warning">Urgent</Badge> : null}
        </Card>
        <Card>
          <p className="text-sm text-zinc-300">Pending Meetings</p>
          <p className="mt-1 text-3xl font-semibold">{pendingMeetings}</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-300">Total Products</p>
          <p className="mt-1 text-3xl font-semibold">{totalProducts}</p>
        </Card>
      </div>

      <DashboardCharts
        visitors={visitors}
        countries={usersByCountryRaw.map((item) => ({ country: item.country ?? "Unknown", count: item._count.country }))}
        inquiriesByType={inquiriesByTypeRaw.map((item) => ({ name: item.inquiryType, value: item._count.inquiryType }))}
        meetingsByStatus={meetingsByStatusRaw.map((item) => ({ name: item.status, value: item._count.status }))}
        monthlyInquiries={Array.from(monthlyMap.entries()).map(([month, count]) => ({ month, count }))}
      />

      <Card>
        <h3 className="mb-3 font-semibold">Recent Activity</h3>
        <div className="space-y-2 text-sm text-zinc-300">
          {recentInquiries.map((item) => (
            <p key={item.id}>Inquiry #{item.id.slice(0, 8)} • {item.inquiryType} • {item.status}</p>
          ))}
          {recentMeetings.map((item) => (
            <p key={item.id}>Meeting #{item.id.slice(0, 8)} • {item.meetingType} • {item.status}</p>
          ))}
        </div>
      </Card>
    </div>
  );
}

