/**
 * Modal/Dialog component
 * Displays modals from the modal store
 */

'use client';

import React, { useEffect } from 'react';
import { useModalStore } from '@/store/modalStore';
import { Button } from './Button';
import clsx from 'clsx';
import { FaTimes } from 'react-icons/fa';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

function ConfirmModal() {
  const { modals, closeModal, updateModal } = useModalStore();
  const modal = modals.find((m) => m.type === 'confirm');

  if (!modal) return null;

  const handleConfirm = async () => {
    if (modal.onConfirm) {
      updateModal(modal.id, { isLoading: true });
      try {
        await Promise.resolve(modal.onConfirm());
      } finally {
        closeModal(modal.id);
      }
    }
  };

  const handleCancel = () => {
    modal.onCancel?.();
    closeModal(modal.id);
  };

  return (
    <ModalBase
      isOpen={true}
      onClose={handleCancel}
      size={modal.size}
      isDismissible={modal.isDismissible}
    >
      <ModalHeader title={modal.title} onClose={handleCancel} />
      <ModalBody>{modal.message}</ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={handleCancel}>
          {modal.cancelText || 'Cancel'}
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          isLoading={modal.isLoading}
        >
          {modal.confirmText || 'Confirm'}
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}

function AlertModal() {
  const { modals, closeModal } = useModalStore();
  const modal = modals.find((m) => m.type === 'alert');

  if (!modal) return null;

  const handleClose = () => {
    modal.onConfirm?.();
    closeModal(modal.id);
  };

  return (
    <ModalBase
      isOpen={true}
      onClose={handleClose}
      size={modal.size}
      isDismissible={modal.isDismissible}
    >
      <ModalHeader title={modal.title} onClose={handleClose} />
      <ModalBody>{modal.message}</ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={handleClose} isFullWidth>
          {modal.confirmText || 'OK'}
        </Button>
      </ModalFooter>
    </ModalBase>
  );
}

function CustomModal() {
  const { modals, closeModal } = useModalStore();
  const modal = modals.find((m) => m.type === 'custom');

  if (!modal) return null;

  return (
    <ModalBase
      isOpen={true}
      onClose={() => closeModal(modal.id)}
      size={modal.size}
      isDismissible={modal.isDismissible}
      className={modal.className}
    >
      {modal.content}
    </ModalBase>
  );
}

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isDismissible?: boolean;
  className?: string;
  children: React.ReactNode;
}

function ModalBase({
  isOpen,
  onClose,
  size = 'md',
  isDismissible = true,
  className,
  children,
}: ModalBaseProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDismissible) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isDismissible, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in"
        onClick={isDismissible ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={clsx(
          'relative bg-white rounded-lg shadow-xl',
          'animate-in fade-in zoom-in-95',
          'max-h-[90vh] overflow-y-auto',
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

interface ModalBodyProps {
  children: React.ReactNode;
}

function ModalBody({ children }: ModalBodyProps) {
  return <div className="px-6 py-4">{children}</div>;
}

interface ModalFooterProps {
  children: React.ReactNode;
}

function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
      {children}
    </div>
  );
}

export function ModalContainer() {
  return (
    <>
      <ConfirmModal />
      <AlertModal />
      <CustomModal />
    </>
  );
}

export { ModalBase, ModalHeader, ModalBody, ModalFooter };
