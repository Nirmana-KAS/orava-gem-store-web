"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";

/* ================================================================
   ExpandingGallery — Hover-to-expand tile layout with per-tile
   photo album (prev/next arrows, dots, counter).

   Images are served from Cloudinary (res.cloudinary.com is
   allowlisted in next.config.js).
   ================================================================ */

interface SlideData {
  src: string;
  alt: string;
}

interface TileData {
  tag: string;
  title: string;
  slides: SlideData[];
  defaultBig?: boolean;
}

const TILES: TileData[] = [
  {
    tag: "Precision Cutting",
    title: "The cutting floor",
    defaultBig: true,
    slides: [
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781002761/The-Cutting-Floor-01_njvl6y.png", alt: "Cutting floor wide" },
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781002730/The-Cutting-Floor-02_e5ecyb.png", alt: "Faceting wheel close-up" },
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781002742/The-Cutting-Floor-03_rufgmb.png", alt: "Dop and stone alignment" },
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781002742/The-Cutting-Floor-04_eroboq.png", alt: "Finished cut stone" },
    ],
  },
  {
    tag: "Calibration",
    title: "Calibration and inspection",
    slides: [
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781003910/Calibration-and-Inspection-01_kbjjc8.png", alt: "Inspection bench" },
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781003930/Calibration-and-Inspection-02_nw3fje.png", alt: "Micrometer measurement" },
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781003890/Calibration-and-Inspection-03_ngnhhv.png", alt: "Calibrated stone set" },
    ],
  },
  {
    tag: "Bespoke",
    title: "The design studio",
    slides: [
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781005901/The-Design-Studio-01_mqzcak.png", alt: "CAD workstation" },
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781005941/The-Design-Studio-02_jxihbh.png", alt: "3D stone model" },
      { src: "https://res.cloudinary.com/dafsnkkux/image/upload/v1781005962/The-Design-Studio-03_nykx5f.png", alt: "Bespoke finished piece" },
    ],
  },
];

const ChevLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);
const ChevRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

function GalleryTile({ tile }: { tile: TileData }) {
  const [idx, setIdx] = useState(0);
  const n = tile.slides.length;
  const go = useCallback(
    (i: number) => setIdx(((i % n) + n) % n),
    [n]
  );

  return (
    <div className={`gtile${tile.defaultBig ? " default-big" : ""}`}>
      <div className="album">
        <div className="slides">
          {tile.slides.map((sl, i) => (
            <div key={i} className={`slide${i === idx ? " active" : ""}`}>
              <Image
                src={sl.src}
                alt={sl.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      <button className="alb-nav alb-prev" aria-label="Previous photo"
        onClick={(e) => { e.stopPropagation(); go(idx - 1); }}>
        <ChevLeft />
      </button>
      <button className="alb-nav alb-next" aria-label="Next photo"
        onClick={(e) => { e.stopPropagation(); go(idx + 1); }}>
        <ChevRight />
      </button>

      <div className="alb-meta">
        <span className="alb-count">
          <b>{idx + 1}</b>/{n}
        </span>
        <div className="alb-dots">
          {tile.slides.map((_, i) => (
            <span
              key={i}
              className={`dot${i === idx ? " active" : ""}`}
              onClick={(e) => { e.stopPropagation(); go(i); }}
            />
          ))}
        </div>
      </div>

      <div className="cap">
        <span className="tag">{tile.tag}</span>
        <h3>{tile.title}</h3>
      </div>
    </div>
  );
}

export default function ExpandingGallery() {
  return (
    <>
      <p className="gallery-hint">
        Hover a section to enlarge it, then use{" "}
        <span>&larr;</span> <span>&rarr;</span> to browse sample photos.
      </p>
      <section className="gallery" aria-label="Inside the workshop">
        {TILES.map((tile, i) => (
          <GalleryTile key={i} tile={tile} />
        ))}
      </section>
    </>
  );
}
