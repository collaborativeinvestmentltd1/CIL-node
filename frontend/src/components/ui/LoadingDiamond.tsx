"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type LoadingDiamondProps = {
  message?: string;
};

/** Visual diamond = square rotated 45° with modest corner radius */
const SIZE = 88;
const CORNER = 7;
const BEAM_PERIMETER = 328;
const BEAM_ARC = BEAM_PERIMETER * 0.36;

/** Slow inhale / exhale — ~3.2s per full cycle */
const breathTransition = {
  repeat: Infinity,
  duration: 3.2,
  ease: "easeInOut" as const,
};

const breathScale = [1, 0.9, 1];

export default function LoadingDiamond({ message = "Loading" }: LoadingDiamondProps) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const beamGradientId = `cil-beam-${uid}`;
  const beamGlowId = `cil-beam-glow-${uid}`;

  const viewBox = "0 0 100 100";
  const inset = 6;
  const rectSize = 100 - inset * 2;
  const rx = (CORNER / SIZE) * rectSize;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
        style={{ width: SIZE * 1.35, height: SIZE * 1.35 }}
      >
        {/* Whole diamond + beam breathe together */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: SIZE,
            height: SIZE,
            transformOrigin: "center center",
          }}
          animate={reduceMotion ? undefined : { scale: breathScale }}
          transition={reduceMotion ? undefined : breathTransition}
        >
          {/* Rotated square → diamond silhouette */}
          <div
            className="absolute inset-0"
            style={{
              transform: "rotate(45deg)",
              transformOrigin: "center center",
            }}
          >
            {!reduceMotion ? (
              <svg
                viewBox={viewBox}
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden
              >
                <defs>
                  <linearGradient id={beamGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9941A" stopOpacity="0.25" />
                    <stop offset="42%" stopColor="#F5D76E" stopOpacity="1" />
                    <stop offset="50%" stopColor="#FFF8DC" stopOpacity="1" />
                    <stop offset="58%" stopColor="#E6A31E" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C9941A" stopOpacity="0.25" />
                  </linearGradient>
                  <filter id={beamGlowId} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect
                  x={inset}
                  y={inset}
                  width={rectSize}
                  height={rectSize}
                  rx={rx}
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.35)"
                  strokeWidth="2.5"
                />

                <motion.rect
                  x={inset}
                  y={inset}
                  width={rectSize}
                  height={rectSize}
                  rx={rx}
                  fill="none"
                  stroke={`url(#${beamGradientId})`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${BEAM_ARC} ${BEAM_PERIMETER - BEAM_ARC}`}
                  filter={`url(#${beamGlowId})`}
                  opacity={0.8}
                  animate={{ strokeDashoffset: [0, -BEAM_PERIMETER] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "linear",
                  }}
                />

                <motion.rect
                  x={inset}
                  y={inset}
                  width={rectSize}
                  height={rectSize}
                  rx={rx}
                  fill="none"
                  stroke={`url(#${beamGradientId})`}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={`${BEAM_ARC * 0.7} ${BEAM_PERIMETER - BEAM_ARC * 0.7}`}
                  animate={{ strokeDashoffset: [0, -BEAM_PERIMETER] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "linear",
                  }}
                />
              </svg>
            ) : null}

            {/* White diamond face */}
            <motion.div
              className="absolute bg-white shadow-md ring-1 ring-slate-200/80"
              style={{
                inset: "7%",
                borderRadius: CORNER,
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 8px 28px rgba(15, 23, 42, 0.12)",
                        "0 14px 40px rgba(212, 175, 55, 0.22)",
                        "0 8px 28px rgba(15, 23, 42, 0.12)",
                      ],
                    }
              }
              transition={reduceMotion ? undefined : breathTransition}
            />
          </div>

          {/* Label — counter-rotated, does not affect diamond shape */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-lg font-bold tracking-[0.35em] text-primary-900">CIL</span>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">{message}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
