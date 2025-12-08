"use client";
import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { Volume2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function AudioPlayer({
  audioUrl,
  isPlaying,
  onPlayPause,
  onTimeUpdate,
  onFinish,
}) {
  const [volume, setVolume] = useState([80]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);

  // Initialize Wavesurfer
  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#404040",
      progressColor: "#8b5cf6", // violet-500
      cursorColor: "transparent",
      barWidth: 3,
      barGap: 2,
      barRadius: 3,
      height: 128, // h-32 = 128px
      normalize: true,
      backend: "MediaElement",
    });

    if (audioUrl) {
      wavesurferRef.current.load(audioUrl).catch((err) => {
        console.warn("WaveSurfer load error:", err);
      });
    }

    wavesurferRef.current.on("ready", () => {
      console.log("WaveSurfer is ready");
      setDuration(wavesurferRef.current.getDuration());
      wavesurferRef.current.setVolume(volume[0] / 100);
    });

    wavesurferRef.current.on("error", (err) => {
      console.error("WaveSurfer error:", err);
    });

    wavesurferRef.current.on("audioprocess", () => {
      const time = wavesurferRef.current.getCurrentTime();
      setCurrentTime(time);
      if (onTimeUpdate) onTimeUpdate(time);
    });

    wavesurferRef.current.on("interaction", () => {
      const time = wavesurferRef.current.getCurrentTime();
      setCurrentTime(time);
      if (onTimeUpdate) onTimeUpdate(time);
    });

    wavesurferRef.current.on("finish", () => {
      if (onFinish) onFinish();
    });

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioUrl]);

  // Handle Play/Pause prop changes
  useEffect(() => {
    if (!wavesurferRef.current) return;

    if (isPlaying) {
      console.log("Attempting to play...");
      wavesurferRef.current
        .play()
        .then(() => {
          console.log("Playback started");
        })
        .catch((err) => {
          console.error("Playback error:", err);
        });
    } else {
      console.log("Pausing...");
      wavesurferRef.current.pause();
    }
  }, [isPlaying]);

  // Handle Volume changes
  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume[0] / 100);
    }
  }, [volume]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-violet-400" />
          Audio Preview
        </h3>

        <div className="flex items-center gap-3 bg-black/20 rounded-full px-3 py-1.5 border border-white/5">
          <Volume2 className="w-4 h-4 text-white" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>

      {/* Waveform Visualizer */}
      <div className="h-32 mb-8 relative" ref={containerRef} />

      <div className="flex items-center gap-4">
        <Button
          size="icon"
          onClick={onPlayPause}
          className={`w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-105 ${
            isPlaying
              ? "bg-white text-black hover:bg-neutral-200"
              : "bg-violet-600 text-white hover:bg-violet-500"
          }`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 ml-1 fill-current" />
          )}
        </Button>

        <div className="flex-1">
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all duration-100 ease-linear"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
        </div>

        <div className="font-mono text-sm text-neutral-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
