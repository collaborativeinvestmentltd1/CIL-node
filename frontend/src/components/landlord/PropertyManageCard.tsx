"use client";

import Link from "next/link";

export default function PropertyManageCard({ property }: { property: { title: string; location: string; units?: string; price?: string } }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-primary-900">{property.title}</p>
          <p className="text-xs text-slate-500">{property.location}</p>
        </div>
        <div className="flex gap-2">
          <Link href="#" className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100">Edit</Link>
          <Link href="#" className="rounded-full bg-primary-900 px-3 py-1 text-xs font-semibold text-white hover:bg-primary-800">View</Link>
        </div>
      </div>
      {property.units ? <p className="mt-3 text-sm text-slate-600">{property.units}</p> : null}
      {property.price ? <p className="mt-2 text-sm text-primary-900 font-semibold">{property.price}</p> : null}
    </div>
  );
}
