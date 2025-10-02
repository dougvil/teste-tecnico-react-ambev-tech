import { useState } from 'react';

export interface UseConfirmationDialogReturn {
  isOpen: boolean;
  data: string | null;
  openDialog: (data: string) => void;
  closeDialog: () => void;
  confirm: () => void;
}

export interface UseConfirmationDialogProps {
  onConfirm: (data: string) => void;
}

export const useConfirmationDialog = ({ onConfirm }: UseConfirmationDialogProps): UseConfirmationDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const openDialog = (dialogData: string) => {
    setData(dialogData);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setData(null);
  };

  const confirm = () => {
    if (data) {
      onConfirm(data);
    }
    closeDialog();
  };

  return {
    isOpen,
    data,
    openDialog,
    closeDialog,
    confirm,
  };
};
