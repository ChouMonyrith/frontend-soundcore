"use client";

import { useState } from "react";
import {
  Check,
  X,
  Zap,
  Crown,
  Music2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { PublicHeader } from "@/app/components/layout/PublicHeader";

const plans = [
  {
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for hobbyists exploring sounds.",
    features: [
      "Pay-per-download",
      "Standard License",
      "Access to free sounds",
      "MP3 format only",
    ],
    limitations: ["No monthly credits", "No stem access", "Standard support"],
    icon: Music2,
    color: "text-neutral-400",
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Pro Producer",
    price: { monthly: 19, yearly: 190 },
    description: "For serious producers who need regular fresh sounds.",
    features: [
      "300 Credits / month",
      "High-quality WAV downloads",
      "Commercial License",
      "10% store discount",
      "Priority support",
    ],
    limitations: ["No stem access"],
    icon: Zap,
    color: "text-violet-400",
    popular: true,
    buttonText: "Start Pro Trial",
    buttonVariant: "default",
  },
  {
    name: "Studio",
    price: { monthly: 49, yearly: 490 },
    description: "Ultimate access for professional studios and teams.",
    features: [
      "1000 Credits / month",
      "WAV + Stems included",
      "Extended Commercial License",
      "25% store discount",
      "24/7 Priority support",
      "Early access to new packs",
    ],
    limitations: [],
    icon: Crown,
    color: "text-amber-400",
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

const faqs = [
  {
    q: "How do credits work?",
    a: "Credits are used to download sounds. 1 Credit = 1 Sample/Loop. Full packs usually cost between 50-100 credits. Credits roll over for up to 3 months.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time. You will keep your credits until the end of your billing cycle.",
  },
  {
    q: "What is the difference between licenses?",
    a: "Standard License covers usage in music releases (Spotify, Apple Music). Commercial License covers sync licensing for TV, Film, and Games.",
  },
  {
    q: "Do you offer student discounts?",
    a: "Yes! Students with a valid .edu email can apply for a 50% discount on the Pro Producer plan.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col relative overflow-hidden">
      {/* 1. Add Header (Fixed at top due to flex-col) */}
      <div className="z-50 shrink-0">
        <PublicHeader />
      </div>

      {/* Background Ambience (Fixed behind scrolling content) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 pt-10 relative z-10 scroll-smooth">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Text */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20 px-3 py-1">
              Unlock Your Potential
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-neutral-400 text-lg mb-8">
              Choose the plan that fits your production needs. No hidden fees,
              cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-sm ${
                  !isYearly ? "text-white font-medium" : "text-neutral-500"
                }`}
              >
                Monthly
              </span>
              <div
                className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-neutral-800"
                onClick={() => setIsYearly(!isYearly)}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-violet-600 shadow ring-0 transition duration-200 ease-in-out ${
                    isYearly ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
              <span
                className={`text-sm ${
                  isYearly ? "text-white font-medium" : "text-neutral-500"
                }`}
              >
                Yearly{" "}
                <span className="text-emerald-400 text-xs ml-1">
                  (Save 20%)
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-neutral-900/80 border-violet-500/50 shadow-2xl shadow-violet-900/20 scale-105 z-10"
                    : "bg-neutral-900/40 border-white/5 hover:border-white/10 hover:bg-neutral-900/60"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-violet-600 text-white hover:bg-violet-500 border-none px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-4 ${plan.color}`}
                  >
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-400 text-sm h-10">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-neutral-500">
                      /{isYearly ? "year" : "mo"}
                    </span>
                  </div>
                  {isYearly && plan.price.monthly > 0 && (
                    <p className="text-xs text-emerald-400 mt-1">
                      Equivalent to ${(plan.price.yearly / 12).toFixed(2)}/mo
                    </p>
                  )}
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-neutral-300">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div
                      key={limitation}
                      className="flex items-start gap-3 text-sm opacity-50"
                    >
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                        <X className="w-3 h-3 text-neutral-400" />
                      </div>
                      <span className="text-neutral-400">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={
                    plan.buttonVariant === "outline" ? "outline" : "default"
                  }
                  className={`w-full h-12 font-semibold ${
                    plan.buttonVariant === "default"
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                      : "border-white/10 text-white hover:bg-white/5 bg-transparent"
                  }`}
                >
                  {plan.buttonText}{" "}
                  {plan.popular && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-neutral-900/30 border border-white/5 rounded-2xl p-6 hover:bg-neutral-900/50 transition-colors"
                >
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-400" />
                    {faq.q}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-20 p-8 rounded-3xl bg-linear-to-r from-violet-900/20 to-blue-900/20 border border-white/5 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Need a custom license?
            </h2>
            <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
              We offer tailored solutions for game studios, production houses,
              and educational institutions.
            </p>
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5"
            >
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
