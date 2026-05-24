"use client";

import { FaUsers, FaBuilding, FaClipboardList, FaDollarSign, FaCheckCircle, FaBell } from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] bg-white p-10 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent-600">Admin overview</p>
            <h1 className="mt-4 text-4xl font-bold text-primary-900">Operations at a glance</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-4 text-sm font-semibold text-primary-950 shadow-lg shadow-accent-500/20 hover:bg-accent-500 transition">
            <FaBell /> Review alerts
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total users", value: "1,247", icon: FaUsers, accent: "text-primary-600" },
          { label: "Properties", value: "523", icon: FaBuilding, accent: "text-primary-600" },
          { label: "Pending applications", value: "45", icon: FaClipboardList, accent: "text-accent-600" },
          { label: "Monthly revenue", value: "₦125.5M", icon: FaDollarSign, accent: "text-primary-900" },
        ].map((item) => (
          <div key={item.label} className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-2xl text-accent-600">
              <item.icon />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
            <p className={`mt-4 text-3xl font-semibold ${item.accent}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Recent signups</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">New users</h2>
            </div>
            <FaUsers className="text-2xl text-accent-600" />
          </div>
          <div className="space-y-4">
            {[
              { name: "Chioma Okonkwo", role: "Corporate", note: "Joined 2 hours ago" },
              { name: "Ibrahim Hassan", role: "Tenant", note: "Joined 1 day ago" },
              { name: "Ada Nwankwo", role: "Tenant", note: "Joined 3 days ago" },
            ].map((user) => (
              <div key={user.name} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 p-4">
                <div>
                  <p className="font-semibold text-primary-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.role} • {user.note}</p>
                </div>
                <button className="text-sm font-semibold text-accent-600 hover:text-accent-700">View</button>
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700">
            View all users →
          </button>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Pending applications</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Review queue</h2>
            </div>
            <FaClipboardList className="text-2xl text-primary-600" />
          </div>
          <div className="space-y-5">
            {[
              { applicant: "John Doe", property: "Ikoyi Apartment", status: "Under review" },
              { applicant: "Mary Akin", property: "Lekki Duplex", status: "Needs documents" },
            ].map((item) => (
              <div key={item.applicant} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-primary-900">{item.applicant}</p>
                    <p className="text-xs text-slate-500">{item.property}</p>
                  </div>
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-accent-600 px-5 py-3 text-sm font-semibold text-primary-950 hover:bg-accent-500 transition">
              Review all
            </button>
            <button className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-accent-50 p-8 shadow-sm border border-accent-100">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-primary-900">Keep approvals moving.</h2>
            <p className="text-slate-600">Approve applications faster with centralized reviews and instant status updates.</p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition">
            Review queue
          </button>
        </div>
      </div>
    </div>
  );
}
