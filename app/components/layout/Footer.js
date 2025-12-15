"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  Music2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";

const footerLinks = {
  marketplace: [
    { label: "Browse Sounds", href: "/browse" },
    { label: "Top Charts", href: "/charts" },
    { label: "New Arrivals", href: "/new" },
    { label: "Free Sounds", href: "/free" },
    {
      label: "Become a Producer",
      href: "/producer/request",
    },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Press Kit", href: "/press" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Licensing", href: "/licensing" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-950 pt-20 pb-10 overflow-hidden border-t border-white/5 font-sans text-neutral-400">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Bio (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo
              width={120}
              height={120}
              className=" text-white flex items-center justify-start"
            />

            <p className="text-sm leading-relaxed max-w-xs">
              The premier marketplace for high-quality audio samples, loops, and
              presets. Empowering producers to create their best work.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 2: Marketplace Links (Spans 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.marketplace.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-violet-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links (Spans 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-violet-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter (Spans 4) */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 lg:p-8">
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-violet-400" />
                Stay in the loop
              </h4>
              <p className="text-sm mb-6">
                Join our newsletter to get weekly free sounds, discounts, and
                production tips.
              </p>

              <div className="space-y-3">
                <Input
                  placeholder="Enter your email"
                  className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 h-11 focus-visible:ring-violet-500"
                />
                <Button className="w-full h-11 bg-white text-black hover:bg-neutral-200 font-semibold">
                  Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-xs text-neutral-600 mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/5 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {currentYear} SoundCore Inc. All rights reserved.</p>

          <div className="flex items-center gap-8">
            {footerLinks.support.slice(2, 5).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Made with Love (Optional Cute Touch) */}
        <div className="text-center mt-12">
          <p className="text-xs text-neutral-600 flex items-center justify-center gap-1">
            Made for producers by
            <span className="text-neutral-500 font-medium">Chou Monyrith</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
