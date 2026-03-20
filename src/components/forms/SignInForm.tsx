"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { signInSchema } from "@/lib/validations";

type FormValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  callbackUrl?: string;
}

export default function SignInForm({ callbackUrl = "/" }: SignInFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const result = await signIn("credentials", { ...values, redirect: false, callbackUrl });
    if (result?.error) {
      toast("Invalid credentials");
      return;
    }
    router.push(callbackUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-white/10 bg-dark-surface p-6">
      <label className="block text-sm">
        Email
        <Input type="email" {...register("email")} />
      </label>
      <label className="block text-sm">
        Password
        <Input type="password" {...register("password")} />
      </label>
      <Button type="submit" isLoading={formState.isSubmitting} className="w-full">
        Sign In
      </Button>
      <Button type="button" variant="outline" className="w-full" onClick={() => void signIn("google", { callbackUrl })}>
        Sign In with Google
      </Button>
      <div className="text-sm text-zinc-300">
        <Link href="/forgot-password" className="text-gold underline">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}

