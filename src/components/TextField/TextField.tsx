import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

const TextField = (props: TextFieldProps) => {
  return (
    <MuiTextField
      margin={'dense'}
      size={'small'}
      required
      fullWidth
      {...props}
      slotProps={{
        inputLabel: { shrink: true },
        ...props.slotProps,
      }}
    />
  );
};

export default TextField;
