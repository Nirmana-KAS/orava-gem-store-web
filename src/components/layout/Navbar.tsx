"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gem, Menu, User2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useGreeting } from "@/hooks/useGreeting";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/customized", label: "Customized" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { greeting } = useGreeting(session?.user?.firstName);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ willChange: "transform" }}
      className={cn(
        "sticky top-0 z-40 border-b transition-all",
        isScrolled ? "border-white/10 bg-dark/95 backdrop-blur" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Gem className="text-gold" size={20} />
          <span className="font-heading text-2xl tracking-wide text-white">ORAVA</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-sm text-zinc-200 hover:text-gold", pathname === link.href && "text-gold")}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {!session?.user ? (
            <>
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="text-zinc-200">{greeting}</span>
                <User2 size={16} />
              </button>
              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{ willChange: "transform" }}
                    className="absolute right-0 mt-2 w-44 rounded-md border border-white/10 bg-dark-surface p-1"
                  >
                    <Link href="/profile" className="block rounded px-3 py-2 text-sm hover:bg-white/10">
                      Profile
                    </Link>
                    {session.user.role === "ADMIN" ? (
                      <Link href="/admin" className="block rounded px-3 py-2 text-sm hover:bg-white/10">
                        Admin
                      </Link>
                    ) : null}
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )}
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            style={{ willChange: "transform" }}
            className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/10 bg-dark-surface p-6 md:hidden"
          >
            <div className="mb-6 flex justify-end">
              <button onClick={() => setMobileOpen(false)}>
                <X />
              </button>
            </div>
            <div className="space-y-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-zinc-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}

