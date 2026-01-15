"use client";

import { useEffect, useState } from "react";
import PublicProfile from "@/app/components/profile/PublicProfile";
import { profileService } from "@/app/services/profileService";
import { toast } from "sonner";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await profileService.getMyProfile();
        setProfile(profileData);

        // Once we have the profile ID, fetch the sounds
        if (profileData?.id) {
          const soundsData = await profileService.getProfileSounds(
            profileData.id
          );
          setSounds(soundsData);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        Profile not found
      </div>
    );
  }

  return (
    <PublicProfile
      profile={profile}
      sounds={sounds}
      isOwnProfile={true}
      onFollow={() => {}} // No-op for own profile
    />
  );
}
