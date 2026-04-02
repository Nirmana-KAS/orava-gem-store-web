"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import Link from "next/link";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof schema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: values.password }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      setError(json.error ?? "Failed to reset password");
      toast(json.error ?? "Failed to reset password");
      return;
    }
    setDone(true);
    toast("Password has been reset successfully");
  };

  if (!token) {
    return (
      <section>
        <h1 className="mb-5 text-center font-heading text-4xl">Reset Password</h1>
        <p className="rounded-md border border-red-400/30 bg-dark-surface p-4 text-sm text-red-300">
          Invalid or missing reset token. Please request a new password reset link.
        </p>
        <Link href="/forgot-password" className="mt-4 block text-center text-sm text-gold underline">
          Request New Reset Link
        </Link>
      </section>
    );
  }

  if (done) {
    return (
      <section>
        <h1 className="mb-5 text-center font-heading text-4xl">Password Reset</h1>
        <p className="rounded-md border border-gold/30 bg-dark-surface p-4 text-sm text-zinc-200">
          Your password has been reset successfully. You can now sign in with your new password.
        </p>
        <Link href="/signin" className="mt-4 block text-center text-sm text-gold underline">
          Sign In
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-5 text-center font-heading text-4xl">Reset Password</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-xl border border-white/10 bg-dark-surface p-6"
      >
        <label className="block text-sm">
          New Password
          <Input type="password" {...register("password")} />
          {formState.errors.password ? (
            <p className="mt-1 text-xs text-red-400">{formState.errors.password.message}</p>
          ) : null}
        </label>
        <label className="block text-sm">
          Confirm New Password
          <Input type="password" {...register("confirmPassword")} />
          {formState.errors.confirmPassword ? (
            <p className="mt-1 text-xs text-red-400">{formState.errors.confirmPassword.message}</p>
          ) : null}
        </label>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <Button type="submit" isLoading={formState.isSubmitting} className="w-full">
          Reset Password
        </Button>
      </form>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center text-sm text-zinc-400">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

