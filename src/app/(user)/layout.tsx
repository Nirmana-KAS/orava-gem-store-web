import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  return <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">{children}</main>;
}

