"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SoundForm from "@/app/components/SoundForm";
import { productService } from "@/app/services/productService";
import { categoriesService } from "@/app/services/categoryService";

export default function SoundUpdateDialog({
  sound,
  open,
  onOpenChange,
  onSuccess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);

      await productService.updateProduct(sound.id, formData);
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!sound) return null;

  const initialValues = {
    name: sound.name,
    description: sound.description,
    price: sound.price,
    bpm: sound.bpm,
    key: sound.key,
    category_id: sound.category_id,
    tags: sound.tags,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-950 border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Sound</DialogTitle>
        </DialogHeader>
        <SoundForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          categories={categories}
          initialValues={initialValues}
          isEdit={true} // Hint to form that we are editing
        />
      </DialogContent>
    </Dialog>
  );
}
