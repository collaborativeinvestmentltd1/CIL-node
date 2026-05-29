"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaUserCircle,
  FaMapMarkerAlt,
  FaHandshake,
  FaDollarSign,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
} from "react-icons/fa";
import ProfileAvatar from "@/components/ui/ProfileAvatar";

interface SidebarProps {
  userType?: "tenant" | "landlord" | "admin" | "agent" | "realEstate";
}

const navItemsByRole = {
  tenant: [
    { href: "/dashboard/tenant", label: "Dashboard", icon: FaHome },
    { href: "/dashboard/tenant/properties", label: "Properties", icon: FaMapMarkerAlt },
    { href: "/dashboard/tenant/applications", label: "Applications", icon: FaUsers },
    { href: "/dashboard/tenant/profile", label: "Profile", icon: FaUserCircle },
  ],
  landlord: [
    { href: "/dashboard/landlord", label: "Dashboard", icon: FaHome },
    { href: "/dashboard/landlord/properties", label: "My Properties", icon: FaBuilding },
    { href: "/dashboard/landlord/tenants", label: "Tenants", icon: FaUsers },
    { href: "/dashboard/landlord/agents", label: "Agents", icon: FaHandshake },
    { href: "/dashboard/landlord/earnings", label: "Earnings", icon: FaDollarSign },
    { href: "/dashboard/landlord/profile", label: "Profile", icon: FaUserCircle },
  ],
  agent: [
    { href: "/dashboard/agent", label: "Dashboard", icon: FaHome },
    { href: "/dashboard/agent/listings", label: "Listings", icon: FaMapMarkerAlt },
    { href: "/dashboard/agent/agreements", label: "Agreements", icon: FaHandshake },
    { href: "/dashboard/agent/earnings", label: "Earnings", icon: FaDollarSign },
    { href: "/dashboard/agent/profile", label: "Profile", icon: FaUserCircle },
  ],
  realEstate: [
    { href: "/dashboard/real-estate", label: "Dashboard", icon: FaHome },
    { href: "/dashboard/real-estate/kycVerification", label: "KYC", icon: FaChartLine },
    { href: "/dashboard/real-estate/commission", label: "Commission", icon: FaDollarSign },
    { href: "/dashboard/real-estate/settings", label: "Settings", icon: FaUserCircle },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: FaHome },
    { href: "/dashboard/admin/users", label: "Users", icon: FaUsers },
    { href: "/dashboard/admin/properties", label: "Properties", icon: FaBuilding },
    { href: "/dashboard/admin/kyc", label: "KYC Verification", icon: FaChartLine },
    { href: "/dashboard/admin/payments", label: "Payments", icon: FaDollarSign },
  ],
};

export default function Sidebar({ userType = "tenant" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = navItemsByRole[userType] || navItemsByRole.tenant;
  const userInitials = "JD";

  const roleDisplay = {
    tenant: "Tenant",
    landlord: "Landlord",
    agent: "Agent",
    realEstate: "Real Estate",
    admin: "Administrator",
  };

  return (
    <aside className="relative z-20">
      <div className="md:hidden px-4 py-4 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Role</p>
          <h2 className="text-lg font-semibold text-primary-900">{roleDisplay[userType]}</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-primary-900"
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
        <div className="hidden md:flex flex-col h-full py-8 px-6">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 hover:opacity-80 transition">
              <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center text-primary-950 text-lg font-bold shadow-lg">
                C
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent-300 font-semibold">CIL</p>
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
            </Link>
            <p className="text-xs text-slate-300 mt-2">
              {roleDisplay[userType]} Portal
            </p>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-100 hover:bg-white/10 transition-colors group"
              >
                <item.icon className="text-accent-400 group-hover:text-accent-300 transition-colors" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-3">Active user</p>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full overflow-hidden">
                {/* Profile avatar component handles upload and preview */}
                <ProfileAvatar size={44} />
              </div>
              <div>
                <p className="text-sm font-semibold">User Name</p>
                <p className="text-xs text-slate-400">{roleDisplay[userType]}</p>
              </div>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white transition-colors group w-full">
              <FaSignOutAlt className="group-hover:animate-pulse" /> Sign out
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-primary-950 h-full flex flex-col p-6 overflow-y-auto">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-accent-600 flex items-center justify-center text-primary-950 font-bold">
                C
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent-300">CIL</p>
                <h1 className="text-lg font-bold">Dashboard</h1>
              </div>
            </Link>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-white/10 transition"
              >
                <item.icon className="text-accent-400" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg overflow-hidden">
                <ProfileAvatar size={40} />
              </div>
              <div>
                <p className="text-sm font-semibold">User</p>
                <p className="text-xs text-slate-400">{roleDisplay[userType]}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-sm text-slate-200 hover:text-white w-full">
              <FaSignOutAlt /> Sign out
            </button>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
