import { getProducts, getTrendingTags } from "@/app/services/productService";
import { SoundCard } from "@/app/components/sound/SoundCard";
import { SoundRow } from "@/app/components/sound/SoundRow";
import Link from "next/link";
import { FilterSidebar } from "@/app/components/layout/FilterSidebar";
import { SoundsToolbar } from "@/app/components/sound/SoundsToolbar";
import { Pagination } from "@/app/components/ui/Pagination";
import { MobileFilter } from "@/app/components/layout/MobileFilter";

export const metadata = {
  title: "Browse Sounds | SoundCore",
  description: "Discover premium royalty-free samples and loops.",
};

export default async function SoundsPage({ searchParams }) {
  const params = await searchParams;

  const filters = {
    category: params?.category || "All",
    search: params?.q || "",
    sort: params?.sort || "",
    page: params?.page || 1,
    limit: params?.limit || 8,
    tags: params?.tags || "",
    min_price: params?.min_price || "",
    max_price: params?.max_price || "",
  };

  const { data: soundsData, meta } = await getProducts(filters);
  const tags = await getTrendingTags();
  const viewMode = params?.view || "grid";

  return (
    <div className="flex h-full w-full relative">
      <div className="hidden lg:block w-72 shrink-0 border-r border-white/5 h-full overflow-y-auto sticky top-0">
        <FilterSidebar trendingTags={tags} />
      </div>
      <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-10 scroll-smooth">
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Browse Sounds
            </h1>
            <p className="text-neutral-400 mt-1">
              Discover premium samples from top producers.
            </p>
          </div>

          <div className="sticky top-[64px] z-30 flex flex-col gap-4 bg-neutral-950/95 backdrop-blur-xl py-3 -mx-4 px-4 border-b border-white/5 lg:static lg:bg-transparent lg:p-0 lg:mx-0 lg:border-none transition-all">
            <div className="lg:hidden">
              <MobileFilter trendingTags={tags} />
            </div>

            <SoundsToolbar />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {soundsData.map((sound) => (
              <SoundCard key={sound.id} sound={sound} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden pb-20">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-neutral-400 font-medium sticky top-0 z-10 backdrop-blur-md">
                  <tr>
                    <th className="p-4 pl-6 font-normal min-w-[200px]">
                      Sound Details
                    </th>
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
                    <SoundRow key={sound.id} sound={sound} variant="browse" />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8">
          <Pagination meta={meta} />
        </div>
      </main>
    </div>
  );
}
