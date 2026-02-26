"use client";

import { Search, Music, User, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { searchAll } from "@/app/services/searchService";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Debounce search
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchAll(query);
        setResults(data);
        setOpen(true);
      } catch (e) {
        console.error("Search error", e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setQuery("");
    setResults(null);
    setOpen(false);
  };

  const hasProducts = results?.products?.length > 0;
  const hasArtists = results?.artists?.length > 0;
  const hasResults = hasProducts || hasArtists;

  return (
    <div
      ref={containerRef}
      className="hidden md:flex flex-1 max-w-md mx-8 relative"
    >
      <div className="relative w-full group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-hover:text-violet-400 transition-colors w-4 h-4 z-10" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && handleClose()}
          placeholder="Search sounds, producers..."
          className="pl-10 pr-8 w-full bg-neutral-900/50 border-white/10 text-neutral-200 placeholder:text-neutral-500 focus:bg-neutral-900 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-full transition-all"
        />
        {query && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
          {loading && (
            <div className="px-4 py-6 text-center text-neutral-500 text-sm">
              Searching...
            </div>
          )}

          {!loading && !hasResults && (
            <div className="px-4 py-6 text-center text-neutral-500 text-sm">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Products */}
          {!loading && hasProducts && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-white/5">
                Sounds
              </div>
              {results.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/sounds/${product.slug}`}
                  onClick={handleClose}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                    <Music className="w-4 h-4 text-neutral-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {product.name}
                    </div>
                    <div className="text-neutral-500 text-xs truncate">
                      {product.producer?.display_name ?? "Unknown Artist"}
                    </div>
                  </div>
                  <div className="text-violet-400 text-sm font-semibold shrink-0">
                    ${product.price}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Artists */}
          {!loading && hasArtists && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-t border-b border-white/5">
                Producers
              </div>
              {results.artists.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/profiles/${artist.id}`}
                  onClick={handleClose}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-br flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {artist.display_name}
                    </div>
                    <div className="text-neutral-500 text-xs">Producer</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
