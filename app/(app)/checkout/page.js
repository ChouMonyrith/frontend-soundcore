"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { useCart } from "@/app/contexts/CartContext";
import orderService from "@/app/services/orderService";
import { ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function CheckoutPage() {
  const { cart, isLoading: cartLoading, refreshCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("khqr");
  const [qrData, setQrData] = useState(null);
  const [polling, setPolling] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  const total = cart.data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    let interval;
    if (polling && qrData?.md5 && !isExpired) {
      interval = setInterval(async () => {
        try {
          const status = await orderService.checkStatus(qrData.md5);
          if (status.payment_status === "paid") {
            setPolling(false);
            await refreshCart(); // Clear cart
            router.push(`/orders/${status.order_id}`);
          }
        } catch (error) {
          console.error("Polling error", error);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [polling, qrData, router, refreshCart, isExpired]);

  // Countdown Timer Effect
  useEffect(() => {
    let timer;
    if (polling && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && polling) {
      setPolling(false);
      setIsExpired(true);
    }
    return () => clearInterval(timer);
  }, [polling, timeLeft]);

  const handleCheckout = async () => {
    setLoading(true);
    setIsExpired(false);
    setTimeLeft(3 * 60);
    try {
      if (paymentMethod === "khqr") {
        const data = await orderService.createOrder("khqr");
        if (data.qr_payload && data.md5) {
          setQrData(data);
          setPolling(true);
        }
      } else {
        alert("Only KHQR is fully implemented for this demo.");
      }
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (cart.data.length === 0 && !qrData) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-neutral-400">
        <p className="mb-4">Your cart is empty.</p>
        <Button variant="outline" onClick={() => router.push("/sounds")}>
          Browse Sounds
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20 pt-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Order Summary */}
          <Card className="bg-neutral-900/50 backdrop-blur-md border border-white/5 h-fit">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-xl text-white">
                Order Summary
              </CardTitle>
              <CardDescription>
                Review your items before payment.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-4">
                {cart.data.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-lg bg-neutral-800 border border-white/5 flex items-center justify-center text-xs text-neutral-500">
                        <Image
                          src={item.product.image_path}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          unoptimized
                          className="rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {item.product.name}
                        </div>
                        <div className="text-neutral-500 text-xs">
                          Standard License
                        </div>
                      </div>
                    </div>
                    <div className="text-neutral-300 font-mono">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/10 my-4" />

              <div className="flex justify-between items-center pt-2">
                <span className="text-neutral-400">Total</span>
                <span className="text-2xl font-bold text-white">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2 text-emerald-400 text-xs mt-4">
                <ShieldCheck className="w-4 h-4" />
                Secure encrypted transaction
              </div>
            </CardContent>
          </Card>

          {/* Right: Payment */}
          <Card className="bg-neutral-900/50 backdrop-blur-md border border-white/5">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-xl text-white">
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {!qrData ? (
                <>
                  <div className="space-y-4 mb-8">
                    <label
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "khqr"
                          ? "bg-violet-600/10 border-violet-500 ring-1 ring-violet-500"
                          : "bg-neutral-800/30 border-white/10 hover:bg-neutral-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="khqr"
                          checked={paymentMethod === "khqr"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-violet-600 focus:ring-violet-500 bg-neutral-900 border-white/20"
                        />
                        <div className="flex items-center gap-2">
                          <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            KHQR
                          </span>
                          <span className="font-medium text-white">
                            Bakong KHQR
                          </span>
                        </div>
                      </div>
                      <Check
                        className={`w-5 h-5 ${
                          paymentMethod === "khqr"
                            ? "text-violet-500"
                            : "text-transparent"
                        }`}
                      />
                    </label>

                    {/* Placeholder for Card Payment */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-neutral-800/30 opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border border-neutral-600"></div>
                        <span className="text-neutral-400">
                          Credit Card (Coming Soon)
                        </span>
                      </div>
                    </label>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full h-12 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg shadow-lg shadow-violet-500/20"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <>
                        Pay Now <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center py-4 animate-in fade-in zoom-in duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {isExpired ? "QR Code Expired" : "Scan to Pay"}
                    </h3>
                    {!isExpired && (
                      <p className="text-neutral-400 text-sm">
                        Expires in {Math.floor(timeLeft / 60)}:
                        {(timeLeft % 60).toString().padStart(2, "0")}
                      </p>
                    )}
                  </div>

                  <div
                    className={`bg-white p-4 rounded-2xl shadow-xl shadow-black/50 mb-6 ${
                      isExpired ? "opacity-50 blur-sm" : ""
                    }`}
                  >
                    <QRCode value={qrData.qr_payload} size={220} />
                  </div>

                  {isExpired ? (
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-red-400 text-sm">
                        This payment session has timed out.
                      </p>
                      <Button
                        onClick={() => {
                          setQrData(null);
                          setIsExpired(false);
                        }}
                        variant="destructive"
                      >
                        Try Again
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-violet-400 text-sm bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/20">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Waiting for payment confirmation...
                    </div>
                  )}

                  {/* Debug Info (Optional - Can hide in production) */}
                  <div className="mt-8 pt-4 border-t border-white/5 w-full text-center">
                    <p className="text-[10px] text-neutral-600 font-mono break-all">
                      Ref: {qrData.md5}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
