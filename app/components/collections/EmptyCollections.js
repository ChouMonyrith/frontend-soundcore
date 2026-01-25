"use client";

import { Folder } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function EmptyCollections({ onCreate }) {
  return (
    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-neutral-900/30">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 bg-neutral-800 rounded-full flex items-center justify-center border border-white/5">
          <Folder className="w-6 h-6 text-neutral-500" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-white mb-1">
        No collections yet
      </h3>
      <p className="text-neutral-500 mb-6 text-sm">
        Create your first collection to organize your sounds.
      </p>
      <Button
        onClick={onCreate}
        variant="outline"
        className="border-white/10 text-white hover:bg-white/5"
      >
        Create Collection
      </Button>
    </div>
  );
}
