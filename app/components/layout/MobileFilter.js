"use client";

import { Button } from "@/app/components/ui/button";
import { Menu, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "@/app/components/layout/FilterSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

export function MobileFilter({ trendingTags }) {
  return (
    <div className="lg:hidden w-full ">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-fit flex items-center justify-start gap-2 border-white/10 bg-neutral-900/50 text-neutral-300 hover:text-white h-11 px-5"
          >
            <Menu className="w-4 h-4" /> Filters
          </Button>
        </DialogTrigger>

        <DialogContent className=" max-w-md bg-neutral-950 border-white/10 text-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-violet-400" />
              Filters
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <FilterSidebar trendingTags={trendingTags} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
