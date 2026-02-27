"use client";

import { useState, useEffect, useRef } from "react";
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
  const isControlled = open !== undefined;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open && isControlled) return;

    if (mode === "edit" && initialValues) {
      setName(initialValues.name || "");
      setDescription(initialValues.description || "");
      setIsPublic(
        initialValues.is_public !== undefined
          ? Boolean(initialValues.is_public)
          : true,
      );
    } else {
      setName("");
      setDescription("");
      setIsPublic(true);
      setCoverImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open]); // only depend on open

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Collection name is required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description || "");
      formData.append("is_public", isPublic ? "1" : "0");

      if (coverImage) {
        formData.append("cover_image", coverImage);
      }

      if (mode === "create") {
        await createCollection(formData);
        toast.success("Collection created successfully");
      } else {
        await updateCollection(initialValues.id, formData);
        toast.success("Collection updated successfully");
      }

      if (onSuccess) onSuccess();

      if (isControlled && onOpenChange) {
        onOpenChange(false);
      }

      // Reset form after create
      if (mode === "create") {
        setName("");
        setDescription("");
        setCoverImage(null);
        setIsPublic(true);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Collection error:", error);

      const errors = error?.response?.data?.errors;
      const message = errors
        ? Object.values(errors).flat().join(", ")
        : error?.response?.data?.message || `Failed to ${mode} collection`;

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
     Render
  ---------------------------- */
  return (
    <Dialog {...(isControlled ? { open, onOpenChange } : {})}>
      {!isControlled && (
        <DialogTrigger asChild>
          {trigger ? (
            trigger
          ) : mode === "create" ? (
            <Button className="bg-white text-black hover:bg-neutral-200">
              <Plus className="w-4 h-4 mr-2" />
              New Collection
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className="bg-neutral-900 border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Collection" : "Edit Collection"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Vibes"
              className="bg-neutral-800 border-white/10 text-white"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              className="bg-neutral-800 border-white/10 text-white resize-none"
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Image</Label>
            <Input
              ref={fileInputRef}
              id="cover_image"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="bg-neutral-800 border-white/10 text-white"
            />
            {mode === "edit" && !coverImage && (
              <p className="text-xs text-neutral-500">
                Leave empty to keep current image
              </p>
            )}
          </div>

          {/* Public Toggle */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="is_public" className="cursor-pointer">
              Public Collection
            </Label>
          </div>

          {/* Actions */}
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
