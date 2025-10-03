import { useCallback, useState } from 'react';
import type { SnackbarAlertProps } from './SnackbarAlert.types';

export const useSnackbarAlert = () => {
  const [snackbarProps, _setSnackbarProps] = useState<SnackbarAlertProps>({
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 4000,
    onClose: () => _setSnackbarProps((prev) => ({ ...prev, open: false })),
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  });

  const setSnackbarProps = useCallback(
    (props: Partial<SnackbarAlertProps>) => {
      _setSnackbarProps((prev) => ({ ...prev, ...props }));
    },
    [snackbarProps],
  );

  return [snackbarProps, setSnackbarProps] as const;
};
