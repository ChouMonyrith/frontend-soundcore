import { Check, Info } from "lucide-react";

export function UploadGuidelines() {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-violet-400" />
        Guidelines
      </h3>
      <ul className="space-y-4">
        {[
          "High-quality audio (24-bit WAV recommended)",
          "Clear, descriptive unique titles",
          "Accurate categorization & BPM",
          "Relevant tags for discoverability",
          "Competitive pricing for the market",
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-neutral-400"
          >
            <div className="w-5 h-5 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FormatInfo() {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6">
      <h3 className="text-white font-bold mb-4">Accepted Formats</h3>
      <div className="space-y-3">
        {[
          { fmt: "WAV", desc: "Lossless, professional quality" },
          { fmt: "FLAC", desc: "Lossless compression" },
          { fmt: "MP3", desc: "Compressed, smaller size" },
        ].map((item) => (
          <div
            key={item.fmt}
            className="bg-neutral-800/30 border border-white/5 rounded-xl p-3"
          >
            <div className="text-white font-mono text-sm font-semibold mb-0.5">
              {item.fmt}
            </div>
            <div className="text-neutral-500 text-xs">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
