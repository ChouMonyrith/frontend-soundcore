"use client";

import { useState, useEffect } from "react";
import {
  createCollection,
  updateCollection,
} from "@/app/services/collectionService";
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
import { Plus, Edit } from "lucide-react";

export function CollectionDialog({
  open,
  onOpenChange,
  onSuccess,
  trigger,
  mode = "create",
  initialValues = {},
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setName(initialValues.name || "");
      setDescription(initialValues.description || "");
      setIsPublic(
        initialValues.is_public !== undefined ? initialValues.is_public : true,
      );
    } else {
      setName("");
      setDescription("");
      setIsPublic(true);
      setCoverImage(null);
    }
  }, [mode, initialValues, open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        description,
        is_public: isPublic,
      };

      if (coverImage) {
        payload.cover_image = coverImage;
      }

      if (mode === "create") {
        await createCollection(payload);
        toast.success("Collection created successfully");
      } else {
        await updateCollection(initialValues.id, payload);
        toast.success("Collection updated successfully");
      }

      // Reset form if creating
      if (mode === "create") {
        setName("");
        setDescription("");
        setCoverImage(null);
      }

      if (onSuccess) onSuccess();
      if (onOpenChange) onOpenChange(false);
    } catch (error) {
      console.error(`Failed to ${mode} collection`, error);
      const errors = error.response?.data?.errors;
      const errorMessage = errors
        ? Object.values(errors).flat().join(", ")
        : error.response?.data?.message || `Failed to ${mode} collection`;

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ||
          (mode === "create" ? (
            <Button className="bg-white text-black hover:bg-neutral-200">
              <Plus className="w-4 h-4 mr-2" /> New Collection
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="w-4 h-4" /> Edit
            </Button>
          ))}
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Collection" : "Edit Collection"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
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
            {mode === "edit" && !coverImage && (
              <p className="text-xs text-neutral-500">
                Leave empty to keep current image
              </p>
            )}
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
              {loading
                ? "Saving..."
                : mode === "create"
                  ? "Create"
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
