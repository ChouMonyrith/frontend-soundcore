"use client";

import { useState, useEffect } from "react";
import orderService from "@/app/services/orderService";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Download,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PublicHeader } from "@/app/components/layout/PublicHeader";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getOrder(id);
        setOrder(response.order);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  const handleDownload = async (productId) => {
    try {
      const response = await orderService.downloadProduct(productId);
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = response.filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download product", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Order not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 lg:p-10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Nav */}
        <div className="mb-8">
          <Link
            href="/orders"
            className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 mb-8 relative overflow-hidden">
          {/* Status Gradient Strip */}
          <div
            className={`absolute top-0 left-0 w-full h-1 ${
              order.status === "paid"
                ? "bg-linear-to-r from-emerald-500 to-teal-500"
                : "bg-neutral-700"
            }`}
          ></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Order Details
              </h1>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <span className="font-mono text-neutral-300">
                  #{order.transaction_id || order.id}
                </span>
                <span>•</span>
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5">
              {order.status === "paid" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              )}
              <span className="text-sm font-medium capitalize">
                {order.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                Payment Method
              </div>
              <div className="text-white font-medium capitalize">
                {order.payment_method.toUpperCase() || "Unknown"}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                Email
              </div>
              <div className="text-white font-medium">
                {order.billing_email || "-"}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                Total
              </div>
              <div className="text-white font-bold text-lg">
                ${Number(order.total).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white px-2">
            Purchased Items
          </h2>

          {order.items.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900/30 border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center border border-white/5">
                  <span className="text-xs font-bold text-neutral-500">
                    WAV
                  </span>
                </div>
                <div>
                  <div className="font-medium text-white text-lg mb-1">
                    {item.product.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <Badge
                      variant="outline"
                      className="border-white/10 text-neutral-400 font-normal bg-transparent"
                    >
                      {item.license_type}
                    </Badge>
                    <span>${Number(item.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {order.status === "paid" && (
                <Button
                  onClick={() => handleDownload(item.product.id)}
                  className="bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/10"
                >
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 flex justify-end">
          <div className="w-full sm:w-64 bg-neutral-900/50 rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between py-2 text-sm text-neutral-400">
              <span>Subtotal</span>
              <span>${Number(order.subtotal || order.total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-neutral-400 border-b border-white/5 mb-2">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-2 text-lg font-bold text-white">
              <span>Total</span>
              <span>${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
