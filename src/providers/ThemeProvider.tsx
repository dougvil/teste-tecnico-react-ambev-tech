import { theme } from '@/theme';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import type React from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </>
  );
};
