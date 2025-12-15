"use client";
import { Card } from "@/app/components/ui/card";
import { HardDrive, Download, Music, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function SoundStats({ sounds }) {
  const activeCount = sounds.filter((s) => s.status === "active").length;
  const totalDownloads = sounds.reduce((acc, s) => acc + s.download_count, 0);
  const [size, setSize] = useState("Calculating...");

  useEffect(() => {
    const calculateTotalSize = async () => {
      if (!sounds || sounds.length === 0) {
        setSize("0 MB");
        return;
      }

      try {
        const sizePromises = sounds.map(async (sound) => {
          if (!sound.file_path) return 0;
          try {
            const proxyUrl = `/api/audio?url=${encodeURIComponent(
              sound.file_path
            )}`;
            const response = await fetch(proxyUrl, { method: "HEAD" });
            if (response.ok) {
              const sizeBytes = response.headers.get("content-length");
              return sizeBytes ? parseInt(sizeBytes, 10) : 0;
            }
          } catch (error) {
            console.error(`Error fetching size for ${sound.name}:`, error);
            return 0;
          }
          return 0;
        });

        const sizes = await Promise.all(sizePromises);
        const totalBytes = sizes.reduce((acc, curr) => acc + curr, 0);
        const mb = totalBytes / (1024 * 1024);

        if (mb > 1024) {
          setSize(`${(mb / 1024).toFixed(2)} GB`);
        } else {
          setSize(`${mb.toFixed(2)} MB`);
        }
      } catch (error) {
        console.error("Error calculating total size:", error);
        setSize("Error");
      }
    };

    calculateTotalSize();
  }, [sounds]);

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
          value: size,
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
          <div className="flex flex-col">
            <div className="text-neutral-500 text-xs font-medium uppercase">
              {stat.label}
            </div>
            <div className="text-xl font-bold flex items-center justify-center text-white">
              {stat.value}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
