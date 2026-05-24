"use client";

import { FaDollarSign, FaBell } from "react-icons/fa";

export default function TenantDashboard() {
  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] bg-gradient-to-r from-primary-700 to-primary-900 p-10 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Tenant dashboard</p>
            <h1 className="mt-4 text-4xl font-bold">Welcome back, John.</h1>
            <p className="mt-3 max-w-2xl text-slate-200">Your active applications, upcoming payments, and support tickets are all in one place.</p>
          </div>
          <button className="inline-flex items-center gap-3 rounded-full bg-accent-600 px-6 py-4 text-sm font-semibold text-primary-950 shadow-lg shadow-accent-500/30 hover:bg-accent-500 transition">
            <FaBell /> Recent updates
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Active applications</p>
          <p className="mt-4 text-4xl font-bold text-primary-900">2</p>
          <p className="mt-2 text-slate-600">Applications currently in review or approval.</p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Next payment</p>
          <p className="mt-4 text-4xl font-bold text-primary-900">₦500,000</p>
          <p className="mt-2 text-slate-600">Due June 1, 2024</p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Notifications</p>
          <p className="mt-4 text-4xl font-bold text-accent-600">3</p>
          <p className="mt-2 text-slate-600">Requests and approvals needing your attention.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">My applications</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Latest activity</h2>
            </div>
            <span className="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">Priority</span>
          </div>
          <div className="space-y-5">
            {[
              {
                title: "Modern 3-Bed Apartment",
                detail: "Ikoyi, Lagos • ₦500,000/mo",
                status: "Under review",
                color: "bg-yellow-50 text-yellow-700",
              },
              {
                title: "Duplex in Lekki",
                detail: "Lekki, Lagos • ₦450,000/mo",
                status: "Approved",
                color: "bg-green-50 text-green-700",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-primary-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.detail}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.color}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700">
            View all applications →
          </button>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Payment history</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Recent transactions</h2>
            </div>
            <FaDollarSign className="text-2xl text-primary-600" />
          </div>
          <div className="space-y-4">
            {[
              { date: "May 2024", label: "Rent payment", amount: "₦500,000" },
              { date: "April 2024", label: "Rent payment", amount: "₦500,000" },
              { date: "March 2024", label: "Rent payment", amount: "₦500,000" },
            ].map((item) => (
              <div key={item.date} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 p-4">
                <div>
                  <p className="font-semibold text-primary-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <p className="font-semibold text-slate-700">{item.amount}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-900 hover:text-primary-700">
            Download receipts →
          </button>
        </div>
      </div>

      <div className="rounded-[2rem] bg-accent-50 p-8 shadow-sm border border-accent-100">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-accent-700">Need help?</p>
            <h2 className="mt-3 text-2xl font-semibold text-primary-900">Ask our support team to follow up on your request.</h2>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition">
            Get support
          </button>
        </div>
      </div>
    </div>
  );
}
