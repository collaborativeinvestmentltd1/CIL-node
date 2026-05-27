"use client";

import Link from "next/link";

export default function TenantCard({
  tenant,
  href,
}: {
  tenant: { id?: string; name: string; unit: string; lastPayment: string; docs?: string[] };
  href?: string;
}) {
  const content = (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-primary-900">{tenant.name}</p>
          <p className="text-xs text-slate-500">{tenant.unit}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-primary-900">{tenant.lastPayment}</p>
          <p className="text-xs text-slate-500">Last payment</p>
        </div>
      </div>
      <div className="mt-3 text-sm text-slate-600">
        Documents: {tenant.docs && tenant.docs.length ? tenant.docs.join(", ") : "No documents uploaded"}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
