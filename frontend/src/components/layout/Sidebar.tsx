"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaUserCircle,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { clearSession, getStoredUser } from "@/lib/auth";
import { useAppRouter } from "@/lib/navigation";
import type { SidebarRole } from "@/lib/routes";
import clsx from "clsx";

interface SidebarProps {
  userType?: SidebarRole;
}

const navItemsByRole: Record<
  SidebarRole,
  { href: string; label: string; icon: typeof FaHome }[]
> = {
  tenant: [
    { href: "/tenant", label: "Dashboard", icon: FaHome },
    { href: "/tenant/properties", label: "Properties", icon: FaMapMarkerAlt },
    { href: "/tenant/landlords", label: "Landlords", icon: FaUsers },
    { href: "/tenant/profile", label: "Profile", icon: FaUserCircle },
  ],
  landlord: [
    { href: "/landlord", label: "Dashboard", icon: FaHome },
    { href: "/landlord/properties", label: "My Properties", icon: FaBuilding },
    { href: "/landlord/tenants", label: "Tenants", icon: FaUsers },
    { href: "/landlord/profile", label: "Profile", icon: FaUserCircle },
  ],
  admin: [{ href: "/admin", label: "Dashboard", icon: FaHome }],
  corporate: [{ href: "/corporate", label: "Dashboard", icon: FaHome }],
  agent: [{ href: "/agent/profile", label: "Profile", icon: FaUserCircle }],
  realEstate: [{ href: "/real-estate/profile", label: "Profile", icon: FaUserCircle }],
};

const roleDisplay: Record<SidebarRole, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
  admin: "Administrator",
  corporate: "Portfolio",
  agent: "Agent",
  realEstate: "Real Estate",
};

const ROOT_NAV_HREFS = new Set(["/tenant", "/landlord", "/admin", "/corporate"]);

function isNavActive(pathname: string, href: string): boolean {
  if (ROOT_NAV_HREFS.has(href)) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  items,
  onNavigate,
}: {
  items: (typeof navItemsByRole)["tenant"];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive = isNavActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={clsx(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors group",
              isActive
                ? "bg-white/15 text-white"
                : "text-slate-100 hover:bg-white/10"
            )}
          >
            <item.icon
              className={clsx(
                "transition-colors",
                isActive ? "text-accent-300" : "text-accent-400 group-hover:text-accent-300"
              )}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

export default function Sidebar({ userType = "tenant" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useAppRouter();
  const navItems = navItemsByRole[userType] || navItemsByRole.tenant;
  const stored = getStoredUser();
  const displayName = stored
    ? `${stored.firstName} ${stored.lastName}`.trim() || "User"
    : "User";

  const handleSignOut = () => {
    clearSession();
    router.push("/auth/login");
  };

  return (
    <aside className="relative z-20 shrink-0">
      <div className="md:hidden px-4 py-3 flex items-center justify-between bg-white border-b border-slate-200">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">CIL Properties</p>
          <h2 className="text-base font-semibold text-primary-900">{roleDisplay[userType]}</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-primary-900"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-30 w-72 bg-primary-950 text-white border-r border-primary-800 shadow-xl transition-transform duration-200 md:static md:translate-x-0 md:shadow-none md:flex md:flex-col md:w-64 lg:w-72",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full py-6 px-5 overflow-y-auto">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center text-primary-950 text-sm font-bold">
                C
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent-300 font-semibold">
                  CIL Properties
                </p>
                <h1 className="text-lg font-bold">{roleDisplay[userType]}</h1>
              </div>
            </Link>
          </div>

          <nav className="space-y-1 flex-1">
            <NavLinks items={navItems} onNavigate={() => setIsOpen(false)} />
          </nav>

          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Signed in</p>
            <div className="flex items-center gap-3">
              <ProfileAvatar size={40} />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{displayName}</p>
                <p className="text-xs text-slate-400">{roleDisplay[userType]}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white transition-colors w-full"
            >
              <FaSignOutAlt /> Sign out
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
        />
      ) : null}
    </aside>
  );
}
