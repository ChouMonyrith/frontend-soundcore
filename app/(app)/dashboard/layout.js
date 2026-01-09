"use client";
import { DashboardSidebar } from "@/app/components/layout/DashboardSidebar";
import { PublicHeader } from "@/app/components/layout/PublicHeader";
import { Button } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center bg-neutral-950">
        <Spinner className="size-16" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-xl">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Access Restricted
          </h2>
          <p className="text-neutral-400 mb-6">
            You need to be logged in to view your dashboard and manage your
            assets.
          </p>
          <Link href="/sign-in">
            <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PublicHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Suspense fallback={<Spinner className="size-16" />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
