import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, Music2 } from "lucide-react";

export function CartItem({ item, updateCartItem, removeFromCart }) {
  return (
    <div className="group bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6 transition-all hover:bg-neutral-900/80 hover:border-white/10">
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
  );
}
