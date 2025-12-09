"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  Download,
  Search,
  Music2,
  FileAudio,
  Calendar,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { productService } from "@/app/services/productService";
import { PublicHeader } from "@/app/components/PublicHeader";
import { DownloadItem } from "@/app/components/DownloadItem";

export default function MyDownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await productService.getDownloads();
        setDownloads(response.data || []);
      } catch (error) {
        console.error("Failed to fetch downloads:", error);
        setDownloads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  console.log("My Download", downloads);

  const filteredDownloads = downloads.filter(
    (item) =>
      item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <PublicHeader />
      <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 lg:p-10 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Download className="w-8 h-8 text-emerald-400" />
                My Downloads
              </h1>
              <p className="text-neutral-400 mt-2">
                Access and download your purchased sounds.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
              <Input
                placeholder="Search purchases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500 h-11"
              />
            </div>
          </div>

          {/* Content Area */}
          {filteredDownloads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-neutral-900/30 border border-white/5 rounded-3xl">
              <div className="w-20 h-20 bg-neutral-800/50 rounded-full flex items-center justify-center mb-6 border border-white/5">
                <Music2 className="w-10 h-10 text-neutral-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {searchQuery ? "No matching sounds found" : "No downloads yet"}
              </h3>
              <p className="text-neutral-400 max-w-sm mb-8">
                {searchQuery
                  ? `We couldn't find anything matching "${searchQuery}".`
                  : "Your purchased sounds will appear here ready for download."}
              </p>
              {!searchQuery && (
                <Link href="/sounds">
                  <Button className="bg-violet-600 hover:bg-violet-500 text-white px-8 rounded-full">
                    Browse Store
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDownloads.map((item) => (
                <DownloadItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
