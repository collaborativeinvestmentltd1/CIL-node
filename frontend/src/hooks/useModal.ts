/**
 * useModal hook
 * Provides access to modal/dialog system
 */

import { useModalStore, ModalConfig } from '@/store/modalStore';
import { useCallback } from 'react';

export function useModal() {
  const store = useModalStore();

  const openModal = useCallback(
    (config: Omit<ModalConfig, 'id'>) => {
      return store.openModal(config);
    },
    [store]
  );

  const closeModal = useCallback(
    (id: string) => {
      store.closeModal(id);
    },
    [store]
  );

  const confirm = useCallback(
    (config: {
      title: string;
      message?: string;
      onConfirm: () => void | Promise<void>;
      onCancel?: () => void;
      confirmText?: string;
      cancelText?: string;
    }) => {
      return store.confirm(config);
    },
    [store]
  );

  const alert = useCallback(
    (config: {
      title: string;
      message: string;
      onDismiss?: () => void;
    }) => {
      return store.alert(config);
    },
    [store]
  );

  return {
    modals: store.modals,
    openModal,
    closeModal,
    closeAll: useCallback(() => store.closeAll(), [store]),
    confirm,
    alert,
    updateModal: useCallback(
      (id: string, updates: Partial<ModalConfig>) => store.updateModal(id, updates),
      [store]
    ),
  };
}
