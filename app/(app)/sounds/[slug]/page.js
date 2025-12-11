import { notFound } from "next/navigation";
import AudioPlayer from "@/app/components/AudioPlayer";
import {
  ArtistProfile,
  PricingCard,
  RelatedSounds,
} from "@/app/components/SidebarComponents";
import SoundHero from "@/app/components/SoundHero";
import SoundTabs from "@/app/components/SoundTabs";
import { getProductBySlug } from "@/app/services/productService";
import SoundDetailClient from "./SoundDetailClient";

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
