import { Award, Calendar, Globe, Shield } from "lucide-react";

export default function CertificationsStrip() {
  return (
    <section className="border-t border-[#dde2e8] bg-[#f5f7fa] py-7 sm:py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 text-xs text-[#8f8b8f] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 sm:text-sm md:gap-10">
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
