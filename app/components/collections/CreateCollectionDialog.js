"use client";

import { useState } from "react";
import { createCollection } from "@/app/services/collectionService";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export function CreateCollectionDialog({
  open,
  onOpenChange,
  onSuccess,
  trigger,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Modify this depending on how your API expects data (JSON vs FormData)
      // Backend expects '1' or '0' for boolean in FormData sometimes, or true/false for JSON
      // But let's send boolean and let service/axios handle it or cast to string if needed
      const payload = {
        name,
        description,
        is_public: isPublic ? 1 : 0, // Laravel validation boolean often works best with 1/0 in FormData
        cover_image: coverImage,
      };

      await createCollection(payload);
      toast.success("Collection created successfully");

      // Reset form
      setName("");
      setDescription("");
      setCoverImage(null);

      if (onSuccess) onSuccess();
      if (onOpenChange) onOpenChange(false);
    } catch (error) {
      console.error("Failed to create collection", error);
      const errors = error.response?.data?.errors;
      const errorMessage = errors
        ? Object.values(errors).flat().join(", ")
        : error.response?.data?.message || "Failed to create collection";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-white text-black hover:bg-neutral-200">
            <Plus className="w-4 h-4 mr-2" /> New Collection
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateCollection} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Vibes"
              className="bg-neutral-800 border-white/10 text-white placeholder:text-neutral-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              className="bg-neutral-800 border-white/10 text-white placeholder:text-neutral-500 resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Image</Label>
            <Input
              id="cover_image"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="bg-neutral-800 border-white/10 text-white file:text-white"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
            />
            <Label htmlFor="is_public" className="cursor-pointer">
              Public Collection (Visible to everyone)
            </Label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="text-neutral-400 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
