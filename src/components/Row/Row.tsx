import { Grid, type GridProps } from '@mui/material';
import React from 'react';

interface RowProps extends Omit<GridProps, 'container'> {
  children: React.ReactNode;
}

const Row = ({ children, ...props }: Omit<RowProps, 'container'>) => {
  return (
    <Grid
      container
      spacing={2}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default Row;
