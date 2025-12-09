import { useEffect, useState } from "react";

export default function useAudioMetadata(url) {
  const [metadata, setMetadata] = useState({
    size: "Unknown",
    format: "Unknown",
    duration: null,
    sampleRate: null,
    bitrate: null,
    channels: null,
  });

  useEffect(() => {
    if (!url) return;

    const fetchMetadata = async () => {
      try {
        const audioContext = new AudioContext();

        const proxyUrl = `/api/audio?url=${encodeURIComponent(url)}`;

        const response = await fetch(proxyUrl, { method: "GET" });
        if (response.ok) {
          const sizeBytes = response.headers.get("content-length");
          const type = response.headers.get("content-type");

          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          const duration = `${Math.round(audioBuffer.duration)}s`;
          const sampleRate = `${audioBuffer.sampleRate / 1000} kHz`;
          const channels = audioBuffer.numberOfChannels;

          let size = "Unknown";
          let sizeInBits = 0;
          if (sizeBytes) {
            const bytes = parseInt(sizeBytes);
            sizeInBits = bytes * 8;
            const mb = bytes / (1024 * 1024);
            size = `${mb.toFixed(2)} MB`;
          }

          let format = "Unknown";
          if (type) {
            if (type.includes("mpeg")) format = "MP3";
            else if (type.includes("wav")) format = "WAV";
            else format = type.split("/")[1]?.toUpperCase() || type;
          }

          // Calculate bitrate: (File Size in Bits) / Duration in Seconds
          const bitrateVal = sizeInBits / audioBuffer.duration;
          const bitrate = `${Math.round(bitrateVal / 1000)} kbps`;

          setMetadata({
            size,
            format,
            duration,
            sampleRate,
            bitrate,
            channels,
          });
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setMetadata({
          size: "Unknown",
          format: "Unknown",
          duration: null,
          sampleRate: null,
          bitrate: null,
          channels: null,
        });
      }
    };

    fetchMetadata();
  }, [url]);

  return metadata;
}
