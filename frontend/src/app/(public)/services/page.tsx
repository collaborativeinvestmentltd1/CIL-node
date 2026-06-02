"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaBuilding, FaUsers, FaCreditCard, FaTools, FaChartLine, FaShieldAlt } from "react-icons/fa";

const services = [
  {
    icon: FaBuilding,
    title: "Property Listings & Management",
    description: "List every asset with rich details, status tracking, and lease controls.",
    features: ["Portfolio dashboard", "Property snapshots", "Availability calendar", "Lease renewals"],
  },
  {
    icon: FaUsers,
    title: "Tenant Onboarding & Verification",
    description: "Move tenants from application to occupancy with speed and compliance.",
    features: ["Smart applications", "Document capture", "Automated screening", "Real-time status updates"],
  },
  {
    icon: FaCreditCard,
    title: "Secure Rent Payments",
    description: "Collect rent and deposits through Paystack with automatic receipts.",
    features: ["Instant payment confirmation", "Receipt automation", "History reports", "Reminders & late fees"],
  },
  {
    icon: FaTools,
    title: "Service Request Management",
    description: "Capture maintenance reports and close requests with visibility.",
    features: ["Tenant ticketing", "Photo uploads", "Team assignments", "Resolution tracking"],
  },
  {
    icon: FaChartLine,
    title: "Reporting & Analytics",
    description: "Understand occupancy, cash flow, and operational performance.",
    features: ["Revenue dashboards", "Tenant analytics", "Custom exports", "Trend forecasting"],
  },
  {
    icon: FaShieldAlt,
    title: "Corporate Portfolio Controls",
    description: "Manage teams, permissions, and multi-property workflows in one place.",
    features: ["User roles", "Bulk operations", "Audit logs", "API-ready integrations"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(230,163,30,0.18),_transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-accent-200 mb-4">Solutions</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">Services for modern property operations.</h1>
            <p className="mt-6 text-base text-slate-200 max-w-2xl leading-7">
              Whether you manage units or growing portfolios, CIL Properties gives you a faster, safer path to scale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-lg"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-100 text-accent-700 text-2xl mb-6">
                  <service.icon />
                </div>
                <h2 className="text-2xl font-semibold text-primary-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 leading-7 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Everything your property business needs</h2>
          <p className="text-lg text-slate-200 mb-10 max-w-2xl mx-auto">
            Launch faster, manage smarter, and give tenants the modern experience they expect.
          </p>
          <Link href="/auth/signup" className="inline-flex items-center justify-center rounded-full bg-accent-600 px-8 py-4 text-base font-semibold text-primary-950 shadow-lg shadow-accent-500/20 hover:bg-accent-500 transition">
            Start your free trial
          </Link>
        </div>
      </section>
    </>
  );
}
