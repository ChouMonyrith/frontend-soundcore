import { getProducts, getTrendingTags } from "@/app/services/productService";
import { SoundCard } from "@/app/components/sound/SoundCard";
import { SoundRow } from "@/app/components/sound/SoundRow";
import Link from "next/link";
import { FilterSidebar } from "@/app/components/layout/FilterSidebar";
import { SoundsToolbar } from "@/app/components/sound/SoundsToolbar";

export default async function SoundsPage({ searchParams }) {
  const params = await searchParams;

  const filters = {
    category: params?.category || "All",
    search: params?.q || "",
    sort: params?.sort || "",
    page: params?.page || 1,
    limit: params?.limit || 12,
    tags: params?.tags || "",
    min_price: params?.min_price || "",
    max_price: params?.max_price || "",
  };

  const soundsData = await getProducts(filters);
  const tags = await getTrendingTags();
  const viewMode = params?.view || "grid";

  return (
    // h-full ensures this div fills the flex-1 container from SoundsBrowser
    <div className="flex h-full w-full">
      {/* Sidebar: Fixed width, handles its own internal scrolling if needed */}
      <div className="hidden md:block w-72 shrink-0 border-r border-white/5 h-full overflow-hidden">
        <FilterSidebar trendingTags={tags} />
      </div>

      {/* Main Content: Takes remaining width, handles the vertical page scroll */}
      <main className="flex-1 min-w-0 overflow-auto p-6 lg:p-10">
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Browse Sounds
            </h1>
            <p className="text-neutral-400 mt-1">
              Discover premium samples from top producers.
            </p>
          </div>
          <SoundsToolbar />
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {soundsData.map((sound) => (
              <SoundCard key={sound.id} sound={sound} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden pb-20">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-neutral-400 font-medium sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="p-4 pl-6 font-normal">Sound Details</th>
                  <th className="hidden md:table-cell p-4 font-normal">
                    BPM & Key
                  </th>
                  <th className="hidden sm:table-cell p-4 font-normal">
                    Category
                  </th>
                  <th className="p-4 font-normal text-right">Price</th>
                  <th className="p-4 pr-6 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {soundsData.map((sound) => (
                  <SoundRow
                    key={sound.id}
                    sound={sound}
                    href={`/sounds/${sound.slug}`}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
