"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("orava-cookie-consent");
    if (!accepted) setShow(true);
  }, []);

  const handleConsent = (value: "accepted" | "declined") => {
    localStorage.setItem("orava-cookie-consent", value);
    if (value === "accepted") {
      localStorage.setItem("orava-ga-enabled", "true");
    } else {
      localStorage.setItem("orava-ga-enabled", "false");
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-dark-surface p-4">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-200">
          This site uses cookies for analytics. Accept or Decline.{" "}
          <Link href="/privacy" className="text-gold underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleConsent("declined")}>
            Decline
          </Button>
          <Button onClick={() => handleConsent("accepted")}>Accept</Button>
        </div>
      </div>
    </div>
  );
}

