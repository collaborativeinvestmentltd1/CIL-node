"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PROPERTY_CATALOG } from "@/data/propertyCatalog";
import PropertyMap from "@/components/properties/PropertyMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/form";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function PropertyDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const property = PROPERTY_CATALOG.find((p) => p.id === id);

  if (!property) {
    return (
      <Panel padding="lg">
        <p className="text-slate-600">Property not found.</p>
        <Link href="/tenant/properties" className="mt-4 inline-block text-accent-700 font-medium">
          Back to search
        </Link>
      </Panel>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Listing"
        title={property.title}
        description={property.description}
        actions={
          <Link href="/tenant/applications">
            <Button variant="secondary">Apply to rent</Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel padding="none" className="overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={property.images[0]} alt="" className="w-full h-64 lg:h-80 object-cover" />
          <div className="p-5 space-y-3">
            <p className="inline-flex items-center gap-2 text-slate-600">
              <FaMapMarkerAlt /> {property.location}
            </p>
            <p className="text-2xl font-semibold text-primary-900">{property.priceLabel}</p>
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        <PropertyMap
          listings={[property]}
          selectedId={property.id}
          city={property.city}
          className="h-64 lg:h-full min-h-[280px]"
        />
      </div>

      <Link href="/tenant/properties" className="text-sm font-medium text-accent-700 hover:underline">
        ← Back to search
      </Link>
    </div>
  );
}
