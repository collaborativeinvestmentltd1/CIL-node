"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  const CardContent = (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="h-full p-8 bg-white rounded-xl border border-gray-200 cursor-pointer transition-all duration-300 hover:border-accent-300"
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="text-5xl mb-4 text-accent-600"
      >
        <Icon />
      </motion.div>
      <h3 className="text-xl font-semibold text-primary-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        className="h-1 bg-accent-600 rounded mt-4"
      />
    </motion.div>
  );

  return href ? <Link href={href}>{CardContent}</Link> : CardContent;
}
