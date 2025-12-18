"use client";

import { useState, useEffect } from "react";
import AudioPlayer from "@/app/components/sound/AudioPlayer";
import SoundHero from "@/app/components/sound/SoundHero";
import SoundTabs from "@/app/components/sound/SoundTabs";
import {
  ArtistProfile,
  PricingCard,
  RelatedSounds,
} from "@/app/components/layout/SidebarComponents";
import useAudioMetadata from "@/app/hooks/useAudioMetadata";

export default function SoundDetailClient({
  soundData,
  relatedSounds,
  reviews,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const metadata = useAudioMetadata(soundData.file_path);

  const togglePlay = () => setIsPlaying(!isPlaying);
  console.log(soundData);
  return (
    <div className="flex-1 h-full overflow-y-auto bg-neutral-950 text-neutral-100 pb-20 font-sans relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <SoundHero
        sound={soundData}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Player & Details */}
          <div className="lg:col-span-2 space-y-10">
            <AudioPlayer
              audioUrl={`/api/audio?url=${encodeURIComponent(
                soundData.file_path
              )}`}
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
              onTimeUpdate={setCurrentTime}
              onFinish={() => setIsPlaying(false)}
            />

            <SoundTabs
              sound={{ ...soundData, ...metadata }}
              reviews={reviews}
            />
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6 sticky top-24 h-fit">
            <PricingCard sound={soundData} />
            <ArtistProfile
              artist={soundData.artist}
              avatar={soundData.artistAvatar}
            />
            <RelatedSounds sounds={relatedSounds} />
          </div>
        </div>
      </div>
    </div>
  );
}
