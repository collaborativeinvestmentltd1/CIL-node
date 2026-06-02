import clsx from "clsx";
import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <div
      className={clsx(
        "rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-6 shadow-sm transition-colors duration-200 sm:p-8",
        className
      )}
    >
      <div className="space-y-2 max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-700">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-primary-900 sm:text-3xl">{title}</h1>
        {description ? <p className="text-sm leading-6 text-slate-600 sm:text-base">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
