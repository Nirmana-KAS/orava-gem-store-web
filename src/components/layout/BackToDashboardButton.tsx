"use client";

import { LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BackToDashboardButton() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user?.role !== "ADMIN") return null;

  return (
    <button
      type="button"
      onClick={() => router.push("/admin")}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#3c74ae] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#2d5f96]"
    >
      <LayoutDashboard size={16} />
      Admin Panel
    </button>
  );
}
