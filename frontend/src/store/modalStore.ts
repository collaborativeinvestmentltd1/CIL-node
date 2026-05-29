/**
 * Modal Store - Zustand store for managing modals/dialogs
 * Supports stacking multiple modals and managing their state
 */

import { create } from 'zustand';

export type ModalType = 'confirm' | 'alert' | 'prompt' | 'custom';

export interface ModalConfig {
  id: string;
  type: ModalType;
  title: string;
  message?: string;
  content?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDismissible?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface ModalState {
  modals: ModalConfig[];

  // Actions
  openModal: (config: Omit<ModalConfig, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAll: () => void;
  updateModal: (id: string, updates: Partial<ModalConfig>) => void;
  confirm: (config: {
    title: string;
    message?: string;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => string;
  alert: (config: {
    title: string;
    message: string;
    onDismiss?: () => void;
  }) => string;
  prompt: (config: {
    title: string;
    message: string;
    defaultValue?: string;
    onConfirm: (value: string) => void | Promise<void>;
    onCancel?: () => void;
  }) => string;
}

/**
 * Create modal store
 */
export const useModalStore = create<ModalState>((set, get) => ({
  modals: [],

  openModal: (config) => {
    const id = `modal_${Date.now()}_${Math.random()}`;
    const newModal: ModalConfig = {
      ...config,
      id,
      isDismissible: config.isDismissible ?? true,
      size: config.size ?? 'md',
      type: config.type ?? 'custom',
    };

    set((state) => ({
      modals: [...state.modals, newModal],
    }));

    return id;
  },

  closeModal: (id) => {
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    }));
  },

  closeAll: () => {
    set({ modals: [] });
  },

  updateModal: (id, updates) => {
    set((state) => ({
      modals: state.modals.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    }));
  },

  confirm: (config) => {
    return get().openModal({
      type: 'confirm',
      title: config.title,
      message: config.message,
      onConfirm: config.onConfirm,
      onCancel: config.onCancel,
      confirmText: config.confirmText ?? 'Confirm',
      cancelText: config.cancelText ?? 'Cancel',
    });
  },

  alert: (config) => {
    return get().openModal({
      type: 'alert',
      title: config.title,
      message: config.message,
      onConfirm: config.onDismiss,
      confirmText: 'OK',
    });
  },

  prompt: (config) => {
    // This will need custom component handling
    return get().openModal({
      type: 'prompt',
      title: config.title,
      message: config.message,
      onConfirm: () => {
        const input = document.querySelector(
          'input[data-modal-prompt]'
        ) as HTMLInputElement | null;
        if (input && config.onConfirm) {
          config.onConfirm(input.value);
        }
      },
      onCancel: config.onCancel,
    });
  },
}));
