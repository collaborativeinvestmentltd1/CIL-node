/**
 * Shared Dashboard Layout
 * Provides the main shell/layout for all dashboard modules
 * This is the container that wraps all dashboard pages
 */

'use client';

import React, { useState, ReactNode } from 'react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { FaBars, FaTimes, FaSignOutAlt, FaCog } from 'react-icons/fa';
import ProfileAvatar from '@/components/ui/ProfileAvatar';
import { ToastContainer } from '@/shared/ui/ToastContainer';
import { ModalContainer } from '@/shared/ui/ModalContainer';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
}

export function DashboardLayout({ children, sidebar, header }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                C
              </div>
              <span className="text-lg font-bold text-primary-900 hidden sm:inline">CIL</span>
            </Link>
          </div>

          {/* Right: Custom header or profile section */}
          {header ? (
            <div className="flex-1 mx-4">{header}</div>
          ) : null}

          {/* Profile Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-primary-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>

              {/* Dropdown Menu */}
              <div className="relative group">
                <button className="rounded-full overflow-hidden hover:opacity-80 transition">
                  <ProfileAvatar size={44} />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 border-b border-slate-200"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 border-b border-slate-200"
                  >
                    <FaCog /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && (
          <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white overflow-y-auto">
              {sidebar}
            </aside>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
              <div className="fixed inset-0 z-30 lg:hidden">
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar Panel */}
                <aside className="absolute left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 shadow-lg overflow-y-auto">
                  {sidebar}
                </aside>
              </div>
            )}
          </>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Toast & Modal Containers */}
      <ToastContainer />
      <ModalContainer />
    </div>
  );
}

/**
 * Sidebar Item Component
 */
interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  badge?: number;
}

export function SidebarItem({
  href,
  icon,
  label,
  isActive = false,
  badge,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors',
        isActive
          ? 'bg-accent-100 text-accent-700'
          : 'text-slate-700 hover:bg-slate-100'
      )}
    >
      <span className="text-lg">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-600 text-white text-xs font-bold">
          {badge}
        </span>
      )}
    </Link>
  );
}

/**
 * Sidebar Section Component
 */
interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="py-4">
      {title && (
        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      <nav className="space-y-1">{children}</nav>
    </div>
  );
}
