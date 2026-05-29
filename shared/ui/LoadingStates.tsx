/**
 * Loading states components
 * Skeleton screens, spinners, and loading indicators
 */

import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = '20px',
  circle = false,
  count = 1,
  className,
}: SkeletonProps) {
  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={clsx(
            'animate-pulse bg-slate-200 rounded',
            circle && 'rounded-full',
            className
          )}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
          }}
        />
      ))}
    </>
  );
}

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <svg
      className={clsx('animate-spin text-accent-600', sizeClasses[size], className)}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Loading...', fullScreen = false }: LoadingStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 py-12',
        fullScreen && 'fixed inset-0 bg-white'
      )}
    >
      <Spinner size="lg" />
      {message && <p className="text-slate-600">{message}</p>}
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  fullScreen?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  fullScreen = false,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 text-center py-12 px-4',
        fullScreen && 'fixed inset-0 bg-white'
      )}
    >
      {icon && <div className="text-6xl text-slate-400">{icon}</div>}
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      {description && <p className="text-slate-600 max-w-md">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
  fullScreen?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again later',
  action,
  fullScreen = false,
}: ErrorStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 text-center py-12 px-4',
        fullScreen && 'fixed inset-0 bg-white'
      )}
    >
      <div className="text-6xl text-red-600">⚠️</div>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600 max-w-md">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
