"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { getStoredUser } from "@/lib/auth";
import { getProfilePath } from "@/lib/routes";
import { useAppRouter } from "@/lib/navigation";

export default function DashboardHeader() {
  const [userName, setUserName] = useState("User");
  const [profilePath, setProfilePath] = useState("/tenant/profile");
  const router = useAppRouter();

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUserName(user.firstName || "User");
      setProfilePath(getProfilePath(user.role));
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent-600 to-accent-500 flex items-center justify-center text-primary-950 text-xs font-bold">
              C
            </div>
            <span className="text-base font-semibold text-primary-900 hidden sm:inline truncate">
              CIL Properties
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <p className="text-sm font-medium text-primary-900 hidden sm:block">Hi, {userName}</p>
          <div className="relative">
            <button
              type="button"
              onClick={() => router.push(profilePath)}
              className="rounded-full overflow-hidden hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              aria-label="Open profile"
            >
              <ProfileAvatar size={40} />
            </button>
            <button
              type="button"
              onClick={() => router.push(profilePath)}
              className="absolute -bottom-0.5 -right-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-600 text-white shadow border border-white text-[10px]"
              aria-label="Edit profile"
            >
              <FaPencilAlt />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
