"use client";
import React from "react";

export default function MaintenanceTimeline({ events }: { events: any[] }) {
  return (
    <div className="space-y-4">
      {events.map((e, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-accent-500" />
          <div>
            <p className="text-sm font-semibold text-primary-900">{e.title}</p>
            <p className="text-xs text-slate-500">{e.detail} · {e.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
