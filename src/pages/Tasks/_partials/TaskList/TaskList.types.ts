import type { Task } from '@/services/tasks';

export interface TaskListProps {
  tasks: Task[];
  onEdit: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  deletingTaskId?: string;
  completingTaskId?: string;
}
