"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell, FaPencilAlt } from "react-icons/fa";
import ProfileAvatar from "@/components/ui/ProfileAvatar";

export default function DashboardHeader() {
  const [userName, setUserName] = useState("User");
  const router = useRouter();

  useEffect(() => {
    const raw = window.localStorage.getItem("cil_user");
    if (raw) {
      try {
        const user = JSON.parse(raw);
        setUserName(user?.firstName || "User");
      } catch (_) {}
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left: Logo and Dashboard */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center text-primary-950 text-sm font-bold shadow-md">
              C
            </div>
            <span className="text-lg font-bold text-primary-900">Dashboard</span>
          </Link>
        </div>

        {/* Right: Profile and Notifications */}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <button
            onClick={() => router.push("/dashboard/notifications")}
            className="inline-flex items-center justify-center rounded-full bg-white px-3 py-3 text-slate-700 hover:bg-slate-100 transition shadow-sm"
            title="Notifications"
          >
            <FaBell className="text-lg" />
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-primary-900">Hi, {userName}</p>
            </div>

            {/* Profile Avatar with Edit Button */}
            <div className="relative">
              <div
                onClick={() => router.push("/dashboard/profile")}
                className="cursor-pointer rounded-full overflow-hidden hover:opacity-80 transition"
                title="Edit profile"
              >
                <ProfileAvatar size={44} />
              </div>
              <button
                onClick={() => router.push("/dashboard/profile")}
                className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-600 text-white shadow-md border border-white text-xs"
                title="Edit profile"
              >
                <FaPencilAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
