/**
 * Card component
 * Reusable container for content
 */

import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  border?: boolean;
  shadow?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
}

const paddingStyles = {
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

const roundedStyles = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = 'md',
      hoverable = false,
      clickable = false,
      border = true,
      shadow = true,
      rounded = 'lg',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-white',
          paddingStyles[padding],
          roundedStyles[rounded],
          border && 'border border-slate-200',
          shadow && 'shadow-sm',
          (hoverable || clickable) &&
            'transition-all duration-200 hover:shadow-md hover:border-slate-300',
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex items-start justify-between gap-4 pb-4 border-b border-slate-200', className)}
        {...props}
      >
        <div>
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('py-4', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex items-center justify-end gap-3 pt-4 border-t border-slate-200', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
