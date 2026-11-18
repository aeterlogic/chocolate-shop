import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Maison Chocolat Dubai | Luxury Artisan Chocolate Shop (AED)",
  description:
    "Handcrafted luxury chocolates in Dubai. Royal Kunafa Pistachio Bars, 24K Gold Leaf Medjool Truffles, Saffron Pralines, and Grand Reserve Gift Boxes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream-100 text-choc-900 antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
