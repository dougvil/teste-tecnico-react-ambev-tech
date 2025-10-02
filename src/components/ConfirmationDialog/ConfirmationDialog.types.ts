export type ConfirmationDialogVariant = 'success' | 'error' | 'warning' | 'info';

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmationDialogVariant;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
