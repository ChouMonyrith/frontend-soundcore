"use client";

import {
  Play,
  Heart,
  ShoppingCart,
  Music2,
  Edit,
  Trash2,
  MoreVertical,
  Download,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SoundCard({
  sound,
  variant = "browse", // 'browse' | 'dashboard'
  onEdit,
  onDelete,
  onAddToCart,
}) {
  const isDashboard = variant === "dashboard";

  return (
    <div className="group relative bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/10 h-full flex flex-col">
      {/* --- Image Area --- */}
      <div className="relative h-48 w-full bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
        {sound.image_path ? (
          <Image
            src={sound.image_path}
            alt={sound.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(23,23,23,1)_100%)] opacity-60 z-10 flex items-center justify-center">
            <Music2 className="w-12 h-12 text-white/20" />
          </div>
        )}

        {/* Play Button (Common) */}
        <button className="relative z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black shadow-xl">
          <Play className="w-6 h-6 ml-1 fill-current" />
        </button>

        {/* Top Right Badge: Category (Browse) OR Status (Dashboard) */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {isDashboard && (
            <Badge
              className={
                sound.status === "active"
                  ? "bg-emerald-500/80 hover:bg-emerald-500"
                  : "bg-neutral-500/80"
              }
            >
              {sound.status || "Active"}
            </Badge>
          )}
          <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white hover:bg-black/60">
            {sound.category}
          </Badge>
        </div>
      </div>

      {/* --- Details Area --- */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-white text-lg truncate pr-2 group-hover:text-violet-400 transition-colors">
              {sound.name}
            </h3>

            {/* Show Artist only in Browse Mode */}
            {!isDashboard && (
              <p className="text-sm text-neutral-400 truncate">
                {typeof sound.artist === "object"
                  ? sound.artist?.name
                  : sound.artist}
              </p>
            )}

            {/* Show Downloads count in Dashboard Mode */}
            {isDashboard && (
              <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                <Download className="w-3 h-3" /> {sound.download_count || 0}{" "}
                Downloads
              </p>
            )}
          </div>

          {/* Action: Like (Browse) vs Menu (Dashboard) */}
          {!isDashboard ? (
            <button className="text-neutral-500 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-neutral-500 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-neutral-900 border-white/10 text-neutral-200"
              >
                <DropdownMenuItem onClick={() => onEdit(sound)}>
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-400 focus:text-red-400"
                  onClick={() => onDelete(sound.id)}
                >
                  Delete Sound
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Tags / BPM / Key */}
        <div className="flex flex-wrap gap-2 text-xs text-neutral-500 font-medium mb-4 mt-3">
          <span className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5">
            {sound.bpm} BPM
          </span>
          <span className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5">
            {sound.key}
          </span>
          {/* Helper to handle tag formats safely */}
          {(Array.isArray(sound.tags)
            ? sound.tags
            : (sound.tags || "").split(",").filter(Boolean)
          )
            .slice(0, 2) // Limit to 2 tags to prevent overflow
            .map((tag, i) => (
              <span
                key={i}
                className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5"
              >
                {tag.trim()}
              </span>
            ))}
        </div>

        {/* Footer Actions (Pushed to bottom) */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <div className="text-xl font-bold text-white">${sound.price}</div>

          {/* Buttons Switcher */}
          {!isDashboard ? (
            <Button
              size="sm"
              onClick={() => onAddToCart && onAddToCart(sound)}
              className="bg-white text-black hover:bg-neutral-200 rounded-full font-semibold transition-transform active:scale-95 ml-auto"
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> Add
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(sound)}
                className="h-9 w-9 text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(sound.id)}
                className="h-9 w-9 text-neutral-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
