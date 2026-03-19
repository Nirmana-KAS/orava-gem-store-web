"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Unable to send reset email");
      return;
    }
    setSent(true);
    toast("Password reset email sent");
  };

  if (sent) return <p className="rounded-md border border-gold/30 bg-dark-surface p-4 text-sm text-zinc-200">Reset instructions have been sent to your email.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-white/10 bg-dark-surface p-6">
      <label className="block text-sm">
        Email
        <Input type="email" {...register("email")} />
      </label>
      <Button type="submit" isLoading={formState.isSubmitting} className="w-full">
        Send Reset Link
      </Button>
    </form>
  );
}

