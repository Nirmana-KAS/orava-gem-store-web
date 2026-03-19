"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(images[0] ?? "https://res.cloudinary.com/demo/image/upload/sample.jpg");
  return (
    <div>
      <div className="relative mb-3 h-80 overflow-hidden rounded-xl border border-white/10">
        <Image src={selected} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image) => (
          <button key={image} onClick={() => setSelected(image)} className="relative h-20 overflow-hidden rounded border border-white/10">
            <Image src={image} alt={alt} fill className="object-cover" sizes="100px" />
          </button>
        ))}
      </div>
    </div>
  );
}

