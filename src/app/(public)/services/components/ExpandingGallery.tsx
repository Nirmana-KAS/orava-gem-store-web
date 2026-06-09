"use client";

import React, { useState, useCallback } from "react";

/* ================================================================
   ExpandingGallery — Hover-to-expand tile layout with per-tile
   photo album (prev/next arrows, dots, counter).

   NOTE: Real photos are not uploaded yet. Each slide renders a
   gray placeholder box. When real photos are added to
   /public/images/services/, swap the placeholder back for <Image>.
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
      { src: "/images/services/cutting-1.jpg", alt: "Cutting floor wide" },
      { src: "/images/services/cutting-2.jpg", alt: "Faceting wheel close-up" },
      { src: "/images/services/cutting-3.jpg", alt: "Dop and stone alignment" },
      { src: "/images/services/cutting-4.jpg", alt: "Finished cut stone" },
    ],
  },
  {
    tag: "Calibration",
    title: "Calibration and inspection",
    slides: [
      { src: "/images/services/calib-1.jpg", alt: "Inspection bench" },
      { src: "/images/services/calib-2.jpg", alt: "Micrometer measurement" },
      { src: "/images/services/calib-3.jpg", alt: "Calibrated stone set" },
    ],
  },
  {
    tag: "Bespoke",
    title: "The design studio",
    slides: [
      { src: "/images/services/studio-1.jpg", alt: "CAD workstation" },
      { src: "/images/services/studio-2.jpg", alt: "3D stone model" },
      { src: "/images/services/studio-3.jpg", alt: "Bespoke finished piece" },
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

const PlaceholderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
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
              <div className="slide-placeholder">
                <PlaceholderIcon />
                <span>Drop: {sl.alt}</span>
              </div>
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
