"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/contexts/CartContext";
import { ShoppingCart, Trash2, X, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import Image from "next/image";

export default function CartDropdown() {
  const { cart, removeFromCart, isLoading, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const subtotal = cart.data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const items = cart.data;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-colors group">
          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-violet-600 text-white border-none shadow-lg shadow-violet-500/50 animate-in zoom-in">
              {itemCount}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 sm:w-96 p-0 bg-neutral-900/95 backdrop-blur-xl border-white/10 text-neutral-100 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/2">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-violet-400" />
            Your Cart ({itemCount})
          </h4>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <Loader2 className="animate-spin text-violet-500" />
          </div>
        ) : items.length > 0 ? (
          <>
            <ScrollArea className="h-[320px] p-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-3 animate-in fade-in slide-in-from-right-4 duration-300"
                  >
                    {/* Tiny Image */}
                    <div className="w-16 h-16 rounded-lg bg-neutral-800 shrink-0 flex items-center justify-center relative overflow-hidden">
                      {item.product?.image_path ? (
                        // If we had image path we would use it, for now using conditional placeholder
                        <div className="text-xs text-neutral-500">
                          <Image
                            src={item.product.image_path}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-violet-500/20 to-blue-500/20" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h5 className="font-medium text-sm text-white truncate">
                          {item.product?.name || "Unknown Product"}
                        </h5>
                        <p className="text-xs text-neutral-400 truncate">
                          {item.license_type} License
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm font-bold text-violet-300">
                          ${item.price}{" "}
                          <span className="text-xs font-normal text-neutral-500">
                            {" "}
                            x {item.quantity}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-600 hover:text-red-400 transition-colors p-1 mr-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer / Summary */}
            <div className="p-4 bg-neutral-900 border-t border-white/5 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-white font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-neutral-700 hover:text-white hover:bg-white/5 h-10 text-xs"
                  >
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 h-10 text-xs font-semibold">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="w-5 h-5 text-neutral-500" />
            </div>
            <p className="text-neutral-300 font-medium mb-1">
              Your cart is empty
            </p>
            <p className="text-neutral-500 text-xs mb-4">
              Add some sounds to get started.
            </p>
            <Link href="/sounds" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                size="sm"
                className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 cursor-pointer"
              >
                Browse Sounds
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
