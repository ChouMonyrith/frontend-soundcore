import { Play, MoreVertical, Edit, Trash2, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export function SoundGridItem({ sound }) {
  return (
    <div className="group bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-900/10">
      {/* Visual Placeholder */}
      <div className="h-32 w-full relative flex items-center justify-center bg-neutral-800">
        {sound.image_path ? (
          <Image
            src={sound.image_path}
            alt={sound.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div
            className={`absolute inset-0 ${sound.color || "bg-neutral-800"}`}
          />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10"></div>

        <button className="relative z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black">
          <Play className="w-5 h-5 ml-1 fill-current" />
        </button>

        <Badge className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md border-none text-white/90">
          {sound.category}
        </Badge>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-white truncate max-w-[150px]">
              {sound.name}
            </h3>

            <p className="text-xs text-neutral-400">
              {sound.duration} • {sound.size}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-400 hover:text-white -mr-2"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-neutral-900 border-white/10 text-neutral-300"
            >
              <DropdownMenuItem className="focus:bg-white/10">
                <Edit className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10">
                <Download className="w-4 h-4 mr-2" /> Download
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
          <div className="text-xs font-medium text-neutral-500">
            {sound.downloads} downloads
          </div>
          <div className="font-bold text-violet-400">${sound.price}</div>
        </div>
      </div>
    </div>
  );
}
