import type { Metadata } from "next";
import SignInForm from "@/components/forms/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your ORAVA Gems account.",
};

export default function SignInPage() {
  return (
    <section>
      <h1 className="mb-5 text-center font-heading text-4xl">Sign In</h1>
      <SignInForm />
    </section>
  );
}

