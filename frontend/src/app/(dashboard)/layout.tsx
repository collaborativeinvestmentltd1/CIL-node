"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import NavigationLoader from "@/components/ui/NavigationLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavigationLoader />
      <DashboardHeader />
      <main className="flex-1 w-full px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
