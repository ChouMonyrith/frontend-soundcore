"use client";

import ProfileHeader from "@/app/components/profile/ProfileHeader";
import ProfileSidebar from "@/app/components/profile/ProfileSidebar";
import ProfileStats from "@/app/components/profile/ProfileStats";
import ProfileContent from "@/app/components/profile/ProfileContent";

// --- Mock Data ---
const userProfile = {
  name: "Alex Rivera",
  handle: "@arivera_sounds",
  role: "Pro Sound Designer",
  location: "Berlin, Germany",
  website: "alexrivera.audio",
  joinDate: "September 2021",
  bio: "Creating texture-heavy ambient soundscapes and punchy analog drums. My sounds have been used by top producers worldwide. Let's make something loud.",
  avatar: "AR",
  coverImage: "bg-linear-to-r from-violet-900 to-indigo-900",
  stats: {
    sounds: 142,
    followers: "12.5k",
    following: 340,
    sales: "45k+",
  },
};

const userSounds = [
  {
    id: 1,
    name: "Neon Nights Pack",
    category: "Synth",
    price: 24.99,
    image: "bg-purple-600",
    downloads: 1204,
  },
  {
    id: 2,
    name: "Deep Impact FX",
    category: "FX",
    price: 14.99,
    image: "bg-blue-600",
    downloads: 850,
  },
  {
    id: 3,
    name: "Analog Drums Vol. 1",
    category: "Drums",
    price: 19.99,
    image: "bg-emerald-600",
    downloads: 2100,
  },
  {
    id: 4,
    name: "Vocals & Chops",
    category: "Vocal",
    price: 9.99,
    image: "bg-pink-600",
    downloads: 543,
  },
  {
    id: 5,
    name: "Ambient Textures",
    category: "Ambient",
    price: 12.99,
    image: "bg-orange-600",
    downloads: 320,
  },
  {
    id: 6,
    name: "Bass Heavy",
    category: "Bass",
    price: 15.99,
    image: "bg-red-600",
    downloads: 980,
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <ProfileHeader user={userProfile} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 md:-mt-24 z-10">
        {/* Spacer to push content below the absolute positioned header info */}
        <div className="h-0 md:h-12 lg:h-0 lg:mt-24"></div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24 md:mt-32 lg:mt-8">
          {/* Left Column: Sidebar (Bio) */}
          <div className="space-y-6">
            <ProfileSidebar bio={userProfile.bio} />
          </div>

          {/* Right Column: Stats & Content */}
          <div className="lg:col-span-2 space-y-8">
            <ProfileStats stats={userProfile.stats} />
            <ProfileContent sounds={userSounds} />
          </div>
        </div>
      </div>
    </div>
  );
}
