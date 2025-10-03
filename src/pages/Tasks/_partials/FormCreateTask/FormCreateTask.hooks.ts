import { useCreateTaskMutation } from '@/hooks/tasks/useCreateTaskMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { FormCreateTaskSchema } from './FormCreateTask.types';
import { formCreateTaskSchema } from './FormCreateTask.validations';

export function useFormCreateTask({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) {
  const createTaskMutation = useCreateTaskMutation({ onSuccess, onError });

  const form = useForm<FormCreateTaskSchema>({
    resolver: zodResolver(formCreateTaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    createTaskMutation.mutate({
      title: data.title,
      description: data.description,
      status: 'PENDING',
    });
    form.reset();
  });

  return {
    form,
    handleSubmit,
    isSubmitting: createTaskMutation.isPending,
  };
}
