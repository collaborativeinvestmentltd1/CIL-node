"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navItems = [
  { href: "/dashboard/tenant", label: "Tenant", icon: FaHome },
  { href: "/dashboard/admin", label: "Admin", icon: FaUsers },
  { href: "/dashboard/corporate", label: "Corporate", icon: FaBuilding },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="relative z-20">
      <div className="md:hidden px-4 py-4 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Workspace</p>
          <h2 className="text-xl font-semibold text-primary-900">CIL Admin</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-primary-900"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="fixed inset-y-0 left-0 w-72 bg-primary-950 text-white border-r border-primary-800 shadow-2xl md:static md:translate-x-0 md:shadow-none"
      >
        <div className="hidden md:flex flex-col h-full py-10 px-6">
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-3xl bg-accent-600 flex items-center justify-center text-primary-950 text-lg font-bold">
                C
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-accent-300">Collaborative</p>
                <h1 className="text-2xl font-semibold">Investment Ltd</h1>
              </div>
            </div>
            <p className="text-sm text-slate-300">Central control for properties, teams, and payments.</p>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-100 hover:bg-white/10 transition"
              >
                <item.icon className="text-accent-400" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 p-4 rounded-3xl border border-white/10 bg-white/5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">Active user</p>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-accent-600 flex items-center justify-center text-primary-950 font-semibold">JD</div>
              <div>
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-slate-400">Portfolio Manager</p>
              </div>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white">
              <FaSignOutAlt /> Sign out
            </button>
          </div>
        </div>

        <div className="md:hidden bg-primary-950 h-full p-6">
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-3xl bg-accent-600 flex items-center justify-center text-primary-950 text-lg font-bold">
                C
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-accent-300">Collaborative</p>
                <h1 className="text-xl font-semibold">Investment Ltd</h1>
              </div>
            </div>
            <p className="text-sm text-slate-300">Central control for properties, teams, and payments.</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-100 hover:bg-white/10 transition"
              >
                <item.icon className="text-accent-400" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </aside>
  );
}
