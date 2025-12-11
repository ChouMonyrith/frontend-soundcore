"use client";

import { getProducts } from "@/app/services/productService";
import { createContext, useContext, useState, useEffect } from "react";

const SoundContext = createContext();

export function SoundProvider({
  children,
  initSounds = [],
  initCategory = "All",
}) {
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [soundsData, setSoundsData] = useState(initSounds);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const sounds = await getProducts();
        setSoundsData(sounds);
      } catch (error) {
        console.error("Error fetching sounds:", error);
      }
    };
    fetchSounds();
  }, [initSounds, initCategory]);

  return (
    <SoundContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        soundsData,
        setSoundsData,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  return useContext(SoundContext);
}
