import { productService } from "@/app/services/productService";
import { SoundCard } from "@/app/components/SoundCard";
import { SoundRow } from "@/app/components/SoundRow";
import Link from "next/link";
import { PublicHeader } from "@/app/components/PublicHeader"; // Assuming these are defined elsewhere
import { FilterSidebar } from "@/app/components/FilterSidebar"; // Assuming these are defined elsewhere
import { SoundsToolbar } from "@/app/components/SoundsToolbar"; // Assuming these are defined elsewhere

export default async function SoundsPage({ searchParams }) {
  const params = await searchParams;

  const filters = {
    category: params?.category || "All",
    search: params?.q || "",
    sort: params?.sort || "",
    page: params?.page || 1,
    limit: params?.limit || 12,
  };

  const soundsData = await productService.getProducts(filters);
  const viewMode = params?.view || "grid";

  return (
    <div>
      <div className="flex flex-1 overflow-hidden">
        <FilterSidebar />
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
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
                <Link href={`/sounds/${sound.slug}`} key={sound.id}>
                  <SoundCard sound={sound} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden pb-20">
              <div className="table w-full text-left text-sm">
                <div className="table-header-group bg-white/5 text-neutral-400 font-medium">
                  <div className="table-row">
                    <div className="table-cell p-4 pl-6 font-normal">
                      Sound Details
                    </div>
                    <div className="hidden md:table-cell p-4 font-normal">
                      BPM & Key
                    </div>
                    <div className="hidden sm:table-cell p-4 font-normal">
                      Category
                    </div>
                    <div className="table-cell p-4 font-normal text-right">
                      Price
                    </div>
                    <div className="table-cell p-4 pr-6 font-normal text-right">
                      Action
                    </div>
                  </div>
                </div>
                <div className="table-row-group divide-y divide-white/5">
                  {soundsData.map((sound) => (
                    <Link
                      href={`/sounds/${sound.slug}`}
                      key={sound.id}
                      className="table-row group hover:bg-white/2 transition-colors"
                    >
                      <SoundRow sound={sound} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
