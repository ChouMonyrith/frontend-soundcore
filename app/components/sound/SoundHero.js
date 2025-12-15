import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, Clock, Play, Pause } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

export default function SoundHero({ sound, isPlaying, togglePlay }) {
  return (
    <div className="relative pt-24 pb-12 overflow-hidden border-b border-white/5 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/sounds" className="hover:text-white transition-colors">
            Sounds
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-violet-400">{sound.category}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-end">
          {/* Image / Artwork */}
          <div className="relative group shrink-0">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 relative">
              <Image
                src={sound.image_path ? sound.image_path : "/placeholder.png"}
                alt={sound.name ? sound.name : "Sound"}
                width={224}
                height={224}
                unoptimized
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:scale-110 hover:bg-white hover:text-black transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 ml-1 fill-current" />
                )}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <Badge className="bg-violet-500/10 text-violet-300 border-violet-500/20 px-3 py-1">
              {sound.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {sound.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                <Avatar className="w-6 h-6 border border-white/10">
                  <AvatarFallback className="bg-linear-to-br from-violet-600 to-indigo-600 text-[10px] text-white">
                    {sound.artist.avatar || sound.artist.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span>{sound.artist.name}</span>
              </div>
              <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
              <div>{sound.bpm} BPM</div>
              <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
              <div className="flex items-center gap-1">
                {sound.rating ? sound.rating : "No Rating Yet"}
                <Star className="w-4 h-4 fill-current text-yellow-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
