"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Sparkles, CreditCard, UtensilsCrossed, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, subtotalAED, lastAddedToast } = useCart();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/cart", label: "Cart", icon: ShoppingBag },
    { href: "/checkout", label: "Checkout", icon: CreditCard },
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-choc-950 text-cream-200 border-b border-gold-500/30 text-xs py-2 px-4 text-center tracking-widest uppercase">
        <span className="inline-flex items-center gap-1.5 text-gold-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Complimentary Chilled UAE Delivery on Orders Over AED 150 • Handcrafted Daily in Dubai
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-choc-900/95 backdrop-blur-md border-b border-gold-500/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 p-[2px] shadow-md shadow-gold-500/20">
              <div className="w-full h-full rounded-full bg-choc-900 flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-gold-400 group-hover:scale-110 transition-transform">
                  C
                </span>
              </div>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl tracking-wider text-cream-100 font-bold">
                MAISON <span className="text-gold-400">CHOCOLAT</span>
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-gold-300/80">
                Artisanal Dubai Chocolatier
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-choc-950 font-semibold shadow-md shadow-gold-500/20"
                      : "text-cream-200 hover:text-gold-400 hover:bg-choc-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  {link.href === "/cart" && totalItems > 0 && (
                    <span
                      className={`ml-1 px-2 py-0.5 text-xs rounded-full font-bold ${
                        isActive
                          ? "bg-choc-900 text-gold-400"
                          : "bg-gold-500 text-choc-950"
                      }`}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Cart Pill */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="flex items-center gap-3 bg-choc-800 hover:bg-choc-700 border border-gold-500/50 rounded-full px-4 py-2 text-cream-100 transition-all shadow-inner"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold-500 text-choc-950 text-[11px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-[10px] uppercase tracking-wider text-cream-300">
                  Your Bag
                </span>
                <span className="block text-xs font-bold text-gold-400">
                  AED {subtotalAED.toFixed(0)}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden border-t border-gold-500/20 bg-choc-950/90 justify-around py-2 px-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isActive
                    ? "bg-gold-500 text-choc-950 font-bold"
                    : "text-cream-200 hover:text-gold-400"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
                {link.href === "/cart" && totalItems > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-choc-900 text-gold-400 text-[10px] font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Floating Toast Notification */}
      {lastAddedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-choc-900 text-cream-100 border-2 border-gold-500 rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
              Added to Selection
            </p>
            <p className="text-sm font-medium">{lastAddedToast}</p>
          </div>
          <Link
            href="/cart"
            className="ml-2 text-xs font-bold bg-gold-500 text-choc-950 px-3 py-1.5 rounded-full hover:bg-gold-400 transition"
          >
            View Cart
          </Link>
        </div>
      )}
    </>
  );
}
