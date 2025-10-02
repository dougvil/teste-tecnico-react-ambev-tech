import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { Box, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useFormCreateTask } from './FormCreateTask.hooks';
import type { FormCreateTaskProps } from './FormCreateTask.types';

export const FormCreateTask = ({ onSuccess, onCancel }: FormCreateTaskProps) => {
  const { form, handleSubmit, isSubmitting } = useFormCreateTask({ onSuccess });

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
    >
      <Stack spacing={2}>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Título'
              placeholder='Digite o título da tarefa'
              error={!!errors.title}
              helperText={errors.title?.message}
              disabled={isSubmitting}
              autoFocus
              fullWidth
              slotProps={{ htmlInput: { maxLength: 50 } }}
            />
          )}
        />

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Descrição'
              placeholder='Digite a descrição da tarefa'
              multiline
              rows={6}
              error={!!errors.description}
              helperText={errors.description?.message}
              disabled={isSubmitting}
              slotProps={{ htmlInput: { maxLength: 500 } }}
            />
          )}
        />

        <Stack
          direction='row'
          spacing={2}
          justifyContent='flex-end'
          sx={{ mt: 2 }}
        >
          {onCancel && (
            <Button
              variant='outlined'
              color='secondary'
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Adicionar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
