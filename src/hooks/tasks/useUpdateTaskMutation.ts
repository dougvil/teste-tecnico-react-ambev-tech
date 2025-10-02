import { updateTask } from '@/services/tasks/tasks.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: [taskQueryKeys.taskDetail, variables.id],
      });
      queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskList] });
    },
  });
}
