import { AppBar, Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position='sticky'
        elevation={1}
        color='secondary'
      >
        <Toolbar>
          <Box
            component='img'
            src='/logo.webp'
            alt='Company Logo'
            sx={{ height: 52 }}
          />
        </Toolbar>
      </AppBar>

      <Outlet />
    </Box>
  );
};
