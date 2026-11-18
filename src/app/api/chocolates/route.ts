import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { CHOCOLATES } from "@/data/chocolates";

const DB_PATHS = [
  path.join(process.cwd(), "data", "local-db.json"),
  "h:\\My Drive\\LISRC-Activities\\ChocShop\\chocolate-shop\\data\\local-db.json",
];

function readLocalDB() {
  for (const p of DB_PATHS) {
    try {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, "utf-8");
        return JSON.parse(raw);
      }
    } catch {
      // Try next path
    }
  }
  return {
    chocolates: CHOCOLATES.map((c) => ({
      id: c.id,
      name: c.name,
      subtitle: c.subtitle,
      description: c.description,
      price_aed: c.priceAED,
      weight: c.weight,
      category: c.category,
      cocoa_percentage: c.cocoaPercentage,
      badge: c.badge || null,
      tasting_notes: c.tastingNotes,
      image: c.image,
      accent_gradient: c.accentGradient,
    })),
    orders: [],
  };
}

export async function GET() {
  const db = readLocalDB();
  return NextResponse.json({
    table: "chocolates",
    source: "local-db.json",
    data: db.chocolates || [],
  });
}
