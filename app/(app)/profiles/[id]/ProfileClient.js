"use client";

import { useState } from "react";
import PublicProfile from "@/app/components/profile/PublicProfile";
import { profileService } from "@/app/services/profileService";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ProfileClient({ initialProfile, initialSounds }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(initialProfile);

  // Handle Follow Button Logic
  const handleFollowToggle = async () => {
    if (!user) {
      toast.error("Please login to follow creators.");
      return;
    }

    // Optimistic Update (Update UI instantly)
    const previousState = { ...profile };
    setProfile((prev) => ({
      ...prev,
      is_following: !prev.is_following,
      stats: {
        ...prev.stats,
        followers: prev.is_following
          ? prev.stats.followers - 1
          : prev.stats.followers + 1,
      },
    }));

    try {
      await profileService.toggleFollow(profile.id);
      toast.success(profile.is_following ? "Unfollowed" : "Following!");
    } catch (error) {
      // Revert if failed
      setProfile(previousState);
      toast.error("Action failed. Please try again.");
    }
  };

  return (
    <PublicProfile
      profile={profile}
      sounds={initialSounds}
      onFollow={handleFollowToggle}
      isOwnProfile={user?.id === profile.user_id}
    />
  );
}
