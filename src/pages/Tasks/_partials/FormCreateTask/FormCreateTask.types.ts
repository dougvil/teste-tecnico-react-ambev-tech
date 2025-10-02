import type { CreateTaskInput } from '@/services/tasks/tasks.types';
import { z } from 'zod';
import type { formCreateTaskSchema } from './FormCreateTask.validations';

export interface FormCreateTaskProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export type FormCreateTaskData = CreateTaskInput;
export type FormCreateTaskSchema = z.infer<typeof formCreateTaskSchema>;
