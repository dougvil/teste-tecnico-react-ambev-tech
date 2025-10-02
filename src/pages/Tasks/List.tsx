import Col from '@/components/Col/Col';
import ConfirmationDialog, { useConfirmationDialog } from '@/components/ConfirmationDialog';
import Row from '@/components/Row/Row';
import { useCompleteTaskMutation, useDeleteTaskMutation, useTaskListQuery } from '@/hooks/tasks';
import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { TaskCard } from './_partials/TaskCard/TaskCard';

export const TaskList = () => {
  const taskListQuery = useTaskListQuery();
  const completeTaskMutation = useCompleteTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const navigate = useNavigate();

  const deleteConfirmation = useConfirmationDialog({
    onConfirm: (taskId) => {
      deleteTaskMutation.mutate(taskId);
    },
  });

  const handleEdit = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleComplete = (taskId: string) => {
    completeTaskMutation.mutate(taskId);
  };

  const handleDelete = (taskId: string) => {
    deleteConfirmation.openDialog(taskId);
  };

  return (
    <Row>
      {taskListQuery.data && taskListQuery.data.length === 0 ? (
        <Col size={{ xs: 12 }}>
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
        </Col>
      ) : (
        taskListQuery.data?.map((task) => (
          <Col
            key={task.id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <TaskCard
              task={task}
              onEdit={handleEdit}
              onComplete={handleComplete}
              onDelete={handleDelete}
              isDeleting={deleteTaskMutation.isPending && deleteConfirmation.data === task.id}
              isCompleting={completeTaskMutation.isPending && completeTaskMutation.variables === task.id}
            />
          </Col>
        ))
      )}
      <ConfirmationDialog
        open={deleteConfirmation.isOpen}
        onClose={deleteConfirmation.closeDialog}
        onConfirm={deleteConfirmation.confirm}
        title='Excluir Tarefa'
        message='Você tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.'
        confirmText='Excluir'
        cancelText='Cancelar'
        variant='error'
      />
      <Outlet />
    </Row>
  );
};
