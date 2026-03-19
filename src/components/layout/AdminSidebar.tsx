"use client";

import {
  BarChart3,
  Calendar,
  Gem,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Gem },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/meetings", label: "Meetings", icon: Calendar },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/audit", label: "Audit Log", icon: Shield },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn("flex h-screen flex-col border-r border-white/10 bg-dark-surface", collapsed ? "w-20" : "w-72")}>
      <div className="flex items-center justify-between p-4">
        {!collapsed ? <span className="font-heading text-xl text-gold">ORAVA Admin</span> : <Gem className="text-gold" />}
        <button onClick={() => setCollapsed((v) => !v)}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/10",
                pathname === item.href && "bg-gold/15 text-gold",
              )}
            >
              <Icon size={16} />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/10"
        >
          <LogOut size={16} />
          {!collapsed && "Sign out"}
        </button>
      </div>
    </aside>
  );
}

