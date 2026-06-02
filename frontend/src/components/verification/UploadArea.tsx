"use client";
import React from "react";

export default function UploadArea({ onChange, accept }: { onChange: (f: File) => void; accept?: string }) {
  return (
    <label className="group block w-full cursor-pointer rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center hover:border-accent-300">
      <input
        type="file"
        accept={accept || '*/*'}
        className="hidden"
        onChange={(e) => e.target.files && onChange(e.target.files[0])}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-accent-600 shadow">📤</div>
        <p className="text-sm font-medium text-primary-900">Upload document</p>
        <p className="text-xs text-slate-500">Drag or click to upload</p>
      </div>
    </label>
  );
}
