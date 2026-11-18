export interface Chocolate {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priceAED: number;
  weight: string;
  category: "Signature Bars" | "Truffles & Pralines" | "Gift Boxes";
  cocoaPercentage: string;
  badge?: string;
  tastingNotes: string[];
  image: string;
  accentGradient: string;
}

export const CHOCOLATES: Chocolate[] = [
  {
    id: "dubai-kunafa-pistachio",
    name: "Royal Dubai Kunafa Pistachio Bar",
    subtitle: "Crispy Kataifi & Iranian Pistachio Cream",
    description:
      "Our iconic hand-tempered 54% single-origin milk chocolate bar generously filled with toasted golden kataifi pastry, roasted Iranian pistachio praline, and finished with 24K edible gold leaf.",
    priceAED: 68,
    weight: "200g Thick Bar",
    category: "Signature Bars",
    cocoaPercentage: "54% Milk Cocoa",
    badge: "Bestseller",
    tastingNotes: ["Roasted Pistachio", "Toasted Butter Kataifi", "Velvet Milk Cocoa"],
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#3E2217] via-[#543020] to-[#2C1810]",
  },
  {
    id: "gold-medjool-truffles",
    name: "24K Gold Leaf Medjool Truffles",
    subtitle: "Liwa Date Caramel & Tahini Ganache (9 pcs)",
    description:
      "Velvety 70% dark chocolate spheres filled with organic Liwa Medjool date reduction, stone-ground sesame tahini ganache, and a pinch of Arabian Gulf sea salt, crowned with 24K gold leaf.",
    priceAED: 125,
    weight: "180g (9 Pieces)",
    category: "Truffles & Pralines",
    cocoaPercentage: "70% Dark Cocoa",
    badge: "24K Gold Edition",
    tastingNotes: ["Caramelized Medjool Date", "Roasted Sesame", "Dark Chocolate"],
    image:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#2C1810] via-[#4A2511] to-[#1E110B]",
  },
  {
    id: "saffron-cardamom-pralines",
    name: "Saffron & Cardamom Gold Pralines",
    subtitle: "Persian Saffron Infusion & Green Cardamom (12 pcs)",
    description:
      "Hand-painted golden chocolate domes encasing warm Khorasan saffron butter caramel layered over aromatic green cardamom and roasted almond gianduja.",
    priceAED: 95,
    weight: "210g (12 Pieces)",
    category: "Truffles & Pralines",
    cocoaPercentage: "48% Amber Milk",
    badge: "Chef's Signature",
    tastingNotes: ["Floral Saffron", "Warm Cardamom Spice", "Honeyed Caramel"],
    image:
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#543020] via-[#6E422D] to-[#2C1810]",
  },
  {
    id: "valrhona-dark-bonbons",
    name: "72% Grand Cru Dark Ganache Bonbons",
    subtitle: "Single-Origin Madagascar Dark Cocoa (9 pcs)",
    description:
      "Intense, glossy single-origin dark chocolate bonbons with a silky double-fermented ganache interior and roasted cacao nib brittle for pure chocolate connoisseurs.",
    priceAED: 82,
    weight: "165g (9 Pieces)",
    category: "Truffles & Pralines",
    cocoaPercentage: "72% Grand Cru Dark",
    tastingNotes: ["Red Berry Acidity", "Roasted Cacao Nibs", "Deep Espresso Finish"],
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#1E110B] via-[#2C1810] to-[#120A06]",
  },
  {
    id: "salted-caramel-gianduja",
    name: "Salted Caramel & Piedmont Hazelnut Bar",
    subtitle: "IGP Hazelnut Gianduja & Fleur de Sel",
    description:
      "Creamy Italian Piedmont hazelnut gianduja marbled with golden fleur de sel butter caramel and whole roasted hazelnuts inside a bronzed milk chocolate shell.",
    priceAED: 78,
    weight: "190g Artisanal Bar",
    category: "Signature Bars",
    cocoaPercentage: "45% Hazelnut Milk",
    tastingNotes: ["Toasted Hazelnut", "Salted Butter Toffee", "Creamy Cocoa"],
    image:
      "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#4A2511] via-[#6E422D] to-[#3E2217]",
  },
  {
    id: "damascus-rose-truffles",
    name: "Damascus Rose & Raspberry Truffles",
    subtitle: "Organic Rosewater & Wild Raspberry Ganache (9 pcs)",
    description:
      "Delicate dark and ruby chocolate shells filled with slow-simmered wild raspberry coulis and fragrant Damascus rosewater ganache, dusted with crushed rose petals and gold shimmer.",
    priceAED: 88,
    weight: "175g (9 Pieces)",
    category: "Truffles & Pralines",
    cocoaPercentage: "64% Dark & Ruby",
    tastingNotes: ["Damask Rose Petal", "Tart Wild Raspberry", "Silky Dark Cocoa"],
    image:
      "https://images.unsplash.com/photo-1582176604856-e824b4736522?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#4A1C1C] via-[#3E2217] to-[#2C1810]",
  },
  {
    id: "arabic-qahwa-almond-bark",
    name: "Arabic Qahwa & Marcona Almond Bark",
    subtitle: "Roasted Emirati Coffee & Caramelized Almonds",
    description:
      "Hand-broken slabs of 66% dark chocolate infused with freshly roasted Emirati Arabic Qahwa, studded with caramelized Spanish Marcona almonds and brushed with shimmering gold.",
    priceAED: 64,
    weight: "185g Slab Box",
    category: "Signature Bars",
    cocoaPercentage: "66% Spiced Dark",
    tastingNotes: ["Roasted Arabic Coffee", "Crunchy Marcona Almond", "Warm Clove & Cocoa"],
    image:
      "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#2C1810] via-[#3E2217] to-[#1E110B]",
  },
  {
    id: "sovereign-royal-gift-box",
    name: "Grand Reserve Sovereign Gift Box",
    subtitle: "24-Piece Luxury Velvet & Gold Assortment",
    description:
      "Our flagship gold-embossed velvet presentation chest housing 24 handcrafted truffles, saffron pralines, Medjool date spheres, and miniature pistachio kunafa bars.",
    priceAED: 240,
    weight: "480g (24 Pieces)",
    category: "Gift Boxes",
    cocoaPercentage: "45% – 72% Assorted",
    badge: "Royal Gift Box",
    tastingNotes: ["Complete Tasting Flight", "24K Gold Truffles", "Pistachio & Saffron"],
    image:
      "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&w=900&q=80",
    accentGradient: "from-[#3E2217] via-[#2C1810] to-[#120A06]",
  },
];
