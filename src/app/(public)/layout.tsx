import BackToDashboardButton from "@/components/layout/BackToDashboardButton";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#1a1a2e]">
      <Navbar />
      {children}
      <BackToDashboardButton />
      <Footer />
    </div>
  );
}
