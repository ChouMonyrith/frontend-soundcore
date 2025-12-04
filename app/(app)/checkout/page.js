"use client";

import { useState } from "react";
import { ShieldCheck, Lock, ChevronLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import PaymentMethods from "@/app/components/PaymentMethods";
import BillingForm from "@/app/components/BillingForm";
import OrderRecap from "@/app/components/OrderRecap";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-20 pt-10">
      {/* Checkout Header */}
      <div className="border-b border-white/5 bg-neutral-900/30 backdrop-blur-sm fixed top-0 w-full z-40 h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-neutral-500 hover:text-white transition-colors"
              onClick={() => history.back()}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="font-bold text-lg text-white">Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-medium bg-emerald-500/10 px-3 py-1.5 rounded-full">
            <Lock className="w-3 h-3" /> Secure SSL Connection
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Input Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Payment Method */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Payment Method
              </h2>
              <PaymentMethods
                selected={paymentMethod}
                onSelect={setPaymentMethod}
              />
            </section>

            {/* 2. Billing Details & Card Input */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Billing Details
              </h2>
              <BillingForm method={paymentMethod} />
            </section>
          </div>

          {/* Right Column: Order Recap */}
          <div className="space-y-6">
            <OrderRecap />
          </div>
        </div>
      </div>
    </div>
  );
}
