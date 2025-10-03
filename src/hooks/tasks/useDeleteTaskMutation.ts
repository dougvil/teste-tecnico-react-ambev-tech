import { deleteTask } from '@/services/tasks/tasks.service';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useDeleteTaskMutation(
  options?: Omit<UseMutationOptions<void, unknown, string, unknown>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationFn: deleteTask,
    onSuccess: async (_data, taskId, id, _context) => {
      await queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskList] });
      if (onSuccess) onSuccess(_data, taskId, id, _context);
    },
  });
}
