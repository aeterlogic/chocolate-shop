"use client";

import React from "react";
import { Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import { Chocolate } from "@/data/chocolates";
import { useCart } from "@/context/CartContext";

export default function ChocolateCard({ chocolate }: { chocolate: Chocolate }) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(chocolate.id);

  return (
    <div className="group bg-cream-50 rounded-3xl overflow-hidden border-2 border-gold-500/30 hover:border-gold-500 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div
          className={`relative h-60 w-full bg-gradient-to-br ${chocolate.accentGradient} overflow-hidden`}
        >
          <img
            src={chocolate.image}
            alt={chocolate.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-choc-950/80 via-choc-950/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-choc-900/90 text-cream-100 border border-gold-500/40 backdrop-blur-sm">
              {chocolate.category}
            </span>
            {chocolate.badge && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-gold-400 to-gold-500 text-choc-950 shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {chocolate.badge}
              </span>
            )}
          </div>

          {/* Bottom Overlay Weight & Cocoa */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-cream-100">
            <span className="font-medium bg-choc-900/80 px-2.5 py-1 rounded-md border border-gold-500/30">
              {chocolate.cocoaPercentage}
            </span>
            <span className="text-gold-300 font-semibold bg-choc-900/80 px-2.5 py-1 rounded-md">
              {chocolate.weight}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-choc-900 group-hover:text-choc-700 transition">
                {chocolate.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-700 mt-0.5">
                {chocolate.subtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-choc-700/90 mt-3 leading-relaxed line-clamp-3">
            {chocolate.description}
          </p>

          {/* Tasting Notes */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {chocolate.tastingNotes.map((note) => (
              <span
                key={note}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-cream-200 text-choc-800 border border-gold-500/30 font-medium"
              >
                • {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-cream-300 flex items-center justify-between gap-4 bg-cream-100/60">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-choc-600 font-semibold">
            Price
          </span>
          <span className="font-serif text-2xl font-bold text-choc-900">
            AED {chocolate.priceAED}
          </span>
        </div>

        {quantityInCart === 0 ? (
          <button
            onClick={() => addToCart(chocolate, 1)}
            className="px-5 py-2.5 rounded-full bg-choc-900 hover:bg-choc-800 text-gold-400 border border-gold-500 font-semibold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-choc-900 text-cream-100 px-2 py-1.5 rounded-full border border-gold-500 shadow-md">
            <button
              onClick={() => updateQuantity(chocolate.id, quantityInCart - 1)}
              className="w-7 h-7 rounded-full bg-choc-800 hover:bg-gold-500 hover:text-choc-950 flex items-center justify-center transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-bold text-sm text-gold-400 min-w-[24px] text-center">
              {quantityInCart}
            </span>
            <button
              onClick={() => updateQuantity(chocolate.id, quantityInCart + 1)}
              className="w-7 h-7 rounded-full bg-gold-500 text-choc-950 hover:bg-gold-400 flex items-center justify-center transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
