import { getProductBySlug } from "@/app/services/productService";
import { notFound } from "next/navigation";
import SoundDetailClient from "./SoundDetailClient";
import { getShareUrl } from "@/app/lib/share";

// Mock related sounds for now, or fetch them too if available
const relatedSounds = [
  {
    id: 2,
    name: "Thunder Bass",
    artist: "Bass Master",
    price: 11.99,
    rating: 4.6,
    image: "bg-violet-600",
  },
  {
    id: 3,
    name: "Sub Bass Hit",
    artist: "Bass Master",
    price: 8.99,
    rating: 4.7,
    image: "bg-blue-600",
  },
  {
    id: 4,
    name: "Bass Rumble",
    artist: "Low End Theory",
    price: 9.99,
    rating: 4.5,
    image: "bg-emerald-600",
  },
  {
    id: 5,
    name: "Wobble Bass",
    artist: "Bass Master",
    price: 10.99,
    rating: 4.8,
    image: "bg-orange-600",
  },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const sound = await getProductBySlug(slug);

    if (!sound) {
      return {
        title: "Sound Not Found",
        description: "The requested sound could not be found.",
      };
    }

    const artistName =
      typeof sound.artist === "object" ? sound.artist.name : sound.artist;

    return {
      title: `${sound.name} by ${artistName}`,
      description: sound.description.substring(0, 160), // SEO optimal length
      openGraph: {
        title: `${sound.name} | SoundCore`,
        description: sound.description.substring(0, 200),
        images: [
          {
            url: sound.image_path || "/default-sound-og.jpg",
            width: 800,
            height: 800,
            alt: `${sound.name} Cover Art`,
          },
        ],
        type: "music.song",
      },
      twitter: {
        card: "summary_large_image",
        title: `${sound.name} by ${artistName}`,
        description: `Download ${sound.name} on SoundCore. ${sound.bpm} BPM, ${sound.key} Key.`,
        images: [sound.image_path],
      },
    };
  } catch (error) {
    return {
      title: "Sound Details",
    };
  }
}

export default async function SoundDetailPage({ params }) {
  const { slug } = await params;
  let soundData;

  try {
    soundData = await getProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
    if (error.response && error.response.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <SoundDetailClient
      soundData={soundData}
      relatedSounds={relatedSounds}
      reviews={soundData.reviews || []}
    />
  );
}
