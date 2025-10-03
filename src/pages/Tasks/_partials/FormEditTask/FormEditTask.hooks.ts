import { useUpdateTaskMutation } from '@/hooks/tasks/useUpdateTaskMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { FormEditTaskProps, FormEditTaskSchema } from './FormEditTask.types';
import { formEditTaskSchema } from './FormEditTask.validations';

export function useFormEditTask({
  task,
  onSuccess,
  onError,
}: Pick<FormEditTaskProps, 'task' | 'onSuccess' | 'onError'>) {
  const updateTaskMutation = useUpdateTaskMutation({ onSuccess, onError });

  const form = useForm<FormEditTaskSchema>({
    resolver: zodResolver(formEditTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    updateTaskMutation.mutate({
      id: task.id,
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });

    form.reset();
  });

  return {
    form,
    handleSubmit,
    isSubmitting: updateTaskMutation.isPending,
  };
}
