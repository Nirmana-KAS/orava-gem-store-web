import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import CookieConsent from "@/components/ui/CookieConsent";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "ORAVA Gems — Premium Gemstone Export | Sri Lanka", template: "%s | ORAVA Gems" },
  description:
    "ORAVA (Pvt) Ltd — Sri Lanka's premier precision-cut coloured gemstone exporter since 2006. 24-hour worldwide delivery.",
  keywords: ["gemstones", "sapphire", "ruby", "emerald", "Sri Lanka gems", "precision cut gems", "luxury gemstones"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "ORAVA Gems",
    description: "Premium gemstone export from Sri Lanka.",
    url: process.env.NEXTAUTH_URL,
    siteName: "ORAVA Gems",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body">
        <SessionProvider>
          <ToastProvider>
            {children}
            <CookieConsent />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

