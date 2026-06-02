/**
 * Notification Store - Zustand store for app notifications
 * Manages toast messages, alerts, and system notifications
 */

import { create } from 'zustand';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationState {
  notifications: Notification[];
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (title: string, message?: string, duration?: number) => string;
  error: (title: string, message?: string, duration?: number) => string;
  info: (title: string, message?: string, duration?: number) => string;
  warning: (title: string, message?: string, duration?: number) => string;
}

/**
 * Create notification store
 */
export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = `notification_${Date.now()}_${Math.random()}`;
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000, // 5s default
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove after duration
    const durationMs = newNotification.duration ?? 5000;
    if (durationMs > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, durationMs);
    }

    return id;
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAll: () => {
    set({ notifications: [] });
  },

  success: (title, message, duration) => {
    return get().addNotification({
      type: 'success',
      title,
      message,
      duration,
    });
  },

  error: (title, message, duration) => {
    return get().addNotification({
      type: 'error',
      title,
      message,
      duration: duration ?? -1, // Don't auto-close errors
    });
  },

  info: (title, message, duration) => {
    return get().addNotification({
      type: 'info',
      title,
      message,
      duration,
    });
  },

  warning: (title, message, duration) => {
    return get().addNotification({
      type: 'warning',
      title,
      message,
      duration,
    });
  },
}));
