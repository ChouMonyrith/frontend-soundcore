import {
  Music,
  Mic2,
  Radio,
  Speaker,
  Box,
  Layers,
  Zap,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";

const categories = [
  { name: "All Categories", icon: Layers },
  { name: "Bass", icon: Speaker },
  { name: "Drums", icon: Box },
  { name: "FX", icon: Zap },
  { name: "Synth", icon: Radio },
  { name: "Vocal", icon: Mic2 },
  { name: "Instrument", icon: Music },
];

export function CategoryPopover({ currentCategory, onSelectCategory, sounds }) {
  // Helper to get count per category
  const getCount = (catName) => {
    if (catName === "All Categories") return sounds.length;
    return sounds.filter((s) => s.category === catName).length;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between bg-neutral-900/50 border-white/10 text-neutral-300 hover:bg-white/5 hover:text-white"
        >
          <span className="flex items-center gap-2 truncate">
            {currentCategory === "All Categories" ? (
              <>
                <Layers className="w-4 h-4" />
                All Categories
              </>
            ) : (
              <>
                {(() => {
                  const cat = categories.find(
                    (c) => c.name === currentCategory
                  );
                  const Icon = cat ? cat.icon : Layers;
                  return <Icon className="w-4 h-4" />;
                })()}
                {currentCategory}
              </>
            )}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 bg-neutral-900 border-white/10 text-neutral-300">
        <div className="space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = currentCategory === cat.name;
            const count = getCount(cat.name);

            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm group ${
                  isActive
                    ? "bg-violet-500/10 text-violet-400 font-medium"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? "text-violet-400"
                        : "text-neutral-500 group-hover:text-white"
                    }`}
                  />
                  <span>{cat.name}</span>
                </div>
                {count > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-violet-500/20 text-violet-300"
                        : "bg-neutral-800 text-neutral-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
