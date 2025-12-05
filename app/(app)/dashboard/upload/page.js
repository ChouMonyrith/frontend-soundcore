"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FileUploader from "@/app/components/FileUploader";
import SoundForm from "@/app/components/SoundForm";
import { UploadGuidelines, FormatInfo } from "@/app/components/UploadSidebar";
import { productService } from "@/app/services/productService";
import { categoriesService } from "@/app/services/categoryService";
import { useEffect } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);

      // Append files
      files.forEach((fileObj) => {
        if (fileObj.file) {
          formData.append("audio_file", fileObj.file);
        }
      });

      // Log FormData content for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await productService.uploadProduct(formData);
      // Redirect on success
      router.push("/dashboard");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Upload Sounds
          </h1>
          <p className="text-neutral-400">
            Share your frequencies with the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. File Uploader Component */}
            <FileUploader files={files} setFiles={setFiles} />

            {/* 2. Metadata Form Component */}
            <SoundForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              categories={categories}
            />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="space-y-6">
            <UploadGuidelines />
            <FormatInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
