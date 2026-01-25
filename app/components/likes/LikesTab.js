"use client";

import { useEffect, useState } from "react";
import { getLikedProducts } from "@/app/services/productService";
import { SoundCard } from "@/app/components/sound/SoundCard";
import { Loader2 } from "lucide-react";

export function LikesTab() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const data = await getLikedProducts();
        setLikes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching likes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLikes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  if (likes.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-500">
        <p>You haven&apos;t liked any sounds yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {likes.map((sound) => (
        <SoundCard key={sound.id} sound={sound} />
      ))}
    </div>
  );
}
