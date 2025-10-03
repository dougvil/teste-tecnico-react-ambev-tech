import { updateTask } from '@/services/tasks/tasks.service';
import type { Task } from '@/services/tasks/tasks.types';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useCompleteTaskMutation(
  options?: Omit<UseMutationOptions<{ task: Task }, unknown, string, unknown>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();
  const { onSettled, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationFn: (taskId: string) =>
      updateTask({
        id: taskId,
        data: { status: 'COMPLETED' },
      }),
    onSettled: async (data, error, taskId, context, mutation) => {
      await queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskDetail, taskId] });
      await queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskList] });
      return onSettled?.(data, error, taskId, context, mutation);
    },
  });
}
