import { ShieldCheck, Zap, FileAudio, Layers, Clock, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SoundTabs({ sound, reviews }) {
  return (
    <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-1">
      <Tabs defaultValue="details">
        <TabsList className="w-full bg-transparent border-b border-white/5 justify-start px-4 h-14">
          {["details", "specs", "reviews"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-violet-500 rounded-none h-full px-6 text-neutral-400 capitalize"
            >
              {tab === "reviews" ? `Reviews (${sound.reviews.length})` : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="p-6 md:p-8">
          <TabsContent
            value="details"
            className="mt-0 space-y-8 animate-in fade-in duration-300"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Description
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {sound.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(Array.isArray(sound.tags)
                ? sound.tags
                : typeof sound.tags === "string"
                ? sound.tags.split(",")
                : [sound.tags]
              )
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-neutral-800 rounded-lg text-xs text-neutral-400 border border-white/5"
                  >
                    #{tag.trim()}
                  </span>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Feature Cards */}
              <div className="bg-neutral-800/30 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <div className="text-white font-medium text-sm">
                    100% Royalty Free
                  </div>
                  <div className="text-neutral-500 text-xs mt-1">
                    Commercial use allowed.
                  </div>
                </div>
              </div>
              <div className="bg-neutral-800/30 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <div className="text-white font-medium text-sm">
                    Instant Download
                  </div>
                  <div className="text-neutral-500 text-xs mt-1">
                    Files available immediately.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="specs"
            className="mt-0 animate-in fade-in duration-300"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
              {[
                { label: "Format", val: sound.format, icon: FileAudio },
                { label: "Sample Rate", val: sound.sampleRate, icon: Layers },
                { label: "Bit Depth", val: sound.bitrate, icon: Layers },
                { label: "Key", val: sound.key, icon: Zap },
                { label: "BPM", val: sound.bpm, icon: Clock },
                { label: "File Size", val: sound.size, icon: Layers },
              ].map((spec) => (
                <div key={spec.label}>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <spec.icon className="w-3 h-3" /> {spec.label}
                  </div>
                  <div className="text-white font-medium">{spec.val}</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="reviews"
            className="mt-0 space-y-6 animate-in fade-in duration-300"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-white/5 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-neutral-800 text-neutral-400 text-xs">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white font-medium text-sm">
                        {review.user}
                      </div>
                      <div className="text-neutral-500 text-xs">
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "fill-current"
                            : "text-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm pl-11">
                  {review.comment}
                </p>
              </div>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
