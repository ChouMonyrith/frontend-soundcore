import { Play, Heart, ShoppingCart, Music2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SoundCard({ sound }) {
  return (
    <div className="group bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/10">
      {/* Image Area */}
      <div className="relative h-48 w-full bg-neutral-800 flex items-center justify-center overflow-hidden">
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

        {/* Gradient Overlay */}

        {/* Play Button */}
        <button className="relative z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black shadow-xl">
          <Play className="w-6 h-6 ml-1 fill-current" />
        </button>

        <Badge className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md border-white/10 text-white hover:bg-black/60">
          {sound.category}
        </Badge>
      </div>

      {/* Details Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-bold text-white text-lg truncate pr-2 group-hover:text-violet-400 transition-colors">
              {sound.name}
            </h3>
            <p className="text-sm text-neutral-400">
              {typeof sound.artist === "object"
                ? sound.artist?.name
                : sound.artist}
            </p>
          </div>
          <button className="text-neutral-500 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 text-xs text-neutral-500 font-medium mb-4 mt-2">
          <span className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5">
            {sound.bpm} BPM
          </span>
          <span className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5">
            {sound.key}
          </span>
          {(Array.isArray(sound.tags)
            ? sound.tags
            : typeof sound.tags === "string"
            ? sound.tags.split(",")
            : [sound.tags]
          )
            .filter(Boolean)
            .slice(0, 3)
            .map((tag) => (
              <span
                key={tag}
                className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5"
              >
                {tag.trim()}
              </span>
            ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="text-xl font-bold text-white mr-auto">
            ${sound.price}
          </div>
          <Button
            size="sm"
            className="bg-white text-black hover:bg-neutral-200 rounded-full font-semibold transition-transform active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
