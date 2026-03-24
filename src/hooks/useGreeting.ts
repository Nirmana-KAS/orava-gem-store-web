"use client";

import { useState, useEffect } from "react";

export function useGreeting(firstName?: string | null) {
  const [greeting, setGreeting] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let timeGreeting = "";
      let period = "";

      if (hour >= 5 && hour < 12) {
        timeGreeting = "Good Morning";
        period = "morning";
      } else if (hour >= 12 && hour < 17) {
        timeGreeting = "Good Afternoon";
        period = "afternoon";
      } else if (hour >= 17 && hour < 21) {
        timeGreeting = "Good Evening";
        period = "evening";
      } else {
        timeGreeting = "Good Night";
        period = "night";
      }

      setTimeOfDay(period);
      if (firstName) {
        setGreeting(`${timeGreeting}, ${firstName}`);
      } else {
        setGreeting(timeGreeting);
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, [firstName]);

  return { greeting, timeOfDay };
}
