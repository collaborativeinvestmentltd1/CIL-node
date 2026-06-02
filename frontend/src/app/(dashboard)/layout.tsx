"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Sidebar from "@/components/layout/Sidebar";
import PageTransition from "@/components/ui/PageTransition";
import { getStoredUser } from "@/lib/auth";
import { roleToSidebarType, type SidebarRole } from "@/lib/routes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userType, setUserType] = useState<SidebarRole>("tenant");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (user?.role) {
      setUserType(roleToSidebarType(user.role));
    }
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 md:flex-row">
      <Sidebar
        userType={userType}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <DashboardHeader onMenuToggle={() => setMobileNavOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
