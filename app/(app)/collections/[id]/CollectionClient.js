"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Heart,
  MoreHorizontal,
  Clock,
  Music2,
  Share2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { PublicHeader } from "@/app/components/layout/PublicHeader";
import { SoundCard } from "@/app/components/sound/SoundCard";
import { SoundGridItem } from "@/app/components/sound/SoundGridItem";
import { SoundRow } from "@/app/components/sound/SoundRow";

export default function CollectionClient({ collection }) {
  const [isLiked, setIsLiked] = useState(false);
  const { cover_image, description, name, products, user, updated_at } =
    collection;

  const getCoverUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}/storage/${cleanPath}`;
  };

  const coverSrc = getCoverUrl(cover_image);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20 relative isolate overflow-x-hidden">
      <div className="z-50 relative">
        <PublicHeader />
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-[700px] bg-linear-to-b from-violet-900/80 to-neutral-950 opacity-40 -z-10 pointer-events-none`}
      />
      <div className="fixed bottom-0 right-0 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] -z-20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-8">
        <div className="flex flex-col md:flex-row gap-8 items-end">
          <div className="group relative w-52 h-52 md:w-64 md:h-64 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg shrink-0 flex items-center justify-center bg-neutral-900 border border-white/5 overflow-hidden">
            {coverSrc ? (
              <Image
                src={coverSrc}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
                priority
              />
            ) : (
              <Music2 className="w-24 h-24 text-white/10" />
            )}
          </div>

          <div className="flex-1 flex flex-col justify-end gap-3 pb-2">
            <span className="uppercase text-xs font-bold tracking-wider text-white/80">
              Collection
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter shadow-black drop-shadow-lg">
              {name}
            </h1>

            <p className="text-white/70 text-sm md:text-base font-medium line-clamp-2 max-w-3xl leading-relaxed">
              {description}
            </p>

            <div className="flex items-center flex-wrap gap-2 text-sm font-medium text-white/90 mt-4">
              <div className="flex items-center flex-wrap gap-2 text-sm font-medium text-white/90 mt-4">
                <Avatar className="w-6 h-6 border-none">
                  <AvatarFallback className="bg-white text-black text-[10px] font-bold">
                    {user?.name?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <Link
                  href={`/profiles/${user?.id}`}
                  className="hover:underline cursor-pointer font-bold"
                >
                  {user?.name || "SoundCore"}
                </Link>
                <span className="text-white/60">•</span>
                <span>{new Date(updated_at).toLocaleDateString()}</span>
                <span className="text-white/60">•</span>
                <span>{products?.length || 0} sounds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-neutral-950/20 backdrop-blur-3xl border-t border-white/5 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-400 font-medium border-b border-white/5">
                <tr>
                  <th className="p-4 pl-6 font-normal">Sound</th>
                  <th className="hidden md:table-cell p-4 font-normal">
                    Details
                  </th>
                  <th className="hidden sm:table-cell p-4 font-normal">
                    Genre
                  </th>
                  <th className="p-4 font-normal text-right">Price</th>
                  <th className="p-4 font-normal text-right pr-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products?.length > 0 ? (
                  products.map((sound) => (
                    <SoundRow key={sound.id} sound={sound} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-12 text-center text-neutral-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                          <Music2 className="w-8 h-8 text-neutral-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          This collection is empty
                        </h3>
                        <p className="text-neutral-400">
                          No sounds have been added to this collection yet.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
