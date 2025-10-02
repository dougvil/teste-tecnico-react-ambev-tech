import { deleteTask } from '@/services/tasks/tasks.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSettled: (_, __, id) => {
      queryClient.removeQueries({ queryKey: [taskQueryKeys.taskDetail, id] });
      queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskList] });
    },
  });
}
