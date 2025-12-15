"use client";

import {
  Play,
  Pause,
  Heart,
  ShoppingCart,
  Music2,
  Edit,
  Trash2,
  MoreVertical,
  Download,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/CartContext";
import { useState, useRef } from "react";

export function SoundCard({
  sound,
  variant = "browse", // 'browse' | 'dashboard'
  onEdit,
  onDelete,
  onAddToCart,
}) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const isDashboard = variant === "dashboard";
  const detailUrl = `/sounds/${sound.slug || sound.id}`; // Construct URL
  const licenseType = "standard";

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  // Helper to prevent the card link from firing when clicking buttons
  const stopProp = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Reset all other audios if needed (for now isolated)
      // const allAudios = document.querySelectorAll('audio');
      // allAudios.forEach(a => { if(a !== audio) { a.pause(); } });

      // Attempt play
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    try {
      const result = await addToCart(sound.id, licenseType, 1);
      if (result.success) {
        setIsAddedToCart(true);
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToFav = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    setIsAddedToFav(() => !isAddedToFav);

    // setIsLoading(true);
    // try {
    //   const result = await addToCart(sound.id, licenseType, 1);
    //   if (result.success) {
    //     setIsAddedToFav(true);
    //   } else {
    //     console.log(result.error);
    //   }
    // } catch (error) {
    //   console.error("Error adding to cart:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  console.log(sound);

  return (
    <div className="group relative bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/10 h-full flex flex-col">
      <Link
        href={detailUrl}
        className="absolute inset-0 z-0"
        aria-label={`View ${sound.name}`}
      />

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

        {/* Play Button - Z-10 to sit above Link */}
        <button
          onClick={togglePlay} // Toggle play
          className="relative z-10 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black shadow-xl"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 ml-1 fill-current" />
          )}
          <audio
            src={`/api/audio?url=${encodeURIComponent(sound.file_path)}`}
            ref={audioRef}
            onEnded={handleEnded}
          />
        </button>

        <div className="absolute top-3 right-3 z-10 flex gap-2 pointer-events-none">
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
      <div className="p-5 flex flex-col flex-1 relative z-10 pointer-events-none">
        {/* pointer-events-none on container, auto on children to let clicks pass through to Link underneath empty spaces */}

        <div className="flex justify-between items-start mb-1">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-white text-lg truncate pr-2 group-hover:text-violet-400 transition-colors">
              {sound.name}
            </h3>

            {!isDashboard && (
              <p className="text-sm text-neutral-400 truncate">
                {typeof sound.artist === "object"
                  ? sound.artist?.name
                  : sound.artist}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pointer-events-auto" onClick={stopProp}>
            {!isDashboard ? (
              <button
                className="text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
                onClick={handleAddToFav}
              >
                {isAddedToFav ? (
                  <Heart className="w-5 h-5 " fill="red" stroke="red" />
                ) : (
                  <Heart className="w-5 h-5" />
                )}
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
                    <Edit className="w-4 h-4 mr-2" /> Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-400 focus:text-red-400"
                    onClick={() => onDelete(sound.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Sound
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs text-neutral-500 font-medium mb-4 mt-3">
          <span className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5">
            {sound.bpm} BPM
          </span>
          <span className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5">
            {sound.key}
          </span>
          {(Array.isArray(sound.tags)
            ? sound.tags
            : (sound.tags || "").split(",").filter(Boolean)
          )
            .slice(0, 2)
            .map((tag, i) => (
              <span
                key={i}
                className="bg-neutral-800 px-2 py-1 rounded-md border border-white/5"
              >
                {tag.trim()}
              </span>
            ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3 pointer-events-auto">
          <div className="flex flex-col gap-1 ">
            <div className="text-xl font-bold text-white">${sound.price}</div>

            <div className="flex items-center gap-1">
              <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                <Download className="w-3 h-3" /> {sound.download_count || 0} Dls
              </p>
              {sound.rating > 0 && (
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < sound.rating
                          ? "fill-current"
                          : "text-neutral-800 stroke-current"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {!isDashboard ? (
            <Button
              size="sm"
              onClick={(e) => {
                stopProp(e);
                handleAddToCart();
              }}
              disabled={isAddedToCart}
              className="bg-white text-black hover:bg-neutral-200 rounded-full font-semibold transition-transform active:scale-95 ml-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isAddedToCart ? "Added" : "Add"}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  stopProp(e);
                  onEdit(sound);
                }}
                className="h-9 w-9 text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  stopProp(e);
                  onDelete(sound.id);
                }}
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
