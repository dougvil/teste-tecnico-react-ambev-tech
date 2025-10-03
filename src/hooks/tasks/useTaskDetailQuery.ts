import { fetchTask } from '@/services/tasks/tasks.service';
import type { Task } from '@/services/tasks/tasks.types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

type TaskDetailQueryParams = {
  id: number;
};

type TaskData = Awaited<ReturnType<typeof fetchTask>>;

type TaskDetailQueryOptions = Omit<UseQueryOptions<TaskData, Error, Task, readonly unknown[]>, 'queryKey' | 'queryFn'>;

export function useTaskDetailQuery({ id }: TaskDetailQueryParams, options?: TaskDetailQueryOptions) {
  return useQuery({
    queryKey: [taskQueryKeys.taskDetail, id],
    staleTime: 0,
    queryHash: `task-detail-${id}`,
    queryFn: () => fetchTask(String(id)),
    select: (data) => data.task,
    enabled: !!id,
    ...options,
  });
}
