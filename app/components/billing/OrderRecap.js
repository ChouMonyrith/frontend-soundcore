import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Lock } from "lucide-react";

export default function OrderRecap() {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 sticky top-24">
      <h3 className="text-lg font-bold text-white mb-6">Order Recap</h3>

      {/* Mini Item List */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-start">
          <div className="text-sm">
            <div className="text-white font-medium">Deep Bass Drop</div>
            <div className="text-neutral-500 text-xs">Standard License</div>
          </div>
          <div className="text-white text-sm font-medium">$9.99</div>
        </div>
        <div className="flex justify-between items-start">
          <div className="text-sm">
            <div className="text-white font-medium">Cinematic Riser</div>
            <div className="text-neutral-500 text-xs">Standard License</div>
          </div>
          <div className="text-white text-sm font-medium">$14.99</div>
        </div>
      </div>

      <Separator className="bg-white/10 my-4" />

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-neutral-400 text-sm">
          <span>Subtotal</span>
          <span>$24.98</span>
        </div>
        <div className="flex justify-between text-neutral-400 text-sm">
          <span>Tax (8%)</span>
          <span>$2.00</span>
        </div>
        <div className="flex justify-between text-white text-lg font-bold mt-2">
          <span>Total</span>
          <span>$26.98</span>
        </div>
      </div>

      <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-lg shadow-emerald-500/20">
        <Lock className="w-4 h-4 mr-2" /> Pay $26.98
      </Button>

      <p className="text-center text-xs text-neutral-500 mt-4">
        30-day money-back guarantee.
      </p>
    </div>
  );
}
