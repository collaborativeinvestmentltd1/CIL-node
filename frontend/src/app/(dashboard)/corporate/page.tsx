"use client";

import { FaBuilding, FaUsers, FaCreditCard, FaChartBar, FaChevronRight } from "react-icons/fa";

export default function CorporateDashboard() {
  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] bg-gradient-to-r from-primary-700 to-primary-900 p-10 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-200">Corporate overview</p>
            <h1 className="mt-4 text-4xl font-bold">Manage property portfolios with precision.</h1>
            <p className="mt-3 max-w-2xl text-slate-200">Track occupancy, payments, and team activity across every asset in your portfolio.</p>
          </div>
          <button className="inline-flex items-center gap-3 rounded-full bg-accent-600 px-6 py-4 text-sm font-semibold text-primary-950 shadow-lg shadow-accent-500/30 hover:bg-accent-500 transition">
            New portfolio report
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Properties managed", value: "24", icon: FaBuilding },
          { label: "Monthly revenue", value: "₦12.5M", icon: FaCreditCard },
          { label: "Occupancy rate", value: "95%", icon: FaUsers },
          { label: "Portfolio growth", value: "+28%", icon: FaChartBar },
        ].map((item) => (
          <div key={item.label} className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-100 text-2xl text-accent-700">
              <item.icon />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-primary-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200 xl:col-span-2">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Top properties</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Best performers</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
              View all <FaChevronRight />
            </button>
          </div>
          <div className="space-y-5">
            {[
              { title: "Ikoyi Luxury Apartments", metric: "₦4M/mo", note: "100% occupied" },
              { title: "Lekki Business Complex", metric: "₦2.5M/mo", note: "80% occupied" },
              { title: "Abuja Residential Hub", metric: "₦3.2M/mo", note: "90% occupied" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-primary-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.note}</p>
                  </div>
                  <p className="text-lg font-semibold text-primary-900">{item.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Recent activity</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Latest updates</h2>
            </div>
            <FaChartBar className="text-2xl text-primary-600" />
          </div>
          <div className="space-y-4">
            {[
              { title: "Payment received", detail: "₦500,000 from Unit 5B", time: "2 hours ago" },
              { title: "Tenant onboarded", detail: "Chioma Okonkwo • Unit 3A", time: "5 hours ago" },
              { title: "Maintenance request", detail: "Unit 7C service ticket", time: "1 day ago" },
            ].map((event) => (
              <div key={event.title} className="rounded-3xl border border-slate-200 p-4">
                <p className="font-semibold text-primary-900">{event.title}</p>
                <p className="text-sm text-slate-500">{event.detail}</p>
                <p className="mt-2 text-xs text-slate-400">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
