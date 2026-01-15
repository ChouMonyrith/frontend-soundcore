import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";
import ProfileStats from "./ProfileStats";
import ProfileContent from "./ProfileContent";

export default function PublicProfile({
  profile,
  sounds,
  onFollow,
  isOwnProfile,
}) {
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <ProfileHeader
        user={profile}
        onFollow={onFollow}
        isOwnProfile={isOwnProfile}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative -mt-20 md:-mt-24 z-10">
        <div className="h-0 md:h-12 lg:h-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24 md:mt-32 lg:mt-8">
          <div className="space-y-6">
            <ProfileSidebar bio={profile.bio} socials={profile.socials} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ProfileStats stats={profile.stats} />
            <ProfileContent sounds={sounds} />
          </div>
        </div>
      </div>
    </div>
  );
}
