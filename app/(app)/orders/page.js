"use client";

import { useState, useEffect } from "react";
import orderService from "@/app/services/orderService";
import Link from "next/link";
import { Loader2, Package, Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicHeader } from "@/app/components/PublicHeader";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders();
        setOrders(response.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 lg:p-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-neutral-400 mb-8">
          History of your purchases and downloads.
        </p>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-2xl border border-white/5">
            <Package className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-1">No orders yet</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Start exploring our library to find your sound.
            </p>
            <Link href="/sounds">
              <Button
                variant="outline"
                className="border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
              >
                Browse Sounds
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:bg-neutral-900/80 hover:border-white/10 transition-all duration-300 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-white">
                        #{order.transaction_id || order.id}
                      </span>
                      <Badge
                        className={`capitalize border-none ${
                          order.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : order.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div>•</div>
                      <div>{order.items?.length || 0} items</div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                    <div className="font-bold text-xl text-white">
                      ${Number(order.total).toFixed(2)}
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 group-hover:translate-x-1 transition-transform"
                      >
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
