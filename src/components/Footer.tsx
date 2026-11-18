import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-choc-950 text-cream-200 border-t-2 border-gold-500/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-cream-100 tracking-wider">
              MAISON <span className="text-gold-400">CHOCOLAT</span>
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-400 mt-1 mb-4">
              Dubai • United Arab Emirates
            </p>
            <p className="text-sm text-cream-300/80 leading-relaxed">
              Handcrafted luxury chocolates blending single-origin Grand Cru cocoa
              with Middle Eastern royal ingredients—Iranian pistachio, Liwa Medjool
              dates, Persian saffron, and 24K edible gold leaf.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Boutique Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition">
                  Home Showcase
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-gold-400 transition">
                  Artisan Chocolate Menu (8 Signatures)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-400 transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-gold-400 transition">
                  Express UAE Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique Info */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-400 font-semibold mb-4">
              Dubai Flagship Atelier
            </h4>
            <ul className="space-y-3 text-sm text-cream-300/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>Fashion Avenue, Downtown Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+971 4 555 0199</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Daily: 10:00 AM – 11:30 PM (GST)</span>
              </li>
            </ul>
          </div>

          {/* Guarantee */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-400 font-semibold mb-4">
              The Royal Promise
            </h4>
            <div className="bg-choc-900 border border-gold-500/30 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Temperature-Controlled Fleet</span>
              </div>
              <p className="text-xs text-cream-300/80 leading-relaxed">
                Every order arrives in our signature insulated cream & gold gift chest
                at a precise 16°C across all 7 Emirates.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400/70 gap-4">
          <p>© {new Date().getFullYear()} Maison Chocolat Dubai (chocolate-shop). All prices in AED (inclusive of VAT).</p>
          <p className="text-gold-400/90">Crafted in Brown, Cream & 24K Gold</p>
        </div>
      </div>
    </footer>
  );
}
