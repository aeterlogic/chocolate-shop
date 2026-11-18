"use client";

import React from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CHOCOLATES } from "@/data/chocolates";

export default function CartPage() {
  const {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotalAED,
    deliveryFeeAED,
    finalTotalAED,
  } = useCart();

  const amountForFreeDelivery = Math.max(0, 150 - subtotalAED);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gold-500/30 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-gold-700 font-bold">
            Your Luxury Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-choc-900 mt-1">
            Shopping Cart
          </h1>
        </div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-semibold text-choc-800 hover:text-gold-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Browsing Menu
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="my-12 bg-cream-50 rounded-3xl border-2 border-gold-500/30 p-10 sm:p-14 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-choc-900 text-gold-400 flex items-center justify-center mx-auto mb-5 shadow-md">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-choc-900">
            Your Velvet Gift Bag is Empty
          </h2>
          <p className="text-sm text-choc-700 max-w-md mx-auto mt-2">
            Explore our 8 signature Dubai creations or quick-add one of our
            bestsellers below to begin your order.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="px-7 py-3.5 rounded-full bg-choc-900 text-gold-400 border border-gold-500 font-bold text-sm uppercase tracking-wider hover:bg-choc-800 transition"
            >
              Explore Full Menu
            </Link>
            <button
              onClick={() => addToCart(CHOCOLATES[0], 1)}
              className="px-6 py-3.5 rounded-full bg-gold-500 text-choc-950 font-bold text-sm hover:bg-gold-400 transition"
            >
              + Quick Add Dubai Kunafa Bar (AED 68)
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          {/* Cart Items Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Delivery Progress Banner */}
            <div className="bg-choc-900 text-cream-100 rounded-2xl p-4 border border-gold-500/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gold-400 shrink-0" />
                {amountForFreeDelivery === 0 ? (
                  <p className="text-xs sm:text-sm font-medium">
                    <span className="text-gold-400 font-bold">Unlocked!</span> You
                    qualify for{" "}
                    <span className="underline">
                      Complimentary Chilled UAE Delivery
                    </span>
                    .
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm">
                    Add{" "}
                    <span className="text-gold-400 font-bold">
                      AED {amountForFreeDelivery}
                    </span>{" "}
                    more for complimentary chilled UAE courier delivery.
                  </p>
                )}
              </div>
              <button
                onClick={clearCart}
                className="text-xs text-cream-300 hover:text-red-300 underline shrink-0"
              >
                Clear Bag
              </button>
            </div>

            {/* Item Cards */}
            {items.map(({ chocolate, quantity }) => (
              <div
                key={chocolate.id}
                className="bg-cream-50 rounded-2xl p-4 sm:p-5 border border-gold-500/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={chocolate.image}
                    alt={chocolate.name}
                    className="w-20 h-20 rounded-xl object-cover border border-gold-500/40 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gold-700 font-bold">
                      {chocolate.category} • {chocolate.weight}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-choc-900">
                      {chocolate.name}
                    </h3>
                    <p className="text-xs text-choc-600 mt-0.5">
                      Unit Price: <strong className="text-choc-900">AED {chocolate.priceAED}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-cream-200">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 bg-choc-900 text-cream-100 px-2.5 py-1.5 rounded-full border border-gold-500">
                    <button
                      onClick={() => updateQuantity(chocolate.id, quantity - 1)}
                      className="w-6 h-6 rounded-full bg-choc-800 hover:bg-gold-500 hover:text-choc-950 flex items-center justify-center transition"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-sm font-bold text-gold-400">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(chocolate.id, quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gold-500 text-choc-950 hover:bg-gold-400 flex items-center justify-center transition"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[90px]">
                    <span className="block text-[10px] uppercase text-choc-600">
                      Line Total
                    </span>
                    <span className="font-serif text-lg font-bold text-choc-900">
                      AED {chocolate.priceAED * quantity}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(chocolate.id)}
                    className="p-2 text-choc-600 hover:text-red-700 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-choc-900 text-cream-100 rounded-3xl p-6 sm:p-7 border-2 border-gold-500 shadow-2xl sticky top-28">
              <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-bold mb-2">
                <Sparkles className="w-4 h-4" />
                Order Summary
              </div>
              <h2 className="font-serif text-2xl font-bold border-b border-gold-500/30 pb-4">
                Bag Total ({totalItems} {totalItems === 1 ? "Item" : "Items"})
              </h2>

              <div className="space-y-3 py-5 text-sm border-b border-gold-500/30">
                <div className="flex justify-between text-cream-200">
                  <span>Subtotal</span>
                  <span className="font-semibold">AED {subtotalAED}</span>
                </div>
                <div className="flex justify-between text-cream-200">
                  <span>Chilled UAE Delivery (16°C)</span>
                  <span className="font-semibold text-gold-400">
                    {deliveryFeeAED === 0 ? "FREE" : `AED ${deliveryFeeAED}`}
                  </span>
                </div>
                <div className="flex justify-between text-cream-300 text-xs">
                  <span>24K Gold Ribbon & Ice-Gel Chest</span>
                  <span>Complimentary</span>
                </div>
              </div>

              <div className="py-5 flex items-baseline justify-between">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-cream-300">
                    Total Amount
                  </span>
                  <span className="text-[11px] text-cream-400">
                    Includes 5% UAE VAT
                  </span>
                </div>
                <span className="font-serif text-3xl font-bold text-gold-400">
                  AED {finalTotalAED}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-choc-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
