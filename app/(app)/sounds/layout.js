"use client";

import { PublicHeader } from "@/app/components/PublicHeader";

export default function SoundsBrowser({ children }) {
  return (
    <div className="h-screen bg-neutral-950 text-neutral-100 flex flex-col overflow-hidden">
      <PublicHeader />

      <div className="flex-1 relative flex overflow-hidden">{children}</div>
    </div>
  );
}
