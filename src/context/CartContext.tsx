"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Chocolate, CHOCOLATES } from "@/data/chocolates";

export interface CartItem {
  chocolate: Chocolate;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (chocolate: Chocolate, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
  totalItems: number;
  subtotalAED: number;
  deliveryFeeAED: number;
  finalTotalAED: number;
  lastAddedToast: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "chocolate_shop_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [lastAddedToast, setLastAddedToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: { id: string; quantity: number }[] = JSON.parse(saved);
        const hydrated: CartItem[] = [];
        for (const entry of parsed) {
          const found = CHOCOLATES.find((c) => c.id === entry.id);
          if (found && entry.quantity > 0) {
            hydrated.push({ chocolate: found, quantity: entry.quantity });
          }
        }
        setItems(hydrated);
      }
    } catch {
      // Ignore storage errors
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!initialized) return;
    try {
      const compact = items.map((item) => ({
        id: item.chocolate.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // Ignore storage errors
    }
  }, [items, initialized]);

  const showToast = (msg: string) => {
    setLastAddedToast(msg);
    setTimeout(() => {
      setLastAddedToast((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const addToCart = (chocolate: Chocolate, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.chocolate.id === chocolate.id);
      if (existing) {
        return prev.map((item) =>
          item.chocolate.id === chocolate.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { chocolate, quantity: qty }];
    });
    showToast(`Added "${chocolate.name}" to your bag`);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.chocolate.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.chocolate.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (id: string) => {
    return items.find((item) => item.chocolate.id === id)?.quantity ?? 0;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalAED = items.reduce(
    (sum, item) => sum + item.chocolate.priceAED * item.quantity,
    0
  );
  // Free chilled courier delivery across UAE on orders AED 150+, otherwise AED 25
  const deliveryFeeAED =
    subtotalAED === 0 ? 0 : subtotalAED >= 150 ? 0 : 25;
  const finalTotalAED = subtotalAED + deliveryFeeAED;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalItems,
        subtotalAED,
        deliveryFeeAED,
        finalTotalAED,
        lastAddedToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
