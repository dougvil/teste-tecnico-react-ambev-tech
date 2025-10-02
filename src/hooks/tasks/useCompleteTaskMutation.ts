import { updateTask } from '@/services/tasks/tasks.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useCompleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      updateTask({
        id: taskId,
        data: { status: 'COMPLETED' },
      }),
    onSettled: (_, __, taskId) => {
      queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskDetail, taskId] });
      queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskList] });
    },
  });
}
