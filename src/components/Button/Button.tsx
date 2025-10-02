import { Button as MuiButton, type ButtonProps } from '@mui/material';

const Button = ({ children, size = 'large', ...props }: ButtonProps) => {
  return (
    <MuiButton
      variant={'contained'}
      size={size}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
