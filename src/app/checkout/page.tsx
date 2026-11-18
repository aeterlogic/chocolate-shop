"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  ArrowLeft,
  Gift,
  Database,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CHOCOLATES } from "@/data/chocolates";
import { supabase } from "@/lib/supabase";

const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

interface SavedOrder {
  id: string;
  order_ref: string;
  customer_name: string;
  emirate: string;
  total_aed: number;
  created_at: string;
}

export default function CheckoutPage() {
  const {
    items,
    subtotalAED,
    deliveryFeeAED,
    finalTotalAED,
    clearCart,
    addToCart,
  } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+971 ");
  const [email, setEmail] = useState("");
  const [emirate, setEmirate] = useState("Dubai");
  const [address, setAddress] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "cod">(
    "card"
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recentOrders, setRecentOrders] = useState<SavedOrder[]>([]);
  const [orderPlaced, setOrderPlaced] = useState<{
    orderRef: string;
    totalAED: number;
    customerName: string;
    emirate: string;
    savedSource: string;
    orderId?: string;
  } | null>(null);

  const loadRecentOrders = async () => {
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.data)) {
          setRecentOrders(json.data);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadRecentOrders();
  }, []);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const randomRef = `MC-DXB-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderItemsPayload = items.map(({ chocolate, quantity }) => ({
      id: chocolate.id,
      name: chocolate.name,
      price_aed: chocolate.priceAED,
      quantity,
      line_total_aed: chocolate.priceAED * quantity,
    }));

    const payload = {
      order_ref: randomRef,
      customer_name: fullName || "Valued Guest",
      phone,
      email,
      emirate,
      address,
      gift_note: giftNote || null,
      payment_method: paymentMethod,
      items: orderItemsPayload,
      subtotal_aed: subtotalAED,
      delivery_fee_aed: deliveryFeeAED,
      total_aed: finalTotalAED,
      status: "confirmed",
    };

    let savedSource = "Local Database (data/local-db.json • orders table)";
    let orderId: string | undefined;

    try {
      // 1. Save to Local Database (/api/orders)
      const localRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (localRes.ok) {
        const localJson = await localRes.json();
        orderId = localJson.order?.id;
      }

      // 2. Also save to Supabase if configured
      if (supabase) {
        const { data, error } = await supabase
          .from("orders")
          .insert([payload])
          .select("id")
          .single();

        if (!error && data) {
          savedSource = "Supabase & Local Database (orders table)";
          orderId = data.id;
        }
      }
    } catch (err: unknown) {
      setSubmitting(false);
      setSubmitError(
        err instanceof Error ? err.message : "Failed to save order"
      );
      return;
    }

    await loadRecentOrders();
    setSubmitting(false);
    setOrderPlaced({
      orderRef: randomRef,
      totalAED: finalTotalAED,
      customerName: fullName || "Valued Guest",
      emirate,
      savedSource,
      orderId,
    });
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-choc-900 text-cream-100 rounded-3xl p-8 sm:p-12 border-2 border-gold-500 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 text-gold-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-choc-800 border border-gold-500/40 text-gold-400 text-xs uppercase tracking-widest font-bold">
            Order Confirmed • {orderPlaced.orderRef}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
            Shukran, {orderPlaced.customerName}!
          </h1>
          <p className="text-sm sm:text-base text-cream-200/90 max-w-lg mx-auto leading-relaxed">
            Your artisanal chocolates are being hand-packed in our signature
            insulated gold chest and will be dispatched via our 16°C chilled
            courier to <strong className="text-gold-400">{orderPlaced.emirate}</strong>.
          </p>

          <div className="bg-choc-950/80 border border-gold-500/30 rounded-2xl p-5 max-w-md mx-auto text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-cream-300">Order Reference:</span>
              <span className="font-mono font-bold text-gold-400">
                {orderPlaced.orderRef}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cream-300">Amount Charged:</span>
              <span className="font-serif font-bold text-gold-400">
                AED {orderPlaced.totalAED}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cream-300">Database Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1 text-xs">
                <Database className="w-3.5 h-3.5" />
                {orderPlaced.savedSource}
              </span>
            </div>
            {orderPlaced.orderId && (
              <div className="flex justify-between text-xs pt-1 border-t border-choc-800">
                <span className="text-cream-400">Database Row ID:</span>
                <span className="font-mono text-cream-200">
                  {orderPlaced.orderId}
                </span>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="px-7 py-3.5 rounded-full bg-gold-500 text-choc-950 font-bold text-sm uppercase tracking-wider hover:bg-gold-400 transition"
            >
              Order More Chocolates
            </Link>
            <Link
              href="/"
              className="px-7 py-3.5 rounded-full bg-choc-800 text-cream-100 border border-gold-500/40 font-bold text-sm uppercase tracking-wider hover:bg-choc-700 transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gold-500/30 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-gold-700 font-bold">
            Express UAE Chilled Courier
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-choc-900 mt-1">
            Royal Checkout
          </h1>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-choc-800 hover:text-gold-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping Bag
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="my-12 bg-cream-50 rounded-3xl border-2 border-gold-500/30 p-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-choc-900">
            Your Bag is Currently Empty
          </h2>
          <p className="text-sm text-choc-700 mt-2">
            Add chocolates from our menu or load a sample tasting box to test checkout.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="px-6 py-3 rounded-full bg-choc-900 text-gold-400 font-bold text-sm"
            >
              Go to Menu
            </Link>
            <button
              onClick={() => {
                addToCart(CHOCOLATES[0], 1);
                addToCart(CHOCOLATES[1], 1);
              }}
              className="px-6 py-3 rounded-full bg-gold-500 text-choc-950 font-bold text-sm"
            >
              + Load Sample Order (AED 193)
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8"
        >
          {/* Left Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            {submitError && (
              <div className="bg-red-950 text-red-200 border border-red-500 rounded-2xl p-4 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Delivery Details */}
            <div className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-gold-500/40 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 text-choc-900">
                <Truck className="w-5 h-5 text-gold-600" />
                <h2 className="font-serif text-xl font-bold">
                  1. UAE Chilled Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-choc-800 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Al Maktoum"
                    className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/40 text-sm text-choc-900 focus:outline-none focus:border-gold-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-choc-800 mb-1.5">
                    UAE Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/40 text-sm text-choc-900 focus:outline-none focus:border-gold-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-choc-800 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@domain.ae"
                    className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/40 text-sm text-choc-900 focus:outline-none focus:border-gold-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-choc-800 mb-1.5">
                    Emirate *
                  </label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/40 text-sm text-choc-900 focus:outline-none focus:border-gold-600"
                  >
                    {EMIRATES.map((em) => (
                      <option key={em} value={em}>
                        {em}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-choc-800 mb-1.5">
                  Villa / Apartment & Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Boulevard Point Tower, Downtown Dubai"
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/40 text-sm text-choc-900 focus:outline-none focus:border-gold-600"
                />
              </div>
            </div>

            {/* Complimentary Gift Note */}
            <div className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-gold-500/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-choc-900">
                <Gift className="w-5 h-5 text-gold-600" />
                <h2 className="font-serif text-xl font-bold">
                  2. Complimentary Gold Foil Gift Card
                </h2>
              </div>
              <textarea
                rows={2}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Optional message inscribed in gold calligraphy on our cream card..."
                className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/40 text-sm text-choc-900 focus:outline-none focus:border-gold-600"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-gold-500/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-choc-900">
                <CreditCard className="w-5 h-5 text-gold-600" />
                <h2 className="font-serif text-xl font-bold">
                  3. Payment Method (AED)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "apple", label: "Apple Pay" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((method) => (
                  <button
                    type="button"
                    key={method.id}
                    onClick={() =>
                      setPaymentMethod(method.id as "card" | "apple" | "cod")
                    }
                    className={`p-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition ${
                      paymentMethod === method.id
                        ? "bg-choc-900 text-gold-400 border-gold-500 shadow-md"
                        : "bg-cream-100 text-choc-800 border-gold-500/30 hover:bg-cream-200"
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-choc-900 text-cream-100 rounded-3xl p-6 sm:p-8 border-2 border-gold-500 shadow-2xl sticky top-28 space-y-5">
              <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-bold">
                <Sparkles className="w-4 h-4" />
                Final Summary
              </div>

              <h2 className="font-serif text-2xl font-bold border-b border-gold-500/30 pb-3">
                Your Chocolates
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map(({ chocolate, quantity }) => (
                  <div
                    key={chocolate.id}
                    className="flex items-center justify-between text-sm gap-3 border-b border-choc-800 pb-2.5"
                  >
                    <div>
                      <p className="font-semibold text-cream-50">
                        {chocolate.name}
                      </p>
                      <p className="text-xs text-cream-300">
                        Qty: {quantity} × AED {chocolate.priceAED}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-gold-400 shrink-0">
                      AED {chocolate.priceAED * quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 pt-2 border-t border-gold-500/30 text-sm">
                <div className="flex justify-between text-cream-200">
                  <span>Subtotal</span>
                  <span>AED {subtotalAED}</span>
                </div>
                <div className="flex justify-between text-cream-200">
                  <span>Chilled UAE Delivery ({emirate})</span>
                  <span className="text-gold-400 font-semibold">
                    {deliveryFeeAED === 0 ? "FREE" : `AED ${deliveryFeeAED}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-serif font-bold pt-3 border-t border-gold-500/30">
                  <span>Total to Pay</span>
                  <span className="text-2xl text-gold-400">
                    AED {finalTotalAED}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-choc-950 font-bold text-sm uppercase tracking-wider shadow-xl hover:brightness-110 transition disabled:opacity-50"
              >
                {submitting
                  ? "Saving Order..."
                  : `Place Order • AED ${finalTotalAED}`}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-cream-300/80 pt-1">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Saves to Local Database (orders table)</span>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Saved Orders in Local Database Table */}
      {recentOrders.length > 0 && (
        <div className="mt-12 bg-cream-50 rounded-3xl p-6 sm:p-8 border-2 border-gold-500/40 shadow-md">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-700 font-bold mb-2">
            <Database className="w-4 h-4" />
            Local Database • orders Table ({recentOrders.length})
          </div>
          <h3 className="font-serif text-xl font-bold text-choc-900 mb-4">
            Recently Saved Orders
          </h3>
          <div className="space-y-2.5">
            {recentOrders.slice(0, 5).map((ord) => (
              <div
                key={ord.id}
                className="flex flex-wrap items-center justify-between gap-2 bg-cream-100 px-4 py-3 rounded-xl border border-gold-500/30 text-sm"
              >
                <div>
                  <span className="font-mono font-bold text-choc-900 mr-2">
                    {ord.order_ref}
                  </span>
                  <span className="text-choc-700">
                    {ord.customer_name} ({ord.emirate})
                  </span>
                </div>
                <span className="font-serif font-bold text-choc-900">
                  AED {ord.total_aed}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
