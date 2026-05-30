"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Sidebar from "@/components/layout/Sidebar";
import { getStoredUser } from "@/lib/auth";
import { roleToSidebarType, type SidebarRole } from "@/lib/routes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userType, setUserType] = useState<SidebarRole>("tenant");

  useEffect(() => {
    const user = getStoredUser();
    if (user?.role) {
      setUserType(roleToSidebarType(user.role));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar userType={userType} />
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 w-full px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
