import { categoriesService } from "@/app/services/categoryService";
import {
  Activity,
  ArrowRight,
  Disc,
  Download,
  Mic2,
  Music2,
  Play,
  Sliders,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Footer from "./components/layout/Footer";
import { PublicHeader } from "./components/layout/PublicHeader";
import { SoundCard } from "./components/sound/SoundCard";
import { Button } from "./components/ui/button";
import { getPopularProducts } from "./services/productService";
import { getTopProducers } from "./services/producerService";
import Image from "next/image";

const iconMap = {
  Activity: Activity,
  Disc: Disc,
  Zap: Zap,
  Music2: Music2,
  Sliders: Sliders,
  Mic2: Mic2,
};

export default async function HomePage() {
  const categories = await categoriesService.getCategories();
  const popularSounds = await getPopularProducts();
  const topProducers = await getTopProducers();

  // console.log(categories);

  return (
    // Changed to Dark Mode Base
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-violet-500/30">
      <PublicHeader />

      {/* Hero Section with Spotlight Effect and Grid */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                New Sounds Added Weekly
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
                Sonic Perfection <br />
                <span className="text-violet-400">For Creators.</span>
              </h1>

              <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
                The curated marketplace for high-fidelity samples, loops, and
                presets. Built for the modern producer.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/sounds">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold transition-all hover:scale-105"
                  >
                    Browse Library
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/producer/request">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border-neutral-800 bg-neutral-900/50 text-white hover:bg-neutral-800 rounded-full backdrop-blur-sm"
                  >
                    Start Selling
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4 border-t border-white/5">
                {[
                  { label: "Sounds", val: "10k+" },
                  { label: "Downloads", val: "50k+" },
                  { label: "Producers", val: "1.2k+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">
                      {stat.val}
                    </div>
                    <div className="text-sm text-neutral-500 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - Abstract Glass Card */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-violet-500/10">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                  <Activity className="w-24 h-24 text-white" />
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 bg-neutral-800/50 hover:bg-neutral-800 border border-white/5 p-4 rounded-2xl transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-linear-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="h-2.5 bg-neutral-600 rounded-full w-24"></div>
                          <div className="text-xs text-neutral-500">2:45</div>
                        </div>
                        {/* Audio Waveform Simulation */}
                        <div className="flex items-end gap-1 h-6">
                          {[...Array(12)].map((_, idx) => (
                            <div
                              key={idx}
                              className="w-1 bg-violet-500/40 rounded-full group-hover:bg-violet-400 transition-colors"
                              style={{ height: `${Math.random() * 100}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Royalty Free
                    </div>
                    <div className="text-xs text-neutral-400">
                      Instant License
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sounds - Dark Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Trending Now</h2>
            <p className="text-neutral-400">
              Hand-picked frequencies for your next hit.
            </p>
          </div>
          <Link
            href="/sounds"
            className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            View All Drops <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSounds.map((sound, index) => (
            <SoundCard sound={sound} key={index} />
          ))}
        </div>
      </section>

      {/* Categories - Modern Pills */}
      <section className="py-20 bg-neutral-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Explore Genres
            </h2>
            <p className="text-neutral-400">
              Find the perfect sound for your project
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories &&
              categories.map((category) => {
                const IconComponent = iconMap[category.icon] || Activity;
                return (
                  <Link
                    key={category.name}
                    href={`/sounds/?category=${category.name.toLowerCase()}`}
                    className="group"
                  >
                    <div className="h-full bg-neutral-900 border border-white/5 p-6 rounded-2xl hover:bg-neutral-800 hover:border-violet-500/30 transition-all text-center flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${category.bg} blur-xl`}
                      ></div>
                      <div
                        className={`relative w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent />
                      </div>
                      <div className="relative">
                        <h3 className="font-semibold text-white">
                          {category.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">
                          {category.products?.length || 0}+
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Top Producers - Minimal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white">Top Producers</h2>
          <Button variant="ghost" className="text-neutral-400 hover:text-white">
            See Leaderboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducers.map((producer, index) => (
            <div
              key={producer.id}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-800 transition-colors"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-linear-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-neutral-300 ring-2 ring-neutral-800 group-hover:ring-violet-500 transition-all">
                  {producer.avatar ? (
                    <Image
                      src={producer.avatar}
                      alt={producer.display_name}
                      width={64}
                      height={64}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    producer.display_name
                      ?.trim()
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")
                  )}
                </div>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-neutral-900">
                    <span className="text-[10px] font-bold text-black">#1</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                  {producer.display_name}
                </h3>
                <p className="text-sm text-neutral-500">
                  {producer.sales_count.toLocaleString()} Sales
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Gradient Glow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/20 to-blue-600/20"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-500/30 rounded-full blur-[100px]"></div>

          <div className="relative p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to break the silence?
            </h2>
            <p className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto">
              Join thousands of producers who trust SoundCore for their daily
              driver sounds. Start creating with professional grade audio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-violet-600 hover:bg-violet-500 text-white rounded-full shadow-lg shadow-violet-500/25"
              >
                Get All Access
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg bg-transparent border-white/20 text-white hover:bg-white/10 rounded-full"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
