"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Database,
  RefreshCw,
} from "lucide-react";
import { CHOCOLATES, Chocolate } from "@/data/chocolates";
import { fetchChocolatesFromSupabase } from "@/lib/supabase";
import ChocolateCard from "@/components/ChocolateCard";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  "All",
  "Signature Bars",
  "Truffles & Pralines",
  "Gift Boxes",
] as const;

export default function MenuPage() {
  const [chocolates, setChocolates] = useState<Chocolate[]>(CHOCOLATES);
  const [loading, setLoading] = useState(true);
  const [fromSupabase, setFromSupabase] = useState(false);
  const [supabaseNotice, setSupabaseNotice] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, subtotalAED } = useCart();

  const loadMenu = async () => {
    setLoading(true);
    const result = await fetchChocolatesFromSupabase();
    setChocolates(result.chocolates);
    setFromSupabase(result.fromSupabase);
    setSupabaseNotice(result.error);
    setLoading(false);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const filteredChocolates = chocolates.filter((choc) => {
    const matchesCategory =
      selectedCategory === "All" || choc.category === selectedCategory;
    const matchesSearch =
      choc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      choc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      choc.tastingNotes.some((n) =>
        n.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-choc-950 via-choc-900 to-choc-800 text-cream-100 py-14 border-b-2 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-choc-800 border border-gold-500/40 text-gold-400 text-xs uppercase tracking-[0.2em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {chocolates.length} Handcrafted Signature Creations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-3 text-cream-50">
            The Royal Chocolate Menu
          </h1>
          <p className="text-sm sm:text-base text-cream-200/85 max-w-2xl mx-auto mt-3">
            Every creation is handcrafted in our Dubai atelier using single-origin
            cocoa, roasted pistachio, organic Liwa dates, and 24K edible gold.
            All prices are in UAE Dirhams (AED).
          </p>

          {/* Supabase Connection Badge */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${
                fromSupabase
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50"
                  : "bg-choc-800/90 text-gold-300 border-gold-500/40"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              {loading
                ? "Connecting to Supabase..."
                : fromSupabase
                ? "Connected: Menu Loaded Live from Supabase (chocolates table)"
                : `Fallback Mode: ${supabaseNotice || "Configure .env.local"}`}
            </span>
            <button
              onClick={loadMenu}
              className="p-1.5 rounded-full bg-choc-800 hover:bg-choc-700 text-gold-400 border border-gold-500/40 transition"
              title="Refresh from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-cream-50 rounded-2xl p-4 sm:p-5 border-2 border-gold-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-choc-900 text-gold-400 border border-gold-500 shadow-md"
                      : "bg-cream-200 text-choc-800 hover:bg-cream-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-choc-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pistachio, saffron, gold..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-cream-100 border border-gold-500/40 text-sm text-choc-900 placeholder:text-choc-600/60 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs uppercase tracking-widest text-choc-700 font-semibold">
            Showing {filteredChocolates.length} of {chocolates.length} Artisan Chocolates
          </p>
          {totalItems > 0 && (
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-gold-500 text-choc-950 px-4 py-2 rounded-full shadow hover:bg-gold-400 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              Bag ({totalItems} items • AED {subtotalAED})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {filteredChocolates.length === 0 ? (
          <div className="bg-cream-50 border border-gold-500/30 rounded-3xl p-12 text-center">
            <p className="font-serif text-xl text-choc-800 font-bold">
              No chocolates match your filter
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 rounded-full bg-choc-900 text-gold-400 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {filteredChocolates.map((chocolate) => (
              <ChocolateCard key={chocolate.id} chocolate={chocolate} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
