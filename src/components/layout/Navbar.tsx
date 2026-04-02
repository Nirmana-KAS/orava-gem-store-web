"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  User,
  Shield,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { QuotationCartDropdown } from "@/components/ui/QuotationCartDropdown";
import { useGreeting } from "@/hooks/useGreeting";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/customized", label: "Customized" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface SearchProduct {
  id: string;
  name: string;
  origin: string;
  shape: string;
  colorHex?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const firstName = session?.user?.firstName as string | undefined;
  const { greeting } = useGreeting(firstName);
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchResults([]);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(searchQuery)}&limit=5`,
        );
        const data = await res.json();
        setSearchResults(data.data?.products || []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled
            ? "border-b border-[#dde2e8] bg-white shadow-md"
            : "border-b border-[#dde2e8] bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Logo height={38} />
            </div>

            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[#e8f0f9] text-[#3c74ae]"
                      : "text-[#4a4a6a] hover:bg-[#f5f7fa] hover:text-[#3c74ae]"
                  }`}
                >
                  {link.label}
                  {pathname === link.href ? (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#3c74ae]"
                    />
                  ) : null}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#4a4a6a] transition-colors hover:bg-[#e8f0f9] hover:text-[#3c74ae]"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="fixed left-3 right-3 top-20 z-50 overflow-hidden rounded-2xl border border-[#dde2e8] bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-80"
                    >
                      <div className="p-3">
                        <div className="flex w-full items-center gap-2 rounded-xl border border-[#dde2e8] bg-[#f5f7fa] px-3 py-2">
                          <Search size={16} className="text-[#8f8b8f]" />
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search gemstones..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="min-w-0 flex-1 bg-transparent text-sm text-[#1a1a2e] placeholder-[#8f8b8f] outline-none"
                          />
                          {searchQuery ? (
                            <button onClick={() => setSearchQuery("")}>
                              <X size={14} className="text-[#8f8b8f]" />
                            </button>
                          ) : null}
                        </div>
                      </div>

                      {searchLoading ? (
                        <div className="px-4 py-3 text-center text-sm text-[#8f8b8f]">
                          Searching...
                        </div>
                      ) : null}

                      {!searchLoading && searchResults.length > 0 ? (
                        <div className="border-t border-[#dde2e8]">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.id}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f5f7fa]"
                            >
                              <div
                                className="h-8 w-8 flex-shrink-0 rounded-full"
                                style={{
                                  backgroundColor:
                                    product.colorHex || "#3c74ae",
                                }}
                              />
                              <div>
                                <p className="text-sm font-medium text-[#1a1a2e]">
                                  {product.name}
                                </p>
                                <p className="text-xs text-[#8f8b8f]">
                                  {product.origin} · {product.shape}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <div className="border-t border-[#dde2e8] px-4 py-2">
                            <Link
                              href={`/products?search=${searchQuery}`}
                              onClick={() => setSearchOpen(false)}
                              className="text-xs text-[#3c74ae] hover:underline"
                            >
                              View all results for &quot;{searchQuery}&quot;
                            </Link>
                          </div>
                        </div>
                      ) : null}

                      {!searchLoading &&
                      searchQuery &&
                      searchResults.length === 0 ? (
                        <div className="border-t border-[#dde2e8] px-4 py-4 text-center text-sm text-[#8f8b8f]">
                          No products found for &quot;{searchQuery}&quot;
                        </div>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <QuotationCartDropdown />

              {!session ? (
                <div className="hidden items-center gap-2 sm:flex">
                  <Link
                    href="/signin"
                    className="rounded-lg border border-[#3c74ae] px-4 py-2 text-sm font-medium text-[#3c74ae] transition-colors hover:bg-[#e8f0f9]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-lg bg-[#3c74ae] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2d5f96]"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="group flex items-center gap-1 rounded-xl px-1.5 py-2 transition-colors hover:bg-[#e8f0f9] sm:gap-2 sm:px-3"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isAdmin
                          ? "bg-[#3c74ae] text-white"
                          : "bg-[#e8f0f9] text-[#3c74ae]"
                      }`}
                    >
                      {isAdmin ? <Shield size={16} /> : <User size={16} />}
                    </div>

                    <div className="hidden text-left md:block">
                      <p className="leading-none text-xs text-[#8f8b8f]">
                        {greeting.split(",")[0]}
                      </p>
                      <p className="leading-tight text-sm font-semibold text-[#1a1a2e]">
                        {firstName || session.user?.email?.split("@")[0]}
                      </p>
                    </div>

                    <ChevronDown
                      size={14}
                      className={`hidden text-[#8f8b8f] transition-transform sm:block ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-[#dde2e8] bg-white shadow-2xl"
                      >
                        <div className="border-b border-[#dde2e8] bg-[#f5f7fa] px-4 py-3">
                          <p className="text-sm font-semibold text-[#1a1a2e]">
                            {firstName} {session.user?.lastName || ""}
                          </p>
                          <p className="truncate text-xs text-[#8f8b8f]">
                            {session.user?.email}
                          </p>
                        </div>

                        <div className="p-2">
                          <Link
                            href="/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#4a4a6a] transition-colors hover:bg-[#f5f7fa] hover:text-[#3c74ae]"
                          >
                            <UserCircle size={16} />
                            My Profile
                          </Link>

                          {isAdmin ? (
                            <Link
                              href="/admin"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#3c74ae] transition-colors hover:bg-[#e8f0f9]"
                            >
                              <LayoutDashboard size={16} />
                              Admin Dashboard
                            </Link>
                          ) : null}

                          <hr className="my-1 border-[#dde2e8]" />

                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#8f8b8f] transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )}

              <button
                className="ml-0.5 flex h-10 w-10 items-center justify-center rounded-full text-[#4a4a6a] transition-colors hover:bg-[#e8f0f9] lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="lg:hidden fixed left-0 right-0 top-16 bg-white z-[9999] overflow-y-auto border-t border-[#dde2e8] shadow-2xl max-h-[calc(100vh-4rem)]"
            >
              <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-[#e8f0f9] text-[#3c74ae]"
                        : "text-[#4a4a6a] hover:bg-[#f5f7fa]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!session ? (
                  <div className="flex gap-2 pt-2">
                    <Link
                      href="/signin"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 rounded-xl border border-[#3c74ae] py-2.5 text-center text-sm font-medium text-[#3c74ae]"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 rounded-xl bg-[#3c74ae] py-2.5 text-center text-sm font-medium text-white"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
      <div className="h-16" />
    </>
  );
}


