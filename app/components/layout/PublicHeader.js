"use client";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  LogOut,
  LayoutDashboard,
  Bell,
  Download,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Logo from "./Logo";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { useAuth } from "@/app/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import CartDropdown from "@/app/components/cart/CartDropdown";

export function PublicHeader({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const hasRole = (roleName) => {
    return user?.roles?.some((role) => role.name == roleName) || false;
  };

  const isAdminOrProducer = hasRole("producer") || hasRole("admin");

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  console.log(user);

  return (
    <header className="bg-neutral-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <Logo width={100} height={100} />
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 group-hover:text-violet-400 transition-colors w-4 h-4" />
              <Input
                placeholder="Search for sounds, loops, presets..."
                className="pl-10 w-full bg-neutral-900/50 border-white/10 text-neutral-200 placeholder:text-neutral-500 focus:bg-neutral-900 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-full transition-all"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/sounds"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4 ml-6">
            {/* <button className="relative p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-violet-600 text-white border-none shadow-lg shadow-violet-500/50">
                  {cartCount}
                </Badge>
              )}
            </button> */}

            <div className="flex items-center gap-4 ml-6">
              <CartDropdown />
            </div>

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-3 p-1 pr-3 rounded-full border transition-all duration-200 ${
                    isUserMenuOpen
                      ? "bg-neutral-800 border-violet-500/30"
                      : "bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-inner">
                    {user.name ? (
                      user.name
                        .trim()
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((word) => word.charAt(0).toUpperCase())
                        .join("")
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-neutral-300 hidden sm:block max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 border border-white/10 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden ring-1 ring-white/5">
                    <div className="px-5 py-3 border-b border-white/5 bg-white/2">
                      <p className="text-sm font-medium text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-neutral-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    {isAdminOrProducer ? (
                      <div className="p-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 text-violet-400" />
                          Dashboard
                        </Link>

                        <Link
                          href="/my-downloads"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Download className="w-4 h-4 text-emerald-400" />
                          My Downloads
                        </Link>
                        <Link
                          href="/cart"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingCart className="w-4 h-4 text-orange-400" />
                          My Cart
                        </Link>

                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 text-neutral-500" />
                          Profile
                        </Link>
                      </div>
                    ) : (
                      <div className="p-1">
                        <Link
                          href="/my-downloads"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Download className="w-4 h-4 text-emerald-400" />
                          My Downloads
                        </Link>
                        <Link
                          href="/cart"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingCart className="w-4 h-4 text-orange-400" />
                          My Cart
                        </Link>
                      </div>
                    )}
                    <div className="p-1 border-t border-white/5 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      className="text-neutral-300 hover:text-white hover:bg-white/5"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-white text-black hover:bg-neutral-200 rounded-full px-6 font-medium">
                      Sign Up
                    </Button>
                  </Link>
                </div>

                <Link href="/sign-in" className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              </>
            )}

            <button className="md:hidden p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
