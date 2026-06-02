"use client";

import clsx from "clsx";
import type { PropertyListing } from "@/data/propertyCatalog";
import { coordsToMapPercent } from "@/data/propertyCatalog";

type PropertyMapProps = {
  listings: PropertyListing[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  city: "Lagos" | "Abuja";
  className?: string;
};

export default function PropertyMap({
  listings,
  selectedId,
  onSelect,
  city,
  className,
}: PropertyMapProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `
            linear-gradient(rgba(3,35,67,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(3,35,67,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-slate-50 to-accent-50/40" />

      <div className="absolute left-3 top-3 z-10 rounded-lg bg-white/95 px-3 py-2 text-xs shadow-sm border border-slate-200">
        <p className="font-semibold text-primary-900">{city} map</p>
        <p className="text-slate-500 mt-0.5">{listings.length} pin{listings.length === 1 ? "" : "s"}</p>
      </div>

      <div className="relative h-full min-h-[280px] w-full">
        {listings.map((property) => {
          const pos = coordsToMapPercent(property.lat, property.lng, city);
          const active = selectedId === property.id;

          return (
            <button
              key={property.id}
              type="button"
              onClick={() => onSelect?.(property.id)}
              className={clsx(
                "absolute z-20 -translate-x-1/2 -translate-y-full transition-transform duration-200",
                active && "z-30 scale-110"
              )}
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              title={`${property.title} — ${property.location}`}
            >
              <span
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-lg text-xs font-bold",
                  active
                    ? "border-white bg-accent-600 text-primary-950 ring-4 ring-accent-400/40"
                    : "border-white bg-primary-900 text-white hover:bg-primary-800"
                )}
              >
                ₦
              </span>
              {active ? (
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary-900 px-2 py-1 text-[10px] font-medium text-white shadow">
                  {property.title}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="absolute bottom-2 right-2 z-10 text-[10px] text-slate-400">
        Map preview · OpenStreetMap data
      </p>
    </div>
  );
}
