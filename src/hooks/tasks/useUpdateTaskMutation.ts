import { updateTask } from '@/services/tasks/tasks.service';
import type { Task, UpdateTaskInput } from '@/services/tasks/tasks.types';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useUpdateTaskMutation(
  options?: Omit<
    UseMutationOptions<{ task: Task }, unknown, { id: string; data: UpdateTaskInput }, unknown>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationFn: updateTask,
    onSuccess: async (_data, variables, id, _context) => {
      await queryClient.invalidateQueries({
        queryKey: [taskQueryKeys.taskDetail, variables.id],
      });
      await queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskList] });
      if (onSuccess) onSuccess(_data, variables, id, _context);
    },
  });
}
