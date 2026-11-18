-- ============================================================
-- 1. CHOCOLATES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chocolates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  price_aed NUMERIC(10, 2) NOT NULL,
  weight TEXT NOT NULL,
  category TEXT NOT NULL,
  cocoa_percentage TEXT NOT NULL,
  badge TEXT,
  tasting_notes TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL,
  accent_gradient TEXT NOT NULL DEFAULT 'from-[#3E2217] via-[#543020] to-[#2C1810]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. ORDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  emirate TEXT NOT NULL,
  address TEXT NOT NULL,
  gift_note TEXT,
  payment_method TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal_aed NUMERIC(10, 2) NOT NULL,
  delivery_fee_aed NUMERIC(10, 2) NOT NULL,
  total_aed NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES FOR ANON KEY
-- ============================================================
ALTER TABLE public.chocolates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on chocolates" ON public.chocolates;
CREATE POLICY "Allow public read access on chocolates"
  ON public.chocolates
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on orders" ON public.orders;
CREATE POLICY "Allow public read on orders"
  ON public.orders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================================
-- 4. SEED THE 8 SAMPLE CHOCOLATES (PRICES IN AED)
-- ============================================================
INSERT INTO public.chocolates (
  id, name, subtitle, description, price_aed, weight, category, cocoa_percentage, badge, tasting_notes, image, accent_gradient
) VALUES
(
  'dubai-kunafa-pistachio',
  'Royal Dubai Kunafa Pistachio Bar',
  'Crispy Kataifi & Iranian Pistachio Cream',
  'Our iconic hand-tempered 54% single-origin milk chocolate bar generously filled with toasted golden kataifi pastry, roasted Iranian pistachio praline, and finished with 24K edible gold leaf.',
  68,
  '200g Thick Bar',
  'Signature Bars',
  '54% Milk Cocoa',
  'Bestseller',
  ARRAY['Roasted Pistachio', 'Toasted Butter Kataifi', 'Velvet Milk Cocoa'],
  'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80',
  'from-[#3E2217] via-[#543020] to-[#2C1810]'
),
(
  'gold-medjool-truffles',
  '24K Gold Leaf Medjool Truffles',
  'Liwa Date Caramel & Tahini Ganache (9 pcs)',
  'Velvety 70% dark chocolate spheres filled with organic Liwa Medjool date reduction, stone-ground sesame tahini ganache, and a pinch of Arabian Gulf sea salt, crowned with 24K gold leaf.',
  125,
  '180g (9 Pieces)',
  'Truffles & Pralines',
  '70% Dark Cocoa',
  '24K Gold Edition',
  ARRAY['Caramelized Medjool Date', 'Roasted Sesame', 'Dark Chocolate'],
  'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80',
  'from-[#2C1810] via-[#4A2511] to-[#1E110B]'
),
(
  'saffron-cardamom-pralines',
  'Saffron & Cardamom Gold Pralines',
  'Persian Saffron Infusion & Green Cardamom (12 pcs)',
  'Hand-painted golden chocolate domes encasing warm Khorasan saffron butter caramel layered over aromatic green cardamom and roasted almond gianduja.',
  95,
  '210g (12 Pieces)',
  'Truffles & Pralines',
  '48% Amber Milk',
  'Chef''s Signature',
  ARRAY['Floral Saffron', 'Warm Cardamom Spice', 'Honeyed Caramel'],
  'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80',
  'from-[#543020] via-[#6E422D] to-[#2C1810]'
),
(
  'valrhona-dark-bonbons',
  '72% Grand Cru Dark Ganache Bonbons',
  'Single-Origin Madagascar Dark Cocoa (9 pcs)',
  'Intense, glossy single-origin dark chocolate bonbons with a silky double-fermented ganache interior and roasted cacao nib brittle for pure chocolate connoisseurs.',
  82,
  '165g (9 Pieces)',
  'Truffles & Pralines',
  '72% Grand Cru Dark',
  NULL,
  ARRAY['Red Berry Acidity', 'Roasted Cacao Nibs', 'Deep Espresso Finish'],
  'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80',
  'from-[#1E110B] via-[#2C1810] to-[#120A06]'
),
(
  'salted-caramel-gianduja',
  'Salted Caramel & Piedmont Hazelnut Bar',
  'IGP Hazelnut Gianduja & Fleur de Sel',
  'Creamy Italian Piedmont hazelnut gianduja marbled with golden fleur de sel butter caramel and whole roasted hazelnuts inside a bronzed milk chocolate shell.',
  78,
  '190g Artisanal Bar',
  'Signature Bars',
  '45% Hazelnut Milk',
  NULL,
  ARRAY['Toasted Hazelnut', 'Salted Butter Toffee', 'Creamy Cocoa'],
  'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?auto=format&fit=crop&w=900&q=80',
  'from-[#4A2511] via-[#6E422D] to-[#3E2217]'
),
(
  'damascus-rose-truffles',
  'Damascus Rose & Raspberry Truffles',
  'Organic Rosewater & Wild Raspberry Ganache (9 pcs)',
  'Delicate dark and ruby chocolate shells filled with slow-simmered wild raspberry coulis and fragrant Damascus rosewater ganache, dusted with crushed rose petals and gold shimmer.',
  88,
  '175g (9 Pieces)',
  'Truffles & Pralines',
  '64% Dark & Ruby',
  NULL,
  ARRAY['Damask Rose Petal', 'Tart Wild Raspberry', 'Silky Dark Cocoa'],
  'https://images.unsplash.com/photo-1582176604856-e824b4736522?auto=format&fit=crop&w=900&q=80',
  'from-[#4A1C1C] via-[#3E2217] to-[#2C1810]'
),
(
  'arabic-qahwa-almond-bark',
  'Arabic Qahwa & Marcona Almond Bark',
  'Roasted Emirati Coffee & Caramelized Almonds',
  'Hand-broken slabs of 66% dark chocolate infused with freshly roasted Emirati Arabic Qahwa, studded with caramelized Spanish Marcona almonds and brushed with shimmering gold.',
  64,
  '185g Slab Box',
  'Signature Bars',
  '66% Spiced Dark',
  NULL,
  ARRAY['Roasted Arabic Coffee', 'Crunchy Marcona Almond', 'Warm Clove & Cocoa'],
  'https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=900&q=80',
  'from-[#2C1810] via-[#3E2217] to-[#1E110B]'
),
(
  'sovereign-royal-gift-box',
  'Grand Reserve Sovereign Gift Box',
  '24-Piece Luxury Velvet & Gold Assortment',
  'Our flagship gold-embossed velvet presentation chest housing 24 handcrafted truffles, saffron pralines, Medjool date spheres, and miniature pistachio kunafa bars.',
  240,
  '480g (24 Pieces)',
  'Gift Boxes',
  '45% – 72% Assorted',
  'Royal Gift Box',
  ARRAY['Complete Tasting Flight', '24K Gold Truffles', 'Pistachio & Saffron'],
  'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&w=900&q=80',
  'from-[#3E2217] via-[#2C1810] to-[#120A06]'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  price_aed = EXCLUDED.price_aed,
  weight = EXCLUDED.weight,
  category = EXCLUDED.category,
  cocoa_percentage = EXCLUDED.cocoa_percentage,
  badge = EXCLUDED.badge,
  tasting_notes = EXCLUDED.tasting_notes,
  image = EXCLUDED.image,
  accent_gradient = EXCLUDED.accent_gradient;
