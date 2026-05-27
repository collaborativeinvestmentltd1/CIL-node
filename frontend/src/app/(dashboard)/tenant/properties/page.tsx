"use client";

import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaHeart, FaStar } from "react-icons/fa";

const initialProperties = [
  {
    id: "lekki-studio",
    title: "Lekki Studio",
    location: "Lekki, Lagos",
    price: "₦320,000/mo",
    type: "Studio",
    bedrooms: 1,
    tags: ["Just renovated", "Walk to the marina"],
    images: [
      "https://images.unsplash.com/photo-1560185127-6d2b5aa37463?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A bright studio with smart storage, fast internet, and a short ride to the beach club.",
  },
  {
    id: "victoria-loft",
    title: "Victoria Island Loft",
    location: "Victoria Island, Lagos",
    price: "₦420,000/mo",
    type: "Apartment",
    bedrooms: 2,
    tags: ["Furnished", "24/7 backup power"],
    images: [
      "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A modern loft designed for work-from-home comfort with a calm community and great views.",
  },
  {
    id: "gwarinpa-townhome",
    title: "Gwarinpa Townhome",
    location: "Gwarinpa, Abuja",
    price: "₦280,000/mo",
    type: "Townhouse",
    bedrooms: 3,
    tags: ["Quiet street", "Private garden"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A peaceful three-bedroom home with family-friendly amenities and space for a home office.",
  },
  {
    id: "ikoyi-duplex",
    title: "Ikoyi 2-Bed",
    location: "Ikoyi, Lagos",
    price: "₦650,000/mo",
    type: "Duplex",
    bedrooms: 2,
    tags: ["Premium finish", "Close to dining"],
    images: [
      "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    ],
    description: "A sleek duplex with sweeping natural light and easy access to Ikoyi’s weekend scene.",
  },
];

type PropertyItem = typeof initialProperties[number];

function PropertyCard({ property }: { property: PropertyItem }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % property.images.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [property.images.length]);

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden">
        {property.images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${property.title} photo ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === slide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-200">{property.type}</p>
          <h2 className="mt-2 text-xl font-semibold">{property.title}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt /> {property.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaStar className="text-amber-500" /> {property.bedrooms} BR
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">{property.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {property.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-600">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-semibold text-primary-900">{property.price}</p>
            <p className="text-sm text-slate-500">Move in from next week</p>
          </div>
          <button className="rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-800">
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function TenantPropertiesPage() {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [properties, setProperties] = useState<PropertyItem[]>(initialProperties);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) || property.location.toLowerCase().includes(search.toLowerCase());
      const matchesType = propertyType === "All" || property.type === propertyType;
      return matchesSearch && matchesType;
    });
  }, [search, propertyType, properties]);

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Find your next home</p>
            <h1 className="mt-3 text-3xl font-bold text-primary-900">Search homes with real photos, local details, and flexible move-in options.</h1>
            <p className="mt-4 text-slate-600">This is your renter space. Browse the newest listings, compare houses with real visuals, and find the right home without the fluff.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-accent-50 px-6 py-5 text-sm text-slate-700 shadow-sm">
            <div className="font-semibold text-primary-900">Designed for renters</div>
            <div className="mt-2">Quick search, trusted listings, and every home shown with actual photos.</div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.8fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
              <FaSearch className="text-slate-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Lekki, Ikoyi, Abuja..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <select
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none"
            >
              <option>All</option>
              <option>Studio</option>
              <option>Apartment</option>
              <option>Townhouse</option>
              <option>Duplex</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
            {filteredProperties.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 p-6 text-slate-500">No homes match this search yet. Try a broader neighbourhood or remove the filter.</div>
            ) : null}
          </div>
        </div>

        <aside className="rounded-[2rem] bg-primary-900 p-8 text-white shadow-sm border border-primary-800">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary-200">Renter support</p>
              <h2 className="mt-3 text-2xl font-semibold">Need a hand finding the right home?</h2>
            </div>
            <p className="text-sm leading-7 text-primary-100">Tell us your move-in date, preferred area, and monthly budget. We’ll surface the best matches and help you connect with landlords who are ready to welcome you.</p>
            <div className="rounded-[1.75rem] bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-primary-200">Quick search tips</p>
              <ul className="mt-4 space-y-3 text-sm text-primary-100">
                <li>• Search by neighbourhood, not just city.</li>
                <li>• Prefer furnished? use the type filter.</li>
                <li>• Check move-in dates before you apply.</li>
              </ul>
            </div>
            <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition hover:bg-slate-100">
              Request a personalized shortlist
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
