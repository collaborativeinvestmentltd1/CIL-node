/**
 * Button component
 * Reusable button for the entire ecosystem
 */

import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 disabled:bg-accent-300',
  secondary:
    'bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400 disabled:bg-slate-100',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-50',
  outline:
    'border-2 border-accent-600 text-accent-600 hover:bg-accent-50 active:bg-accent-100 disabled:border-accent-300 disabled:text-accent-300',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-4 py-2 text-base font-medium rounded-lg',
  lg: 'px-6 py-3 text-lg font-medium rounded-lg',
  xl: 'px-8 py-4 text-xl font-medium rounded-xl',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isFullWidth = false,
      icon,
      iconPosition = 'left',
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200',
          'disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          isFullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
        )}

        {icon && iconPosition === 'left' && !isLoading && <span>{icon}</span>}

        {children}

        {icon && iconPosition === 'right' && !isLoading && <span>{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
