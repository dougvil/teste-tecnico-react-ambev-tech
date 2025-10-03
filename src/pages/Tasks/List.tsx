import Col from '@/components/Col/Col';
import ConfirmationDialog, { useConfirmationDialog } from '@/components/ConfirmationDialog';
import Row from '@/components/Row/Row';
import { SnackbarAlert } from '@/components/Snackbar/SnackbarAlert';
import { useSnackbarAlert } from '@/components/Snackbar/SnackbarAlert.hook';
import { useCompleteTaskMutation, useDeleteTaskMutation, useTaskListQuery } from '@/hooks/tasks';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { EmptyTaskList } from './_partials/EmptyTaskList';
import { TaskList } from './_partials/TaskList';
import { TaskListSkeleton } from './_partials/TaskList/TaskList.skeleton';

export const TaskListPage = () => {
  const [snackbarProps, setSnackbarProps] = useSnackbarAlert();

  const taskListQuery = useTaskListQuery();
  useEffect(() => {
    if (taskListQuery.isError) {
      setSnackbarProps({
        open: true,
        message: 'Erro ao carregar tarefas. Por favor, tente novamente mais tarde.',
        severity: 'error',
      });
    }
  }, [taskListQuery.isError]);

  const completeTaskMutation = useCompleteTaskMutation({
    onSuccess: () => {
      setSnackbarProps({
        open: true,
        message: 'Tarefa concluída com sucesso!',
        severity: 'success',
      });
    },
    onError: () => {
      setSnackbarProps({
        open: true,
        message: 'Erro ao atualizar tarefa. Por favor, tente novamente mais tarde.',
        severity: 'error',
      });
    },
  });

  const deleteTaskMutation = useDeleteTaskMutation({
    onSuccess: () => {
      setSnackbarProps({
        open: true,
        message: 'Tarefa excluída com sucesso!',
        severity: 'success',
      });
    },
    onError: () => {
      setSnackbarProps({
        open: true,
        message: 'Erro ao excluir tarefa. Por favor, tente novamente mais tarde.',
        severity: 'error',
      });
    },
  });

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
      {taskListQuery.isLoading ? (
        <Col size={{ xs: 12 }}>
          <TaskListSkeleton />
        </Col>
      ) : taskListQuery.data && taskListQuery.data?.length === 0 ? (
        <Col size={{ xs: 12 }}>
          <EmptyTaskList />
        </Col>
      ) : (
        <TaskList
          tasks={taskListQuery.data || []}
          onEdit={handleEdit}
          onComplete={handleComplete}
          onDelete={handleDelete}
          deletingTaskId={deleteTaskMutation.isPending ? deleteTaskMutation.variables : undefined}
          completingTaskId={completeTaskMutation.isPending ? completeTaskMutation.variables : undefined}
        />
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
      <SnackbarAlert {...snackbarProps} />
      <Outlet />
    </Row>
  );
};
