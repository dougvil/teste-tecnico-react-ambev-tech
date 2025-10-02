import { fetchTasks } from '@/services/tasks/tasks.service';
import { useQuery } from '@tanstack/react-query';
import { taskQueryKeys } from './queryKeys';

export function useTaskListQuery() {
  return useQuery({
    queryKey: [taskQueryKeys.taskList],
    queryFn: fetchTasks,
    select: (data) => data.tasks,
  });
}
