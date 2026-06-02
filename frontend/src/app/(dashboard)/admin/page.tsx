"use client";

import Link from "next/link";
import { FaBuilding, FaClipboardList, FaDollarSign, FaUsers } from "react-icons/fa";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionCard, HeroPanel, Panel, StatPanel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/form";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administration"
        title="Operations overview"
        description="Monitor users, properties, and review queues across the platform."
        actions={<Button variant="secondary">Review alerts</Button>}
      />

      <HeroPanel
        eyebrow="Platform health"
        title="Keep approvals and onboarding moving."
        description="Centralized reviews, status updates, and operational visibility for CIL Properties."
        actions={
          <Link href="/admin/applications">
            <Button variant="secondary">Open review queue</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ActionCard href="/admin/users" icon={<FaUsers />} label="Users" description="Manage accounts" />
        <ActionCard href="/admin/properties" icon={<FaBuilding />} label="Properties" description="Review listings" />
        <ActionCard href="/admin/applications" icon={<FaClipboardList />} label="Applications" description="Process approvals" />
        <ActionCard href="/admin/payments" icon={<FaDollarSign />} label="Payments" description="Monitor revenue" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatPanel label="Total users" value="1,247" icon={<FaUsers />} hint="Demo data" />
        <StatPanel label="Properties" value="523" icon={<FaBuilding />} hint="Demo data" />
        <StatPanel label="Pending applications" value="45" icon={<FaClipboardList />} />
        <StatPanel label="Monthly revenue" value="₦125.5M" icon={<FaDollarSign />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel padding="lg" className="space-y-4">
          <h2 className="text-lg font-semibold text-primary-900">Recent signups</h2>
          <div className="space-y-3">
            {[
              { name: "Chioma Okonkwo", role: "Landlord", note: "Joined 2 hours ago" },
              { name: "Ibrahim Hassan", role: "Tenant", note: "Joined 1 day ago" },
              { name: "Ada Nwankwo", role: "Tenant", note: "Joined 3 days ago" },
            ].map((user) => (
              <div key={user.name} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <div>
                  <p className="font-medium text-primary-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.role} · {user.note}</p>
                </div>
                <button type="button" className="text-sm font-medium text-accent-700 hover:text-accent-800">
                  View
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel padding="lg" className="space-y-4">
          <h2 className="text-lg font-semibold text-primary-900">Review queue</h2>
          <div className="space-y-3">
            {[
              { applicant: "John Doe", property: "Ikoyi Apartment", status: "Under review" },
              { applicant: "Mary Akin", property: "Lekki Duplex", status: "Needs documents" },
            ].map((item) => (
              <div key={item.applicant} className="rounded-lg border border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-primary-900">{item.applicant}</p>
                    <p className="text-xs text-slate-500">{item.property}</p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="secondary">Review all</Button>
            <Button variant="outline">Export CSV</Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
