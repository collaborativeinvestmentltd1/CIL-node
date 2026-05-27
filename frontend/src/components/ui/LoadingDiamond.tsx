"use client";

import { motion } from "framer-motion";

type LoadingDiamondProps = {
  message?: string;
};

export default function LoadingDiamond({ message = "Loading" }: LoadingDiamondProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
          className="absolute inset-0 m-auto h-56 w-56 rounded-[2.25rem] border border-[#D4AF37] border-opacity-60 shadow-[0_0_75px_rgba(212,175,55,0.22)]"
        />

        <motion.div
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto h-72 w-72 rounded-[3rem] border border-[#D4AF37]/20"
        />

        <div className="relative h-48 w-48 rotate-45 rounded-[1.75rem] bg-white shadow-[0_18px_80px_rgba(15,23,42,0.16)]">
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-[1.5rem] bg-primary-900 px-6 py-6 text-center text-white shadow-xl">
              <span className="text-4xl font-black tracking-[0.35em]">CIL</span>
              <span className="mt-2 text-xs uppercase tracking-[0.4em] text-slate-200">{message}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
