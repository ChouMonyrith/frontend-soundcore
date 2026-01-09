"use client";

import { RecentSale } from "@/app/components/dashboard/RecentSale";
import { StatsOverview } from "@/app/components/dashboard/StatsOverview";
import { Button } from "@/app/components/ui/button";
import { Activity, Music, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  dashboardStats,
  dashboardRecentSales,
} from "@/app/services/dashboardService";
import { Spinner } from "@/app/components/ui/spinner";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState([]);
  const [recentSales, setRecentSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, salesData] = await Promise.all([
          dashboardStats(),
          dashboardRecentSales(),
        ]);
        setStats(statsData);
        setRecentSales(salesData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  console.log("stats", stats);
  console.log("recentSales", recentSales);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center bg-neutral-950">
        <Spinner className="size-16" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 lg:p-8">
      {/* Ambient Background Glow */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-blue-400">
                {user.name}
              </span>
            </h1>
            <p className="text-neutral-400 mt-2 text-lg">
              Here is what is happening with your sound library today.
            </p>
          </div>
        </div>

        <StatsOverview stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentSale sales={recentSales} />
          </div>
          {/* Added a side widget for completeness */}
          <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 h-fit">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-neutral-400 hover:text-white hover:bg-white/5"
              >
                <Music className="w-4 h-4 mr-2" /> Manage Sounds
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-neutral-400 hover:text-white hover:bg-white/5"
              >
                <Activity className="w-4 h-4 mr-2" /> Analytics
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-neutral-400 hover:text-white hover:bg-white/5"
              >
                <User className="w-4 h-4 mr-2" /> Customer List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
