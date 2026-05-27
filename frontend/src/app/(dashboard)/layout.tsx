"use client";

import Sidebar from "@/components/layout/Sidebar";
import { FaBell, FaSearch } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent-600">CIL Workspace</p>
              <h1 className="text-3xl font-bold text-primary-900">Dashboard</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3">
                <FaSearch className="text-slate-400" />
                <input
                  type="search"
                  placeholder="Search reports, properties..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
              <button className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-slate-700 shadow-sm transition hover:bg-slate-100">
                <FaBell />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
