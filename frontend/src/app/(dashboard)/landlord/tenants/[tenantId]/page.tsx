"use client";

import Link from "next/link";

export default function LandlordTenantDetailPage({ params }: { params: { tenantId: string } }) {
  const { tenantId } = params;

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Tenant profile</p>
            <h1 className="mt-3 text-3xl font-bold text-primary-900">{tenantId} details</h1>
            <p className="mt-3 text-slate-600">View tenant unit details, payment history, and files sent to your landlord.</p>
          </div>
          <Link href="/landlord/tenants" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-primary-900 hover:bg-slate-100 transition">
            Back to tenants
          </Link>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Tenant</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">{tenantId} • Unit 5B</h2>
              <p className="mt-2 text-sm text-slate-600">Last payment May 2, 2026 • Verified renter</p>
            </div>
            <div className="rounded-full bg-accent-50 px-5 py-3 text-sm font-semibold text-primary-900">Balance status: ₦0</div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Payments made</p>
              <p className="mt-3 text-2xl font-semibold text-primary-900">6</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Outstanding</p>
              <p className="mt-3 text-2xl font-semibold text-primary-900">1</p>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Current lease</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Property</p>
                <p className="mt-2 text-lg font-semibold text-primary-900">Maple Apartments</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Expiry</p>
                <p className="mt-2 text-lg font-semibold text-primary-900">Nov 2026</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Documents</p>
              <ul className="mt-4 space-y-4 text-sm text-slate-700">
                <li className="rounded-3xl border border-slate-200 p-4">National ID • Verified</li>
                <li className="rounded-3xl border border-slate-200 p-4">Lease agreement • Uploaded</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-accent-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-accent-700">Next step</p>
              <p className="mt-3 text-sm text-slate-700">Review the tenant profile, confirm the unit condition report, and schedule the next payment reminder.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
