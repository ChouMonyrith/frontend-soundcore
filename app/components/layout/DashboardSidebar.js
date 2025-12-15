"use client";

import {
  BarChart3,
  HelpCircle,
  LayoutDashboard,
  Music2,
  UploadCloud,
  Wallet,
  User,
  MessageCircle,
  Mails,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/app/contexts/AuthContext";

// ... (existing imports)

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isAdmin = user?.roles?.some((role) => role.name === "admin");

  const menuItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Sounds", href: "/dashboard/my-sounds", icon: Music2 },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Earnings", href: "/dashboard/earnings", icon: Wallet },
    { label: "Profile", href: "/dashboard/profile", icon: User },
    ...(isAdmin
      ? [
          {
            label: "Producer Requests",
            href: "/dashboard/admin/requests",
            icon: Mails,
          },
        ]
      : []),
  ];

  return (
    <aside className="w-64 bg-neutral-950 border-r border-white/5 flex flex-col h-screen sticky top-0">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
        {/* Main Menu */}
        <div>
          <div className="px-4 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Menu
          </div>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              // ...
              const Icon = item.icon;
              // Simple active check: strictly equal or starts with (for nested routes)
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-violet-500/10 text-violet-400 font-medium"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-500 rounded-r-full shadow-[0_0_12px_rgba(139,92,246,0.5)]"></div>
                    )}

                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? "text-violet-400" : "group-hover:text-white"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <div className="px-4 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Support
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard/help"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help Center</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Storage Info Widget */}
      <div className="p-4 m-4 bg-linear-to-b from-neutral-900 to-neutral-900/50 rounded-2xl border border-white/5 relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-neutral-800 rounded-lg text-white">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Storage</div>
              <div className="text-xs text-neutral-400">Standard Plan</div>
            </div>
          </div>

          <div className="flex justify-between text-xs mb-2">
            <span className="text-neutral-300">24.5 GB used</span>
            <span className="text-neutral-500">100 GB</span>
          </div>

          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-linear-to-r from-violet-600 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(124,58,237,0.3)]"
              style={{ width: "24.5%" }}
            />
          </div>

          <button className="mt-4 w-full text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors text-center border border-violet-500/20 rounded-lg py-2 hover:bg-violet-500/10">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}
