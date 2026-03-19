import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset email.",
};

export default function ForgotPasswordPage() {
  return (
    <section>
      <h1 className="mb-5 text-center font-heading text-4xl">Forgot Password</h1>
      <ForgotPasswordForm />
    </section>
  );
}

