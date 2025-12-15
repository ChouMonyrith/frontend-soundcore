"use client";

import {
  Play,
  Heart,
  ShoppingCart,
  MoreVertical,
  Edit,
  Trash2,
  Music2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";

export function SoundRow({
  sound,
  variant = "browse", // 'browse' | 'dashboard'
  onEdit,
  onDelete,
  onAddToCart,
  href,
}) {
  const isDashboard = variant === "dashboard";
  const router = useRouter();

  const handleRowClick = (e) => {
    // If the click target is interactive (button, link, etc.), don't navigate row
    if (
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest('[role="button"]')
    ) {
      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <tr
      onClick={handleRowClick}
      className={`group hover:bg-white/2 transition-colors border-b border-white/5 last:border-0 ${
        href ? "cursor-pointer" : ""
      }`}
    >
      {/* --- Column 1: Image & Name --- */}
      <td className="p-4 pl-6 align-middle">
        <div className="flex items-center gap-4">
          {/* Image / Icon Placeholder */}
          <div
            className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 group-hover:ring-2 ring-violet-500 transition-all ${
              sound.image_path
                ? "bg-neutral-800"
                : sound.color || "bg-neutral-800"
            }`}
          >
            {sound.image_path ? (
              <Image
                src={sound.image_path}
                alt={sound.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music2 className="w-5 h-5 text-white/20" />
              </div>
            )}

            {/* Hover Play Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          </div>

          {/* Text Info */}
          <div>
            <h4 className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
              {sound.name}
            </h4>

            {!isDashboard ? (
              <p className="text-xs text-neutral-500">
                {typeof sound.artist === "object"
                  ? sound.artist?.name
                  : sound.artist}
              </p>
            ) : (
              /* In Dashboard, show ID or small detail instead of Artist */
              <p className="text-[10px] text-neutral-600 font-mono">
                ID: {sound.id}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* --- Column 2: Metadata A (BPM/Key OR Category Badge) --- */}
      <td className="hidden md:table-cell p-4 align-middle">
        {!isDashboard ? (
          /* Browse: Show BPM & Key */
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-white/10 text-neutral-400 bg-neutral-800/50 font-normal"
            >
              {sound.bpm} BPM
            </Badge>
            <Badge
              variant="outline"
              className="border-white/10 text-neutral-400 bg-neutral-800/50 font-normal"
            >
              {sound.key}
            </Badge>
          </div>
        ) : (
          /* Dashboard: Show Category Badge */
          <Badge
            variant="outline"
            className="border-white/10 text-neutral-400 bg-white/5"
          >
            {sound.category}
          </Badge>
        )}
      </td>

      {/* --- Column 3: Metadata B (Category Text OR File Stats) --- */}
      <td className="hidden sm:table-cell p-4 text-neutral-400 text-sm align-middle">
        {!isDashboard ? (
          <span>{sound.category}</span>
        ) : (
          <div className="flex flex-col">
            <span>{sound.duration}</span>
            <span className="text-[10px] text-neutral-600">{sound.size}</span>
          </div>
        )}
      </td>

      {/* --- Column 4: Price --- */}
      <td className="table-cell p-4 text-right font-bold text-white align-middle">
        ${sound.price}
      </td>

      {/* --- Column 5: Status (Dashboard Only) --- */}
      {isDashboard && (
        <td className="table-cell p-4 text-right align-middle">
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
              sound.status === "active"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-neutral-800 text-neutral-400 border-white/5"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                sound.status === "active" ? "bg-emerald-500" : "bg-neutral-500"
              }`}
            ></div>
            <span className="capitalize">{sound.status || "Draft"}</span>
          </div>
        </td>
      )}

      {/* --- Column 6: Actions --- */}
      <td className="table-cell p-4 pr-6 text-right align-middle">
        {!isDashboard ? (
          /* Browse Actions: Like & Buy */
          <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-neutral-500 hover:text-red-500 hover:bg-red-500/10"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => onAddToCart && onAddToCart(sound)}
              className="h-8 bg-white text-black hover:bg-neutral-200 rounded-full text-xs font-semibold"
            >
              <ShoppingCart className="w-3 h-3 mr-2" /> Buy
            </Button>
          </div>
        ) : (
          /* Dashboard Actions: Edit Menu */
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-500 hover:text-white"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-neutral-900 border-white/10 text-neutral-200"
            >
              <DropdownMenuItem onClick={() => onEdit && onEdit(sound)}>
                <Edit className="w-4 h-4 mr-2" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400 focus:text-red-400"
                onClick={() => onDelete && onDelete(sound.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </td>
    </tr>
  );
}
