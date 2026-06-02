"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { Panel } from "@/components/ui/Panel";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  const card = (
    <Panel hover className="h-full group">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-100 text-lg text-accent-700 transition-colors group-hover:bg-accent-200">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-primary-900 mb-2">{title}</h3>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </Panel>
  );

  return href ? <Link href={href}>{card}</Link> : card;
}
