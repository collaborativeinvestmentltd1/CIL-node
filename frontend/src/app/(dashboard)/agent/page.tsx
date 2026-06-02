"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionCard, HeroPanel, Panel, StatPanel } from "@/components/ui/Panel";
import { FaBuilding, FaHandshake, FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Agent portal"
        title="Listings, agreements, and client search"
        description="Manage properties on behalf of landlords and help tenants find the right home through CIL Properties."
      />

      <HeroPanel
        eyebrow="Your pipeline"
        title="Connect landlords and renters faster."
        description="Use the shared property search map to match clients with accurate locations."
        actions={
          <Link
            href="/tenant/properties"
            className="inline-flex rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-primary-950 hover:bg-accent-500"
          >
            Open property search
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ActionCard href="/tenant/properties" icon={<FaMapMarkerAlt />} label="Search" description="Explore properties" />
        <ActionCard href="/agent/listings" icon={<FaBuilding />} label="My listings" description="Manage your units" />
        <ActionCard href="/agent/applications" icon={<FaClipboardList />} label="Applications" description="Track client requests" />
        <ActionCard href="/agent/profile" icon={<FaHandshake />} label="Profile" description="Update your credentials" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatPanel label="Active listings" value="6" icon={<FaBuilding />} />
        <StatPanel label="Applications" value="3" icon={<FaClipboardList />} />
        <StatPanel label="Agreements pending" value="2" icon={<FaHandshake />} />
        <StatPanel label="Areas covered" value="Lagos" icon={<FaMapMarkerAlt />} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/tenant/properties", label: "Search properties", desc: "Map + filters" },
          { href: "/agent/listings", label: "My listings", desc: "Units you represent" },
          { href: "/agent/applications", label: "Applications", desc: "Track client applies" },
          { href: "/agent/profile", label: "Profile & license", desc: "Credentials" },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Panel hover padding="md" className="h-full">
              <p className="font-semibold text-primary-900">{item.label}</p>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
