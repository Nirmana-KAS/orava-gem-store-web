import { redirect } from "next/navigation";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <AdminDashboardShell
      firstName={session.user.firstName ?? "Admin"}
      lastName={session.user.lastName ?? "User"}
    >
      {children}
    </AdminDashboardShell>
  );
}
