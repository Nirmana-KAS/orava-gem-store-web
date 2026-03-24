import { Award, Calendar, Globe, Shield } from "lucide-react";

export default function CertificationsStrip() {
  return (
    <section className="border-t border-[#dde2e8] bg-[#f5f7fa] py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 text-sm text-[#8f8b8f] sm:gap-10">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-[#3c74ae]" />
          <span>SLEDB Registered Exporter</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#3c74ae]" />
          <span>Est. 2006</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-[#3c74ae]" />
          <span>Worldwide Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[#3c74ae]" />
          <span>Quality Certified</span>
        </div>
      </div>
    </section>
  );
}
