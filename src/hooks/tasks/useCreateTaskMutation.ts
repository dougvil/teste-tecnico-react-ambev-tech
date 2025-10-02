import { createTask } from '@/services/tasks/tasks.service';
import type { CreateTaskInput, Task } from '@/services/tasks/tasks.types';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useCreateTaskMutation(
  options?: Omit<UseMutationOptions<{ task: Task }, unknown, CreateTaskInput, unknown>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationFn: createTask,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: [taskQueryKeys.taskList] });
      onSuccess?.(data, variables, context, mutation);
    },
  });
}
