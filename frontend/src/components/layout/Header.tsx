"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaBell, FaCog, FaSignOutAlt, FaChevronDown, FaSearch, FaEnvelope } from "react-icons/fa";

interface HeaderProps {
  userRole?: string;
}

export default function Header({ userRole = "User" }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties, agreements..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <FaBell className="text-lg" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 cursor-pointer border-b">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
                          ✓
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Agreement Accepted</p>
                        <p className="text-xs text-gray-500 mt-1">John Okafor accepted your agreement</p>
                        <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 cursor-pointer border-b">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                          💰
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Commission Paid</p>
                        <p className="text-xs text-gray-500 mt-1">₦25,000 commission credited</p>
                        <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t text-center">
                  <button className="text-sm text-accent-600 hover:text-accent-700 font-semibold">View All</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <FaChevronDown className={`text-gray-600 transition ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                <div className="p-4 border-b">
                  <p className="text-sm font-medium text-gray-900">Profile Menu</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition"
                  >
                    <FaUser className="w-4 h-4" /> Edit Profile
                  </Link>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition w-full text-left">
                    <FaCog className="w-4 h-4" /> Settings
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-red-600 transition w-full text-left border-t">
                    <FaSignOutAlt className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
