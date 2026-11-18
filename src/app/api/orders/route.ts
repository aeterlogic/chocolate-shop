import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATHS = [
  path.join(process.cwd(), "data", "local-db.json"),
  "h:\\My Drive\\LISRC-Activities\\ChocShop\\chocolate-shop\\data\\local-db.json",
];

function readLocalDB() {
  for (const p of DB_PATHS) {
    try {
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf-8"));
      }
    } catch {
      // ignore
    }
  }
  return { chocolates: [], orders: [] };
}

function writeLocalDB(dbData: unknown) {
  const serialized = JSON.stringify(dbData, null, 2);
  for (const p of DB_PATHS) {
    try {
      const dir = path.dirname(p);
      if (fs.existsSync(dir)) {
        fs.writeFileSync(p, serialized, "utf-8");
      }
    } catch {
      // Ignore on read-only serverless environments
    }
  }
}

export async function GET() {
  const db = readLocalDB();
  return NextResponse.json({
    table: "orders",
    source: "local-db.json",
    data: db.orders || [],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = readLocalDB();
    if (!Array.isArray(db.orders)) {
      db.orders = [];
    }

    const newOrder = {
      id: crypto.randomUUID(),
      order_ref: body.order_ref,
      customer_name: body.customer_name,
      phone: body.phone,
      email: body.email,
      emirate: body.emirate,
      address: body.address,
      gift_note: body.gift_note || null,
      payment_method: body.payment_method,
      items: body.items || [],
      subtotal_aed: body.subtotal_aed,
      delivery_fee_aed: body.delivery_fee_aed,
      total_aed: body.total_aed,
      status: body.status || "confirmed",
      created_at: new Date().toISOString(),
    };

    db.orders.unshift(newOrder);
    writeLocalDB(db);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Failed to save order",
      },
      { status: 500 }
    );
  }
}
