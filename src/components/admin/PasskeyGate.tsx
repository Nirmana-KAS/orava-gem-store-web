"use client";

import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface PasskeyGateProps {
  onVerified: () => void;
}

export default function PasskeyGate({ onVerified }: PasskeyGateProps) {
  const [passkey, setPasskey] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  const lockoutSeconds = useMemo(() => {
    if (!lockoutUntil) return 0;
    return Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
  }, [lockoutUntil]);

  const handleVerify = async () => {
    if (lockoutUntil && Date.now() < lockoutUntil) return;

    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/verify-passkey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passkey }),
    });

    const json = (await res.json()) as { success: boolean; error?: string };
    setLoading(false);

    if (!json.success) {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setError(json.error ?? "Invalid passkey");

      if (nextAttempts >= 3) {
        setLockoutUntil(Date.now() + 30_000);
        setAttempts(0);
      }
      return;
    }

    sessionStorage.setItem("admin_passkey_verified", "true");
    onVerified();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f1117] p-6 text-[#e2e8f0]">
      <div className="w-full max-w-md rounded-2xl border border-[#1e2535] bg-[#161b27] p-6 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/20 text-brand-blue">
            <ShieldCheck />
          </div>
          <h2 className="text-2xl font-semibold">Enter Admin Passkey</h2>
          <p className="mt-1 text-sm text-[#94a3b8]">
            ORAVA Admin Security Verification
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Admin passkey"
              className="border-[#1e2535] bg-[#0f1117] pr-10 text-[#e2e8f0]"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {lockoutSeconds > 0 ? (
            <p className="text-sm text-yellow-400">
              Too many attempts. Try again in {lockoutSeconds}s.
            </p>
          ) : null}

          <Button
            type="button"
            className="w-full bg-brand-blue text-white hover:bg-brand-blue-dark"
            onClick={handleVerify}
            isLoading={loading}
            disabled={lockoutSeconds > 0 || !passkey.trim()}
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
