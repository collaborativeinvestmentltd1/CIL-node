"use client";

import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export function StatCounter({ end, label, suffix = "", prefix = "" }: StatProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <p className="text-4xl md:text-5xl font-bold text-accent-600 mb-2">
        {isVisible && (
          <>
            {prefix}
            <CountUp end={end} duration={2.5} separator="," />
            {suffix}
          </>
        )}
      </p>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
}
