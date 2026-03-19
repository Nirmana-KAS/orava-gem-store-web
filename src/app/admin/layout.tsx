import { Bell } from "lucide-react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  if (session.user.role !== "ADMIN") redirect("/");

  const pendingInquiries = await prisma.inquiry.count({ where: { status: "PENDING" } });

  return (
    <div className="flex min-h-screen bg-dark text-white">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <p className="text-sm text-zinc-300">
            Admin: {session.user.firstName} {session.user.lastName}
          </p>
          <div className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-1 text-sm">
            <Bell size={16} />
            <span>{pendingInquiries} pending inquiries</span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

