"use client";

import { FaBuilding, FaUsers, FaDollarSign } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import RankBadge from "@/components/landlord/RankBadge";
import { getLandlordProperties, getRank } from "@/services/landlordApi";

const rankLevels = [
  {
    title: "House Owner",
    description: "You own a small set of homes or apartments registered under CIL. Ideal for individual landlords managing one to a few properties.",
    badge: "Starter",
    properties: "1–4",
  },
  {
    title: "Portfolio Owner",
    description: "You manage multiple properties across locations. This rank reflects a growing, diversified landlord portfolio on CIL.",
    badge: "Growth",
    properties: "5–20",
  },
  {
    title: "Property Manager",
    description: "You oversee many properties or manage on behalf of owners. This rank is for professional managers with broad CIL portfolios.",
    badge: "Enterprise",
    properties: "20+",
  },
];

const stats = [
  { label: "Registered landlords", value: "1,120", icon: FaUsers },
  { label: "Properties listed", value: "4,860", icon: FaBuilding },
  { label: "Active leases", value: "3,450", icon: FaDollarSign },
];

const properties = [
  { title: "Victoria Island Suites", location: "Victoria Island", units: "12 units", rank: "Portfolio Owner" },
  { title: "Lekki Garden Homes", location: "Lekki", units: "8 units", rank: "House Owner" },
  { title: "Abuja Executive Plaza", location: "Abuja", units: "24 units", rank: "Property Manager" },
];

export default function LandlordDashboard() {
  const [propertyCount, setPropertyCount] = useState(properties.length);

  useEffect(() => {
    getLandlordProperties('landlord-1')
      .then((resp) => {
        if (resp?.properties) setPropertyCount(resp.properties.length);
      })
      .catch(() => {
        // ignore fallback
      });
  }, []);

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-gradient-to-r from-primary-700 to-primary-900 p-10 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Landlord dashboard</p>
            <h1 className="mt-4 text-4xl font-bold">Track your ranking and registered portfolio.</h1>
            <p className="mt-3 max-w-2xl text-slate-200">Landlords on CIL are ranked based on the number and scale of properties they register, from house owners to portfolio owners and professional property managers.</p>
          </div>
          <div className="flex items-center gap-4">
            <RankBadge count={propertyCount} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-100 text-primary-900">
              <item.icon className="text-xl" />
            </div>
            <p className="mt-5 text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-primary-900">{item.value}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-slate-600">Quick actions:</div>
        <div className="flex gap-3">
          <Link href="/landlord/properties" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-primary-900 hover:bg-slate-50">Manage properties</Link>
          <Link href="/landlord/tenants" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-primary-900 hover:bg-slate-50">View tenants</Link>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        {rankLevels.map((rank) => (
          <div key={rank.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{rank.badge}</p>
                <h2 className="mt-3 text-2xl font-semibold text-primary-900">{rank.title}</h2>
              </div>
              <div className="rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-700">{rank.properties}</div>
            </div>
            <p className="mt-6 text-slate-600">{rank.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-accent-50 p-8 shadow-sm border border-accent-100">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent-700">What this means</p>
            <h2 className="mt-3 text-2xl font-semibold text-primary-900">Why ranking matters for landlords</h2>
            <p className="mt-4 text-slate-600">CIL ranks landlords by the number of properties they register and the complexity of their portfolio. A house owner typically manages a few homes, a portfolio owner holds multiple units across locations, and a property manager oversees large portfolios or works across owner networks.</p>
            <p className="mt-4 text-slate-600">Higher ranks unlock better visibility, priority matching with tenants, and stronger placement in the CIL marketplace.</p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Rank boost</p>
            <ul className="mt-5 space-y-4 text-slate-600">
              <li className="flex gap-3"><span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary-900" />Register new properties for improved rank.</li>
              <li className="flex gap-3"><span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary-900" />Keep listings active and verified.</li>
              <li className="flex gap-3"><span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary-900" />Use CIL reports to optimise your portfolio mix.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {properties.map((property) => (
          <div key={property.title} className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{property.rank}</p>
                <h3 className="mt-3 text-xl font-semibold text-primary-900">{property.title}</h3>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-accent-100 text-accent-700">
                <FaBuilding />
              </div>
            </div>
            <p className="mt-5 text-slate-600">{property.location}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-slate-500">Units</p>
            <p className="text-lg font-semibold text-primary-900">{property.units}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
