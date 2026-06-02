"use client";

import Link from "next/link";
import PropertyManageCard from "@/components/landlord/PropertyManageCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { PROPERTY_CATALOG } from "@/data/propertyCatalog";

const landlordListings = PROPERTY_CATALOG.filter((p) => p.landlordId === "landlord-1").map(
  (p) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    units: `${p.bedrooms} bed`,
    price: p.priceLabel,
  })
);

export default function LandlordPropertiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Your listings"
        title="Manage properties for rent"
        description="Add and edit units. Tenants discover listings through search and the map."
        actions={
          <Link
            href="/tenant/properties"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-slate-50"
          >
            Preview on map
          </Link>
        }
      />

      <Panel padding="md" className="text-sm text-slate-600">
        Listings with map coordinates appear in tenant search. Keep photos and descriptions up to
        date to improve applications.
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2">
        {landlordListings.map((p) => (
          <PropertyManageCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
