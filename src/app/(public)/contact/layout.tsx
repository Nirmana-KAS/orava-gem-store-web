import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ORAVA Gems at No. 24, Carlwil Place, Colombo 03, Sri Lanka. Phone +94 11 257 5756 · info@oravagems.com. Replies within 24 hours.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
