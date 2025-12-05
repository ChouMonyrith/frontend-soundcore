import { productService } from "@/app/services/productService";
import SoundLibraryClient from "./SoundLibraryClient";

export const metadata = {
  title: "My Sound Library | Dashboard",
};

export default async function SoundLibraryPage() {
  // 1. Fetch on the server (No API roundtrip from client)
  const initialSounds = await productService.getMyProducts();

  // 2. Pass data to the client component
  return <SoundLibraryClient initialSounds={initialSounds} />;
}
