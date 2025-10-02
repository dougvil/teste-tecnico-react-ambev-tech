import type { Task } from '@/services/tasks/tasks.types';

export interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  isDeleting?: boolean;
  isCompleting?: boolean;
}
