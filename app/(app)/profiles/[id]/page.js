import { profileService } from "@/app/services/profileService";
import ProfileClient from "./ProfileClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PublicHeader } from "@/app/components/layout/PublicHeader";

// Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const profile = await profileService.getProfile(id);
    return {
      title: `${profile.name} (@${profile.handle}) | SoundCore`,
      description: profile.bio || `Check out sounds by ${profile.name}.`,
      openGraph: {
        images: [profile.avatar || "/default-avatar.jpg"],
      },
    };
  } catch (error) {
    return { title: "Profile Not Found" };
  }
}

export default async function ProfilePage({ params }) {
  const { id } = await params;
  let profileData, soundsData;

  try {
    // Parallel fetching for speed
    [profileData, soundsData] = await Promise.all([
      profileService.getProfile(id),
      profileService.getProfileSounds(id),
    ]);
  } catch (error) {
    console.error("ProfilePage Error:", error);
    notFound();
  }

  return (
    <>
      <PublicHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileClient
          initialProfile={profileData}
          initialSounds={soundsData}
        />
      </Suspense>
    </>
  );
}
