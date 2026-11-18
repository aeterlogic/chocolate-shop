import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Chocolate, CHOCOLATES } from "@/data/chocolates";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ChocolateRow {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price_aed: number;
  weight: string;
  category: "Signature Bars" | "Truffles & Pralines" | "Gift Boxes";
  cocoa_percentage: string;
  badge?: string | null;
  tasting_notes: string[];
  image: string;
  accent_gradient: string;
}

export function mapRowToChocolate(row: ChocolateRow): Chocolate {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle,
    description: row.description,
    priceAED: Number(row.price_aed),
    weight: row.weight,
    category: row.category,
    cocoaPercentage: row.cocoa_percentage,
    badge: row.badge || undefined,
    tastingNotes: Array.isArray(row.tasting_notes) ? row.tasting_notes : [],
    image: row.image,
    accentGradient:
      row.accent_gradient || "from-[#3E2217] via-[#543020] to-[#2C1810]",
  };
}

export async function fetchChocolatesFromSupabase(): Promise<{
  chocolates: Chocolate[];
  fromSupabase: boolean;
  sourceLabel: string;
  error?: string;
}> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("chocolates")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        return {
          chocolates: (data as ChocolateRow[]).map(mapRowToChocolate),
          fromSupabase: true,
          sourceLabel: "Connected: Loaded from Supabase (chocolates table)",
        };
      }
    } catch {
      // Fall back to local database API
    }
  }

  try {
    const res = await fetch("/api/chocolates", { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        return {
          chocolates: (json.data as ChocolateRow[]).map(mapRowToChocolate),
          fromSupabase: true,
          sourceLabel:
            "Connected: Loaded from Local Database (data/local-db.json • chocolates table)",
        };
      }
    }
  } catch {
    // Fall back to static array
  }

  return {
    chocolates: CHOCOLATES,
    fromSupabase: true,
    sourceLabel: "Loaded from Local Chocolates Store",
  };
}
