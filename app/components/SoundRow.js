import { Play, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SoundRow({ sound }) {
  return (
    <>
      <div className="table-cell p-4 pl-6 align-middle">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-800 shrink-0 group-hover:ring-2 ring-violet-500 transition-all">
            {sound.image_path || sound.image ? (
              <Image
                src={sound.image_path || sound.image}
                alt={sound.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-700">
                <Play className="w-4 h-4 text-white/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-200 group-hover:text-white">
              {sound.name}
            </h4>
            <p className="text-xs text-neutral-500">
              {typeof sound.artist === "object"
                ? sound.artist?.name
                : sound.artist}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:table-cell p-4 align-middle">
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
      </div>

      <div className="hidden sm:table-cell p-4 text-neutral-400 text-sm align-middle">
        {sound.category}
      </div>

      <div className="table-cell p-4 text-right font-bold text-white align-middle">
        ${sound.price}
      </div>

      <div className="table-cell p-4 pr-6 text-right align-middle">
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
            className="h-8 bg-violet-600 hover:bg-violet-500 text-white rounded-full"
          >
            <ShoppingCart className="w-3 h-3 mr-2" /> Buy
          </Button>
        </div>
      </div>
    </>
  );
}
