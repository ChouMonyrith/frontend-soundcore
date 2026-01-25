import PublicProfile from "@/app/components/profile/PublicProfile";
import { profileService } from "@/app/services/profileService";

export default async function ProfilePage() {
  const profile = await profileService.getMyProfile();

  if (!profile?.id) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        Profile not found
      </div>
    );
  }

  const sounds = await profileService.getProfileSounds(profile.id);

  return <PublicProfile profile={profile} sounds={sounds} isOwnProfile />;
}
