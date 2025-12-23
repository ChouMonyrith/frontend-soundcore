"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Grid3x3, List, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "latest", label: "Latest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export function SoundsToolbar({ viewMode, setViewMode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortKey = searchParams.get("sort") || "popular";
  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sortKey)?.label || "Popular";

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        params.set("q", e.target.value);
      } else {
        params.delete("q");
      }
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleSortChange = (mode) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", mode);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleViewModeChange = (mode) => {
    if (setViewMode) {
      setViewMode(mode);
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("view", mode);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // If viewMode prop is not provided, try to get it from URL
  const currentViewMode = viewMode || searchParams.get("view") || "grid";

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center bg-neutral-900/50 p-2 pr-4 rounded-2xl border border-white/5 backdrop-blur-md">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
        <Input
          placeholder="Search sounds..."
          defaultValue={searchParams.get("q")?.toString()}
          onKeyDown={handleSearch}
          className="pl-11 h-12 bg-transparent border-none focus-visible:ring-0 text-white"
        />
      </div>

      <div className="h-8 w-px bg-white/10 hidden md:block"></div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-neutral-300 hover:text-white hover:bg-white/5 gap-2"
            >
              Sort by: {sortLabel}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-900 border-white/10 text-neutral-300">
            <DropdownMenuItem onClick={() => handleSortChange("popular")}>
              Popular
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("latest")}>
              Newest Arrivals
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("price_asc")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("price_desc")}>
              Price: High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex bg-neutral-800/50 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => handleViewModeChange("grid")}
            className={`p-2 rounded-md transition-all ${
              currentViewMode === "grid"
                ? "bg-neutral-700 text-white"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleViewModeChange("list")}
            className={`p-2 rounded-md transition-all ${
              currentViewMode === "list"
                ? "bg-neutral-700 text-white"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
