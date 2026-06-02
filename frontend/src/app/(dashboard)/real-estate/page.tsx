"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionCard, HeroPanel, Panel, StatPanel } from "@/components/ui/Panel";
import { FaBuilding, FaSearch, FaShieldAlt, FaChartBar } from "react-icons/fa";

export default function RealEstateDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Real estate company"
        title="Company listings and compliance"
        description="Register properties under your agency, complete KYC, and search the market for portfolio opportunities."
      />

      <HeroPanel
        eyebrow="Agency workspace"
        title="Professional property operations at scale."
        description="All tools align with CIL Properties — one platform for listings, verification, and search."
        actions={
          <Link
            href="/real-estate/profile"
            className="inline-flex rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-primary-950 hover:bg-accent-500"
          >
            Complete KYC
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatPanel label="Company listings" value="12" icon={<FaBuilding />} />
        <StatPanel label="KYC status" value="In review" icon={<FaShieldAlt />} />
        <StatPanel label="Market search" value="Live" icon={<FaSearch />} />
        <StatPanel label="Commission YTD" value="₦2.1M" icon={<FaChartBar />} hint="Demo" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ActionCard href="/tenant/properties" icon={<FaSearch />} label="Market search" description="Map-based discovery" />
        <ActionCard href="/real-estate/listings" icon={<FaBuilding />} label="Company listings" description="Your inventory" />
        <ActionCard href="/real-estate/profile" icon={<FaShieldAlt />} label="Profile & documents" description="Complete verification" />
      </div>
    </div>
  );
}
