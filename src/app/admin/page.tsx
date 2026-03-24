import { subDays } from "date-fns";
import {
  Activity,
  ArrowUpRight,
  CalendarClock,
  Package,
  Users,
} from "lucide-react";
import DashboardCharts from "@/components/admin/DashboardCharts";
import Badge from "@/components/ui/Badge";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalUsers, pendingInquiries, pendingMeetings, totalProducts] =
    await Promise.all([
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
  const inquiriesByTypeRaw = await prisma.inquiry.groupBy({
    by: ["inquiryType"],
    _count: { inquiryType: true },
  });
  const meetingsByStatusRaw = await prisma.meeting.groupBy({
    by: ["status"],
    _count: { status: true },
  });
  const monthlyInquiriesRaw = await prisma.inquiry.findMany({
    where: { createdAt: { gte: subDays(new Date(), 180) } },
    select: { createdAt: true },
  });
  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });
  const recentMeetings = await prisma.meeting.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const visitorsMap = new Map<string, number>();
  pageViews.forEach((view) => {
    const key = view.createdAt.toISOString().slice(0, 10);
    visitorsMap.set(key, (visitorsMap.get(key) ?? 0) + 1);
  });
  const visitors = Array.from(visitorsMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  const monthlyMap = new Map<string, number>();
  monthlyInquiriesRaw.forEach((item) => {
    const key = item.createdAt.toISOString().slice(0, 7);
    monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + 1);
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: totalUsers, icon: Users },
          {
            title: "Pending Inquiries",
            value: pendingInquiries,
            icon: Activity,
          },
          {
            title: "Pending Meetings",
            value: pendingMeetings,
            icon: CalendarClock,
          },
          { title: "Total Products", value: totalProducts, icon: Package },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="rounded-xl border border-[#1e2535] border-l-4 border-l-brand-blue bg-[#161b27] p-4 text-[#e2e8f0]"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-[#94a3b8]">{item.title}</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/20 text-brand-blue">
                  <Icon size={16} />
                </span>
              </div>
              <p className="text-3xl font-semibold">{item.value}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#94a3b8]">
                <ArrowUpRight size={13} className="text-brand-blue" />
                Stable trend this cycle
              </p>
            </article>
          );
        })}
      </div>

      <DashboardCharts
        visitors={visitors}
        countries={usersByCountryRaw.map((item) => ({
          country: item.country ?? "Unknown",
          count: item._count.country,
        }))}
        inquiriesByType={inquiriesByTypeRaw.map((item) => ({
          name: item.inquiryType,
          value: item._count.inquiryType,
        }))}
        meetingsByStatus={meetingsByStatusRaw.map((item) => ({
          name: item.status,
          value: item._count.status,
        }))}
        monthlyInquiries={Array.from(monthlyMap.entries()).map(
          ([month, count]) => ({ month, count }),
        )}
      />

      <section className="rounded-xl border border-[#1e2535] bg-[#161b27] p-5 text-[#e2e8f0]">
        <h3 className="mb-3 font-semibold">Recent Activity</h3>
        <div className="space-y-2 text-sm text-[#94a3b8]">
          {recentInquiries.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-[#1e2535] bg-[#0f1117] px-3 py-2"
            >
              <p>
                Inquiry #{item.id.slice(0, 8)} • {item.inquiryType}
              </p>
              <Badge tone={item.status === "PENDING" ? "warning" : "default"}>
                {item.status}
              </Badge>
            </div>
          ))}
          {recentMeetings.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-[#1e2535] bg-[#0f1117] px-3 py-2"
            >
              <p>
                Meeting #{item.id.slice(0, 8)} • {item.meetingType}
              </p>
              <Badge tone={item.status === "PENDING" ? "warning" : "default"}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
