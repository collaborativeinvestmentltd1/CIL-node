"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaSearch, FaStar } from "react-icons/fa";
import PropertyMap from "@/components/properties/PropertyMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import {
  PROPERTY_CATALOG,
  filterListings,
  type PropertyListing,
} from "@/data/propertyCatalog";

function PropertyCard({
  property,
  selected,
  onSelect,
}: {
  property: PropertyListing;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      className={`overflow-hidden rounded-xl border bg-white shadow-sm transition cursor-pointer text-left w-full ${
        selected ? "border-accent-500 ring-2 ring-accent-500/30" : "border-slate-200 hover:shadow-md"
      }`}
    >
      <div className="relative h-40 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.images[0]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3 text-white">
          <p className="text-[10px] uppercase tracking-wider text-slate-200">{property.type}</p>
          <h2 className="text-base font-semibold">{property.title}</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1 truncate">
            <FaMapMarkerAlt className="shrink-0" /> {property.location}
          </span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <FaStar className="text-amber-500" /> {property.bedrooms} BR
          </span>
        </div>
        <p className="mt-2 text-lg font-semibold text-primary-900">{property.priceLabel}</p>
        <Link
          href={`/tenant/properties/${property.id}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-flex text-sm font-medium text-accent-700 hover:text-accent-800"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}

type PropertySearchWorkspaceProps = {
  title?: string;
  description?: string;
  showApplyCta?: boolean;
};

export default function PropertySearchWorkspace({
  title = "Find properties on the map",
  description = "Search by area, filter by type, and select a pin to see the listing. Accurate locations help you compare neighbourhoods before you apply.",
  showApplyCta = true,
}: PropertySearchWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [city, setCity] = useState<"All" | "Lagos" | "Abuja">("All");
  const [selectedId, setSelectedId] = useState<string | null>(PROPERTY_CATALOG[0]?.id ?? null);

  const filtered = useMemo(
    () =>
      filterListings(PROPERTY_CATALOG, {
        search,
        type: propertyType,
        city: city === "All" ? undefined : city,
      }),
    [search, propertyType, city]
  );

  const mapCity = city === "Abuja" ? "Abuja" : "Lagos";
  const mapListings = useMemo(
    () => filtered.filter((p) => p.city === mapCity),
    [filtered, mapCity]
  );

  const selected = filtered.find((p) => p.id === selectedId) ?? filtered[0];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Property search" title={title} description={description} />

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Panel padding="md" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <FaSearch className="text-slate-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Lekki, Ikoyi, Ikeja, Gwarinpa..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option>All</option>
              {[...new Set(PROPERTY_CATALOG.map((p) => p.type))].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value as typeof city)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="All">All cities</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
            </select>
          </div>

          <PropertyMap
            listings={mapListings}
            selectedId={selected?.id}
            onSelect={setSelectedId}
            city={mapCity}
            className="h-[320px] sm:h-[380px]"
          />

          {selected ? (
            <div className="rounded-lg border border-accent-200 bg-accent-50/50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-semibold text-primary-900">{selected.title}</p>
                <p className="text-sm text-slate-600">{selected.location} · {selected.priceLabel}</p>
              </div>
              {showApplyCta ? (
                <Link
                  href={`/tenant/properties/${selected.id}`}
                  className="inline-flex justify-center rounded-lg bg-primary-900 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800"
                >
                  View & apply
                </Link>
              ) : null}
            </div>
          ) : null}
        </Panel>

        <div className="space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto lg:max-h-[720px]">
          <p className="text-sm font-medium text-slate-600">{filtered.length} results</p>
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              selected={property.id === selectedId}
              onSelect={() => setSelectedId(property.id)}
            />
          ))}
          {filtered.length === 0 ? (
            <Panel padding="md" className="text-sm text-slate-500">
              No properties match. Try another area or clear filters.
            </Panel>
          ) : null}
        </div>
      </div>
    </div>
  );
}
