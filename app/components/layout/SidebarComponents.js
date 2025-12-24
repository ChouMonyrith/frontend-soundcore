"use client";

import { useState } from "react";
import { useCart } from "@/app/contexts/CartContext";
import {
  ShoppingCart,
  Check,
  Heart,
  Share2,
  FileAudio,
  Play,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ShareButton } from "./ShareButton";

export function PricingCard({ sound }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isOwner = sound.producer_profile_id === user?.id;
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Default to standard license for now
  const licenseType = "standard";

  const handleAddToCart = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const result = await addToCart(sound.id, licenseType, 1);
      if (result.success) {
        setAddedToCart(true);
        toast.success("Added to cart");
        setTimeout(() => setAddedToCart(false), 2000);
      } else {
        if (result.error?.response?.status === 409) {
          toast.error("You already own this sound");
        } else {
          toast.error("Failed to add to cart");
        }
        console.error(result.error);
      }
    } catch (e) {
      console.error("Add to cart error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-violet-900/10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-neutral-400 text-sm mb-1">Total Price</div>
          <div className="text-4xl font-bold text-white">${sound.price}</div>
        </div>
        <Badge
          variant="outline"
          className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-2"
        >
          In Stock
        </Badge>
      </div>

      <div className="space-y-3 mb-6">
        {isOwner && !sound.has_purchased ? (
          <>
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={addedToCart || loading}
              className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                addedToCart
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : addedToCart ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </>
              )}
            </Button>
            <Link href="/checkout">
              <Button
                onClick={handleBuyNow}
                variant="outline"
                size="lg"
                className="w-full h-12 bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white mt-3"
              >
                Buy Now
              </Button>
            </Link>
          </>
        ) : (
          <Button
            disabled
            className="w-full h-12 text-base font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-not-allowed opacity-100"
          >
            {isOwner ? "Owner" : "Purchased"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            isFavorited
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "border-white/5 text-neutral-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          {isFavorited ? "Saved" : "Save"}
        </button>
        <ShareButton sound={sound} />
      </div>

      <Separator className="my-6 bg-white/5" />

      <div className="space-y-3">
        <h4 className="text-white font-medium text-sm">Included Files</h4>
        <div className="space-y-2">
          {["WAV (24-bit)", "MP3 (320kbps)"].map((fmt) => (
            <div
              key={fmt}
              className="flex items-center justify-between text-xs text-neutral-400 bg-neutral-800/50 p-2 rounded-lg border border-white/5"
            >
              <span className="flex items-center gap-2">
                <FileAudio className="w-3 h-3" /> {fmt}
              </span>
              <span>2.4 MB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArtistProfile({ artist, avatar }) {
  if (!artist) return null; // Safety check
  return (
    <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14 border-2 border-neutral-800">
          <AvatarFallback className="bg-linear-to-br from-violet-600 to-indigo-600 text-white">
            {avatar || "A"}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-white font-bold">{artist.name || artist}</div>
          <div className="text-neutral-500 text-xs">
            234 sounds • 4.9 Rating
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full border-white/10 text-neutral-700 hover:text-white hover:bg-white/5"
      >
        View Profile
      </Button>
    </div>
  );
}

export function RelatedSounds({ sounds }) {
  if (!sounds) return null;
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 pl-1">Similar Sounds</h3>
      <div className="space-y-3">
        {sounds.map((sound) => (
          <div
            key={sound.id}
            className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5"
          >
            <div
              className={`w-12 h-12 rounded-lg ${
                sound.image || "bg-neutral-800"
              } flex items-center justify-center shrink-0`}
            >
              <Play className="w-4 h-4 text-white fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate group-hover:text-violet-400 transition-colors">
                {sound.name}
              </div>
              <div className="text-neutral-500 text-xs">{sound.artist}</div>
            </div>
            <div className="text-white text-sm font-bold">${sound.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
