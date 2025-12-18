"use client";

import { Slider } from "@/app/components/ui/slider";
import {
  Disc,
  HashIcon,
  Mic2,
  Music2,
  Radio,
  Sliders,
  Zap,
} from "lucide-react";
import { use, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounceCallback from "@/app/hooks/useDebounceCallback";

const categories = [
  { name: "All", icon: HashIcon },
  { name: "Bass", icon: Sliders },
  { name: "Drums", icon: Disc },
  { name: "FX", icon: Zap },
  { name: "Synth", icon: Radio },
  { name: "Vocal", icon: Mic2 },
  { name: "Instrument", icon: Music2 },
];

const tags = ["Cinematic", "Trap", "Lo-Fi", "House", "Techno", "Ambient"];

export function FilterSidebar({ trendingTags = tags }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const maxPrice = Number(searchParams.get("max_price") ?? 0);
  const minPrice = Number(searchParams.get("min_price") ?? 0);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const onSelectCategory = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const onToggleTag = (tag) => {
    const params = new URLSearchParams(searchParams);

    const selectedTags =
      searchParams.get("tags")?.split(",").filter(Boolean) ?? [];

    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    if (nextTags.length === 0) {
      params.delete("tags");
    } else {
      params.set("tags", nextTags.join(","));
    }

    params.delete("page"); // important for pagination
    router.push(`${pathname}?${params.toString()}`);
  };

  const updatePriceParams = useDebounceCallback((priceRange) => {
    const params = new URLSearchParams(searchParams);
    params.set("min_price", priceRange[0]);
    params.set("max_price", priceRange[1]);
    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  const onSelectPriceRange = (priceRange) => {
    setPriceRange(priceRange);
    updatePriceParams(priceRange);
  };

  return (
    <aside className="w-72 border-r  border-white/5 bg-neutral-900/20 hidden lg:flex flex-col h-full sticky top-0">
      <div className="p-6">
        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 px-2">
            Categories
          </h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm group ${
                  selectedCategory === cat.name
                    ? "bg-violet-500/10 text-violet-400 font-medium"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 px-2">
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2 px-1">
            {trendingTags.map((tag) => (
              <button
                onClick={() => onToggleTag(tag)}
                key={tag}
                className={`text-xs px-3 py-1.5 rounded-full cursor-pointer bg-neutral-800/50 border border-white/5 text-neutral-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all active:bg-violet-500/10 active:text-white ${
                  searchParams.get("tags")?.split(",").includes(tag)
                    ? "bg-violet-500/10 text-violet-400"
                    : ""
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Placeholder */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Price Range
            </h3>
            {/* Dynamic Value Display */}
            <span className="text-xs font-medium text-violet-400">
              ${priceRange[0]} - ${priceRange[1]}
              {priceRange[1] === 100 ? "+" : ""}
            </span>
          </div>

          <div className="px-2">
            <Slider
              defaultValue={[0, 50]}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={onSelectPriceRange}
              className="mb-6 cursor-pointer **:data-[slot=slider-range]:bg-white **:data-[slot=slider-track]:bg-white/10 **:data-[slot=slider-thumb]:border-white"
            />

            <div className="flex justify-between text-xs text-neutral-500 font-medium">
              <span>Free</span>
              <span>$50</span>
              <span>$100+</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
