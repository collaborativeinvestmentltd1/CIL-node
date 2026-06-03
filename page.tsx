"use client";

import { FaBuilding, FaUsers, FaDollarSign, FaTools, FaBell, FaChartLine, FaArrowUp, FaArrowDown, FaRegCalendarCheck, FaChartPie, FaRegClock } from "react-icons/fa";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionCard, Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/form";

const kpis = [
  {
    label: "Properties Managed",
    value: "18",
    icon: <FaBuilding className="h-5 w-5" />,
    detail: "Across 4 portfolios",
  },
  {
    label: "Occupancy Rate",
    value: "92%",
    icon: <FaChartPie className="h-5 w-5" />,
    detail: "Stable this month",
  },
  {
    label: "Monthly Revenue",
    value: "â‚¦12.2M",
    icon: <FaDollarSign className="h-5 w-5" />,
    detail: "+8.4% vs last month",
  },
  {
    label: "Open Maintenance Requests",
    value: "9",
    icon: <FaTools className="h-5 w-5" />,
    detail: "3 urgent issues",
  },
];

const properties = [
  {
    name: "Ikoyi Luxury Suites",
    occupancy: 96,
    trend: "+4.2%",
    revenue: "â‚¦4.1M",
    status: "High demand",
  },
  {
    name: "Lekki Riverside Villas",
    occupancy: 88,
    trend: "-1.1%",
    revenue: "â‚¦2.7M",
    status: "Under renovation",
  },
  {
    name: "Abuja Executive Plaza",
    occupancy: 94,
    trend: "+2.8%",
    revenue: "â‚¦3.4M",
    status: "Strong leasing",
  },
];

const maintenanceItems = [
  {
    title: "Water pump repair â€” Unit 3A",
    property: "Ikoyi Luxury Suites",
    status: "In progress",
    badge: "Urgent",
    due: "Today",
  },
  {
    title: "AC service â€” Lekki Riverside",
    property: "Lekki Riverside Villas",
    status: "Pending assignment",
    badge: "High",
    due: "Tomorrow",
  },
  {
    title: "Roof inspection â€” Abuja Plaza",
    property: "Abuja Executive Plaza",
    status: "Scheduled",
    badge: "Medium",
    due: "Jun 6",
  },
];

const payments = [
  { tenant: "Chioma Okonkwo", property: "Ikoyi Luxury Suites", amount: "â‚¦520,000", status: "Paid", date: "May 28" },
  { tenant: "Ibrahim Hassan", property: "Lekki Riverside Villas", amount: "â‚¦420,000", status: "Pending", date: "May 30" },
  { tenant: "Ada Nwankwo", property: "Abuja Executive Plaza", amount: "â‚¦640,000", status: "Paid", date: "May 25" },
];

const applications = [
  { name: "Tunde Ade", property: "Lekki Riverside Villas", status: "Under review", date: "May 31" },
  { name: "Sade Bello", property: "Ikoyi Luxury Suites", status: "Awaiting documents", date: "May 30" },
];

const notifications = [
  { message: "Lease renewal due for Unit 7B in 14 days.", type: "Renewal" },
  { message: "New verification documents uploaded by tenant.", type: "Verification" },
  { message: "2 maintenance requests require scheduling.", type: "Operations" },
];

export default function LandlordDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Property owner dashboard"
        title="Your portfolio at a glance"
        description="Track occupancy, revenue, property performance and maintenance in one professional owner view."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">View portfolio report</Button>
            <Button>New property listing</Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ActionCard href="/landlord/properties" icon={<FaBuilding />} label="Properties" description="Manage assets" />
        <ActionCard href="/landlord/tenants" icon={<FaUsers />} label="Tenants" description="View occupants" />
        <ActionCard href="/landlord/payments" icon={<FaDollarSign />} label="Payments" description="Track cashflow" />
        <ActionCard href="/landlord/requests" icon={<FaTools />} label="Requests" description="Review maintenance" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <Panel key={item.label} className="space-y-4 border-0 bg-slate-950 text-white shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-600/10 text-accent-300">
                {item.icon}
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
                {item.label}
              </span>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight text-white">{item.value}</p>
              <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1.2fr]">
        <div className="space-y-6">
          <Panel className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Property performance</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary-900">Top assets by revenue</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">All properties</Button>
                <Button variant="secondary">Export report</Button>
              </div>
            </div>

            <div className="space-y-4">
              {properties.map((item) => (
                <div key={item.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.name}</p>
                      <h3 className="mt-2 text-xl font-semibold text-primary-900">{item.status}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                        <FaArrowUp className={item.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"} />
                        {item.trend}
                      </span>
                      <span>{item.revenue} / month</span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Occupancy</p>
                      <p className="mt-2 text-xl font-semibold text-primary-900">{item.occupancy}%</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Revenue</p>
                      <p className="mt-2 text-xl font-semibold text-primary-900">{item.revenue}</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Status</p>
                      <p className="mt-2 text-xl font-semibold text-primary-900">{item.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Occupancy overview</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary-900">Portfolio occupancy</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">92% occupied</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Overall occupancy</span>
                  <span>92%</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[92%] rounded-full bg-accent-500" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Vacancy</p>
                  <p className="mt-3 text-2xl font-semibold text-primary-900">8%</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Next renewal</p>
                  <p className="mt-3 text-2xl font-semibold text-primary-900">14 days</p>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Maintenance activity</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary-900">Ongoing requests</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">9 open</div>
            </div>
            <div className="space-y-4">
              {maintenanceItems.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-primary-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.property}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm">
                      {item.badge}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2 rounded-3xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                      <FaRegCalendarCheck className="h-4 w-4 text-accent-600" /> Due {item.due}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-3xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                      <FaRegClock className="h-4 w-4 text-primary-600" /> {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Financial summary</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary-900">Cashflow trends</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">+8.4%</span>
            </div>
            <div className="rounded-3xl bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Revenue this month</span>
                <span>â‚¦12.2M</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 rounded-3xl bg-slate-900 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Collection rate</p>
                  <p className="text-2xl font-semibold text-white">97%</p>
                </div>
                <div className="space-y-2 rounded-3xl bg-slate-900 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Operating expenses</p>
                  <p className="text-2xl font-semibold text-white">â‚¦1.6M</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                <p className="uppercase tracking-[0.24em] text-slate-500">Rent due</p>
                <p className="mt-3 text-xl font-semibold text-primary-900">â‚¦1.8M</p>
              </div>
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                <p className="uppercase tracking-[0.24em] text-slate-500">Arrears</p>
                <p className="mt-3 text-xl font-semibold text-primary-900">â‚¦240K</p>
              </div>
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                <p className="uppercase tracking-[0.24em] text-slate-500">Refunds pending</p>
                <p className="mt-3 text-xl font-semibold text-primary-900">â‚¦0</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Tenant overview</p>
              <h2 className="mt-2 text-2xl font-semibold text-primary-900">Household health</h2>
            </div>
            <Button variant="outline">View tenants</Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Active tenants</p>
              <p className="mt-3 text-3xl font-semibold text-primary-900">126</p>
              <p className="mt-2 text-sm text-slate-600">Across owner-managed units.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Tenant satisfaction</p>
              <p className="mt-3 text-3xl font-semibold text-primary-900">89%</p>
              <p className="mt-2 text-sm text-slate-600">Average rating from surveys.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-primary-900">Chioma Okonkwo</p>
                <p className="text-sm text-slate-500">Ikoyi Luxury Suites â€¢ Lease expiring Jun 30</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Good standing</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-primary-900">Ibrahim Hassan</p>
                <p className="text-sm text-slate-500">Lekki Riverside Villas â€¢ Rent due Jun 5</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">Rent due</span>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Notifications</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary-900">Recent alerts</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">3 new</div>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.message} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-700">{notification.message}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {notification.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Property information</p>
                <h2 className="mt-2 text-2xl font-semibold text-primary-900">Asset summary</h2>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Top asset</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-primary-900">Ikoyi Luxury Suites</p>
                    <p className="text-sm text-slate-500">8 units â€¢ 96% occupancy</p>
                  </div>
                  <span className="rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700">Premium</span>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Next inspection</p>
                    <p className="mt-3 text-lg font-semibold text-primary-900">Jun 12, 2026</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Confirmed</span>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

