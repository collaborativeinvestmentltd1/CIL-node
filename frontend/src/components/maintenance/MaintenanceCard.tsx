"use client";
import React from "react";
import { FaRegClock, FaUser, FaTools } from "react-icons/fa";

export default function MaintenanceCard({ item }: { item: any }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary-900">{item.title}</p>
          <p className="text-xs text-slate-500">{item.property}</p>
        </div>
        <div className="text-sm text-slate-500">{item.due}</div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-3 py-1 text-slate-700">{item.status}</span>
          <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-3 py-1 text-slate-700"><FaUser /> {item.assignee || 'Unassigned'}</span>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-slate-500">{item.images?.length || 0} attachments</div>
      </div>
    </div>
  );
}
