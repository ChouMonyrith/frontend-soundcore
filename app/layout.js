import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import "./styles/globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://soundcore.com"
  ),
  title: {
    default: "SoundCore | Premium Audio Marketplace",
    template: "%s | SoundCore",
  },
  icons: {
    icon: [
      { url: "/whitelogo.jpg", sizes: "500x500", type: "image/png" }, // For high-res displays
    ],
    apple: [
      { url: "/whitelogo.jpg", sizes: "180x180" }, // For iPhone/iPad home screen
    ],
  },
  description:
    "Discover and download royalty-free samples, loops, and presets from top producers. The ultimate marketplace for music creators.",
  keywords: [
    "audio samples",
    "music production",
    "royalty free sounds",
    "vst presets",
    "drum kits",
  ],
  authors: [{ name: "SoundCore Team" }],
  creator: "SoundCore",
  publisher: "SoundCore Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soundcore.com",
    title: "SoundCore | Premium Audio Marketplace",
    description:
      "Discover and download royalty-free samples, loops, and presets.",
    siteName: "SoundCore",
    images: [
      {
        url: "/whitelogo.jpg",
        alt: "SoundCore Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoundCore | Premium Audio Marketplace",
    description:
      "Discover and download royalty-free samples, loops, and presets.",
    creator: "@soundcore",
    images: ["/whitelogo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="min-h-screen bg-gray-100">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="top-center" duration={3000} theme="dark" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
