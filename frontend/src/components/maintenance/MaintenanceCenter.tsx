"use client";
import React from "react";
import MaintenanceCard from "@/components/maintenance/MaintenanceCard";
import MaintenanceTimeline from "@/components/maintenance/MaintenanceTimeline";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/form";

export default function MaintenanceCenter({ role }: { role: 'admin'|'owner'|'tenant' }) {
  const items = [
    { title: 'Water pump repair — Unit 3A', property: 'Ikoyi Luxury Suites', status: 'In Progress', due: 'Today', assignee: 'John', images: [1] },
    { title: 'AC service — Lekki Riverside', property: 'Lekki Riverside Villas', status: 'Assigned', due: 'Tomorrow', assignee: 'Pending', images: [] },
  ];

  const timeline = [
    { title: 'Request submitted', detail: 'Tenant reported leak', date: 'May 28' },
    { title: 'Assigned to contractor', detail: 'Assigned to QuickFix Ltd', date: 'May 29' },
  ];

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Maintenance operations</p>
            <h2 className="mt-2 text-2xl font-semibold text-primary-900">Manage requests & repairs</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button>New request</Button>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <MaintenanceCard key={it.title} item={it} />
          ))}
        </div>
        <div className="space-y-4">
          <Panel>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Timeline</p>
            <MaintenanceTimeline events={timeline} />
          </Panel>

          <Panel>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
            <div className="mt-3 flex flex-col gap-2">
              <Button>Assign contractor</Button>
              <Button variant="outline">Mark completed</Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
