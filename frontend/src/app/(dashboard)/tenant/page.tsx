"use client";

import Link from "next/link";
import { FaDollarSign, FaBell, FaClipboardList, FaUserCircle, FaFileUpload, FaSearch, FaUsers } from "react-icons/fa";
import Billboard from "@/components/common/Billboard";
import { ActionCard, Panel } from "@/components/ui/Panel";

export default function TenantDashboard() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-primary-700 to-primary-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-200">Tenant hub</p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Welcome back.</h1>
            <p className="text-sm sm:text-base text-slate-200 leading-7">
              Track rent, lease details, landlords, and property search from one place.
            </p>
          </div>
          <button className="inline-flex items-center gap-3 rounded-full bg-accent-600 px-6 py-4 text-sm font-semibold text-primary-950 shadow-lg shadow-accent-500/30 hover:bg-accent-500 transition">
            <FaBell /> Recent updates
          </button>
        </div>
      </div>

      <Billboard title="Message from landlord" message="Hi John — water maintenance scheduled for Unit 3A on June 2. Expect brief downtime." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ActionCard href="/tenant/profile" icon={<FaUserCircle />} label="Profile" description="Update your details" />
        <ActionCard href="/tenant/profile" icon={<FaFileUpload />} label="Documents" description="Upload verification files" />
        <ActionCard href="/tenant/properties" icon={<FaSearch />} label="Search homes" description="Browse available listings" />
        <ActionCard href="/tenant/landlords" icon={<FaUsers />} label="Landlords" description="View your contacts" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Your landlords</p>
          <h2 className="mt-3 text-2xl font-semibold text-primary-900">All your landlord relationships</h2>
          <p className="mt-2 text-slate-600">See every landlord you rent from, check your active agreements, and message them directly from one place.</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-primary-900">Adeola Holdings</p>
              <p className="mt-1 text-sm text-slate-500">Lekki • Last payment May 2</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-primary-900">Greenway Property</p>
              <p className="mt-1 text-sm text-slate-500">Ikoyi • Lease active</p>
            </div>
          </div>
          <Link href="/tenant/landlords" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition">
            View landlords
          </Link>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
          <h2 className="mt-3 text-2xl font-semibold text-primary-900">Keep your tenant workflow moving</h2>
          <div className="mt-6 grid gap-4">
            <Link href="/tenant/profile" className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-primary-900 hover:bg-slate-100 transition">
              Review your verification documents
            </Link>
            <Link href="/tenant/landlords" className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-primary-900 hover:bg-slate-100 transition">
              Message a landlord directly
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Active applications</p>
          <p className="mt-4 text-4xl font-bold text-primary-900">2</p>
          <p className="mt-2 text-slate-600">Applications that are waiting for the next update.</p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Next payment</p>
          <p className="mt-4 text-4xl font-bold text-primary-900">₦500,000</p>
          <p className="mt-2 text-slate-600">Due June 1, 2024</p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Notifications</p>
          <p className="mt-4 text-4xl font-bold text-accent-600">3</p>
          <p className="mt-2 text-slate-600">Messages, approvals, and action items you can respond to now.</p>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Property explorer</p>
            <h2 className="mt-3 text-2xl font-semibold text-primary-900">Homes you can apply for</h2>
          </div>
          <Link href="/tenant/properties" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-primary-900 hover:bg-slate-50 transition">
            Browse all properties
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Lekki Studio", location: "Lekki, Lagos", price: "₦320,000/mo" },
            { title: "Victoria Island Loft", location: "VI, Lagos", price: "₦420,000/mo" },
            { title: "Gwarinpa Townhome", location: "Abuja", price: "₦280,000/mo" },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 p-5 hover:shadow-lg transition">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.location}</p>
              <p className="mt-3 text-xl font-semibold text-primary-900">{item.title}</p>
              <p className="mt-2 text-slate-600">{item.price}</p>
            </div>
          ))}
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
            See application details →
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

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Lease summary</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Your current lease</h2>
            </div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-100 text-2xl text-accent-700">
              <span>🏠</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Property</p>
              <p className="mt-2 text-lg font-semibold text-primary-900">Modern 3-Bed Apartment</p>
              <p className="text-sm text-slate-500">Ikoyi, Lagos</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Rent", value: "₦500,000/mo" },
                { label: "Lease ends", value: "Nov 2024" },
                { label: "Status", value: "Active" },
                { label: "Balance", value: "₦0" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-primary-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Support requests</p>
              <h2 className="mt-3 text-2xl font-semibold text-primary-900">Open tickets</h2>
            </div>
            <FaClipboardList className="text-2xl text-primary-600" />
          </div>
          <div className="space-y-4">
            {[
              { title: "Request maintenance", detail: "Water pump issue in Unit 3A", status: "Open" },
              { title: "Lease document", detail: "Signed agreement uploaded", status: "Completed" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-primary-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.detail}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Open" ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800 transition">
            Send a support note
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
            Ask for help
          </button>
        </div>
      </div>
    </div>
  );
}
