import Modal from '@/components/Modal/Modal';
import { useTaskDetailQuery } from '@/hooks/tasks/useTaskDetailQuery';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEditTask } from './_partials/FormEditTask';

export const TaskEdit = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading, isFetching, isError } = useTaskDetailQuery({ id: Number(taskId) });
  const taskDataIsLoading = isLoading || isFetching;

  const handleClose = () => {
    navigate('/tasks');
  };

  const handleSuccess = () => {
    navigate('/tasks');
  };

  return (
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
        />
      )}
    </Modal>
  );
};
