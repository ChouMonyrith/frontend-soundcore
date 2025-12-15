import { DashboardSidebar } from "@/app/components/layout/DashboardSidebar";
import { PublicHeader } from "@/app/components/layout/PublicHeader";
import { Spinner } from "@/app/components/ui/spinner";
import { Suspense } from "react";

export default function DashboardLayout({ children }) {
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
