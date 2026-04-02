import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | ORAVA Gems",
  description: "Browse our collection of precision-cut colored gemstones sourced globally and cut with excellence.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
