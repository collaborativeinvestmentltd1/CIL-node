"use client";
import React, { useState } from "react";
import UploadArea from "@/components/verification/UploadArea";
import StatusBadge from "@/components/verification/StatusBadge";

export default function VerificationChecklist({ type }: { type: 'tenant'|'owner'|'property' }) {
  const itemsByType: Record<string, { key: string; label: string }[]> = {
    tenant: [
      { key: 'govId', label: 'Government ID' },
      { key: 'address', label: 'Proof of Address' },
      { key: 'employment', label: 'Employment Information' },
      { key: 'guarantor', label: 'Guarantor Information' },
    ],
    owner: [
      { key: 'govId', label: 'Government ID' },
      { key: 'ownership', label: 'Ownership Documentation' },
      { key: 'contact', label: 'Contact Verification' },
    ],
    property: [
      { key: 'ownership', label: 'Ownership Documents' },
      { key: 'inspection', label: 'Inspection Verification' },
      { key: 'location', label: 'Location Verification' },
    ],
  };

  const [uploads, setUploads] = useState<Record<string, File | null>>({});
  const items = itemsByType[type];

  return (
    <div className="space-y-4">
      {items.map((it) => (
        <div key={it.key} className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary-900">{it.label}</p>
              <p className="text-xs text-slate-500">Status: <StatusBadge status={uploads[it.key] ? 'Pending Review' : 'Unverified'} /></p>
            </div>
            <div className="w-56">
              <UploadArea accept="image/*,application/pdf" onChange={(f) => setUploads((s) => ({ ...s, [it.key]: f }))} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
