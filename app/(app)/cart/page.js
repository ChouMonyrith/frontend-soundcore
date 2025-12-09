"use client";

import { useCart } from "@/app/contexts/CartContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Loader2,
  ShoppingBag,
  Music2,
  ShieldCheck,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PublicHeader } from "@/app/components/PublicHeader";

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem, isLoading, itemCount } =
    useCart();
  const { user } = useAuth();
  const router = useRouter();

  const calculateTotal = () => {
    return cart.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="text-center relative z-10 max-w-md">
          <div className="w-20 h-20 bg-neutral-900/50 border border-white/10 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-md">
            <ShoppingBag className="w-8 h-8 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Your cart awaits
          </h2>
          <p className="text-neutral-400 mb-8">
            Please log in to view your cart and checkout.
          </p>
          <Link href="/login">
            <Button className="bg-violet-600 hover:bg-violet-500 text-white px-8 h-11 rounded-full shadow-lg shadow-violet-500/20">
              Log In to Continue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.data.length === 0) {
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
              <div
                key={item.id}
                className="group bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6 transition-all hover:bg-neutral-900/80 hover:border-white/10"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-20 sm:h-20 relative bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-white/5">
                  {item.product.image_path ? (
                    <Image
                      src={item.product.image_path}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music2 className="w-8 h-8 text-neutral-600" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        <Link
                          href={`/sounds/${item.product.slug}`}
                          className="hover:text-violet-400 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-neutral-400">
                        <Badge
                          variant="outline"
                          className="border-white/10 text-neutral-400 font-normal bg-white/5"
                        >
                          {item.license_type || "Standard License"}
                        </Badge>
                      </div>
                    </div>
                    <div className="font-bold text-white text-lg mt-2 sm:mt-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 bg-neutral-950/50 rounded-lg p-1 border border-white/5">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateCartItem(item.id, {
                            quantity: item.quantity - 1,
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-mono w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartItem(item.id, {
                            quantity: item.quantity + 1,
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-neutral-500 hover:text-red-400 flex items-center gap-2 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500 justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Secure encrypted checkout process</span>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 lg:p-8 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h3>

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
          </div>
        </div>
      </div>
    </div>
  );
}
