"use client";

import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { Loader2, ShieldCheck } from "lucide-react";
import { CartItem } from "@/app/components/cart/CartItem";
import { CartSummary } from "@/app/components/cart/CartSummary";
import { EmptyCart } from "@/app/components/cart/EmptyCart";
import { CartLoginPrompt } from "@/app/components/cart/CartLoginPrompt";

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem, isLoading, itemCount } =
    useCart();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <CartLoginPrompt />;
  }

  if (cart.data.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20 pt-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
          Your Cart
          <span className="text-neutral-500 text-lg font-normal">
            ({itemCount} items)
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.data.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
              />
            ))}

            <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500 justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Secure encrypted checkout process</span>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <CartSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
