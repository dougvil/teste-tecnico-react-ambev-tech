import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

export const EmptyTaskList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Stack
        spacing={3}
        alignItems='center'
      >
        <CheckCircleOutline
          sx={{
            fontSize: '5rem',
            color: 'success.main',
            opacity: 0.3,
          }}
        />
        <Typography
          variant='h5'
          fontWeight={600}
          color='text.primary'
        >
          Nenhuma tarefa por aqui!
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ maxWidth: '400px' }}
        >
          Parabéns! Todas as suas tarefas foram concluídas.
        </Typography>
      </Stack>
    </Box>
  );
};
