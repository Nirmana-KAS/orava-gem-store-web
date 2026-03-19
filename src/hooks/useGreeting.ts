"use client";

import { useEffect, useMemo, useState } from "react";
import { getGreeting } from "@/lib/utils";

export function useGreeting(firstName?: string): { greeting: string; timezone: string } {
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", []);
  const [greeting, setGreeting] = useState("Good Evening");

  useEffect(() => {
    setGreeting(getGreeting(timezone));
  }, [timezone]);

  const honorificName = firstName ? `Mr./Ms. ${firstName}` : "Guest";
  return { greeting: `${greeting}! ${honorificName}`, timezone };
}

