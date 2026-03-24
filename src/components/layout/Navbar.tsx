"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, User2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
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
        "sticky top-0 z-40 border-b bg-white transition-all",
        isScrolled ? "border-[#dde2e8] shadow-sm" : "border-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3">
        <Link href="/" className="justify-self-start">
          {/* Replace /logo.png with your uploaded logo file in /public folder */}
          <Logo src="/logo.png" />
        </Link>
        <div className="hidden items-center gap-6 md:flex md:justify-self-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm text-[#4a4a6a] transition hover:text-brand-blue",
                pathname === link.href && "text-brand-blue",
              )}
            >
              {link.label}
              {pathname === link.href ? (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-brand-blue" />
              ) : null}
            </Link>
          ))}
        </div>
        <div className="hidden items-center justify-self-end gap-3 md:flex">
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
                className="flex items-center gap-2 rounded-lg border border-[#dde2e8] bg-white px-3 py-2 text-sm text-[#4a4a6a]"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="max-w-[20rem] truncate">{greeting}</span>
                <User2 size={16} />
                <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{ willChange: "transform" }}
                    className="absolute right-0 mt-2 w-48 rounded-lg border border-[#dde2e8] bg-white p-1 shadow-md"
                  >
                    <Link
                      href="/profile"
                      className="block rounded px-3 py-2 text-sm text-[#4a4a6a] hover:bg-brand-blue-light"
                    >
                      Profile
                    </Link>
                    {session.user.role === "ADMIN" ? (
                      <Link
                        href="/admin"
                        className="block rounded px-3 py-2 text-sm text-[#4a4a6a] hover:bg-brand-blue-light"
                      >
                        Admin
                      </Link>
                    ) : null}
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full rounded px-3 py-2 text-left text-sm text-[#4a4a6a] hover:bg-brand-blue-light"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )}
        </div>
        <button
          className="justify-self-end text-[#1a1a2e] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="menu"
        >
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
            className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-[#dde2e8] bg-white p-6 md:hidden"
          >
            <div className="mb-6 flex justify-end">
              <button onClick={() => setMobileOpen(false)}>
                <X />
              </button>
            </div>
            <div className="space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[#4a4a6a]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 border-t border-[#dde2e8] pt-4">
                {!session?.user ? (
                  <div className="space-y-3">
                    <Link
                      href="/signin"
                      onClick={() => setMobileOpen(false)}
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="block"
                    >
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded px-3 py-2 text-[#4a4a6a] hover:bg-brand-blue-light"
                    >
                      Profile
                    </Link>
                    {session.user.role === "ADMIN" ? (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="block rounded px-3 py-2 text-[#4a4a6a] hover:bg-brand-blue-light"
                      >
                        Admin
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block w-full rounded px-3 py-2 text-left text-[#4a4a6a] hover:bg-brand-blue-light"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
