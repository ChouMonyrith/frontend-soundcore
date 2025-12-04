import { Card } from "@/components/ui/card";
import { HardDrive, Download, Music, Activity } from "lucide-react";

export function SoundStats({ sounds }) {
  const activeCount = sounds.filter((s) => s.status === "active").length;
  const totalDownloads = sounds.reduce((acc, s) => acc + s.downloads, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[
        {
          label: "Total Sounds",
          value: sounds.length,
          icon: Music,
          color: "text-blue-400",
        },
        {
          label: "Total Downloads",
          value: totalDownloads.toLocaleString(),
          icon: Download,
          color: "text-emerald-400",
        },
        {
          label: "Active Tracks",
          value: activeCount,
          icon: Activity,
          color: "text-violet-400",
        },
        {
          label: "Total Size",
          value: "48.1 MB",
          icon: HardDrive,
          color: "text-orange-400",
        },
      ].map((stat) => (
        <Card
          key={stat.label}
          className="bg-neutral-900/50 backdrop-blur-md border-white/5 p-4 flex items-center gap-4"
        >
          <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-neutral-500 text-xs font-medium uppercase">
              {stat.label}
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
