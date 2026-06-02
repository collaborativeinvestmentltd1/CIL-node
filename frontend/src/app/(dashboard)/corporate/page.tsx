"use client";

import { FaBuilding, FaChartBar, FaCreditCard, FaUsers } from "react-icons/fa";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionCard, HeroPanel, Panel, StatPanel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/form";

export default function CorporateDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Portfolio management"
        title="Enterprise property overview"
        description="Track occupancy, revenue, and activity across your managed assets."
        actions={<Button variant="secondary">New portfolio report</Button>}
      />

      <HeroPanel
        eyebrow="Portfolio performance"
        title="Manage multi-property operations with precision."
        description="Designed for professional landlords and portfolio teams on CIL Properties."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ActionCard href="/corporate/properties" icon={<FaBuilding />} label="Managed assets" description="Review your portfolio" />
        <ActionCard href="/corporate/reports" icon={<FaChartBar />} label="Reports" description="See performance trends" />
        <ActionCard href="/corporate" icon={<FaUsers />} label="Team insights" description="Monitor staff activity" />
        <ActionCard href="/corporate" icon={<FaCreditCard />} label="Revenue" description="Track monthly income" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatPanel label="Properties managed" value="24" icon={<FaBuilding />} hint="Demo data" />
        <StatPanel label="Monthly revenue" value="₦12.5M" icon={<FaCreditCard />} />
        <StatPanel label="Occupancy rate" value="95%" icon={<FaUsers />} />
        <StatPanel label="Portfolio growth" value="+28%" icon={<FaChartBar />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel padding="lg" className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-primary-900">Top properties</h2>
          <div className="space-y-3">
            {[
              { title: "Ikoyi Luxury Apartments", metric: "₦4M/mo", note: "100% occupied" },
              { title: "Lekki Business Complex", metric: "₦2.5M/mo", note: "80% occupied" },
              { title: "Abuja Residential Hub", metric: "₦3.2M/mo", note: "90% occupied" },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <div>
                  <p className="font-medium text-primary-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.note}</p>
                </div>
                <p className="text-sm font-semibold text-primary-900">{item.metric}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel padding="lg" className="space-y-4">
          <h2 className="text-lg font-semibold text-primary-900">Recent activity</h2>
          <div className="space-y-3">
            {[
              { title: "Payment received", detail: "₦500,000 from Unit 5B", time: "2 hours ago" },
              { title: "Tenant onboarded", detail: "Chioma Okonkwo · Unit 3A", time: "Yesterday" },
              { title: "Maintenance request", detail: "Unit 7C service ticket", time: "1 day ago" },
            ].map((event) => (
              <div key={event.title} className="rounded-lg border border-slate-200 px-4 py-3">
                <p className="font-medium text-primary-900">{event.title}</p>
                <p className="text-sm text-slate-500">{event.detail}</p>
                <p className="mt-1 text-xs text-slate-400">{event.time}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
