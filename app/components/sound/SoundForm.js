"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SoundForm({
  onSubmit,
  isSubmitting,
  initialValues = {},
  categories = [],
  isEdit = false,
}) {
  const [categoryId, setCategoryId] = useState(initialValues.category_id || "");
  const [key, setKey] = useState(initialValues.key || "");

  return (
    <form
      onSubmit={onSubmit}
      className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Sound Details</h3>
        <div className="text-xs text-neutral-500">* Required fields</div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-neutral-300">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={initialValues.name}
            placeholder="e.g., Midnight Synthwave Loop"
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_path" className="text-neutral-300 ">
            Cover Image
          </Label>
          <Input
            id="image_path"
            name="image_path"
            type="file"
            accept="image/*"
            className="bg-neutral-800/50 border-white/10 text-white file:bg-violet-600 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-4 file:text-sm file:font-medium hover:file:bg-violet-500 cursor-pointer"
            required={!isEdit}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-neutral-300">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialValues.description}
            placeholder="Describe the texture, mood, and equipment used..."
            rows={4}
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500 resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-neutral-300">Category</Label>
            <input type="hidden" name="category_id" value={categoryId} />
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger className="bg-neutral-800/50 border-white/10 text-white focus:ring-violet-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 text-white">
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-neutral-300">
              Price (USD)
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              defaultValue={initialValues.price}
              placeholder="9.99"
              step="0.01"
              className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bpm" className="text-neutral-300">
              BPM{" "}
              <span className="text-neutral-500 text-xs font-normal">
                (Optional)
              </span>
            </Label>
            <Input
              id="bpm"
              name="bpm"
              type="number"
              defaultValue={initialValues.bpm}
              placeholder="120"
              className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-300">
              Key{" "}
              <span className="text-neutral-500 text-xs font-normal">
                (Optional)
              </span>
            </Label>
            <input type="hidden" name="key" value={key} />
            <Select value={key} onValueChange={setKey}>
              <SelectTrigger className="bg-neutral-800/50 border-white/10 text-white focus:ring-violet-500">
                <SelectValue placeholder="Select key" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-white/10 text-white h-60">
                {[
                  "C",
                  "C#",
                  "D",
                  "D#",
                  "E",
                  "F",
                  "F#",
                  "G",
                  "G#",
                  "A",
                  "A#",
                  "B",
                ].map((k) => (
                  <SelectItem key={k} value={k}>
                    {k}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-neutral-300">
            Tags
          </Label>
          <Input
            id="tags"
            name="tags"
            defaultValue={initialValues.tags}
            placeholder="trap, dark, analog, aggressive"
            className="bg-neutral-800/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500"
          />
          <p className="text-xs text-neutral-500">Separate tags with commas</p>
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base shadow-lg shadow-violet-500/25"
        >
          {isSubmitting ? "Publishing..." : "Publish Sound"}
        </Button>
      </div>
    </form>
  );
}
