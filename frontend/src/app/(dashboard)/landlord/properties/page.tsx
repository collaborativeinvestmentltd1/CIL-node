"use client";

import PropertyManageCard from "@/components/landlord/PropertyManageCard";
import Billboard from "@/components/common/Billboard";
import { useState } from "react";

const initial = [
  { title: "Lekki Garden Homes", location: "Lekki, Lagos", units: "8 units", price: "₦420,000/mo" },
  { title: "Victoria Island Suites", location: "VI, Lagos", units: "12 units", price: "₦1,200,000/mo" },
];

export default function LandlordPropertiesPage() {
  const [properties, setProperties] = useState(initial);

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Your listings</p>
            <h1 className="mt-3 text-3xl font-bold text-primary-900">Manage properties for rent & sale</h1>
            <p className="mt-3 text-slate-600">Add new listings, edit existing units, and keep your portfolio verified and up to date.</p>
          </div>
        </div>
      </header>

      <Billboard title="Listing tip" message="Use high-quality photos and detailed descriptions to increase tenant interest." />

      <div className="grid gap-4 sm:grid-cols-2">
        {properties.map((p) => (
          <PropertyManageCard key={p.title} property={p} />
        ))}
      </div>
    </div>
  );
}
