import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  isLoading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-900 text-white hover:bg-primary-800 shadow-sm",
  secondary: "bg-accent-600 text-primary-950 hover:bg-accent-500 shadow-sm",
  ghost: "text-primary-900 hover:bg-slate-100",
  outline: "border border-slate-300 text-primary-900 hover:bg-slate-50",
};

export function Button({
  variant = "primary",
  className,
  children,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}
      <input
        id={inputId}
        className={clsx(
          "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900",
          "placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
