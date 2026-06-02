/**
 * Shared property catalog for search, map pins, and cross-role dashboards.
 * Coordinates are approximate centres for Lagos & Abuja neighbourhoods.
 */

export type PropertyListing = {
  id: string;
  title: string;
  location: string;
  city: "Lagos" | "Abuja";
  price: number;
  priceLabel: string;
  type: string;
  bedrooms: number;
  tags: string[];
  images: string[];
  description: string;
  lat: number;
  lng: number;
  landlordId?: string;
  status: "available" | "leased" | "pending";
};

export const PROPERTY_CATALOG: PropertyListing[] = [
  {
    id: "lekki-studio",
    title: "Lekki Studio",
    location: "Lekki, Lagos",
    city: "Lagos",
    price: 320000,
    priceLabel: "₦320,000/mo",
    type: "Studio",
    bedrooms: 1,
    tags: ["Just renovated", "Marina access"],
    images: [
      "https://images.unsplash.com/photo-1560185127-6d2b5aa37463?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Bright studio with smart storage and fast internet.",
    lat: 6.4474,
    lng: 3.4723,
    landlordId: "landlord-1",
    status: "available",
  },
  {
    id: "victoria-loft",
    title: "Victoria Island Loft",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    price: 420000,
    priceLabel: "₦420,000/mo",
    type: "Apartment",
    bedrooms: 2,
    tags: ["Furnished", "24/7 power"],
    images: [
      "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Modern loft for work-from-home with great views.",
    lat: 6.4281,
    lng: 3.4219,
    landlordId: "landlord-1",
    status: "available",
  },
  {
    id: "gwarinpa-townhome",
    title: "Gwarinpa Townhome",
    location: "Gwarinpa, Abuja",
    city: "Abuja",
    price: 280000,
    priceLabel: "₦280,000/mo",
    type: "Townhouse",
    bedrooms: 3,
    tags: ["Quiet street", "Private garden"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Family-friendly three-bedroom with home office space.",
    lat: 9.1122,
    lng: 7.3986,
    status: "available",
  },
  {
    id: "ikoyi-duplex",
    title: "Ikoyi 2-Bed Duplex",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    price: 650000,
    priceLabel: "₦650,000/mo",
    type: "Duplex",
    bedrooms: 2,
    tags: ["Premium finish", "Secure estate"],
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Sleek duplex with natural light near dining district.",
    lat: 6.4549,
    lng: 3.4246,
    landlordId: "landlord-1",
    status: "available",
  },
  {
    id: "ikeja-maple",
    title: "Maple Apartments",
    location: "Ikeja, Lagos",
    city: "Lagos",
    price: 85000,
    priceLabel: "₦85,000/mo",
    type: "Apartment",
    bedrooms: 3,
    tags: ["Secure parking", "Verified landlord"],
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=900&q=80",
    ],
    description: "3-bed apartments with secure parking — landlord portfolio listing.",
    lat: 6.6018,
    lng: 3.3515,
    landlordId: "landlord-1",
    status: "available",
  },
  {
    id: "lekki-riverside",
    title: "Riverside Villas",
    location: "Lekki, Lagos",
    city: "Lagos",
    price: 220000,
    priceLabel: "₦220,000/mo",
    type: "Villa",
    bedrooms: 4,
    tags: ["Waterfront", "Gated"],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Luxury villas with waterfront access.",
    lat: 6.4382,
    lng: 3.4981,
    landlordId: "landlord-1",
    status: "leased",
  },
];

export const MAP_BOUNDS = {
  Lagos: { minLat: 6.42, maxLat: 6.62, minLng: 3.32, maxLng: 3.52 },
  Abuja: { minLat: 9.0, maxLat: 9.2, minLng: 7.35, maxLng: 7.55 },
} as const;

export function coordsToMapPercent(
  lat: number,
  lng: number,
  city: keyof typeof MAP_BOUNDS
): { left: number; top: number } {
  const b = MAP_BOUNDS[city];
  const left = ((lng - b.minLng) / (b.maxLng - b.minLng)) * 100;
  const top = ((b.maxLat - lat) / (b.maxLat - b.minLat)) * 100;
  return {
    left: Math.min(96, Math.max(4, left)),
    top: Math.min(96, Math.max(4, top)),
  };
}

export function filterListings(
  listings: PropertyListing[],
  opts: { search?: string; type?: string; city?: string; maxPrice?: number }
): PropertyListing[] {
  return listings.filter((p) => {
    const q = (opts.search || "").toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q);
    const matchesType = !opts.type || opts.type === "All" || p.type === opts.type;
    const matchesCity = !opts.city || opts.city === "All" || p.city === opts.city;
    const matchesPrice = opts.maxPrice == null || p.price <= opts.maxPrice;
    return matchesSearch && matchesType && matchesCity && matchesPrice;
  });
}
