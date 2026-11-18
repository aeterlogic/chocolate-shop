"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Award,
  Truck,
  Gift,
  ShoppingBag,
  Database,
} from "lucide-react";
import { CHOCOLATES, Chocolate } from "@/data/chocolates";
import { fetchChocolatesFromSupabase } from "@/lib/supabase";
import ChocolateCard from "@/components/ChocolateCard";

export default function HomePage() {
  const [chocolates, setChocolates] = useState<Chocolate[]>(CHOCOLATES);
  const [fromSupabase, setFromSupabase] = useState(false);

  useEffect(() => {
    fetchChocolatesFromSupabase().then((res) => {
      setChocolates(res.chocolates);
      setFromSupabase(res.fromSupabase);
    });
  }, []);

  const featuredChocolates = chocolates.slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-choc-950 via-choc-900 to-choc-800 text-cream-100 overflow-hidden border-b-4 border-gold-500">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-choc-800/90 border border-gold-500/50 text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Haute Chocolaterie • Downtown Dubai
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight text-cream-50">
                Where Velvet Cocoa Meets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
                  24K Arabian Gold
                </span>
              </h1>

              <p className="text-lg text-cream-200/90 max-w-2xl leading-relaxed">
                Indulge in Dubai’s most coveted handmade chocolates. From our
                signature crispy Kunafa Pistachio Bar to 24K Gold Medjool Date
                truffles and Persian Saffron pralines—crafted fresh daily.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/menu"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-choc-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-gold-500/20 hover:brightness-110 transition flex items-center gap-2"
                >
                  Explore Full Menu ({chocolates.length} Creations)
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  className="px-7 py-4 rounded-full bg-choc-800/80 hover:bg-choc-700 text-cream-100 border border-gold-500/50 font-semibold text-sm uppercase tracking-wider transition flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  View Shopping Bag
                </Link>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gold-500/20 max-w-xl">
                <div>
                  <span className="block font-serif text-2xl font-bold text-gold-400">
                    100%
                  </span>
                  <span className="text-xs text-cream-300">
                    Single-Origin Cocoa
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-2xl font-bold text-gold-400">
                    24 Karat
                  </span>
                  <span className="text-xs text-cream-300">
                    Edible Gold Leaf
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-2xl font-bold text-gold-400">
                    16°C Chilled
                  </span>
                  <span className="text-xs text-cream-300">
                    Same-Day UAE Courier
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-gold-400 via-gold-600 to-choc-800 shadow-2xl">
                <div className="rounded-2xl overflow-hidden bg-choc-950 relative">
                  <img
                    src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1000&q=85"
                    alt="Luxury Dubai Artisan Chocolates"
                    className="w-full h-[400px] object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-choc-950 via-choc-950/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 bg-choc-900/90 backdrop-blur-md border border-gold-500/40 rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-gold-400 font-bold">
                          Signature Creation
                        </span>
                        <h2 className="font-serif text-xl font-bold text-cream-50">
                          Royal Dubai Kunafa Pistachio
                        </h2>
                      </div>
                      <span className="font-serif text-2xl font-bold text-gold-400">
                        AED 68
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Bar */}
      <section className="bg-cream-200 border-b border-gold-500/30 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-cream-50 p-5 rounded-2xl border border-gold-500/30 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-choc-900 text-gold-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-choc-900">
                Master Chocolatiers
              </h3>
              <p className="text-xs text-choc-700 mt-0.5">
                Hand-tempered in small batches using Belgian & Madagascar Grand Cru cocoa.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-cream-50 p-5 rounded-2xl border border-gold-500/30 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-choc-900 text-gold-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-choc-900">
                Chilled UAE Delivery
              </h3>
              <p className="text-xs text-choc-700 mt-0.5">
                Complimentary delivery on orders over AED 150 across Dubai, Abu Dhabi & all Emirates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-cream-50 p-5 rounded-2xl border border-gold-500/30 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-choc-900 text-gold-400 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-choc-900">
                Royal Gold Packaging
              </h3>
              <p className="text-xs text-choc-700 mt-0.5">
                Includes gold-embossed gift box, satin ribbon, and personalized calligraphy card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-700 font-bold">
                Curated Tasting Flight
              </span>
              {fromSupabase && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-choc-900 text-gold-400 border border-gold-500/50">
                  <Database className="w-3 h-3" />
                  Live from Supabase
                </span>
              )}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choc-900 mt-1">
              Most Desired Signatures
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-choc-900 hover:text-gold-700 border-b-2 border-gold-500 pb-1 transition"
          >
            View All {chocolates.length} Chocolates in Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {featuredChocolates.map((choc) => (
            <ChocolateCard key={choc.id} chocolate={choc} />
          ))}
        </div>

        {/* Full Menu CTA Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-choc-900 via-choc-800 to-choc-900 border-2 border-gold-500 p-8 sm:p-12 text-cream-100 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
              8 Handcrafted Luxury Offerings • Prices in AED
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Discover Our Complete Artisan Chocolate Menu
            </h3>
            <p className="text-sm text-cream-200/80 max-w-xl">
              Explore all 8 creations—including Damascus Rose Truffles, Arabic Qahwa
              Almond Bark, and our 24-piece Grand Reserve Sovereign Gift Box.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/menu"
              className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-choc-950 font-bold text-sm uppercase tracking-wider transition shadow-lg"
            >
              Browse All 8 Chocolates
            </Link>
            <Link
              href="/checkout"
              className="px-7 py-3.5 rounded-full bg-choc-950 hover:bg-choc-700 text-gold-400 border border-gold-500 font-bold text-sm uppercase tracking-wider transition"
            >
              Direct Checkout
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
