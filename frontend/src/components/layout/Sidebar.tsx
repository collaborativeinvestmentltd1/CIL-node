"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaUserCircle,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaClipboardList,
  FaCreditCard,
  FaTools,
  FaSearch,
  FaChartBar,
  FaHandshake,
  FaTimes,
  FaFileAlt,
  FaBell,
  FaMoneyBillWave,
  FaArrowUp,
  FaShieldAlt,
  FaTruck,
  FaRegCalendarAlt,
  FaWallet,
} from "react-icons/fa";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { clearSession, getStoredUser } from "@/lib/auth";
import { useAppRouter } from "@/lib/navigation";
import type { SidebarRole } from "@/lib/routes";
import clsx from "clsx";

interface SidebarProps {
  userType?: SidebarRole;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navItemsByRole: Record<
  SidebarRole,
  { href: string; label: string; icon: typeof FaHome }[]
> = {
  tenant: [
    { href: "/tenant", label: "Dashboard", icon: FaHome },
    { href: "/tenant/properties", label: "Browse Properties", icon: FaSearch },
    { href: "/tenant/applications", label: "My Applications", icon: FaClipboardList },
    { href: "/tenant/landlords", label: "My Home", icon: FaHome },
    { href: "/tenant/payments", label: "Rent Payments", icon: FaCreditCard },
    { href: "/tenant/requests", label: "Maintenance Requests", icon: FaTools },
    { href: "/tenant/relocation", label: "Relocation", icon: FaTruck },
    { href: "/tenant/benefits", label: "Benefits", icon: FaShieldAlt },
    { href: "/tenant/documents", label: "Documents", icon: FaFileAlt },
    { href: "/tenant/profile", label: "Profile", icon: FaUserCircle },
  ],
  landlord: [
    { href: "/landlord", label: "Dashboard", icon: FaHome },
    { href: "/landlord/properties", label: "My Properties", icon: FaBuilding },
    { href: "/landlord/tenants", label: "My Tenants", icon: FaUsers },
    { href: "/landlord/agreements", label: "Lease Agreements", icon: FaClipboardList },
    { href: "/landlord/payments", label: "Rent & Income", icon: FaMoneyBillWave },
    { href: "/landlord/maintenance", label: "Maintenance", icon: FaTools },
    { href: "/landlord/capp", label: "CAPP Program", icon: FaChartBar },
    { href: "/landlord/upgrade-financing", label: "Upgrade Financing", icon: FaArrowUp },
    { href: "/landlord/documents", label: "Documents", icon: FaFileAlt },
    { href: "/landlord/notifications", label: "Notifications", icon: FaBell },
    { href: "/landlord/profile", label: "Profile", icon: FaUserCircle },
  ],
  agent: [
    { href: "/agent", label: "Dashboard", icon: FaHome },
    { href: "/agent/listings", label: "Submitted Properties", icon: FaBuilding },
    { href: "/agent/referrals", label: "Referred Tenants", icon: FaUsers },
    { href: "/agent/commissions", label: "Commissions", icon: FaWallet },
    { href: "/agent/agreements", label: "Agreements", icon: FaClipboardList },
    { href: "/agent/profile", label: "Profile", icon: FaUserCircle },
  ],
  realEstate: [
    { href: "/real-estate", label: "Dashboard", icon: FaHome },
    { href: "/real-estate/listings", label: "Company listings", icon: FaBuilding },
    { href: "/real-estate/profile", label: "Profile & KYC", icon: FaShieldAlt },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: FaHome },
    { href: "/admin/users", label: "Users", icon: FaUsers },
    { href: "/admin/properties", label: "Property oversight", icon: FaBuilding },
    { href: "/admin/applications", label: "Applications", icon: FaClipboardList },
    { href: "/admin/payments", label: "Payments", icon: FaCreditCard },
    { href: "/admin/verification", label: "Verification", icon: FaShieldAlt },
    { href: "/admin/reports", label: "Reports", icon: FaChartBar },
    { href: "/admin/profile", label: "Profile", icon: FaUserCircle },
  ],
  corporate: [
    { href: "/corporate", label: "Portfolio", icon: FaHome },
    { href: "/corporate/properties", label: "Managed assets", icon: FaBuilding },
    { href: "/corporate/reports", label: "Reports", icon: FaChartBar },
    { href: "/corporate/profile", label: "Profile", icon: FaUserCircle },
  ],
  operations: [
    { href: "/operations", label: "Dashboard", icon: FaHome },
    { href: "/operations/maintenance", label: "Maintenance", icon: FaTools },
    { href: "/operations/workflow", label: "Workflow", icon: FaRegCalendarAlt },
    { href: "/operations/compliance", label: "Compliance", icon: FaShieldAlt },
    { href: "/operations/documents", label: "Documents", icon: FaFileAlt },
    { href: "/operations/profile", label: "Profile", icon: FaUserCircle },
  ],
  finance: [
    { href: "/finance", label: "Dashboard", icon: FaHome },
    { href: "/finance/revenue", label: "Revenue", icon: FaMoneyBillWave },
    { href: "/finance/billing", label: "Billing", icon: FaWallet },
    { href: "/finance/invoices", label: "Invoices", icon: FaFileAlt },
    { href: "/finance/reconciliation", label: "Reconciliation", icon: FaChartBar },
    { href: "/finance/profile", label: "Profile", icon: FaUserCircle },
  ],
};

const roleDisplay: Record<SidebarRole, string> = {
  tenant: "Tenant",
  landlord: "Property Owner",
  admin: "Administrator",
  corporate: "Corporate Portfolio",
  agent: "Agent",
  realEstate: "Real Estate Partner",
  operations: "Operations Staff",
  finance: "Finance Staff",
};

const ROOT_NAV_HREFS = new Set([
  "/tenant",
  "/landlord",
  "/admin",
  "/corporate",
  "/agent",
  "/real-estate",
]);

function isNavActive(pathname: string, href: string): boolean {
  if (ROOT_NAV_HREFS.has(href)) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarPanel({
  userType,
  onNavigate,
  onCloseMobile,
}: {
  userType: SidebarRole;
  onNavigate?: () => void;
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();
  const router = useAppRouter();
  const navItems = navItemsByRole[userType] || navItemsByRole.tenant;
  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      const first = stored.firstName || "";
      const last = stored.lastName || "";
      const name = `${first} ${last}`.trim();
      setDisplayName(name || "User");
    }
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col bg-primary-950 text-white">
      <div className="shrink-0 flex items-center justify-between gap-2 px-4 pt-5 pb-4 border-b border-white/10">
        <Link
          href="/"
          onClick={onNavigate}
          className="inline-flex items-center gap-3 hover:opacity-90 transition min-w-0"
        >
          <div className="h-10 w-10 rounded-xl shrink-0 relative">
            <Image src="/logo.svg" alt="CIL Properties" fill className="object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-accent-300 font-semibold truncate">
              CIL Properties
            </p>
            <p className="text-base font-semibold truncate">{roleDisplay[userType]}</p>
          </div>
        </Link>
        {onCloseMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Menu
        </p>
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon
                  className={clsx("shrink-0", isActive ? "text-accent-300" : "text-accent-400")}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="shrink-0 p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <ProfileAvatar size={40} variant="editable" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{displayName}</p>
            <p className="text-xs text-slate-400">{roleDisplay[userType]}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            clearSession();
            router.push("/auth/login");
          }}
          className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition"
        >
          <FaSignOutAlt /> Sign out
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({
  userType = "tenant",
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const close = () => onMobileClose?.();

  return (
    <>
      <aside className="hidden md:flex md:h-screen md:shrink-0 md:w-64 lg:w-72">
        <SidebarPanel userType={userType} />
      </aside>

      {mobileOpen ? (
        <>
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col md:hidden">
            <SidebarPanel userType={userType} onNavigate={close} onCloseMobile={close} />
          </aside>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-label="Close menu"
            onClick={close}
          />
        </>
      ) : null}
    </>
  );
}
