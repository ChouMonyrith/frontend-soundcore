"use client";

import { PublicHeader } from "@/app/components/PublicHeader";

export default function SoundsBrowser({ children }) {
  return (
    <div className="min-h-screen bg-neutral-950 fixed inset-0 text-neutral-100 flex flex-col">
      <PublicHeader />
      {children}
    </div>
  );
}
