import Alert, { type AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef } from 'react';
import type { SnackbarAlertProps } from './SnackbarAlert.types';

const CustomAlert = forwardRef<HTMLDivElement, AlertProps>(function SnackbarAlert(props, ref) {
  return (
    <Alert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
    />
  );
});

export const SnackbarAlert = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 4000,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
}: SnackbarAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <CustomAlert severity={severity}>{message}</CustomAlert>
    </Snackbar>
  );
};
