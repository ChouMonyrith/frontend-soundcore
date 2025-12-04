import AudioPlayer from "@/app/components/AudioPlayer";
import {
  ArtistProfile,
  PricingCard,
  RelatedSounds,
} from "@/app/components/SidebarComponents";
import SoundHero from "@/app/components/SoundHero";
import SoundTabs from "@/app/components/SoundTabs";
import { productService } from "@/app/services/productService";

// --- Mock Data (Moved outside component or to a separate data file) ---
// const soundData = {
//   id: 1,
//   name: "Deep Bass Drop",
//   artist: "Bass Master",
//   artistAvatar: "BM",
//   category: "Bass",
//   price: 9.99,
//   rating: 4.8,
//   reviews: 124,
//   downloads: 567,
//   bpm: 140,
//   key: "Am",
//   duration: "0:03",
//   format: "WAV, MP3",
//   bitrate: "24-bit",
//   sampleRate: "44.1 kHz",
//   size: "2.4 MB",
//   tags: ["bass", "drop", "heavy", "trap", "electronic"],
//   description:
//     "A powerful and deep bass drop perfect for trap, dubstep, and electronic music. This professionally crafted sample adds instant impact to your productions...",
//   image:
//     "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
//   waveform: Array.from({ length: 60 }, () => Math.random() * 100),
//   license: "Royalty-free",
//   releaseDate: "Nov 15, 2024",
// };

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

const reviews = [
  {
    id: 1,
    user: "John Producer",
    avatar: "JP",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing bass drop! Used it in my latest track...",
  },
  {
    id: 2,
    user: "Sarah Beats",
    avatar: "SB",
    rating: 5,
    date: "1 week ago",
    comment: "Perfect for trap production...",
  },
];

import { notFound } from "next/navigation";
import SoundDetailClient from "./SoundDetailClient";

// ... (imports)

export default async function SoundDetailPage({ params }) {
  const { slug } = await params;
  let soundData;

  try {
    soundData = await productService.getProductBySlug(slug);
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
      reviews={reviews}
    />
  );
}
