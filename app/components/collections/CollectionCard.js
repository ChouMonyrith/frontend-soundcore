"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Music2 } from "lucide-react";
import { useState } from "react";

export function CollectionCard({ collection }) {
  const [isOptimized, setIsOptimized] = useState(true);

  // Helper to handle image paths
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
    // Ensure we don't double slash if path starts with /
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}/storage/${cleanPath}`;
  };

  const imageSrc = getImageUrl(collection.cover_image);

  return (
    <Link href={`/collections/${collection.id}`} className="block h-full">
      <div className="group bg-[#181818] hover:bg-[#282828] border border-white/5 rounded-xl p-4 transition-all duration-300 h-full flex flex-col ease-out">
        {/* Image Area - Square Aspect Ratio */}
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

          {/* Floating Play Button (appears on hover) */}
          <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-xl">
            <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 hover:bg-violet-500 transition-transform">
              <Play className="w-6 h-6 ml-1 fill-current" />
            </div>
          </div>
        </div>

        {/* Content */}
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
