"use client";

import Link from "next/link";

export default function TenantLandlordDetailPage({ params }: { params: { landlordId: string } }) {
  const { landlordId } = params;
  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Landlord profile</p>
            <h1 className="mt-3 text-3xl font-bold text-primary-900">{landlordId} details</h1>
            <p className="mt-3 text-slate-600">Review landlord contact info, payment history, and agreement status in one place.</p>
          </div>
          <Link href="/tenant/landlords" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-primary-900 hover:bg-slate-100 transition">
            Back to landlords
          </Link>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Profile</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">{landlordId} Property Partner</h2>
              <p className="mt-2 text-sm text-slate-600">Lekki, Lagos • Verified landlord</p>
            </div>
            <div className="rounded-full bg-accent-50 px-5 py-3 text-sm font-semibold text-primary-900">4 active agreements</div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Open payments</p>
              <p className="mt-3 text-2xl font-semibold text-primary-900">2</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Lease expiry</p>
              <p className="mt-3 text-2xl font-semibold text-primary-900">Nov 2026</p>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Featured property</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl overflow-hidden bg-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" alt="Property image" className="h-48 w-full object-cover" />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-slate-500">Maple Apartments</p>
                <h3 className="text-xl font-semibold text-primary-900">3-bed Lekki unit</h3>
                <p className="text-sm text-slate-600">Comfortable apartment with backup power, secure parking, and quick access to shopping.</p>
                <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">Rent: ₦220,000/mo • Status: Active</div>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Recent payments</p>
              <ul className="mt-4 space-y-4 text-sm text-slate-700">
                <li className="rounded-3xl border border-slate-200 p-4">
                  <p className="font-semibold text-primary-900">₦220,000 paid</p>
                  <p className="mt-1 text-slate-500">June 1, 2026 • Complete</p>
                </li>
                <li className="rounded-3xl border border-slate-200 p-4">
                  <p className="font-semibold text-primary-900">₦180,000 due</p>
                  <p className="mt-1 text-slate-500">July 5, 2026 • Outstanding</p>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl bg-accent-50 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-accent-700">Key actions</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>Send a message to the landlord.</li>
                <li>Confirm the next inspection date.</li>
                <li>Review your lease documents.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
