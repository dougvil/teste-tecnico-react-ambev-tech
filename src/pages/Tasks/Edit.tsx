import Modal from '@/components/Modal/Modal';
import { SnackbarAlert } from '@/components/Snackbar/SnackbarAlert';
import { useSnackbarAlert } from '@/components/Snackbar/SnackbarAlert.hook';
import { useTaskDetailQuery } from '@/hooks/tasks/useTaskDetailQuery';
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEditTask } from './_partials/FormEditTask';

export const TaskEdit = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [snackbarProps, setSnackbarProps] = useSnackbarAlert();
  const { data: task, isLoading, isFetching, isError } = useTaskDetailQuery({ id: Number(taskId) });
  useEffect(() => {
    if (isError) {
      setSnackbarProps({
        open: true,
        message: 'Erro ao carregar tarefa. Por favor, tente novamente mais tarde.',
        severity: 'error',
      });
    }
  }, [isError]);
  const taskDataIsLoading = isLoading || isFetching;

  const handleClose = () => {
    navigate('/tasks');
  };

  const handleSuccess = () => {
    navigate('/tasks');
  };

  const handleError = () => {
    setSnackbarProps({
      open: true,
      message: 'Erro ao atualizar tarefa. Por favor, tente novamente mais tarde.',
      severity: 'error',
    });
  };

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        title='Editar Tarefa'
        maxWidth='sm'
      >
        {taskDataIsLoading && (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight={200}
          >
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Box>
            <p>Erro ao carregar a tarefa. Por favor, tente novamente.</p>
          </Box>
        )}

        {task && !taskDataIsLoading && (
          <FormEditTask
            task={task}
            onSuccess={handleSuccess}
            onCancel={handleClose}
            onError={handleError}
          />
        )}
      </Modal>
      <SnackbarAlert {...snackbarProps} />
    </>
  );
};
