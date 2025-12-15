import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

export function CartSummary({ cart }) {
  const calculateTotal = () => {
    return cart.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 lg:p-8 sticky top-24">
      <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-neutral-400">
          <span>Subtotal</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-400">
          <span>Taxes</span>
          <span className="text-xs self-center bg-neutral-800 px-2 py-0.5 rounded text-neutral-500">
            Calculated at checkout
          </span>
        </div>
        <Separator className="bg-white/10 my-2" />
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">Total</span>
          <span className="text-2xl font-bold text-white">
            ${calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="w-full h-12 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg shadow-lg shadow-violet-500/20">
          Checkout <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>

      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-white transition-colors"
        >
          or Continue Shopping
        </Link>
      </div>
    </div>
  );
}
