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
  error?: string;
}> {
  if (!supabase) {
    return {
      chocolates: CHOCOLATES,
      fromSupabase: false,
      error: "Supabase credentials not configured in .env.local yet.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("chocolates")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      return {
        chocolates: CHOCOLATES,
        fromSupabase: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        chocolates: CHOCOLATES,
        fromSupabase: false,
        error: "The 'chocolates' table in Supabase is currently empty.",
      };
    }

    return {
      chocolates: (data as ChocolateRow[]).map(mapRowToChocolate),
      fromSupabase: true,
    };
  } catch (err: unknown) {
    return {
      chocolates: CHOCOLATES,
      fromSupabase: false,
      error: err instanceof Error ? err.message : "Failed to fetch chocolates",
    };
  }
}
