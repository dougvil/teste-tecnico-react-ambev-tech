import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useFormEditTask } from './FormEditTask.hooks';
import type { FormEditTaskProps } from './FormEditTask.types';

export const FormEditTask = ({ task, onSuccess, onCancel }: FormEditTaskProps) => {
  const { form, handleSubmit, isSubmitting } = useFormEditTask({ task, onSuccess });

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
              slotProps={{ htmlInput: { maxLength: 100 } }}
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

        <Controller
          name='status'
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={!!errors.status}
              disabled={isSubmitting}
            >
              <InputLabel id='status-label'>Status</InputLabel>
              <Select
                size='small'
                {...field}
                labelId='status-label'
                label='Status'
              >
                <MenuItem value='PENDING'>Pendente</MenuItem>
                <MenuItem value='COMPLETED'>Concluída</MenuItem>
              </Select>
              {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
            </FormControl>
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
            Salvar alterações
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
