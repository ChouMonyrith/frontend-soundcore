import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Download,
  Music2,
  ShieldCheck,
  FileAudio,
  Clock,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import useAudioMetadata from "@/app/hooks/useAudioMetadata";

export function DownloadItem({ item }) {
  const metadata = useAudioMetadata(item.product.file_path);

  return (
    <div className="group bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6 transition-all hover:bg-neutral-900/80 hover:border-white/10 shadow-lg">
      {/* Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-white/5 group-hover:ring-2 ring-violet-500/20 transition-all">
        {item.product.image_path ? (
          <Image
            src={item.product.image_path}
            alt={item.product.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music2 className="w-8 h-8 text-white/20" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 text-center sm:text-left min-w-0 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
          <div>
            <div className="mt-2 sm:mt-0 flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white mb-1 truncate">
                {item.product.name}
              </h3>
              <Badge
                variant="outline"
                className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-normal"
              >
                <ShieldCheck className="w-3 h-3 mr-1" />
                {item.license_type || "Standard License"}
              </Badge>
            </div>
            <p className="text-sm text-neutral-400 truncate">
              {item.product.artist}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-500 mt-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Purchased {new Date(item.created_at).toLocaleDateString()}
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center gap-1.5">
            <FileAudio className="w-3.5 h-3.5" />
            {metadata.format || "WAV"}
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {metadata.duration || "0:00"}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="w-full sm:w-auto">
        <a
          href={item.download_url} // Ensure API returns a direct download link or handler
          download
          className="w-full sm:w-auto"
        >
          <Button className="w-full sm:w-auto bg-white text-black hover:bg-neutral-200 font-semibold shadow-lg shadow-white/5 active:scale-95 transition-transform">
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </a>
      </div>
    </div>
  );
}
