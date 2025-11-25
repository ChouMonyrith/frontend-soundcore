import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen bg-gray-50 text-black">
      <Link href="/sign-in">Sign-In</Link>
      <Link href="/sign-up">Sign-Up</Link>
    </div>
  );
}
