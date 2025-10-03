import type { AlertColor, SnackbarProps } from '@mui/material';

export type SnackbarSeverity = AlertColor;

export interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity?: SnackbarSeverity;
  autoHideDuration?: number;
  onClose?: SnackbarProps['onClose'];
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
}
