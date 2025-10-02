import { Grid, type GridProps } from '@mui/material';
import React from 'react';

interface ColProps extends Omit<GridProps, 'container'> {
  children: React.ReactNode;
}

const Col = ({ children, ...props }: ColProps) => {
  return (
    <Grid
      size={'grow'}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default Col;
