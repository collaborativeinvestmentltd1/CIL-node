/**
 * Input component
 * Reusable text input for forms
 */

import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isFullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      isFullWidth = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={isFullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={clsx(
              'w-full px-4 py-2 text-base border-2 rounded-lg transition-colors duration-200',
              'bg-white text-slate-900 placeholder-slate-400',
              'focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200',
              error ? 'border-red-500 focus:border-red-600 focus:ring-red-200' : 'border-slate-300 hover:border-slate-400',
              disabled && 'opacity-50 cursor-not-allowed bg-slate-50',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              className
            )}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
