"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Music2 } from "lucide-react";
import { useState } from "react";

export function CollectionCard({ collection }) {
  const [isOptimized, setIsOptimized] = useState(true);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}/storage/${cleanPath}`;
  };

  const imageSrc = getImageUrl(collection.cover_image);

  return (
    <Link href={`/collections/${collection.id}`} className="block h-full">
      <div className="group bg-[#181818] hover:bg-[#282828] border border-white/5 rounded-xl p-4 transition-all duration-300 h-full flex flex-col ease-out">
        <div className="relative aspect-square w-full bg-neutral-800 rounded-lg mb-4 shadow-lg overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={collection.name}
              fill
              unoptimized={!isOptimized}
              onError={() => setIsOptimized(false)}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-neutral-800 to-neutral-900">
              <Music2 className="w-16 h-16 text-neutral-700" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-white truncate text-base">
            {collection.name}
          </h3>
          <p className="text-neutral-400 text-sm line-clamp-2 leading-relaxed">
            {collection.description || "No description provided."}
          </p>
        </div>
      </div>
    </Link>
  );
}
