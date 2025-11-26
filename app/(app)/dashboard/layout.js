import { DashboardSidebar } from "@/app/components/DashboardSidebar";
import { PublicHeader } from "@/app/components/PublicHeader";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PublicHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<Spinner className="size-16" />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
