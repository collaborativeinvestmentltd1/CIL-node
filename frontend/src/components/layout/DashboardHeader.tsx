"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaPencilAlt } from "react-icons/fa";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { getStoredUser } from "@/lib/auth";
import { getProfilePath } from "@/lib/routes";

type DashboardHeaderProps = {
  onMenuToggle?: () => void;
};

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const [userName, setUserName] = useState("User");
  const [profilePath, setProfilePath] = useState("/tenant/profile");

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUserName(user.firstName || "User");
      setProfilePath(getProfilePath(user.role));
    }
  }, []);

  return (
    <header className="shrink-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuToggle}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-primary-900"
            aria-label="Open navigation menu"
          >
            <FaBars />
          </button>
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition shrink-0">
            <div className="h-9 w-9 rounded-xl shrink-0 relative">
              <Image src="/logo.svg" alt="CIL Properties" fill className="object-contain" />
            </div>
            <span className="text-base font-semibold text-primary-900 hidden sm:inline truncate">
              CIL Properties
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <p className="text-sm font-medium text-primary-900 hidden sm:block">Hi, {userName}</p>
          <Link
            href={profilePath}
            className="group relative flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            aria-label="Open profile"
          >
            <ProfileAvatar size={40} variant="readonly" />
            <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-600 text-white shadow border border-white text-[10px] group-hover:bg-accent-500 transition">
              <FaPencilAlt />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
