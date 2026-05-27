"use client";

export default function Billboard({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm uppercase tracking-[0.24em] text-accent-700">{title}</p>
      <div className="mt-2 text-sm text-slate-600">{message}</div>
    </div>
  );
}
