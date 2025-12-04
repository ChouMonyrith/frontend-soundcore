"use client";

import { useState } from "react";
import {
  Search,
  Grid3x3,
  List,
  Plus,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryPopover } from "@/app/components/CategoryPopover"; // Imported below
import { SoundStats } from "@/app/components/SoundStats"; // Imported below
import { SoundGridItem } from "@/app/components/SoundGridItem"; // Imported below
import { SoundListItem } from "@/app/components/SoundListItem"; // Imported below
import Link from "next/link";

// Enhanced Mock Data
const soundsData = [
  {
    id: 1,
    name: "Deep Bass Drop",
    category: "Bass",
    duration: "0:03",
    size: "2.4 MB",
    downloads: 234,
    price: 9.99,
    status: "active",
    color: "bg-violet-500",
  },
  {
    id: 2,
    name: "Cinematic Riser",
    category: "FX",
    duration: "0:08",
    size: "5.1 MB",
    downloads: 189,
    price: 12.99,
    status: "active",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "Trap Hi-Hat Loop",
    category: "Drums",
    duration: "0:04",
    size: "1.8 MB",
    downloads: 456,
    price: 7.99,
    status: "active",
    color: "bg-blue-500",
  },
  {
    id: 4,
    name: "Ambient Pad",
    category: "Synth",
    duration: "0:15",
    size: "8.2 MB",
    downloads: 123,
    price: 14.99,
    status: "active",
    color: "bg-orange-500",
  },
  {
    id: 5,
    name: "Orchestral Hit",
    category: "FX",
    duration: "0:02",
    size: "3.5 MB",
    downloads: 298,
    price: 11.99,
    status: "active",
    color: "bg-emerald-500",
  },
  {
    id: 6,
    name: "Analog Kick",
    category: "Drums",
    duration: "0:01",
    size: "0.9 MB",
    downloads: 567,
    price: 5.99,
    status: "active",
    color: "bg-blue-500",
  },
  {
    id: 7,
    name: "Vocal Chop",
    category: "Vocal",
    duration: "0:05",
    size: "4.2 MB",
    downloads: 345,
    price: 9.99,
    status: "active",
    color: "bg-pink-500",
  },
  {
    id: 8,
    name: "Synth Pluck",
    category: "Synth",
    duration: "0:03",
    size: "2.1 MB",
    downloads: 212,
    price: 8.99,
    status: "active",
    color: "bg-orange-500",
  },
  {
    id: 9,
    name: "Thunder Rumble",
    category: "FX",
    duration: "0:12",
    size: "7.8 MB",
    downloads: 178,
    price: 13.99,
    status: "draft",
    color: "bg-emerald-500",
  },
  {
    id: 10,
    name: "Guitar Strum",
    category: "Instrument",
    duration: "0:06",
    size: "3.9 MB",
    downloads: 289,
    price: 10.99,
    status: "active",
    color: "bg-yellow-500",
  },
];

export default function SoundLibraryPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Filter Logic
  const filteredSounds = soundsData.filter((sound) => {
    const matchesSearch = sound.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" || sound.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Sound Library
            </h1>
            <p className="text-neutral-400 mt-1">Manage your sonic assets.</p>
          </div>
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20"
          >
            <Plus className="w-4 h-4 mr-2" /> Upload Sound
          </Link>
        </div>

        {/* 2. Stats Component */}
        <SoundStats sounds={soundsData} />

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center bg-neutral-900/50 p-2 rounded-xl border border-white/5 backdrop-blur-md">
          {/* Category Filter Popover */}
          <CategoryPopover
            currentCategory={categoryFilter}
            onSelectCategory={setCategoryFilter}
            sounds={soundsData}
          />

          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <Input
              placeholder="Search filenames, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-neutral-500"
            />
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block"></div>

          {/* View Toggles */}
          <div className="flex items-center gap-2 pr-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-400 hover:text-white"
            >
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <div className="bg-neutral-800 p-1 rounded-lg flex gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-neutral-700 text-white shadow-sm"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-neutral-700 text-white shadow-sm"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Grid / List Views */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSounds.map((sound) => (
              <SoundGridItem key={sound.id} sound={sound} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-400 font-medium">
                <tr>
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stats</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSounds.map((sound) => (
                  <SoundListItem key={sound.id} sound={sound} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
