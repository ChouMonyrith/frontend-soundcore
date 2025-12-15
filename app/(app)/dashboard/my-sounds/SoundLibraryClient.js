"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Search, Filter, Grid3x3, List } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

// Components
import { SoundCard } from "@/app/components/sound/SoundCard";
import { SoundRow } from "@/app/components/sound/SoundRow";
import { SoundStats } from "@/app/components/sound/SoundStats";
import { CategoryPopover } from "@/app/components/sound/CategoryPopover";
import SoundUpdateDialog from "@/app/components/sound/SoundUpdateDialog"; // Ensure this matches filename
import { deleteProduct } from "@/app/services/productService";

export default function SoundLibraryClient({ initialSounds = [] }) {
  const router = useRouter();

  // Initialize state with Server Data
  const [sounds, setSounds] = useState(initialSounds);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [editingSound, setEditingSound] = useState(null);
  const [deletingSoundId, setDeletingSoundId] = useState(null);

  // 3. Sync state when Server Data changes (triggered by router.refresh())
  useEffect(() => {
    setSounds(initialSounds);
  }, [initialSounds]);

  // --- Handlers ---

  const handleDelete = (soundId) => {
    setDeletingSoundId(soundId);
  };

  const confirmDelete = async () => {
    if (deletingSoundId) {
      try {
        await deleteProduct(deletingSoundId);
        setDeletingSoundId(null);

        // 4. Magic: Re-runs the Server Page, fetches new DB data,
        // updates 'initialSounds' prop, which triggers the useEffect above.
        router.refresh();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleEdit = (sound) => {
    setEditingSound(sound);
  };

  // Filter Logic (Client Side for speed)
  const filteredSounds = sounds.filter((sound) => {
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
          <Link href="/dashboard/upload">
            <Button className="bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20">
              <Plus className="w-4 h-4 mr-2" /> Upload Sound
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <SoundStats sounds={sounds} />

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center bg-neutral-900/50 p-2 rounded-xl border border-white/5 backdrop-blur-md">
          <CategoryPopover
            currentCategory={categoryFilter}
            onSelectCategory={setCategoryFilter}
            sounds={sounds}
          />

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
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSounds.map((sound) => (
              <SoundCard
                key={sound.id}
                sound={sound}
                variant="dashboard"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-400 font-medium">
                <tr>
                  <th className="p-4 pl-6">Name</th>
                  <th className="hidden md:table-cell p-4">Category</th>
                  <th className="hidden sm:table-cell p-4">Stats</th>
                  <th className="p-4 text-right">Price</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSounds.map((sound) => (
                  <SoundRow
                    key={sound.id}
                    sound={sound}
                    variant="dashboard"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Update Dialog:
            We render this conditionally. The UpdateSoundDialog handles its own router.refresh() 
            internally upon success (check app/components/UpdateSoundDialog.js).
        */}
        {editingSound && (
          <SoundUpdateDialog
            sound={editingSound}
            open={!!editingSound}
            onOpenChange={(open) => !open && setEditingSound(null)}
            onSuccess={() => {
              setEditingSound(null);
              router.refresh();
            }}
            key={editingSound.id}
          >
            <></>
          </SoundUpdateDialog>
        )}

        {/* Delete Dialog */}
        <Dialog
          open={!!deletingSoundId}
          onOpenChange={(open) => !open && setDeletingSoundId(null)}
        >
          <DialogContent className="bg-neutral-900 border-white/10 text-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Sound</DialogTitle>
              <DialogDescription className="text-neutral-400">
                Are you sure you want to delete this sound? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setDeletingSoundId(null)}
                className="text-neutral-400 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
