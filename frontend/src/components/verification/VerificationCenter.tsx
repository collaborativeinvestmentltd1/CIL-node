"use client";
import React from "react";
import VerificationChecklist from "@/components/verification/VerificationChecklist";
import StatusBadge from "@/components/verification/StatusBadge";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/form";

export default function VerificationCenter({ role }: { role: 'tenant'|'owner'|'admin' }) {
  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Verification center</p>
            <h2 className="mt-2 text-2xl font-semibold text-primary-900">Verification status</h2>
            <p className="mt-2 text-sm text-slate-600">Manage and review verification documents for {role === 'admin' ? 'users and properties' : role}.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Export report</Button>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Panel>
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Checklist</p>
              <StatusBadge status="Pending Review" />
            </div>
            <div className="mt-4">
              <VerificationChecklist type={role === 'owner' ? 'owner' : role === 'tenant' ? 'tenant' : 'tenant'} />
            </div>
          </Panel>

          <Panel>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">History</p>
            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-medium text-primary-900">Chioma Okonkwo uploaded ID</p>
                <p className="text-xs text-slate-500">May 28 • Status: <StatusBadge status="Pending Review" /></p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Queue</p>
            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary-900">5 pending tenant verifications</p>
                    <p className="text-xs text-slate-500">Review required</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Review</Button>
                    <Button>Assign</Button>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="outline">Request more docs</Button>
              <Button>Mark verified</Button>
              <Button variant="secondary">Flag for review</Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
