import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 p-8 rounded-3xl shadow-2xl border border-slate-200 bg-white">
        <div className="relative w-24 h-24">
          <Image src="/logo.svg" alt="CIL logo" fill className="object-contain" />
        </div>
        <div className="h-12 w-12 rounded-full border-4 border-accent-600 border-t-transparent animate-spin" />
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Loading</p>
      </div>
    </div>
  );
}
