"use client";

import { FaAward, FaGem, FaMedal, FaTrophy } from "react-icons/fa";

export default function RankBadge({ count }: { count: number }) {
  let title = "Bronze";
  let Icon = FaMedal;
  let badgeStyle = "bg-amber-100 text-amber-700";

  if (count >= 5 && count <= 12) {
    title = "Silver";
    Icon = FaAward;
    badgeStyle = "bg-slate-100 text-slate-900";
  } else if (count >= 13 && count <= 24) {
    title = "Gold";
    Icon = FaTrophy;
    badgeStyle = "bg-amber-100 text-amber-800";
  } else if (count >= 25) {
    title = "Diamond";
    Icon = FaGem;
    badgeStyle = "bg-cyan-100 text-cyan-800";
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold text-primary-900 shadow-sm ring-1 ring-slate-200">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${badgeStyle}`}>
        <Icon />
      </div>
      <div className="text-left">
        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{title} tier</div>
        <div className="text-sm font-semibold">{count} properties</div>
      </div>
    </div>
  );
}
