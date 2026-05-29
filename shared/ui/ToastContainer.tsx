/**
 * Toast notification component
 * Displays notifications from the notification store
 */

'use client';

import React from 'react';
import { useNotificationStore, NotificationType } from '@/store/notificationStore';
import clsx from 'clsx';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

interface ToastItemProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: (id: string) => void;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  success: <FaCheckCircle className="text-green-600" />,
  error: <FaTimesCircle className="text-red-600" />,
  info: <FaInfoCircle className="text-blue-600" />,
  warning: <FaExclamationCircle className="text-yellow-600" />,
};

const bgMap: Record<NotificationType, string> = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
  warning: 'bg-yellow-50 border-yellow-200',
};

const textMap: Record<NotificationType, string> = {
  success: 'text-green-800',
  error: 'text-red-800',
  info: 'text-blue-800',
  warning: 'text-yellow-800',
};

function ToastItem({ id, type, title, message, action, onClose }: ToastItemProps) {
  return (
    <div
      className={clsx(
        'flex gap-3 rounded-lg border-l-4 p-4 shadow-lg',
        bgMap[type],
        type === 'success' && 'border-l-green-600',
        type === 'error' && 'border-l-red-600',
        type === 'info' && 'border-l-blue-600',
        type === 'warning' && 'border-l-yellow-600',
        'animate-in fade-in slide-in-from-right-4'
      )}
    >
      <div className="flex-shrink-0 text-xl">{iconMap[type]}</div>

      <div className="flex-1 min-w-0">
        <p className={clsx('font-semibold', textMap[type])}>{title}</p>
        {message && (
          <p className={clsx('text-sm mt-1', textMap[type], 'opacity-80')}>
            {message}
          </p>
        )}
        {action && (
          <button
            onClick={() => {
              action.onClick();
              onClose(id);
            }}
            className={clsx(
              'mt-2 text-sm font-medium underline hover:no-underline',
              textMap[type]
            )}
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        onClick={() => onClose(id)}
        className={clsx(
          'flex-shrink-0 text-lg opacity-60 hover:opacity-100 transition-opacity',
          textMap[type]
        )}
      >
        <FaTimes />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-md pointer-events-auto">
      {notifications.map((notification) => (
        <ToastItem
          key={notification.id}
          {...notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
}
