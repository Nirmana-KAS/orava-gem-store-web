"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { signUpSchema } from "@/lib/validations";

type FormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = (await response.json()) as {
      success: boolean;
      error?: string;
    };
    if (!json.success) {
      toast(json.error ?? "Failed to create account");
      return;
    }
    const signInResult = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (signInResult?.error) {
      toast("Account created, but sign-in failed. Please sign in manually.");
      return;
    }

    window.location.href = signInResult?.url ?? "/";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-white/10 bg-dark-surface p-6"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          First Name
          <Input {...register("firstName")} />
        </label>
        <label className="block text-sm">
          Last Name
          <Input {...register("lastName")} />
        </label>
      </div>
      <label className="block text-sm">
        Email
        <Input type="email" {...register("email")} />
      </label>
      <label className="block text-sm">
        Password
        <Input type="password" {...register("password")} />
      </label>
      <label className="block text-sm">
        Confirm Password
        <Input type="password" {...register("confirmPassword")} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("terms")} /> I agree to Terms &amp;
        Conditions
      </label>
      <Button
        type="submit"
        isLoading={formState.isSubmitting}
        className="w-full"
      >
        Sign Up
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => void signIn("google", { callbackUrl: "/" })}
      >
        Sign Up with Google
      </Button>
      <p className="text-sm text-zinc-300">
        Already have an account?{" "}
        <Link href="/signin" className="text-gold underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
