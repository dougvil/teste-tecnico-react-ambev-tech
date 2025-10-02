import { fetchTask } from '@/services/tasks/tasks.service';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

type TaskDetailQueryParams = {
  id: number;
};

type TaskDetailQueryOptions = Omit<
  UseQueryOptions<Awaited<ReturnType<typeof fetchTask>>, Error, any, any>,
  'queryKey' | 'queryFn'
>;

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
