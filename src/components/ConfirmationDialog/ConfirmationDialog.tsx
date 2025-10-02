import { Stack, Typography } from '@mui/material';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { VARIANT_COLOR_MAP } from './ConfirmationDialog.constants';
import type { ConfirmationDialogProps } from './ConfirmationDialog.types';

export const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'info',
  maxWidth = 'xs',
}: ConfirmationDialogProps) => {
  const variantColor = VARIANT_COLOR_MAP[variant];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const actions = (
    <Stack
      direction='row'
      spacing={1}
      width='100%'
      justifyContent='flex-end'
    >
      <Button
        variant='outlined'
        onClick={onClose}
        color={'secondary'}
      >
        {cancelText}
      </Button>
      <Button
        variant='contained'
        onClick={handleConfirm}
        color={variantColor}
      >
        {confirmText}
      </Button>
    </Stack>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      actions={actions}
      maxWidth={maxWidth}
      fullWidth
    >
      <Typography color='text.secondary'>{message}</Typography>
    </Modal>
  );
};

export default ConfirmationDialog;
