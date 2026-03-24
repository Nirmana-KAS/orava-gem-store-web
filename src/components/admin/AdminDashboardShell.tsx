"use client";

import { Bell, ExternalLink, LayoutDashboard, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import PasskeyGate from "@/components/admin/PasskeyGate";
import Input from "@/components/ui/Input";

interface NotificationCounts {
  meetings: number;
  products: number;
  customized: number;
  quotations: number;
  total: number;
}

interface AdminDashboardShellProps {
  firstName: string;
  lastName: string;
  children: React.ReactNode;
}

const routeTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/users": "Users",
  "/admin/inquiries": "Inquiries",
  "/admin/meetings": "Meetings",
  "/admin/reports": "Reports",
  "/admin/audit": "Audit Log",
  "/admin/settings": "Settings",
};

export default function AdminDashboardShell({
  firstName,
  lastName,
  children,
}: AdminDashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [counts, setCounts] = useState<NotificationCounts>({
    meetings: 0,
    products: 0,
    customized: 0,
    quotations: 0,
    total: 0,
  });
  const [open, setOpen] = useState(false);

  const title = useMemo(() => routeTitles[pathname] ?? "Admin", [pathname]);

  useEffect(() => {
    setVerified(sessionStorage.getItem("admin_passkey_verified") === "true");
  }, []);

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/admin/notification-counts", {
        cache: "no-store",
      });
      const json = (await res.json()) as {
        success: boolean;
        data?: NotificationCounts;
      };
      if (json.success && json.data) setCounts(json.data);
    };

    void run();
    const timer = setInterval(run, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f1117] text-[#e2e8f0]">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-[#1e2535] bg-[#161b27] px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="hidden lg:block">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]"
                />
                <Input
                  className="w-72 border-[#1e2535] bg-[#0f1117] pl-9 text-[#e2e8f0]"
                  placeholder="Search admin data..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-[#1e2535] bg-[#0f1117] px-3 py-2 text-sm md:flex">
              <LayoutDashboard size={15} className="text-brand-blue" />
              <span>
                Admin: {firstName} {lastName}
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="relative rounded-lg border border-[#1e2535] bg-[#0f1117] p-2 hover:bg-[#1a2232]"
              >
                <Bell size={18} />
                {counts.total > 0 ? (
                  <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-500 px-1 text-center text-[10px] text-white">
                    {counts.total}
                  </span>
                ) : null}
              </button>

              {open ? (
                <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#1e2535] bg-[#161b27] p-3 shadow-xl">
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/admin/meetings");
                    }}
                    className="mb-2 block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#0f1117]"
                  >
                    New Meeting Inquiries:{" "}
                    <span className="text-brand-blue">{counts.meetings}</span>
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/admin/inquiries");
                    }}
                    className="mb-2 block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#0f1117]"
                  >
                    New Product Inquiries:{" "}
                    <span className="text-brand-blue">{counts.products}</span>
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/admin/inquiries");
                    }}
                    className="mb-2 block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#0f1117]"
                  >
                    Customized Product Inquiries:{" "}
                    <span className="text-brand-blue">{counts.customized}</span>
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/admin/inquiries");
                    }}
                    className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#0f1117]"
                  >
                    Product Quotation Inquiries:{" "}
                    <span className="text-brand-blue">{counts.quotations}</span>
                  </button>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => window.open("/", "_blank")}
              className="inline-flex items-center gap-2 rounded-lg border border-[#1e2535] bg-[#0f1117] px-3 py-2 text-sm hover:bg-[#1a2232]"
            >
              <ExternalLink size={15} />
              View Website
            </button>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>

      {!verified ? <PasskeyGate onVerified={() => setVerified(true)} /> : null}
    </div>
  );
}
