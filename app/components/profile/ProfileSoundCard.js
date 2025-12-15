import { Play, Heart } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

export default function ProfileSoundCard({ sound }) {
  return (
    <div className="group bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:shadow-lg">
      <div
        className={`h-32 ${sound.image} relative flex items-center justify-center`}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
        <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-black">
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        </button>
        <Badge className="absolute top-2 right-2 bg-black/40 backdrop-blur-md border-none text-white/90 text-xs">
          {sound.category}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-white font-medium truncate pr-2">{sound.name}</h4>
          <span className="text-violet-400 font-bold text-sm">
            ${sound.price}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>{sound.downloads} DLs</span>
          <button className="hover:text-red-400 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
