import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
};

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Panel({ children, className, padding = "md", hover = false }: PanelProps) {
  return (
    <div
      className={clsx(
        "rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-200",
        paddingMap[padding],
        hover && "hover:-translate-y-0.5 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

type StatPanelProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  hint?: string;
};

export function StatPanel({ label, value, icon, hint }: StatPanelProps) {
  return (
    <Panel className="space-y-4">
      {icon ? (
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-100 to-accent-200 text-accent-700 shadow-sm">
          {icon}
        </div>
      ) : null}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-primary-900">{value}</p>
        {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
      </div>
    </Panel>
  );
}

type HeroPanelProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function HeroPanel({ eyebrow, title, description, actions }: HeroPanelProps) {
  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-6 text-white shadow-xl sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3 max-w-2xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-200">{eyebrow}</p>
          ) : null}
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {description ? <p className="text-sm leading-7 text-slate-200 sm:text-base">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}

type ActionCardProps = {
  href?: string;
  icon: ReactNode;
  label: string;
  description: string;
  className?: string;
};

export function ActionCard({ href, icon, label, description, className }: ActionCardProps) {
  const card = (
    <div className={clsx(
      "group flex h-full flex-col items-center justify-between rounded-[1.75rem] border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl",
      className
    )}>
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-100 to-accent-200 text-accent-700 text-2xl shadow-sm">
        {icon}
      </div>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className="mt-3 text-base font-semibold text-primary-900">{description}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}
