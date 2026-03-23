"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/demo/image/upload/sample.jpg";

function isAllowedImageUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    const isHttps = url.protocol === "https:";
    const host = url.hostname;
    return (
      isHttps &&
      (host === "res.cloudinary.com" ||
        host === "lh3.googleusercontent.com" ||
        host.endsWith(".supabase.co"))
    );
  } catch {
    return false;
  }
}

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductImageGallery({
  images,
  alt,
}: ProductImageGalleryProps) {
  const validImages = images.filter((image) => isAllowedImageUrl(image));
  const [selected, setSelected] = useState(validImages[0] ?? FALLBACK_IMAGE);

  return (
    <div>
      <div className="relative mb-3 h-80 overflow-hidden rounded-xl border border-white/10">
        <Image
          src={selected}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {validImages.map((image) => (
          <button
            key={image}
            onClick={() => setSelected(image)}
            className="relative h-20 overflow-hidden rounded border border-white/10"
          >
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
