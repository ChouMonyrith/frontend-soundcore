"use client";

import { useState } from "react";
import { Upload, FileAudio, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FileUploader({ files, setFiles }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file: file,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      status: "uploading",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: "success", progress: 100 } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress } : f))
          );
        }
      }, 300);
    });
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        className={`relative group border-2 border-dashed rounded-3xl p-10 transition-all duration-300 ${
          dragActive
            ? "border-violet-500 bg-violet-500/10"
            : "border-white/10 bg-neutral-900/30 hover:border-violet-500/50 hover:bg-neutral-900/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">
            Drag & drop audio files
          </h3>
          <p className="text-sm text-neutral-400 mb-6 max-w-xs">
            Supports WAV, MP3, FLAC, OGG (Max 50MB per file)
          </p>
          <label>
            <input
              type="file"
              multiple
              accept="audio/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button
              type="button"
              className="bg-white text-black hover:bg-neutral-200 font-semibold"
            >
              Browse Files
            </Button>
          </label>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-medium mb-4">Uploading Queue</h3>
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 bg-neutral-800/30 p-3 rounded-xl border border-white/5"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                  <FileAudio className="w-5 h-5 text-violet-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-sm text-white font-medium truncate">
                      {file.name}
                    </div>
                    <div className="text-xs text-neutral-500">{file.size}</div>
                  </div>
                  {/* Custom Progress Bar */}
                  <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        file.status === "error" ? "bg-red-500" : "bg-violet-500"
                      }`}
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {file.status === "success" && (
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                  )}
                  {file.status === "error" && (
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
