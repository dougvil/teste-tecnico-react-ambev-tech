import type { Task, UpdateTaskInput } from '@/services/tasks/tasks.types';
import { z } from 'zod';
import type { formEditTaskSchema } from './FormEditTask.validations';

export interface FormEditTaskProps {
  task: Task;
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: () => void;
}

export type FormEditTaskData = UpdateTaskInput;
export type FormEditTaskSchema = z.infer<typeof formEditTaskSchema>;
