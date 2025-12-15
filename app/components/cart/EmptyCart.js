import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="text-center relative z-10 max-w-md">
        <div className="w-20 h-20 bg-neutral-900/50 border border-white/10 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-md">
          <ShoppingBag className="w-8 h-8 text-neutral-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">
          Your cart is empty
        </h1>
        <p className="text-neutral-400 mb-8">
          Looks like you haven&apos;t added any sounds yet.
        </p>
        <Link href="/">
          <Button className="bg-white text-black hover:bg-neutral-200 px-8 h-11 rounded-full font-semibold">
            Start Browsing
          </Button>
        </Link>
      </div>
    </div>
  );
}
