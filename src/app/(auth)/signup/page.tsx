import type { Metadata } from "next";
import SignUpForm from "@/components/forms/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your ORAVA Gems account.",
};

export default function SignUpPage() {
  return (
    <section>
      <h1 className="mb-5 text-center font-heading text-4xl">Create Account</h1>
      <SignUpForm />
    </section>
  );
}

