"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { Gem } from "@/lib/products/data";
import { shade } from "@/lib/products/data";
import type { ViewMode } from "@/lib/products/store";

interface GemCardProps {
  gem: Gem;
  view: ViewMode;
}

const SHAPE_STYLES: Record<string, string> = {
  Round:           "rounded-full",
  Oval:            "rounded-full",
  Cushion:         "rounded-[28%]",
  Square:          "rounded-md",
  "Princess Cut":  "rounded-md",
  "Emerald Cut":   "rounded-[12%]",
  Octagon:         "rounded-[14%]",
  Pentagon:        "rounded-[14%]",
  Pear:            "[border-radius:50%_50%_50%_50%_/_70%_70%_30%_30%]",
  Marquise:        "[clip-path:polygon(50%_8%,95%_50%,50%_92%,5%_50%)]",
  Triangle:        "[clip-path:polygon(50%_8%,95%_88%,5%_88%)]",
  "Half Round":    "[border-radius:50%_50%_25%_25%_/_70%_70%_30%_30%]",
};

export function GemCard({ gem, view }: GemCardProps) {
  const isList = view === "list";
  const shapeClass = SHAPE_STYLES[gem.shape] ?? "rounded-full";
  const hasImage = gem.images && gem.images.length > 0;
  const gemBg = `radial-gradient(circle at 35% 30%, rgba(255,255,255,.6) 0%, transparent 22%), radial-gradient(circle at 50% 50%, ${gem.color} 0%, ${shade(gem.color, -30)} 75%)`;
  const detailHref = `/products/${gem._realId || gem.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_60px_-25px_rgba(28,52,90,.25),0_8px_20px_-10px_rgba(28,52,90,.12)]
        ${isList ? "grid grid-cols-[220px_1fr_auto] items-stretch" : ""}`}
    >
      <div className={`relative ${isList ? "min-h-[220px]" : "aspect-square"} overflow-hidden bg-gradient-to-br from-[#f4f8fc] to-[#e7eff8]`}>
        <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between">
          <span className="rounded-full border border-line bg-white/95 px-2.5 py-1 text-[10.5px] font-bold tracking-wider text-navy backdrop-blur">
            {gem.certified}
          </span>
          {gem.condition !== "Available" && (
            <span className="rounded-full border border-line bg-white/95 px-2.5 py-1 text-[10.5px] font-semibold tracking-wider text-navy-2 backdrop-blur">
              {gem.condition}
            </span>
          )}
        </div>

        {hasImage ? (
          <Image
            src={gem.images![0]}
            alt={gem.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div
            className={`absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 ${shapeClass}`}
            style={{
              background: gemBg,
              boxShadow:
                "0 8px 20px -4px rgba(0,0,0,.3), inset -8px -12px 24px rgba(0,0,0,.35), inset 8px 8px 18px rgba(255,255,255,.35)",
            }}
          >
            <span
              className="absolute left-[18%] top-[12%] h-[22%] w-[28%] rounded-full bg-white/70"
              style={{ filter: "blur(2px)" }}
            />
          </div>
        )}

        {gem.condition === "Sold" && (
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 -rotate-[12deg] border-2 border-white bg-navy/[0.92] px-4 py-1.5 font-serif text-[22px] italic tracking-wider text-white">
            Sold
          </div>
        )}

        {!isList && (
          <div className="absolute inset-x-0 bottom-0 z-[2] translate-y-full bg-gradient-to-t from-navy/[0.92] via-navy/[0.92] to-transparent px-4 pb-3.5 pt-12 text-white transition-transform duration-300 ease-out group-hover:translate-y-0">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-[#c9d8ec]">
              <Stat label="Refractive Index" value={gem.ri.toString()} />
              <Stat label="Treatment" value={gem.treated} />
              <Stat label="Cut Style" value={gem.cut} />
              <Stat label="Color Grade" value={gem.colorName} />
            </div>
          </div>
        )}
      </div>

      {isList ? <ListBody gem={gem} /> : <GridBody gem={gem} />}

      {isList && (
        <div className="flex min-w-[200px] flex-col items-end justify-between border-l border-line-2 p-7">
          <div className="text-[17px] font-semibold tracking-tight text-navy">
            ${gem.price.toLocaleString()}
            <small className="ml-0.5 text-[11px] font-medium text-muted">USD</small>
          </div>
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-deep"
          >
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {!isList && (
        <Link href={detailHref} className="absolute inset-0" aria-label={gem.name} />
      )}
    </motion.article>
  );
}

function GridBody({ gem }: { gem: Gem }) {
  return (
    <div className="relative z-[1] p-4">
      <div className="mb-1 flex items-start justify-between gap-2">
        <span className="text-[10.5px] font-medium tracking-wider text-muted">{gem.id}</span>
        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wide text-primary">
          <MapPin className="h-3 w-3" /> {gem.origin}
        </span>
      </div>
      <h3 className="mb-2.5 line-clamp-2 font-serif text-[19px] font-medium leading-tight text-navy">
        {gem.name}
      </h3>
      <div className="mb-3 flex gap-2.5 text-[11.5px] text-muted">
        <span><b className="font-semibold text-navy">{gem.carat}</b>ct</span>
        <span><b className="font-semibold text-navy">{gem.shape}</b></span>
        <span><b className="font-semibold text-navy">{gem.clarity}</b></span>
      </div>
      <div className="flex items-center justify-between border-t border-line-2 pt-3">
        <div className="text-[17px] font-semibold tracking-tight text-navy">
          ${gem.price.toLocaleString()}
          <small className="ml-0.5 text-[11px] font-medium text-muted">USD</small>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          View <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}

function ListBody({ gem }: { gem: Gem }) {
  return (
    <div className="flex flex-col justify-between p-7">
      <div>
        <div className="mb-1 flex items-start justify-between gap-2">
          <span className="text-[10.5px] font-medium tracking-wider text-muted">{gem.id}</span>
          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wide text-primary">
            <MapPin className="h-3 w-3" /> {gem.origin}
          </span>
        </div>
        <h3 className="mb-2 font-serif text-[26px] font-medium leading-tight text-navy">{gem.name}</h3>
        <div className="mb-2 flex gap-4 text-[13px] text-muted">
          <span><b className="font-semibold text-navy">{gem.carat}</b>ct</span>
          <span><b className="font-semibold text-navy">{gem.shape}</b></span>
          <span><b className="font-semibold text-navy">{gem.clarity}</b></span>
          <span><b className="font-semibold text-navy">{gem.colorName}</b></span>
        </div>
        <div className="my-2 flex gap-6 text-[13px] text-navy-2">
          <Field label="R.I." value={gem.ri.toString()} />
          <Field label="Treatment" value={gem.treated} />
          <Field label="Cut" value={gem.cut} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <b className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</b>
      {value}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <b className="mt-px block text-xs font-medium text-white">{value}</b>
      <span>{label}</span>
    </div>
  );
}
