import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | ORAVA (Pvt) Ltd.",
  description: "Browse our collection of precision-cut colored gemstones sourced globally and cut with excellence.",
  openGraph: {
    title: "Products | ORAVA (Pvt) Ltd.",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
