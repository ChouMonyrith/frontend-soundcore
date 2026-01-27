"use client";

import { PublicHeader } from "@/app/components/layout/PublicHeader";

export default function SoundsBrowser({ children }) {
  return (
    <div className="min-h-screen md:h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <PublicHeader />

      <div className="flex-1 relative flex md:overflow-hidden">{children}</div>
    </div>
  );
}
