/**
 * Form components
 * Reusable form fields that integrate with useForm hook
 */

import React from 'react';
import { Input } from '@/shared/ui/Input';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  touched?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, touched, className, ...props }, ref) => {
    // Only show error if field has been touched
    const displayError = touched && error ? error : undefined;

    return (
      <Input
        ref={ref}
        label={label}
        error={displayError}
        helperText={helperText}
        className={className}
        {...props}
      />
    );
  }
);

FormInput.displayName = 'FormInput';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  touched?: boolean;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, touched, className, ...props }, ref) => {
    const displayError = touched && error ? error : undefined;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          className={`w-full px-4 py-2 text-base border-2 rounded-lg transition-colors duration-200
            bg-white text-slate-900 placeholder-slate-400
            focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200
            ${displayError ? 'border-red-500 focus:border-red-600 focus:ring-red-200' : 'border-slate-300 hover:border-slate-400'}
            ${props.disabled && 'opacity-50 cursor-not-allowed bg-slate-50'}
            ${className}
          `}
          {...props}
        />

        {displayError && <p className="mt-1 text-sm text-red-600">{displayError}</p>}
        {helperText && !displayError && (
          <p className="mt-1 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  touched?: boolean;
  options?: Array<{ label: string; value: any }>;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    { label, error, helperText, touched, options = [], className, ...props },
    ref
  ) => {
    const displayError = touched && error ? error : undefined;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {label}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}

        <select
          ref={ref}
          className={`w-full px-4 py-2 text-base border-2 rounded-lg transition-colors duration-200
            bg-white text-slate-900
            focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200
            ${displayError ? 'border-red-500 focus:border-red-600 focus:ring-red-200' : 'border-slate-300 hover:border-slate-400'}
            ${props.disabled && 'opacity-50 cursor-not-allowed bg-slate-50'}
            ${className}
          `}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {displayError && <p className="mt-1 text-sm text-red-600">{displayError}</p>}
        {helperText && !displayError && (
          <p className="mt-1 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

export const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, touched, className, ...props }, ref) => {
    const displayError = touched && error ? error : undefined;

    return (
      <div>
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`w-5 h-5 rounded border-2 border-slate-300 accent-accent-600 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-accent-200
              ${displayError && 'border-red-500'}
              ${className}
            `}
            {...props}
          />
          {label && (
            <label className="ml-3 text-sm font-medium text-slate-900 cursor-pointer">
              {label}
            </label>
          )}
        </div>
        {displayError && <p className="mt-1 text-sm text-red-600">{displayError}</p>}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';
