import { useCreateTaskMutation } from '@/hooks/tasks/useCreateTaskMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { FormCreateTaskSchema } from './FormCreateTask.types';
import { formCreateTaskSchema } from './FormCreateTask.validations';

export function useFormCreateTask({ onSuccess }: { onSuccess?: () => void }) {
  const createTaskMutation = useCreateTaskMutation({ onSuccess });

  const form = useForm<FormCreateTaskSchema>({
    resolver: zodResolver(formCreateTaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await createTaskMutation.mutateAsync({
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
