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
  dashboardSalesChart,
} from "@/app/services/dashboardService";
import { Spinner } from "@/app/components/ui/spinner";
import { SalesChart } from "@/app/components/dashboard/SalesChart";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [salesChartData, setSalesChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, salesData, chartData] = await Promise.all([
          dashboardStats(),
          dashboardRecentSales(),
          dashboardSalesChart(),
        ]);
        setStats(statsData);
        setRecentSales(salesData);
        setSalesChartData(chartData);
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
            <SalesChart data={salesChartData} />
          </div>
          <RecentSale sales={recentSales} />
        </div>
      </div>
    </div>
  );
}
