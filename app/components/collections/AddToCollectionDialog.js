"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Folder, Plus, Check } from "lucide-react";
import {
  getCollections,
  addProductToCollection,
} from "@/app/services/collectionService";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AddToCollectionDialog({ sound, trigger }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch collections when dialog opens
  useEffect(() => {
    if (open && user) {
      fetchCollections();
    }
  }, [open, user]);

  async function fetchCollections() {
    setLoading(true);
    try {
      const data = await getCollections();
      setCollections(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load collections");
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCollection = async (collectionId) => {
    try {
      await addProductToCollection(collectionId, sound.id);
      toast.success(`Added to collection`);
      setOpen(false);
      // Optionally refresh collections to show updated state if we keep dialog open
    } catch (error) {
      toast.error("Failed to add to collection");
    }
  };

  const handleOpenChange = (isOpen) => {
    if (isOpen && !user) {
      router.push("/sign-in");
      return;
    }
    setOpen(isOpen);
  };

  const isInCollection = (collection) => {
    return collection.products?.some((p) => p.id === sound.id);
  };

  const getCoverUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}/storage/${cleanPath}`;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className="bg-neutral-900 border-white/10 text-white sm:max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-2 max-h-[300px] overflow-y-auto">
          {loading ? (
            <div className="text-center py-4 text-neutral-500">Loading...</div>
          ) : collections.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-neutral-500 mb-2">No collections found.</p>
              <Button
                variant="link"
                onClick={() => router.push("/dashboard/profile")}
                className="text-violet-400"
              >
                Create a collection in Profile
              </Button>
            </div>
          ) : (
            collections.map((collection) => {
              const isAdded = isInCollection(collection);
              return (
                <button
                  key={collection.id}
                  onClick={() =>
                    !isAdded && handleAddToCollection(collection.id)
                  }
                  disabled={isAdded}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${isAdded ? "opacity-50 cursor-default" : "hover:bg-white/5"}`}
                >
                  <div className="h-10 w-10 bg-neutral-800 rounded-md flex items-center justify-center mr-3 shrink-0 overflow-hidden">
                    {collection.cover_image ? (
                      <Image
                        src={getCoverUrl(collection.cover_image)}
                        width={40}
                        height={40}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <Folder className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">
                      {collection.name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {collection.products?.length || 0} items
                    </div>
                  </div>
                  {isAdded && (
                    <Check className="w-4 h-4 text-emerald-500 ml-2" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
