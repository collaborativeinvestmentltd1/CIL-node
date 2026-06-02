import React from 'react';

export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Unverified: 'bg-rose-50 text-rose-700',
    'Pending Review': 'bg-amber-50 text-amber-700',
    Verified: 'bg-emerald-50 text-emerald-700',
    Rejected: 'bg-rose-50 text-rose-700',
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
}
