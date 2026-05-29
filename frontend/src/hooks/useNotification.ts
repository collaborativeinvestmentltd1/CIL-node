/**
 * useNotification hook
 * Provides easy access to notification/toast system
 */

import { useNotificationStore, NotificationType } from '@/store/notificationStore';
import { useCallback } from 'react';

export function useNotification() {
  const store = useNotificationStore();

  const notify = useCallback(
    (type: NotificationType, title: string, message?: string, duration?: number) => {
      return store.addNotification({
        type,
        title,
        message,
        duration,
      });
    },
    [store]
  );

  return {
    success: useCallback(
      (title: string, message?: string, duration?: number) =>
        store.success(title, message, duration),
      [store]
    ),
    error: useCallback(
      (title: string, message?: string, duration?: number) =>
        store.error(title, message, duration),
      [store]
    ),
    info: useCallback(
      (title: string, message?: string, duration?: number) =>
        store.info(title, message, duration),
      [store]
    ),
    warning: useCallback(
      (title: string, message?: string, duration?: number) =>
        store.warning(title, message, duration),
      [store]
    ),
    notify,
    remove: useCallback(
      (id: string) => store.removeNotification(id),
      [store]
    ),
    clear: useCallback(() => store.clearAll(), [store]),
  };
}
