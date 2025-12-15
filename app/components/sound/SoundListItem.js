import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { MoreVertical, Play } from "lucide-react";

export function SoundListItem({ sound }) {
  return (
    <tr className="hover:bg-white/2 transition-colors group">
      <td className="p-4 pl-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg ${sound.color} flex items-center justify-center text-white/80`}
          >
            <Play className="w-3 h-3 fill-current" />
          </div>
          <span className="font-medium text-neutral-200">{sound.name}</span>
        </div>
      </td>
      <td className="p-4">
        <Badge
          variant="outline"
          className="border-white/10 text-neutral-400 bg-white/5"
        >
          {sound.category}
        </Badge>
      </td>
      <td className="p-4 text-neutral-400">
        <div className="flex flex-col">
          <span>{sound.duration}</span>
          <span className="text-[10px] text-neutral-600">{sound.size}</span>
        </div>
      </td>
      <td className="p-4 text-violet-400 font-medium">${sound.price}</td>
      <td className="p-4">
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
            sound.status === "active"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-neutral-800 text-neutral-400 border-white/5"
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              sound.status === "active" ? "bg-emerald-500" : "bg-neutral-500"
            }`}
          ></div>
          <span className="capitalize">{sound.status}</span>
        </div>
      </td>
      <td className="p-4 pr-6 text-right">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-neutral-500 hover:text-white"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
}
